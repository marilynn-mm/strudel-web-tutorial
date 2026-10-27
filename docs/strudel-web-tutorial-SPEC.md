# Strudel Web Tutorial — Build Spec

Web (strudel.cc-based) tutorial for the StrudelVR user study. It is the **comparison condition** to the Apple Vision Pro tutorial, and it also introduces participants to live coding as a practice.

Runs **locally in the lab only**. No hosting, no accounts, no backend.

---

## 0. Project setup

### 0.1 Create the repository

Either on github.com:

1. Click **New repository**.
2. Name: `strudel-web-tutorial`. Visibility: **Private** (study material). Tick **Add a README**.
3. Click **Create repository**.

Or with the GitHub CLI:

```bash
gh repo create strudel-web-tutorial --private --clone --add-readme
```

### 0.2 Clone and add reference files

```bash
git clone https://github.com/<your-username>/strudel-web-tutorial.git
cd strudel-web-tutorial
mkdir docs
# copy into the repo:
#   SPEC.md                               -> repo root
#   tutorial-embodied-overview.md         -> docs/
#   tutorial-s5-instructions.md           -> docs/   (sampler pieces)
#   tutorial-s5-loadout.md                -> docs/
git add .
git commit -m "Add build spec and VR tutorial reference docs"
git push
```

### 0.3 Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000 in Chrome
```

A local server is required: ES modules and audio loading do not work from `file://`.

### 0.4 Working rhythm

- Build Phase 1 first (§6). Commit when it runs.
- Review each block by ear. Edit content in `content.js` only.
- Commit after every working change.

---

## 1. Goal and constraints

**Goal.** One long scrolling page. Each tutorial concept is a block: heading, alternating explanation and instruction text, then a live Strudel editor preloaded with that block's starting code, and a Reset button.

**Constraints (hard):**

- **No build step, no framework.** Plain HTML + ES module JS. Must run from `python3 -m http.server`.
- **Ugly is fine.** Default browser styling plus the minimum CSS for readability. Do not design.
- **Pinned Strudel version.** Load `@strudel/repl` from unpkg with an exact version number (check the latest published version and pin it; do not use `@latest`).
- **Use `<strudel-editor>` (package `@strudel/repl`), not `<strudel-repl>` (package `@strudel/embed`).** The embed version is an iframe; the page must be able to read and set editor code.
- **Content lives in data, not markup.** All tutorial text and code is in `content.js`, so the page can be edited without touching rendering code.

---

## 2. File structure

```
strudel-web-tutorial/
├── index.html      # page shell + script tags
├── content.js      # all segments, blocks, text, starting code
├── main.js         # renders content.js into the page
├── style.css       # minimal
├── SPEC.md
└── docs/           # VR reference docs (read-only context)
```

---

## 3. Strudel embed — technical notes

From the Strudel technical manual and `@strudel/repl` README:

```html
<script src="https://unpkg.com/@strudel/repl@<PINNED_VERSION>"></script>
```

Creating an editor from JS:

```js
const el = document.createElement('strudel-editor');
el.setAttribute('code', startingCode);
container.append(el);
// el.editor is the StrudelMirror instance that runs the REPL
```

**Verify against the pinned package source before relying on them** (method names may differ by version):

- How to set code on an existing editor (likely `el.editor.setCode(code)`). Needed for Reset.
- How to stop playback (likely `el.editor.stop()`). Needed for the optional stop-others feature.

If `setCode` is not available, Reset may instead remove the element and create a fresh one with the starting code.

Each block's starting code includes its own `samples('github:tidalcycles/dirt-samples')` line so every block runs standalone.

---

## 4. Page layout

Top of page:

- Title: "Strudel tutorial"
- How-to list: click into a block; **Ctrl+Enter** runs, **Ctrl+.** stops; stop one block before running the next; Reset restores the starting code.

Then, for each segment in order:

- `<h2>` segment title.
- For each block:
  - `<h3>` block title. If `optional: true`, append the label "Optional · web only".
  - The `text` items in order. Two visual styles:
    - `explain` — plain paragraph.
    - `try` — visibly distinct (e.g. bold "Try:" prefix or a left-indented box). If the item has a `code` field, show it in `<code>` after the text, as the exact target to type.
  - The Strudel editor with `start` code.
  - A Reset button that restores `start`.

Samplers and Open play blocks have no `try` items.

**Not shown on the page:** `end` code (kept in data for testing only), VR mapping labels.

---

## 5. Content data format (`content.js`)

```js
export const SEGMENTS = [
  {
    id: 'c1',
    title: 'C1 · First sounds',
    vr: 'S1 + S2 percussion',        // reference only, not rendered
    blocks: [
      {
        id: '1.1',
        title: 'The cycle',
        optional: false,
        source: 'Workshop: First Sounds → Sequences',  // reference only
        text: [
          { type: 'explain', body: '[DRAFT] ...' },
          { type: 'try', body: 'Add a second bd inside the quotes.', code: '$: s("bd bd")' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')\n\n$: s("bd")`,
        end: null,   // null = free, next block resets
      },
    ],
  },
];
```

**Text placeholders.** Marilyn writes the final explanation text. Fill every `explain` body with the key point from §7, prefixed `[DRAFT]`. Fill `try` bodies from §7 as written, also prefixed `[DRAFT]`. Do not write long prose.

---

## 6. Build phases

### Phase 1 — required

1. `index.html`, `main.js`, `style.css`, `content.js` per §2–§5.
2. All 17 blocks from §7 with their starting code.
3. Reset per block.
4. Test: page loads in Chrome via the local server; every block's `start` code runs without console errors; every non-null `end` code runs without console errors (temporarily paste it in, or use a hidden debug toggle).

### Phase 2 — only if needed after a lab test

- **Stop others:** when a block starts playing, stop all other blocks. Only if the API supports it cleanly.
- **Lazy load:** if 17 editors make the page slow, replace each editor with a "Load editor" button that creates it on click.

### Phase 3 — optional, decided later

- **Logging:** participant ID from URL (`?pid=P07`); on each Ctrl+Enter inside a block, record `{timestamp, pid, blockId, code}`; keep in memory + localStorage; a "Download log" button at page bottom saves JSON. No network calls.

---

## 7. Tutorial content

Order: drums → synths → transforming patterns → effects. Explanation style condensed from the Strudel workshop (strudel.cc/workshop); sounds and pieces match the VR tutorial. Blocks marked *(web extra)* are `optional: true`.

All code uses `s()` (not `sound()`), `n()` + `.scale()` for pitch (never `note()`), and one instrument per `$:` line.

### C1 · First sounds (drums) — VR: S1 + S2 percussion

**1.1 The cycle** — source: First Sounds → Code Fields, Sequences

- explain: The cycle is a loop you divide, not a timeline. One sound fills it. `$:` = one pattern.
- try: `$: s("bd bd")`, then 4 steps, then 8 — faster, but the loop length is the same.
- explain: Longer sequence = faster.
- try: Replace some `bd` with `~` — hear gaps.
- explain: Silence is a step too.

```js
samples('github:tidalcycles/dirt-samples')

$: s("bd")
```
end: null

**1.2 Drum layers** — source: First Sounds → Drum Sounds; First Notes → Playing multiple patterns

- explain: Drum names: bd, sd, cp, hh, ho, rs, ht, cr. One drum per line.
- try: Add `$: s("~ cp ~ cp")`.
- try: Add `$: s("~ hh ~ hh ~ hh ~ hh")`.
- explain: `.gain()` sets volume.
- try: `.gain(0.3)` on the hats.

```js
samples('github:tidalcycles/dirt-samples')

$: s("bd bd bd bd")
```
end: null

**1.3 Inside a step** — source: First Sounds → Sub-sequences, Sub-sub-sequences

- explain: `[ ]` turns one step into its own small cycle.
- try: `bd ~ bd ~`, then `bd ~ [~ bd] ~`.
- try: Nest deeper, e.g. `[bd [bd bd]]`.

```js
samples('github:tidalcycles/dirt-samples')

$: s("bd bd bd bd")
```
end: `$: s("bd ~ [~ bd] ~")`

**1.4 Variation** *(web extra)* — source: First Sounds → `< >`, Multiplication, Parallel

- explain: `< >` picks one option per cycle. Run it and listen for the swap.
- explain: `*` repeats a step faster; a comma plays two patterns at once.
- try: `s("bd hh*2 bd hh*3")`, then `s("bd*2, hh*3")`.

```js
samples('github:tidalcycles/dirt-samples')

$: s("bd <sd cp> bd bd")
```
end: null

### C2 · First notes (synths) — VR: S1 + S2 synth, builds Fanfare

**2.1 Pitch as steps** — source: First Notes → Changing the sound, Scales

- explain: Drums choose which sound; synths choose which pitch. `n` numbers are steps of a scale, so any number fits.
- try: Change `0` → `2` → `4`.
- try: Change the waveform: `triangle` → `square` → `sawtooth` → `sine` → `arpy` — same note, different color.

```js
samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("0").scale("G4:major").s("triangle")
```
end: null

**2.2 Melody shape** — source: First Notes → Elongating with `@`

- try: Four steps, first one split: `n("[0 0] 0 0 0")`.
- try: Set the numbers: `n("[0 0] 1 2 2")`.
- explain: `@` stretches a note across steps.
- try: `n("[0 0] 1 2@2")` — the last note is held.

```js
samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("0").scale("G4:major").s("triangle")
```
end:
```js
$: s("bd ~ [~ bd] ~")
$: n("[0 0] 1 2@2").scale("G4:major").s("triangle")
```

**2.3 Harmony** — source: First Notes → Scales; chords are new text

- explain: A comma inside brackets plays notes together.
- try: `n("[0 0] 1 [2,4]@2")`.
- try: Add `.scaleTranspose(1)` — the whole tune moves up one step.

```js
samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("[0 0] 1 2@2").scale("G4:major").s("triangle")
```
end (Fanfare, = VR S2 end state):
```js
$: s("bd ~ [~ bd] ~")
$: n("[0 0] 1 [2,4]@2").scale("G4:major").s("triangle").scaleTranspose(1)
```

**2.4 Changing over time** *(web extra)* — source: First Notes → One item per cycle, Automating scales

- try: Run it — one note per cycle.
- try: `.scale("<C4:major A3:minor>")`.

```js
samples('github:tidalcycles/dirt-samples')

$: n("<0 2 4>").scale("C4:major").s("triangle")
```
end: null

### C3 · Transforming patterns — VR: S3

**3.1 Speed, reverse, mute** — source: First Effects → Fast and slow; Pattern Effects → `rev`

- explain: So far you changed the pattern itself. Now leave it alone and wrap it in a function.
- try: `.slow(2)` on kick and clap; `.fast(2)` on hats.
- explain: `.rev()` plays a pattern backwards.
- try: `.rev()` on the rim pickup, then the melody — the answer comes first.
- try: Mute the pad with `_$:`, then unmute.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.5)

$: s("bd ~ bd ~")                                            // kick
$: s("~ cp ~ cp").gain(0.6)                                   // clap
$: s("hh hh [hh hh] hh").gain(0.25)                           // hats
$: s("~ ~ ~ [rs rs rs]").gain(0.5)                            // rim pickup
$: n("0 ~ ~ [~ 3 5]").scale("C2:minor").s("square").gain(0.4) // bass
$: n("0 2 4 7 9 11 14 16").scale("C4:minor").s("arpy")
    .gain(0.3)                                                // rising arp
$: n("[0 2] 4 [5 4] ~  [7 ~ 5] 4 [2 0] ~").scale("C5:minor")
    .s("triangle").slow(2).gain(0.3)                          // melody
$: n("[0,2,4]@2 [-2,0,2]@2").scale("C3:minor").s("sawtooth")
    .slow(2).gain(0.18)                                       // pad
```
end:
```js
samples('github:tidalcycles/dirt-samples')
setcps(0.5)

$: s("bd ~ bd ~").slow(2)
$: s("~ cp ~ cp").slow(2).gain(0.6)
$: s("hh hh [hh hh] hh").fast(2).gain(0.25)
$: s("~ ~ ~ [rs rs rs]").rev().gain(0.5)
$: n("0 ~ ~ [~ 3 5]").scale("C2:minor").s("square").gain(0.4)
$: n("0 2 4 7 9 11 14 16").scale("C4:minor").s("arpy")
    .gain(0.3)
$: n("[0 2] 4 [5 4] ~  [7 ~ 5] 4 [2 0] ~").scale("C5:minor")
    .s("triangle").slow(2).rev().gain(0.3)
$: n("[0,2,4]@2 [-2,0,2]@2").scale("C3:minor").s("sawtooth")
    .slow(2).gain(0.18)
```
Note: the VR S3 piece has `lpf` on the bass and `attack/release/lpf` on the pad. They are removed here because effects are not taught yet (see §8, decision 1).

**3.2 More transformations** *(web extra)* — source: Pattern Effects → `jux`, `ply`

- try: Add `.jux(rev)`.
- try: Add `.ply(2)`.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.5)

$: n("[0 2] 4 [5 4] ~  [7 ~ 5] 4 [2 0] ~").scale("C5:minor")
    .s("triangle").slow(2).gain(0.3)
```
end: null

### C4 · Effects — VR: S4

**4.1 Filter** — source: First Effects → Low-pass filter

- explain: Effects change the sound, not time or pitch. The low-pass filter cuts highs: a low value sounds muffled.
- try: Change `lp` from `300` to `8000` and re-run — the chords emerge.
- explain: One value can feed many patterns.
- try: Add `.lpf(lp).lpq(8)` to every line. Close it (`300`), then open it (`8000`).

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.53)
const lp = 300

$: s("bd bd bd bd")                                           // kick
$: s("~ cp ~ cp").gain(0.6)                                   // clap
$: s("[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh hh hh]")
    .gain(0.25)                                               // hats
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.35)                // open hat
$: n("[~ 0] [~ 0] [~ 3] [~ 5]").scale("A1:minor")
    .s("sawtooth").gain(0.4)                                  // bass
$: n("[~ [0,2,4,6]] [~ [0,2,4,6]] [~ [0,2,4,6]] [~ [-1,1,3,5]]")
    .scale("A3:minor").s("sawtooth")
    .lpf(lp).lpq(8).gain(0.25)                                // chords
$: n("[0 2 4 7] [9 7 4 2] [0 2 4 7] [11 9 7 4]")
    .scale("A4:minor").s("square").gain(0.2)                  // arp
```
end: every line has `.lpf(lp).lpq(8)`, `lp = 8000`.

**4.2 Build & drop** — source: new text (HPF is not in the workshop)

- explain: The high-pass filter cuts lows. Pushing it up builds tension; pulling it down is the drop.
- try: Add `.hpf(hp)` to kick and bass; raise `hp` to `2000`.
- try: Bring `hp` back to `20`.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.53)
const lp = 8000, q = 8
const hp = 20

$: s("bd bd bd bd").lpf(lp).lpq(q)
$: s("~ cp ~ cp").lpf(lp).lpq(q).gain(0.6)
$: s("[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh hh hh]")
    .lpf(lp).lpq(q).gain(0.25)
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").lpf(lp).lpq(q).gain(0.35)
$: n("[~ 0] [~ 0] [~ 3] [~ 5]").scale("A1:minor")
    .s("sawtooth").lpf(lp).lpq(q).gain(0.4)
$: n("[~ [0,2,4,6]] [~ [0,2,4,6]] [~ [0,2,4,6]] [~ [-1,1,3,5]]")
    .scale("A3:minor").s("sawtooth").lpf(lp).lpq(q).gain(0.25)
$: n("[0 2 4 7] [9 7 4 2] [0 2 4 7] [11 9 7 4]")
    .scale("A4:minor").s("square").lpf(lp).lpq(q).gain(0.2)
```
end: kick and bass have `.hpf(hp)`, `hp = 20`.

**4.3 Shape & space** — source: First Effects → ADSR, Delay, Room

- explain: ADSR sets how each note's volume rises and fades.
- try: Add `.attack(0.01).decay(0.2).sustain(0.3).release(0.8)` to the chords.
- explain: Room and delay add space to everything.
- try: Add the `all(...)` line at the bottom; raise `room`, then `delay`.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.53)
const lp = 8000, q = 8
const hp = 20

$: s("bd bd bd bd").lpf(lp).lpq(q).hpf(hp)
$: s("~ cp ~ cp").lpf(lp).lpq(q).gain(0.6)
$: s("[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh hh hh]")
    .lpf(lp).lpq(q).gain(0.25)
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").lpf(lp).lpq(q).gain(0.35)
$: n("[~ 0] [~ 0] [~ 3] [~ 5]").scale("A1:minor")
    .s("sawtooth").lpf(lp).lpq(q).hpf(hp).gain(0.4)
$: n("[~ [0,2,4,6]] [~ [0,2,4,6]] [~ [0,2,4,6]] [~ [-1,1,3,5]]")
    .scale("A3:minor").s("sawtooth").lpf(lp).lpq(q).gain(0.25)
$: n("[0 2 4 7] [9 7 4 2] [0 2 4 7] [11 9 7 4]")
    .scale("A4:minor").s("square").lpf(lp).lpq(q).gain(0.2)
```
end (= VR S4 end state):
```js
samples('github:tidalcycles/dirt-samples')
setcps(0.53)
const lp = 8000, q = 8
const hp = 20
const room = 0.5, delay = 0.4

$: s("bd bd bd bd").lpf(lp).lpq(q).hpf(hp)
$: s("~ cp ~ cp").lpf(lp).lpq(q).gain(0.6)
$: s("[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh hh hh]")
    .lpf(lp).lpq(q).gain(0.25)
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").lpf(lp).lpq(q).gain(0.35)
$: n("[~ 0] [~ 0] [~ 3] [~ 5]").scale("A1:minor")
    .s("sawtooth").lpf(lp).lpq(q).hpf(hp).gain(0.4)
$: n("[~ [0,2,4,6]] [~ [0,2,4,6]] [~ [0,2,4,6]] [~ [-1,1,3,5]]")
    .scale("A3:minor").s("sawtooth").lpf(lp).lpq(q)
    .attack(0.01).decay(0.2).sustain(0.3).release(0.8)
    .gain(0.25)
$: n("[0 2 4 7] [9 7 4 2] [0 2 4 7] [11 9 7 4]")
    .scale("A4:minor").s("square").lpf(lp).lpq(q).gain(0.2)

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.55))
```
**Check:** confirm `all(...)` exists in the pinned Strudel version. If not, append the room/delay chain to each line instead and update the `try` text.

**4.4 Patterning the rules** *(web extra)* — source: First Effects → Pattern the filter, Signals, Range

- explain: Effect values can be patterns too.
- try: Run it — the filter changes every cycle.
- try: Swap in `.lpf(sine.range(300, 3000).slow(4))` — a slow sweep.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.53)

$: n("[~ [0,2,4,6]] [~ [0,2,4,6]] [~ [0,2,4,6]] [~ [-1,1,3,5]]")
    .scale("A3:minor").s("sawtooth")
    .lpf("<300 800 2000>").lpq(8).gain(0.25)
```
end: null

### Samplers — VR: S5

**S.1 Bright House** and **S.2 Minimal Techno**

- explain: Nothing new. Play with everything so far.
- No `try` items.
- start: copy the two pieces from `docs/tutorial-s5-instructions.md`. Ask Marilyn if the file is missing.

### Open play — VR: free play

**O.1 Open play**

- explain: An empty editor. (The study task runs here.)

```js
samples('github:tidalcycles/dirt-samples')

```

**Total: 17 blocks** — C1: 4, C2: 4, C3: 2, C4: 4, Samplers: 2, Open play: 1. Four are optional web extras: 1.4, 2.4, 3.2, 4.4.

---

## 8. Open decisions (do not block the build)

1. **S3 piece effects.** Removed here; decide whether to remove them in VR too, for parity.
2. **Filter sweeps.** `const` values mean re-running after each change. Strudel's inline `slider()` would allow dragging; not used in Phase 1.
3. **Web extras placement.** Inline as optional blocks (current), or grouped at the end.
4. **Fan-out weight in 4.1.** About 6 edits. Option: start with the LPF already on 3 lines (as in the VR spec).
5. **Answer key.** `end` code is not shown to participants. VR has no answer key either.

---

## 9. Acceptance checklist

- [ ] Runs from `python3 -m http.server`, no build step.
- [ ] Strudel version pinned to an exact number.
- [ ] All blocks from §7 render in order with explain/try styled differently.
- [ ] Optional blocks are labelled "Optional · web only".
- [ ] Every `start` runs without console errors.
- [ ] Every non-null `end` runs without console errors.
- [ ] Reset restores `start` in each block.
- [ ] Page loads in acceptable time with all editors (if not, do Phase 2 lazy load).
- [ ] All content is in `content.js`; `main.js` has no tutorial text.
