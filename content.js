// All tutorial content lives here. main.js renders this into the page.
// Every text body is a [DRAFT] placeholder — Marilyn writes the final text.
// `end` is reference-only; not shown on the page. `vr` and `source` are notes.

export const SEGMENTS = [
  {
    id: 'c1',
    title: 'C1 · First sounds',
    vr: 'S1 + S2 percussion',
    blocks: [
      {
        id: '1.1',
        title: 'The cycle',
        optional: false,
        source: 'Workshop: First Sounds → Code Fields, Sequences',
        text: [
          { type: 'explain', body: '[DRAFT] The cycle is a loop you divide, not a timeline. One sound fills it. `$:` = one pattern.' },
          { type: 'try', body: '[DRAFT] Try this, then 4 steps, then 8 — faster, but the loop length is the same.', code: '$: s("bd bd")' },
          { type: 'explain', body: '[DRAFT] Longer sequence = faster.' },
          { type: 'try', body: '[DRAFT] Replace some `bd` with `~` — hear gaps.' },
          { type: 'explain', body: '[DRAFT] Silence is a step too.' },
          { type: 'try', body: '[DRAFT] Divide the cycle into 3, then 5, then 8 steps, starting with `bd`.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: s("bd")`,
        end: null,
      },
      {
        id: '1.2',
        title: 'Drum layers',
        optional: false,
        source: 'Workshop: First Sounds → Drum Sounds; First Notes → Playing multiple patterns',
        text: [
          { type: 'explain', body: '[DRAFT] Drum names: bd, sd, cp, hh, ho, rs, ht, cr. One drum per line.' },
          { type: 'try', body: '[DRAFT] Add a clap line.', code: '$: s("~ cp ~ cp")' },
          { type: 'try', body: '[DRAFT] Add a hat line.', code: '$: s("~ hh ~ hh ~ hh ~ hh")' },
          { type: 'explain', body: '[DRAFT] `.gain()` sets volume.' },
          { type: 'try', body: '[DRAFT] Add `.gain(0.3)` on the hats.' },
          { type: 'try', body: '[DRAFT] Delete one line.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: s("bd bd bd bd")`,
        end: null,
      },
      {
        id: '1.3',
        title: 'Inside a step',
        optional: false,
        source: 'Workshop: First Sounds → Sub-sequences, Sub-sub-sequences',
        text: [
          { type: 'explain', body: '[DRAFT] `[ ]` turns one step into its own small cycle.' },
          { type: 'try', body: '[DRAFT] Try `bd ~ bd ~`, then `bd ~ [~ bd] ~`.' },
          { type: 'try', body: '[DRAFT] Nest deeper.', code: '[bd [bd bd]]' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: s("bd bd bd bd")`,
        end: `samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")`,
      },
      {
        id: '1.4',
        title: 'Variation',
        optional: true,
        source: 'Workshop: First Sounds → `< >`, Multiplication, Parallel',
        text: [
          { type: 'explain', body: '[DRAFT] `< >` picks one option per cycle.' },
          { type: 'try', body: '[DRAFT] Run it; count cycles.' },
          { type: 'explain', body: '[DRAFT] `*` repeats a step faster; a comma plays two patterns at once.' },
          { type: 'try', body: '[DRAFT] Try these.', code: 's("bd hh*2 bd hh*3"), then s("bd*2, hh*3")' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: s("bd <sd cp> bd bd")`,
        end: null,
      },
    ],
  },

  {
    id: 'c2',
    title: 'C2 · First notes',
    vr: 'S1 + S2 synth, builds Fanfare',
    blocks: [
      {
        id: '2.1',
        title: 'Pitch as steps',
        optional: false,
        source: 'Workshop: First Notes → Changing the sound, Scales',
        text: [
          { type: 'explain', body: '[DRAFT] Drums choose which sound; synths choose which pitch. `n` numbers are steps of a scale, so any number fits.' },
          { type: 'try', body: '[DRAFT] Change `0` → `2` → `4`.' },
          { type: 'try', body: '[DRAFT] Change the waveform: `triangle` → `square` → `sawtooth` → `sine` → `arpy` — same note, different color.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("0").scale("G4:major").s("triangle")`,
        end: null,
      },
      {
        id: '2.2',
        title: 'Melody shape',
        optional: false,
        source: 'Workshop: First Notes → Elongating with `@`',
        text: [
          { type: 'try', body: '[DRAFT] Four steps.', code: 'n("0 0 0 0")' },
          { type: 'try', body: '[DRAFT] Split the first.', code: 'n("[0 0] 0 0 0")' },
          { type: 'try', body: '[DRAFT] Set the numbers.', code: 'n("[0 0] 1 2 2")' },
          { type: 'explain', body: '[DRAFT] `@` stretches a note across steps.' },
          { type: 'try', body: '[DRAFT] The last note is held.', code: 'n("[0 0] 1 2@2")' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("0").scale("G4:major").s("triangle")`,
        end: `samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("[0 0] 1 2@2").scale("G4:major").s("triangle")`,
      },
      {
        id: '2.3',
        title: 'Harmony',
        optional: false,
        source: 'Workshop: First Notes → Scales; chords (new text)',
        text: [
          { type: 'explain', body: '[DRAFT] A comma inside brackets plays notes together.' },
          { type: 'try', body: '[DRAFT] Try a chord.', code: 'n("[0 0] 1 [2,4]@2")' },
          { type: 'try', body: '[DRAFT] Change the scale from `G4:major` to `C4:major`.' },
          { type: 'try', body: '[DRAFT] Add `.scaleTranspose(1)` — the whole tune moves up one step.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("[0 0] 1 2@2").scale("G4:major").s("triangle")`,
        end: `samples('github:tidalcycles/dirt-samples')

$: s("bd ~ [~ bd] ~")
$: n("[0 0] 1 [2,4]@2").scale("C4:major").s("triangle").scaleTranspose(1)`,
      },
      {
        id: '2.4',
        title: 'Changing over time',
        optional: true,
        source: 'Workshop: First Notes → One item per cycle, Automating scales',
        text: [
          { type: 'try', body: '[DRAFT] Run it — one note per cycle.' },
          { type: 'try', body: '[DRAFT] Alternate scales.', code: '.scale("<C4:major A3:minor>")' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

$: n("<0 2 4>").scale("C4:major").s("triangle")`,
        end: null,
      },
    ],
  },

  {
    id: 'c3',
    title: 'C3 · Transforming patterns',
    vr: 'S3',
    blocks: [
      {
        id: '3.1',
        title: 'Speed, reverse, mute',
        optional: false,
        source: 'Workshop: First Effects → Fast and slow; Pattern Effects → `rev`',
        text: [
          { type: 'explain', body: '[DRAFT] So far you changed the pattern itself. Now leave it alone and wrap it in a function.' },
          { type: 'try', body: '[DRAFT] Add `.slow(2)` on kick and clap; `.fast(2)` on hats.' },
          { type: 'explain', body: '[DRAFT] `.rev()` plays a pattern backwards.' },
          { type: 'try', body: '[DRAFT] Add `.rev()` on the rim pickup, then the melody — the answer comes first.' },
          { type: 'try', body: '[DRAFT] Add `.slow(1.5)` on the arp — listen to it drift.' },
          { type: 'try', body: '[DRAFT] Mute the pad with `_$:`, then unmute.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
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
    .slow(2).gain(0.18)                                       // pad`,
        end: `samples('github:tidalcycles/dirt-samples')
setcps(0.5)

$: s("bd ~ bd ~").slow(2)
$: s("~ cp ~ cp").slow(2).gain(0.6)
$: s("hh hh [hh hh] hh").fast(2).gain(0.25)
$: s("~ ~ ~ [rs rs rs]").rev().gain(0.5)
$: n("0 ~ ~ [~ 3 5]").scale("C2:minor").s("square").gain(0.4)
$: n("0 2 4 7 9 11 14 16").scale("C4:minor").s("arpy")
    .slow(1.5).gain(0.3)
$: n("[0 2] 4 [5 4] ~  [7 ~ 5] 4 [2 0] ~").scale("C5:minor")
    .s("triangle").slow(2).rev().gain(0.3)
$: n("[0,2,4]@2 [-2,0,2]@2").scale("C3:minor").s("sawtooth")
    .slow(2).gain(0.18)`,
      },
      {
        id: '3.2',
        title: 'More transformations',
        optional: true,
        source: 'Workshop: Pattern Effects → `jux`, `ply`',
        text: [
          { type: 'try', body: '[DRAFT] Add this.', code: '.jux(rev)' },
          { type: 'try', body: '[DRAFT] Add this.', code: '.ply(2)' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
setcps(0.5)

$: n("[0 2] 4 [5 4] ~  [7 ~ 5] 4 [2 0] ~").scale("C5:minor")
    .s("triangle").slow(2).gain(0.3)`,
        end: null,
      },
    ],
  },

  {
    id: 'c4',
    title: 'C4 · Effects',
    vr: 'S4',
    blocks: [
      {
        id: '4.1',
        title: 'Filter',
        optional: false,
        source: 'Workshop: First Effects → Low-pass filter',
        text: [
          { type: 'explain', body: '[DRAFT] Effects change the sound, not time or pitch. The low-pass filter cuts highs: a low value sounds muffled.' },
          { type: 'try', body: '[DRAFT] Change `lp` from `300` to `8000` and re-run — the chords emerge.' },
          { type: 'explain', body: '[DRAFT] One value can feed many patterns.' },
          { type: 'try', body: '[DRAFT] Add `.lpf(lp).lpq(8)` to every line. Close it (`300`), then open it (`8000`).' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
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
    .scale("A4:minor").s("square").gain(0.2)                  // arp`,
        end: `samples('github:tidalcycles/dirt-samples')
setcps(0.53)
const lp = 8000

$: s("bd bd bd bd").lpf(lp).lpq(8)
$: s("~ cp ~ cp").lpf(lp).lpq(8).gain(0.6)
$: s("[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh hh hh]")
    .lpf(lp).lpq(8).gain(0.25)
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").lpf(lp).lpq(8).gain(0.35)
$: n("[~ 0] [~ 0] [~ 3] [~ 5]").scale("A1:minor")
    .s("sawtooth").lpf(lp).lpq(8).gain(0.4)
$: n("[~ [0,2,4,6]] [~ [0,2,4,6]] [~ [0,2,4,6]] [~ [-1,1,3,5]]")
    .scale("A3:minor").s("sawtooth")
    .lpf(lp).lpq(8).gain(0.25)
$: n("[0 2 4 7] [9 7 4 2] [0 2 4 7] [11 9 7 4]")
    .scale("A4:minor").s("square").lpf(lp).lpq(8).gain(0.2)`,
      },
      {
        id: '4.2',
        title: 'Build & drop',
        optional: false,
        source: 'new text (HPF is not in the workshop)',
        text: [
          { type: 'explain', body: '[DRAFT] The high-pass filter cuts lows. Pushing it up builds tension; pulling it down is the drop.' },
          { type: 'try', body: '[DRAFT] Add `.hpf(hp)` to kick and bass; raise `hp` to `2000`.' },
          { type: 'try', body: '[DRAFT] Bring `hp` back to `20`.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
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
    .scale("A4:minor").s("square").lpf(lp).lpq(q).gain(0.2)`,
        end: `samples('github:tidalcycles/dirt-samples')
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
    .scale("A4:minor").s("square").lpf(lp).lpq(q).gain(0.2)`,
      },
      {
        id: '4.3',
        title: 'Shape & space',
        optional: false,
        source: 'Workshop: First Effects → ADSR, Delay, Room',
        text: [
          { type: 'explain', body: '[DRAFT] ADSR sets how each note’s volume rises and fades.' },
          { type: 'try', body: '[DRAFT] Add `.attack(0.01).decay(0.2).sustain(0.3).release(0.8)` to the chords; lengthen the release.' },
          { type: 'explain', body: '[DRAFT] Room and delay add space to everything.' },
          { type: 'try', body: '[DRAFT] Add the `all(...)` line at the bottom; raise `room`, then `delay`.' },
          { type: 'try', body: '[DRAFT] Raise `setcps` to `0.6`.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
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
    .scale("A4:minor").s("square").lpf(lp).lpq(q).gain(0.2)`,
        end: `samples('github:tidalcycles/dirt-samples')
setcps(0.6)
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

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.55))`,
        note: 'Confirm all(...) exists in Strudel 1.3.0. If not, append the room/delay chain to each line instead.',
      },
      {
        id: '4.4',
        title: 'Patterning the rules',
        optional: true,
        source: 'Workshop: First Effects → Pattern the filter, Signals, Range',
        text: [
          { type: 'explain', body: '[DRAFT] Effect values can be patterns too.' },
          { type: 'try', body: '[DRAFT] Run it — the filter changes every cycle.' },
          { type: 'try', body: '[DRAFT] Swap in a slow sweep.', code: '.lpf(sine.range(300, 3000).slow(4))' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
setcps(0.53)

$: n("[~ [0,2,4,6]] [~ [0,2,4,6]] [~ [0,2,4,6]] [~ [-1,1,3,5]]")
    .scale("A3:minor").s("sawtooth")
    .lpf("<300 800 2000>").lpq(8).gain(0.25)`,
        end: null,
      },
    ],
  },

  {
    id: 'samplers',
    title: 'Samplers',
    vr: 'S5',
    blocks: [
      {
        id: 'S.1',
        title: 'Bright House',
        optional: false,
        source: 'docs/tutorial-s5-instructions.md — Piece A, Step 1 (Listen) loadout',
        text: [
          { type: 'explain', body: '[DRAFT] Nothing new. Play with everything so far.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
setcps(0.52)
const room = 0, delay = 0

$: s("bd bd bd bd")
$: s("~ cp ~ cp").gain(0.7)
$: s("~ ho ~ ho ~ ho ~ ho").gain(0.45)
$: s("hh hh hh hh hh hh hh hh").gain(0.2)
$: n("[~ 0] [~ 0] [~ 3] [~ 4]").scale("C2:major").s("square").lpf(800).gain(0.45)
$: n("[~ [0,2,4,6]] ~ [~ [3,5,7,9]] ~").scale("C4:major").s("sawtooth")
    .decay(0.15).sustain(0).lpf(1500).gain(0.3)
$: n("[0 2] [4 ~] [~ 6] [4 2]").scale("C5:major").s("arpy").gain(0.35)

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))`,
        end: null,
      },
      {
        id: 'S.2',
        title: 'Minimal Techno',
        optional: false,
        source: 'docs/tutorial-s5-instructions.md — Piece B, Step 1 (Listen) loadout',
        text: [
          { type: 'explain', body: '[DRAFT] Nothing new. Play with everything so far.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')
setcps(0.54)
const room = 0, delay = 0

$: s("bd bd bd bd")
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.4)
$: s("[~ ~ ~ rs] ~ [~ ~ rs ~] ~").gain(0.6)
$: s("~ ~ [~ ~ ~ ht] ~").gain(0.5)
$: n("[~ 0 0 0] [~ 0 0 0] [~ 0 0 0] [~ 0 0 0]").scale("A1:minor").s("square")
    .lpf(500).lpq(0).decay(0.1).sustain(0).gain(0.5)
$: n("~ [~ [0,2,4]] ~ ~").scale("A3:minor").s("sawtooth")
    .decay(0.2).sustain(0).lpf(1200).gain(0.3)
$: n("[0 ~ 0 3] [~ 0 ~ ~] [0 ~ 4 ~] [~ 3 ~ ~]").scale("A4:minor").s("triangle")
    .lpf(1200).gain(0.35)

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))`,
        end: null,
      },
    ],
  },

  {
    id: 'open',
    title: 'Open play',
    vr: 'free play',
    blocks: [
      {
        id: 'O.1',
        title: 'Open play',
        optional: false,
        source: 'free',
        text: [
          { type: 'explain', body: '[DRAFT] An empty editor. (The study task runs here.)' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

`,
        end: null,
      },
    ],
  },
];
