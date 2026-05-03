/* philosophershq.com — The Signal
 *
 * Loads data/puzzles.yaml, renders the active puzzle's three answer rows,
 * handles all keyboard interaction (typing/backspace/arrows/click-to-focus),
 * verifies answers locally, and reveals the puzzle's reward when all three
 * questions are solved.
 *
 * Runs on GitHub Pages as a plain ES2020 script. No build step.
 * YAML parsing uses js-yaml from a CDN; if that fails, the JSON fallback
 * (data/puzzles.json) is tried before erroring out.
 */

(() => {
  "use strict";

  const DATA_YAML = "data/puzzles.yaml";
  const DATA_JSON = "data/puzzles.json";
  const JSYAML_CDN = "https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js";

  const numberInput = document.getElementById("riddle-number");
  const statusEl    = document.getElementById("riddle-status");
  const titleEl     = document.getElementById("riddle-title");
  const descEl      = document.getElementById("riddle-description");
  const aboutEl     = document.getElementById("riddle-about");
  const answersEl   = document.getElementById("answers");
  const rewardEl    = document.getElementById("reward");
  const rewardValEl = document.getElementById("reward-value");
  const errorEl     = document.getElementById("boot-error");
  const sink        = document.getElementById("keystroke-sink");

  let puzzlesByNumber = new Map();
  let activePuzzle    = null;
  let rows            = [];
  let activeRow       = null;

  // ---------------------------------------------------------------- bootstrap

  loadPuzzles().then(start).catch(showBootError);

  async function loadPuzzles() {
    const yamlText = await fetchText(DATA_YAML);
    const parsed   = await parseYaml(yamlText);
    return normalize(parsed);
  }

  async function fetchText(url) {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`);
    return res.text();
  }

  async function parseYaml(text) {
    if (window.jsyaml) return window.jsyaml.load(text);
    try {
      await loadScript(JSYAML_CDN);
      if (window.jsyaml) return window.jsyaml.load(text);
    } catch (e) {
      // fall through to JSON fallback
    }
    const jsonText = await fetchText(DATA_JSON);
    return JSON.parse(jsonText);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`failed to load ${src}`));
      document.head.appendChild(s);
    });
  }

  // The user's YAML uses two nested `puzzles` keys:
  //   puzzles: [ { puzzles: [ {puzzle_number, ...}, ... ] }, ... ]
  // We flatten to a Map keyed by puzzle_number.
  function normalize(parsed) {
    const groups = parsed && parsed.puzzles;
    if (!Array.isArray(groups)) {
      throw new Error("invalid YAML: top-level `puzzles` is not an array");
    }
    const flat = [];
    for (const group of groups) {
      const inner = group && group.puzzles;
      if (Array.isArray(inner)) {
        for (const p of inner) flat.push(p);
      }
    }
    if (flat.length === 0) {
      throw new Error("no puzzles found");
    }
    const map = new Map();
    for (const p of flat) {
      if (typeof p.puzzle_number !== "number") continue;
      map.set(p.puzzle_number, p);
    }
    return map;
  }

  function start(map) {
    puzzlesByNumber = map;
    statusEl.textContent = `${puzzlesByNumber.size} riddles available.`;
    numberInput.disabled = false;
    numberInput.focus();
    wireEvents();
  }

  function showBootError(err) {
    console.error(err);
    if (errorEl) {
      errorEl.hidden = false;
      errorEl.textContent =
        "Could not load the riddles. " +
        "Open the console for details, or refresh.";
    }
    if (numberInput) numberInput.disabled = true;
  }

  // ---------------------------------------------------------------- normalize

  // Match the comparison rule: lowercase, strip everything that is not a-z.
  function normalizeAnswer(s) {
    return String(s || "").toLowerCase().replace(/[^a-z]/g, "");
  }

  // Word-length array for the box layout.
  // Splits on whitespace, drops non-letter chars, returns letter counts.
  function wordLengthsFromAnswer(answer) {
    return String(answer || "")
      .split(/\s+/)
      .map(w => w.replace(/[^a-zA-Z]/g, "").length)
      .filter(n => n > 0);
  }

  // ------------------------------------------------------------------- render

  function loadPuzzle(num) {
    rows = [];
    activeRow = null;
    answersEl.innerHTML = "";
    rewardEl.classList.remove("visible");
    rewardEl.hidden = true;
    titleEl.textContent = "";
    descEl.textContent = "";
    aboutEl.textContent = "";

    if (num === null || Number.isNaN(num)) {
      activePuzzle = null;
      statusEl.textContent = `${puzzlesByNumber.size} riddles available.`;
      return;
    }

    const puzzle = puzzlesByNumber.get(num);
    if (!puzzle) {
      activePuzzle = null;
      statusEl.textContent = `No riddle ${num} found.`;
      return;
    }

    activePuzzle = puzzle;
    statusEl.textContent = `Riddle ${puzzle.puzzle_number}.`;
    titleEl.textContent  = puzzle.title || "";
    descEl.textContent   = puzzle.description || "";
    aboutEl.textContent  = puzzle.is_about ? `about: ${puzzle.is_about}` : "";

    const questions = Array.isArray(puzzle.questions) ? puzzle.questions : [];
    questions.forEach((q, i) => {
      const row = new AnswerRow(q, i);
      rows.push(row);
      answersEl.appendChild(row.root);
      row.revealVisible();
    });

    if (rows.length > 0) rows[0].activate(0);
  }

  // ----------------------------------------------------------------- AnswerRow

  class AnswerRow {
    constructor(question, index) {
      this.index         = index;
      this.questionText  = question.question || "";
      this.answer        = question.answer || "";
      this.wordLengths   = wordLengthsFromAnswer(this.answer);
      this.expected      = normalizeAnswer(this.answer);
      this.totalLetters  = this.wordLengths.reduce((a, b) => a + b, 0);
      this.values        = new Array(this.totalLetters).fill("");
      this.boxes         = [];
      this.activeIndex   = 0;
      this.solved        = false;

      const root = document.createElement("div");
      root.className = "answer-row";
      root.setAttribute("role", "group");
      root.setAttribute("aria-label", `Question ${index + 1}`);
      this.root = root;

      const promptEl = document.createElement("div");
      promptEl.className = "prompt";
      promptEl.textContent = `Question ${index + 1} answer:`;
      root.appendChild(promptEl);

      if (this.questionText) {
        const qEl = document.createElement("div");
        qEl.className = "question";
        qEl.textContent = this.questionText;
        root.appendChild(qEl);
      }

      const boxesEl = document.createElement("div");
      boxesEl.className = "boxes";
      root.appendChild(boxesEl);

      let letterIdx = 0;
      this.wordLengths.forEach((wordLen, wordIdx) => {
        if (wordIdx > 0) {
          const gap = document.createElement("div");
          gap.className = "word-gap";
          boxesEl.appendChild(gap);
        }
        for (let i = 0; i < wordLen; i++) {
          const box = document.createElement("div");
          box.className = "letter-box";
          const myIndex = letterIdx;
          box.dataset.index = String(myIndex);
          box.setAttribute("role", "textbox");
          box.setAttribute(
            "aria-label",
            `letter ${i + 1} of ${wordLen}, word ${wordIdx + 1} of ${this.wordLengths.length}`
          );
          box.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.activate(myIndex);
          });
          this.boxes.push(box);
          boxesEl.appendChild(box);
          letterIdx++;
        }
      });
    }

    activate(idx) {
      if (this.solved) return;
      activeRow = this;
      this.activeIndex = Math.max(0, Math.min(idx, this.totalLetters - 1));
      updateHighlights();
      sink.focus({ preventScroll: true });
    }

    handleKey(e) {
      if (this.solved) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        if (this.values[this.activeIndex]) {
          this.values[this.activeIndex] = "";
          this.boxes[this.activeIndex].textContent = "";
        } else if (this.activeIndex > 0) {
          this.activeIndex--;
          this.values[this.activeIndex] = "";
          this.boxes[this.activeIndex].textContent = "";
        }
        updateHighlights();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (this.activeIndex > 0) this.activeIndex--;
        updateHighlights();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (this.activeIndex < this.totalLetters - 1) this.activeIndex++;
        updateHighlights();
        return;
      }
      if (e.key === "Tab") return;

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        const ch = e.key.toUpperCase();
        this.values[this.activeIndex] = ch;
        this.boxes[this.activeIndex].textContent = ch;
        if (this.activeIndex < this.totalLetters - 1) {
          this.activeIndex++;
        }
        updateHighlights();

        if (this.values.every(v => v !== "")) {
          this.verify();
        }
      }
    }

    verify() {
      const guess = normalizeAnswer(this.values.join(""));
      if (guess === this.expected) {
        this.solved = true;
        this.boxes.forEach(b => {
          b.classList.remove("active");
          b.classList.add("solved");
        });
        advanceToNextUnsolvedRow();
        checkAllSolved();
      } else {
        this.shake();
      }
    }

    shake() {
      this.boxes.forEach(b => b.classList.add("wrong"));
      setTimeout(() => {
        this.boxes.forEach(b => {
          b.classList.remove("wrong");
          b.textContent = "";
        });
        this.values = new Array(this.totalLetters).fill("");
        this.activeIndex = 0;
        updateHighlights();
      }, 420);
    }

    revealVisible() {
      requestAnimationFrame(() => this.root.classList.add("visible"));
    }
  }

  // -------------------------------------------------------------- coordination

  function updateHighlights() {
    rows.forEach(row => {
      row.boxes.forEach((box, i) => {
        const isActive = (row === activeRow) && (i === row.activeIndex) && !row.solved;
        box.classList.toggle("active", isActive);
      });
    });
  }

  function advanceToNextUnsolvedRow() {
    const next = rows.find(r => !r.solved);
    if (next) {
      const firstEmpty = next.values.findIndex(v => v === "");
      next.activate(firstEmpty === -1 ? 0 : firstEmpty);
    } else {
      activeRow = null;
      updateHighlights();
    }
  }

  function checkAllSolved() {
    if (!activePuzzle) return;
    if (rows.every(r => r.solved)) {
      revealReward(activePuzzle);
    }
  }

  function revealReward(puzzle) {
    const reward = puzzle && puzzle.reward;
    let valueHtml;
    if (reward && reward.type === "link" && reward.value) {
      valueHtml = `<a href="${escapeHtml(reward.value)}" rel="noopener" target="_blank">${escapeHtml(reward.value)}</a>`;
    } else if (reward && reward.value) {
      valueHtml = escapeHtml(reward.value);
    } else {
      // No explicit reward defined: show the title as confirmation.
      valueHtml = escapeHtml(`Riddle ${puzzle.puzzle_number} — ${puzzle.title || "complete"}.`);
    }
    rewardValEl.innerHTML = valueHtml;
    rewardEl.hidden = false;
    requestAnimationFrame(() => rewardEl.classList.add("visible"));
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  // ------------------------------------------------------------------- events

  function wireEvents() {
    numberInput.addEventListener("input", () => {
      const cleaned = numberInput.value.replace(/[^0-9]/g, "");
      if (cleaned !== numberInput.value) numberInput.value = cleaned;
      const n = cleaned === "" ? null : parseInt(cleaned, 10);
      loadPuzzle(n);
    });

    window.addEventListener("keydown", (e) => {
      if (document.activeElement === numberInput) return;
      if (!activeRow) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      activeRow.handleKey(e);
    });

    sink.addEventListener("blur", () => {
      if (activeRow) {
        setTimeout(() => sink.focus({ preventScroll: true }), 0);
      }
    });
  }
})();
