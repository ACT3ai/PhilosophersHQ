# PhilosophersHQ

Public website repo for **[philosophershq.com](https://philosophershq.com)** — the publishing destination for **The Signal**, a 4chan-distributed philosophical and investigative puzzle project modeled on Cicada 3301.

The Signal content (posts, dimension research, solver guides) created in the source directory `~/BGit/act3/ck_marketing/4chan` is hosted here for solvers who follow the trail off 4chan.

---

## Table of Contents

- [What The Signal Is](#what-the-signal-is)
- [The Eighteen Dimensions](#the-eighteen-dimensions)
- [Directory Structure — Every Dimension](#directory-structure--every-dimension)
- [The Graph — How the Puzzle is Structured](#the-graph--how-the-puzzle-is-structured)
- [Top-Level Files](#top-level-files)
- [Posts Directory](#posts-directory)
- [Prompts Directory](#prompts-directory)
- [Research Directory](#research-directory)
- [Three Citizen Pathways](#three-citizen-pathways)
- [Rules](#rules)
- [Web App — What This Directory Does](#web-app--what-this-directory-does)
- [The Mysterious Page — UX Spec](#the-mysterious-page--ux-spec)
- [The Puzzle Database — YAML](#the-puzzle-database--yaml)
- [Hosting](#hosting)
- [Tech Stack](#tech-stack)
- [Web App Directory Layout](#web-app-directory-layout)
- [Web App Rules](#web-app-rules)

---

## What The Signal Is

The Signal is a multi-post philosophical and investigative puzzle distributed across 4chan boards — `/pol/`, `/x/`, `/sci/`, and others. It is modeled on the Cicada 3301 format: numbered posts, cryptic fragments, cross-platform coordination, and a community of solvers who work together to find answers.

The Signal differs from Cicada in four critical ways:

- It has **specific subject matter** — real, documentable history, not abstract ciphers.
- Its goal is **understanding, not recruitment** — it selects for curiosity over technical skill.
- Every claim is **verifiable against primary sources** — solvers are asked to research, not believe.
- The destination is **explicit** — JFK Social ([jfk.social](https://jfk.social)), an uncensored Nostr-based platform.

### The Core Question

The single core question all dimensions converge on (internal — not stated in public posts; solvers must arrive at it):

> Are the major institutions of American democracy — government, intelligence, media, academia — operating in the service of the American people, or have they been captured by a small set of interests that benefit from the current arrangement regardless of democratic outcomes?

The puzzle does not ask solvers to believe the answer. It asks them to research eighteen specific dimensions and see whether the evidence supports the structural claim. The puzzle ends with obligation: if capture has occurred, what do people who understand this owe to people who do not? That is the Awakening dimension.

---

## The Eighteen Dimensions

### Investigation Dimensions (specific, sourced, falsifiable)

| Dimension | Description |
|---|---|
| `jfk/` | The JFK assassination, November 22, 1963. Who did it. Why. How the cover-up was maintained for sixty years. What it tells us about the present structure of institutional power. |
| `jfksocial/` | jfk.social — the free-speech social network on the Nostr protocol. The destination platform for solvers who complete the puzzle. |
| `iranwar/` | The manufactured case for military conflict with Iran. Threat inflation, media amplification, foreign-policy actors who benefit from permanent conflict. |
| `palantir/` | A major AI data infrastructure company deeply embedded in US intelligence services. **IMPORTANT:** the company name is never used in any public post — referred to internally only. |
| `puppet_master/` | Who actually controls US foreign policy and intelligence across administrations and parties. Named individuals. Documented mechanisms. The structural role of the Puppet Master — not a person but a set of control nodes: intelligence relationships, media ownership, financial leverage, career control. |
| `qanon/` | Analysis of the prior signal. What Q got right. What was manufactured noise. How to evaluate anonymous intelligence drops. What The Signal does differently to avoid the QAnon failure mode of burying signal in noise. |
| `storytelling/` | The craft layer. How narratives are built and weaponized. How to tell true stories so they are heard and not reflexively dismissed. Called the "master dimension" because the narrative wall is the primary mechanism of institutional capture. |
| `current_political_event/` | The bridge dimension. Present-day events decoded through documented structural patterns. The primary solver entry point — most solvers arrive here first because contemporary events are the hook. |
| `democracy/` | What democracy actually requires to function. |
| `democracy_removed/` | How democratic function is removed without formal abolition. |
| `intel_services/` | The permanent intelligence apparatus; congressional oversight findings. |
| `intel_ops/` | Specific documented intelligence operations; gap between claims and record. |
| `populist/` | What happens when elites entrench and normal channels close. |
| `evil/` | Cases where the record shows deliberate harm, not just self-interest. |
| `murdered/` | Documented political assassinations; past cases only, evidence-based. |
| `intel_members/` | Whistleblowers, retired officers, analysts who dissented. |

### Philosophical Framework Dimensions (analytical lenses)

| Dimension | Description |
|---|---|
| `epistemology/` | How we know what we know. Knowledge institution capture. How the apparatus of credentialing and consensus manufacturing produces false certainty. |
| `power/` | Who benefits. Regulatory capture. Media consolidation. The financial flows that maintain structural arrangements across electoral cycles. |

### Supporting Lenses (not full dimensions but inform all eighteen)

- `language/` — Vocabulary capture; language as infrastructure of narrative control.
- `time/` — Historical cycles; where we are in the long pattern.
- `identity/` — Who you are without captured institutions; the individual solver's ground.
- `systems/` — How broken, self-perpetuating systems work and why they resist change.
- `awakening/` — What clear sight obligates; the ethical endpoint of the puzzle.

---

## Directory Structure — Every Dimension

Each dimension directory contains a standard set of files:

| File | Purpose |
|---|---|
| `overview.mdx` | Full description of the dimension and its scope. |
| `notes.md` | Working research notes; analytical, not conspiratorial. |
| `questions.md` | Open research questions to be answered with primary sources. |
| `sources.md` | Key documents, congressional records, FOIA releases, court records. |
| `connections.md` | Typed links to other dimensions; how this dimension illuminates them. |
| `my_path.mdx` | The solver's guide through this dimension's neighborhood in the graph. |
| `p_here.md` | Automation prompt: expand this dimension and contribute to next post. |
| `clue_to_specific/` | Subdirectory: specific cryptic clues mapping to verifiable facts. |

The `current_political_event` dimension also contains:

- `data/` — Structured data files supporting the dimension's claims.
- `k/` — Key-concept index files.
- `links/` — Typed graph link files connecting node pairs.

---

## The Graph — How the Puzzle is Structured

The puzzle is designed as a graph. Each dimension is a neighborhood in that graph. Every node has a type defined in `graph_node_types.csv`.

**Node types include:**

| Type | Description |
|---|---|
| `post` | Numbered 4chan post with three embedded clues. |
| `clue` | Cryptic sourceable fragment inside a post. |
| `destination_page` | Web page reached by following a clue. |
| `in_concept` | What the solver brings to a destination page. |
| `out_concept` | What the solver takes away. |
| `search_term` | Term to search to reach the next node. |
| `keyword` | Unlocks a next step on JFK Social. |
| `insight` | Structural realization from combining clues. |
| `problem_node` | Named, sourced problem area. |
| `fix_allusion` | Early reference to a solution; forward pull in graph. |
| `fix` | Documented working solution or historical precedent. |
| `solution` | Final end node: clear understanding plus structural fix. |
| `historic_fact` | Specific verifiable event from the documented record. |
| `primary_source` | Original document; congressional testimony, FOIA, court record. |
| `structural_pattern` | Recurring mechanism documented across multiple historical cases. |
| `mechanism` | Specific documented way democratic function is shaped without force. |
| `cover_story` | Official narrative vs. what the documented record shows. |
| `false_narrative` | Specific manufactured claim verifiable against primary sources. |
| `named_relationship` | Documented connection between specific actors or institutions. |
| `documented_operation` | Specific intelligence/government operation confirmed by record. |
| `whistleblower_account` | First-person insider testimony naming internal conduct. |
| `philosophy` | Analytical lens structuring how solver interprets evidence. |
| `linkage` | Cross-dimension link; same underlying structure from two angles. |
| `meme_image` | Visual JFK Social post with three labeled zones. |
| `jfksocial_post` | Post on JFK Social discovered by applying a keyword. |

**How a post resolves:** Each post has three embedded clues. Each clue launches one path through the graph. The three paths converge on a shared `out_concept`. A meme post on JFK Social encodes all three out_concepts visually. Solvers who find the meme, identify which zone maps to each out_concept, and name the common problem and structural fix have completed that post's chain.

---

## Top-Level Files

### `overview.mdx`
Master index. Full dimension list with links. Complete description of the project structure. The primary orientation document. ~78 KB — most developed file in the directory. Includes: The Puppet Master Structure, The Narrative Wall, Mechanisms of Control (blackmail infrastructure, political assassination, false flags, election capture, foreign intelligence penetration), The Three Citizen Pathways (free speech infrastructure, truth getting out, normies reached through short-form video), and the full dimension list with detailed descriptions.

### `the_core_question.mdx`
Internal document. States the single question all eighteen dimensions converge on. Not stated in any public post — solvers must arrive at it through research. Also explains why the question cannot be asked directly (vocabulary capture, credibility attack, trained defensive responses) and the obligation that follows from a yes answer.

### `cicada_comparison.mdx`
Comparison to Cicada 3301. What Cicada did (cryptographic puzzle, 2012-2014, multi-platform, never attributed). What The Signal does differently (specific subject matter, understanding not recruitment, verifiable answers, explicit destination). What is borrowed from Cicada (multi-platform, cross-referencing, community aspect, cryptic format, numbered sequential posts). Risk comparison and mitigation strategies.

### `how_to_participate.mdx`
Solver guide and contributor guide. Tells solvers: collect numbered posts, research claims, follow the directions, destination is jfk.social. Tells contributors: run `p_run.md`, draft posts from mature dimensions, watch community cadence before releasing next post.

### `post_template.mdx`
Template for all new posts. Frontmatter: `post_key`, `dimension`, `peer_dimension`, `status`, `added` date, `meme_key`. Post body. Three paths (each with `clue_question`, `entry`, `url`, `in_concept`, `out_concept`, `hops`). Meme decode logic section showing how all three out_concepts map to visual zones. Sources. Internal notes.

### `graph_node_types.csv`
Registry of all node types in the puzzle graph. Each row: `type`, `title`, `description`. Ground truth for what kinds of nodes exist and what role each plays in the chain. Used by automation prompts when generating typed links.

### `problems.csv` / `solutions.csv` / `fixes.csv`
Structured data registries. `problems.csv` catalogs named problem nodes from the investigation. `solutions.csv` catalogs documented working alternatives and structural fixes. `fixes.csv` tracks corrections or content-quality issues.

---

## Posts Directory

`posts/` contains the numbered 4chan posts in release order.

- File naming: `{number}_{short_description}.md`
- Post numbers are unique and sequential. Order matters.
- Existing posts are never edited or deleted. Only new posts are added.

**Current posts:**

| File | Description |
|---|---|
| `1_the_question.md` | Opener. Establishes format and premise. Cryptic. Does not name the subject. Creates anticipation. Board: `/pol/`. |
| `2_seven_lenses.md` | Introduces the seven analytical lenses. |
| `3_the_epistemology_fragment.md` | Epistemology dimension drop. Board: `/x/`. |
| `p_assess_posts.md` | Automation prompt: assess current post quality. |
| `p_expert.md` | Expert automation prompt (copy in `posts/`). |

---

## Prompts Directory

`prompts/` contains automation prompts for building the puzzle.

### `p_run.md`
Master automation prompt. Processes every active dimension directory. Skips any dimension with `run: false` in its `claude.md`. Expands notes, questions, sources, and connections. Drafts the next numbered 4chan post. Safe to run repeatedly — never deletes, only expands. Runs up to 8 concurrent agents (`MAX_CONCURRENT_AGENTS`).

### `p_expert.md` (top-level copy also exists)
Expert prompt. Runs Stages 1–5 for a specific dimension (`THIS_DIM`), then Stages 6–7 which create a typed graph link file and build a full three-branch solver path plus one ready-to-publish post. Stage 6 picks `OTHER_DIM` randomly (evenly distributed) and documents a typed connection between node types from `graph_node_types.csv`. Stage 7 assembles existing link files into a traversable solver path.

---

## Research Directory

`research/` holds deep source material organized by dimension subdirectory. Each subdirectory contains `index.md` — a research index for that dimension's primary sources.

**Current research subdirectories:** `jfk/`, `puppet_master/`, `iranwar/`, `qanon/`, `storytelling/`, `democracy/`, `democracy_removed/`, `intel_services/`, `intel_ops/`, `populist/`, `evil/`, `murdered/`, `current_political_event/`, `epistemology/`, `power/`.

---

## Three Citizen Pathways

The puzzle documents not only the problem but three active pathways for response.

### Pathway One — Free Speech Infrastructure
Platforms on open protocols that cannot be captured. JFK Social ([jfk.social](https://jfk.social)) is built on Nostr — no single entity controls the ranking algorithm, moderation layer, or distribution. This is the structural fix to narrative capture.

### Pathway Two — The Truth Gets Out
Primary sources exist. COINTELPRO files, Church Committee findings, Pentagon Papers, Downing Street Memo. The problem is discoverability, credibility, and the narrative wall. The research layer of the puzzle makes primary sources navigable and connected.

### Pathway Three — Short-Form Video Reaches Normies
Most people will not read primary sources. Most will not solve a 4chan puzzle. The channel is short-form video on interest-graph platforms (TikTok, Reels). 60-second videos that open inside the audience's existing world, introduce one verifiable fact that does not fit, and end with a question — not a conclusion — can reach millions algorithmically. Act3.ai provides the production infrastructure. JFK Social is the destination. The window is narrowing. The puzzle provides the source material.

---

## Rules

- Never delete existing content in any dimension directory.
- Never fabricate citations — mark unverified sources `UNVERIFIED — research needed`.
- Never use the company name for the `palantir/` dimension in any public post content.
- Notes must be analytical, not conspiratorial — posts can be cryptic, notes must be grounded.
- All sourced claims must cite primary sources where possible.
- The puzzle is about institutional structure, not ethnic groups, religions, or individuals as such — always frame in terms of roles, incentives, and documented actions.
- The puzzle is not a call to violence, not blaming any ethnic or religious group, not nostalgia, not nihilism. Clarity about how things work is the precondition for changing them.

---

## Web App — What This Directory Does

This directory is the source for a TypeScript web app served at **philosophershq.com**. One repo powers both the front end and the (optional) server side. Solvers who follow The Signal off 4chan land here. The web app's primary job is to receive answers to the numbered riddles posted online and confirm whether each answer is correct.

**Goal of the web app:**

- We post numbered puzzles online (4chan, X, Nostr).
- Each puzzle has a number and a small set of questions (typically three).
- Solvers come to philosophershq.com to enter their answers.
- This one directory is the front end and the web app side of it.
- It must feel mysterious, deliberate, and slightly old-internet — not generic SaaS.

---

## The Mysterious Page — UX Spec

**Route:** `/riddle` (and `/` if no other landing page is configured).

### Layout

- Top of the page: a single short message — **"Answer the riddle..."**
- This message and the riddle-answering form occupy roughly the top two-thirds of the page. The rest of the page is intentionally empty / atmospheric.
- The form is centered and noticeably larger than a typical web form. Inputs are oversized so the page feels like a console, not a contact form.

### Form fields, top to bottom

#### 1. Riddle number
- Label above the field: "Riddle number"
- A single edit box for digits. Sized larger than a normal text input.
- Selects which puzzle from the YAML database is being answered.

#### 2. Question 1 answer
- Label: "Question one answer:"
- Rendered as a row of single-letter boxes — one box per letter.
- The puzzle YAML defines the answer's word structure. The UI shows the right number of boxes for word one, a visible gap, then word two's boxes, gap, word three's boxes, etc. **There are no boxes where a space would be — the gap itself communicates word breaks.**
- As the solver types, each keystroke fills the current box and advances the cursor to the next box. Across word gaps, focus jumps naturally to the first box of the next word.
- The box with the active cursor has a **light yellow background** to show it is the highlighted target. Other boxes have a neutral background.
- Clicking any box jumps the cursor directly to that box.
- **Backspace** deletes the current box's letter and moves the cursor to the previous box. If the current box is empty, backspace moves back and clears the previous box. Across word gaps, backspace traverses the gap correctly.
- Typing a letter into a non-empty box overwrites it and advances.
- Letters auto-uppercase for display; comparison is case-insensitive.

#### 3. Question 2 answer
Same pattern as Question 1.

#### 4. Question 3 answer
Same pattern as Question 1.

### Submit / verification

- Either a single Submit button beneath the three answer rows, or live per-answer feedback as each row is fully filled in. **Default: live per-answer feedback** so the page feels reactive, plus a final "Confirm" affordance once all three are green.
- Correct answers light up green. Incorrect answers shake briefly and reset to yellow-cursor state. Do not reveal the correct answer on a wrong attempt.
- When all three answers for a riddle are correct, reveal the puzzle's reward payload (a key phrase, a link to the next stage, or a JFK Social keyword as defined in the puzzle YAML).

---

## The Puzzle Database — YAML

The "database" is a YAML file checked into this directory. The web app reads it at build time (static) or at runtime (fetched once) — either is fine because the file is small and public. **No real database is needed.**

**Location:** `data/riddles.yaml` (created when the web app is scaffolded).

### Schema

```yaml
riddles:
  - number: 1
    title: "The Question"
    board: "/pol/"
    questions:
      - prompt: "..."                  # optional human-readable prompt
        answer_words: [5, 7]           # word lengths — drives the box layout
        answer_hash: "sha256:..."      # hashed correct answer (lowercase, no spaces)
      - prompt: "..."
        answer_words: [4]
        answer_hash: "sha256:..."
      - prompt: "..."
        answer_words: [3, 6, 4]
        answer_hash: "sha256:..."
    reward:
      type: "keyword" | "link" | "phrase"
      value: "..."
```

### Why hashed answers, not plaintext

- The YAML ships with the static site, so anything in plaintext is trivially scraped. Storing **SHA-256 hashes of normalized answers** (lowercased, spaces removed) means a curious solver who downloads the YAML still has to actually solve the riddle.
- `answer_words` (the word-length array) is plaintext on purpose — the UI needs it to render the boxes. Word lengths leak some information; that is acceptable and matches the genre.

**Build-time helper script:** `scripts/hash-answer.ts` — takes an answer string and prints its normalized SHA-256 hash so authors can paste it into the YAML.

---

## Hosting

### GitHub Pages first, Lambda only if needed

**Default target: GitHub Pages.**

- The repo already exists on GitHub. GitHub Pages serves static files directly from a branch (or from GitHub Actions output). A Vite build of this app produces exactly that — static HTML/JS/CSS — so it deploys natively.
- Custom domain `philosophershq.com` is set via a `CNAME` file in the published output and a DNS CNAME record at the registrar. HTTPS is automatic via GitHub's Let's Encrypt integration.
- **Deployment:** GitHub Actions workflow on push to `main` → build with pnpm/Vite → publish to the `gh-pages` branch (or use the official `actions/deploy-pages` flow).

### Why GitHub Pages works for this product

- All puzzle verification is **client-side via SHA-256 hash comparison**. No server is needed to confirm a solver's answer.
- The YAML is public by design — solvers are expected to inspect it eventually.
- No user accounts, no per-user state, no write path — purely read.

### If we ever need a server (optional, deferred)

- AWS Lambda behind API Gateway, deployed via AWS SAM or SST, in the existing AWS account.
- Reasonable use cases for a Lambda:
  - Anonymous solver telemetry (count of attempts, time-to-solve histograms).
  - Rate limiting brute-force attempts against the hashed answers.
  - Issuing signed tokens that unlock a "next stage" page on JFK Social.
  - Sending solver-completed events to a webhook for the contributors team.
- **Alternative serverless** that fits this static-first model even better: **Cloudflare Workers + KV**. Same pricing tier, faster cold starts, integrates cleanly with a Pages deployment if we ever migrate off GitHub Pages.

> **Decision rule:** ship on GitHub Pages with hashed-answer verification first. Add a Lambda only when a concrete feature requires server-side state.

---

## Tech Stack

**2026 Silicon Valley defaults.** Picked for: small team, fast iteration, static-first deploy, low maintenance, no premature backend, good DX, type safety end-to-end.

### Runtime / language

- **TypeScript** everywhere (strict mode).
- **Node 22 LTS** for tooling and any future Lambda handlers.
- **pnpm** as the package manager (faster, deterministic, disk-efficient).

### Front end

- **Vite 6** — build tool. Fast dev server, native ESM, trivial GitHub Pages output.
- **React 19** — UI library. Mature, well-documented, abundant solver-friendly component patterns.
- **React Router 7** (data router mode) — single-page routing. TanStack Router is a fine alternative but adds learning cost we don't need yet.
- **Tailwind CSS 4** — utility CSS. Matches the deliberately spare visual feel and keeps the bundle small.
- **shadcn/ui** — copy-in component primitives where useful (button, input). Avoid heavyweight component libraries; the riddle UI is custom.
- **Framer Motion** — small amount of motion for the wrong-answer shake and the cursor-box highlight transitions.

### State and data

- **Zustand** — tiny global store for the active riddle, current answers, and submission state. Redux is overkill.
- **js-yaml** or **yaml** — parse `data/riddles.yaml`. If we want zero runtime YAML parsing, we transform YAML → JSON at build time via a Vite plugin.
- **@noble/hashes** — SHA-256 for client-side answer verification. Pure JS, audited, tiny.

### Quality and tests

- **Vitest** — unit tests, runs on the same Vite config.
- **Playwright** — end-to-end tests covering the riddle interaction (typing, backspace, word-gap navigation, submit). Reuses the existing Playwright infrastructure pattern from the rest of the organization.
- **ESLint + Prettier** with the project's standard config.
- **TypeScript strict** + `noUncheckedIndexedAccess`.

### Build / deploy

- **GitHub Actions** — single workflow: install, lint, typecheck, test, build, publish to GitHub Pages. Fails fast on any step.
- **Renovate** or **Dependabot** for dependency updates.

### Observability (only if a server is added later)

- **CloudWatch Logs** for Lambda; structured JSON log lines.
- **Sentry** (free tier) for client-side error tracking — useful for catching riddle-input edge cases on unusual keyboards.

### Out of scope for v1

- User accounts. No login. The puzzle is anonymous.
- Server-side answer storage. Hashes in the static YAML are sufficient.
- CMS. The YAML is the CMS.
- SSR / Next.js. Static SPA is the right shape; SSR adds nothing here.

---

## Web App Directory Layout

Created when the app is scaffolded:

```
PhilosophersHQ/
  README.md                  ← this file
  CLAUDE.md                  ← AI agent operating instructions
  package.json
  pnpm-lock.yaml
  tsconfig.json
  vite.config.ts
  index.html
  public/
    CNAME                    ← philosophershq.com
  src/
    main.tsx
    App.tsx
    routes/
      riddle.tsx             ← the mysterious page
      index.tsx              ← landing (optional; may redirect to /riddle)
    components/
      AnswerBoxes.tsx        ← per-letter boxes with word gaps
      RiddleNumberInput.tsx
      RewardReveal.tsx
    lib/
      hash.ts                ← SHA-256 + answer normalization
      yaml.ts                ← typed loader for riddles.yaml
      store.ts               ← Zustand store
    styles/
      globals.css            ← Tailwind entry
  data/
    riddles.yaml             ← the puzzle "database"
  scripts/
    hash-answer.ts           ← author tool: text → sha256 hash
  tests/
    unit/                    ← Vitest
    e2e/                     ← Playwright
  .github/
    workflows/
      deploy.yml             ← build + publish to GitHub Pages
```

---

## Web App Rules

- **Hashed answers only** — never commit a plaintext answer to the repo.
- **Word-length arrays are public on purpose** — they drive the UI box layout.
- **No analytics that require a backend** until a Lambda is justified by a real feature, not by curiosity.
- **Keep the visual feel sparse and console-like.** Resist the urge to add headers, navbars, or footers to the riddle page.
- **All riddle UX is keyboard-first** (typing, backspace, click-to-focus, yellow highlight, word gaps). The page must be fully usable without a mouse.
- **Accessibility:** the per-letter boxes must announce position and word context to screen readers (`aria-label="letter 3 of 5, word 2 of 3"`). Mysterious does not mean inaccessible.

---

## Source Directory

The working source for all Signal content lives at `~/BGit/act3/ck_marketing/4chan`. PhilosophersHQ publishes from it. Never edit published content here without making the corresponding change in the source directory first.


