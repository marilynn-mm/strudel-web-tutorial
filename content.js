// All tutorial content lives here. main.js renders this into the page.
// Text is a first-draft script. Marilyn will refine.
// `end` is reference-only (not shown on the page). `vr` and `source` are notes.

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
          { type: 'explain', body: 'A Strudel pattern is a loop. One trip around the loop is a cycle. Everything happens inside it. Divide the cycle into steps and drop a sound in each. One sound on its own fills the whole cycle. Each `$:` line is one pattern.' },
          { type: 'try', body: '`s("bd bd")` splits the cycle into two steps. Try four. Try eight. Same loop length. The pulses come faster.', code: '$: s("bd bd")' },
          { type: 'explain', body: 'Longer sequence = faster.' },
          { type: 'try', body: 'Replace a `bd` with `~` to leave a gap.' },
          { type: 'explain', body: 'Silence is a step too.' },
          { type: 'try', body: 'Divide the cycle into 3 steps. Then 5. Then 8. Start each with `bd`.' },
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
          { type: 'explain', body: 'Drum names are short codes. `bd` = bass drum. `sd` = snare. `cp` = clap. `hh` = closed hat. `ho` = open hat. `rs` = rimshot. `ht` = high tom. `cr` = cymbal. One drum per `$:` line.' },
          { type: 'try', body: 'Add a clap on a new line.', code: '$: s("~ cp ~ cp")' },
          { type: 'try', body: 'Add hats on a new line.', code: '$: s("~ hh ~ hh ~ hh ~ hh")' },
          { type: 'explain', body: '`.gain()` sets volume.' },
          { type: 'try', body: 'Turn the hats down.', code: '.gain(0.3)' },
          { type: 'try', body: 'Delete a line.' },
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
          { type: 'explain', body: 'Brackets turn one step into its own small cycle. Sounds inside split that step the same way the whole cycle splits.' },
          { type: 'try', body: 'Change the pattern to `bd ~ bd ~`. Then try the bracketed version.', code: 'bd ~ [~ bd] ~' },
          { type: 'try', body: 'Nest brackets inside brackets.', code: '[bd [bd bd]]' },
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
          { type: 'explain', body: 'Angle brackets pick one option per cycle. The pattern rotates through them.' },
          { type: 'try', body: 'Run it. Count cycles out loud.' },
          { type: 'explain', body: '`*` repeats a step faster. A comma inside a pattern plays two patterns at once.' },
          { type: 'try', body: 'Multiply a step.', code: 's("bd hh*2 bd hh*3")' },
          { type: 'try', body: 'Play two patterns in parallel.', code: 's("bd*2, hh*3")' },
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
          { type: 'explain', body: 'Drums pick a sound. Synths pick a pitch. The number in `n` is a step on a scale. Any number fits.' },
          { type: 'try', body: 'Change `0` to `2`. Then try `4`.' },
          { type: 'try', body: 'Swap the waveform. Try `square`, `sawtooth`, `sine`, `arpy`. Same note. Different color.' },
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
          { type: 'try', body: 'Four steps on the same note.', code: 'n("0 0 0 0")' },
          { type: 'try', body: 'Split the first step.', code: 'n("[0 0] 0 0 0")' },
          { type: 'try', body: 'Change the numbers.', code: 'n("[0 0] 1 2 2")' },
          { type: 'explain', body: '`@` stretches a note across steps.' },
          { type: 'try', body: 'Hold the last note.', code: 'n("[0 0] 1 2@2")' },
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
          { type: 'explain', body: 'A comma inside brackets stacks notes. They play at the same time. Chords with no theory.' },
          { type: 'try', body: 'Add a chord on the held note.', code: 'n("[0 0] 1 [2,4]@2")' },
          { type: 'try', body: 'Move the scale. Change `G4:major` to `C4:major`.' },
          { type: 'try', body: 'Shift the whole tune up one step. Instant modulation.', code: '.scaleTranspose(1)' },
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
          { type: 'try', body: 'Run it. One note plays per cycle.' },
          { type: 'try', body: 'Alternate scales each cycle. The whole song shifts key without rewriting notes.', code: '.scale("<C4:major A3:minor>")' },
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
          { type: 'explain', body: 'Patterns can also be wrapped in functions. The pattern stays the same. The function changes how it plays. Each voice gets its own time.' },
          { type: 'try', body: 'Slow the kick and clap.', code: '.slow(2)' },
          { type: 'try', body: 'Speed the hats up.', code: '.fast(2)' },
          { type: 'explain', body: '`.rev()` plays a pattern backwards. A cheap way to answer a phrase.' },
          { type: 'try', body: 'Reverse the rim pickup. Then reverse the melody too. The answer comes before the question.' },
          { type: 'try', body: 'Pull the arp slightly out of time.', code: '.slow(1.5)' },
          { type: 'try', body: 'Mute the pad by changing `$:` to `_$:`. Change it back. Drop parts out live without deleting.' },
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
          { type: 'try', body: 'Split the melody left and right. The right side plays backwards.', code: '.jux(rev)' },
          { type: 'try', body: 'Repeat each note.', code: '.ply(2)' },
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
          { type: 'explain', body: 'Effects shape the sound of a note. Time and pitch stay the same. A low-pass filter cuts high frequencies. Low values sound muffled.' },
          { type: 'try', body: 'Open the filter. Change `lp` from `300` to `8000`. The chords come out.' },
          { type: 'explain', body: 'One value can feed many patterns at once. That is what `lp` is doing.' },
          { type: 'try', body: 'Add `.lpf(lp).lpq(8)` to every line. Close `lp` back to `300`. Then open it to `8000`.' },
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
          { type: 'explain', body: 'A high-pass filter cuts low frequencies. Pushing it up builds tension. Dropping it back is the release.' },
          { type: 'try', body: 'Add `.hpf(hp)` to kick and bass. Raise `hp` to `2000`.' },
          { type: 'try', body: 'Pull `hp` back to `20`.' },
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
          { type: 'explain', body: 'ADSR shapes how each note swells and fades.' },
          { type: 'try', body: 'Shape the chord envelope.', code: '.attack(0.01).decay(0.2).sustain(0.3).release(0.8)' },
          { type: 'try', body: 'Make the release longer. Try `1.5`.' },
          { type: 'explain', body: 'Room and delay add space to everything.' },
          { type: 'try', body: 'Paste the `all(...)` line at the bottom. Raise `room`. Then raise `delay`.' },
          { type: 'try', body: 'Speed everything up.', code: 'setcps(0.6)' },
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
          { type: 'explain', body: 'Effect values can also be patterns.' },
          { type: 'try', body: 'Run it. The filter changes every cycle.' },
          { type: 'try', body: 'Swap in a slow sine sweep.', code: '.lpf(sine.range(300, 3000).slow(4))' },
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
          { type: 'explain', body: 'A house piece. Everything from the tutorial so far. Add, mute, or change anything.' },
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
          { type: 'explain', body: 'A techno piece. Same deal. Add, mute, or change anything.' },
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
          { type: 'explain', body: 'An empty editor. Try anything you have picked up. Or something new.' },
        ],
        start: `samples('github:tidalcycles/dirt-samples')

`,
        end: null,
      },
    ],
  },
];
