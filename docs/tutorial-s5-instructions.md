# S5 — Continuous Exploration

Two candidate pieces. Each has a loadout and a performance arc. The
arc is continuous: every step starts from the state the previous step
left behind. Each step shows the gestures, then the full Strudel state
after the step, with changed lines marked `// ←`.

**Bus effects in Strudel.** The system has one delay bus and one room
bus. To mirror that, the code uses Strudel's `all(...)` to apply room
and delay to every pattern at once, controlled by two constants at the
top. If `all` isn't available in your Strudel version, append the same
chain to each line instead.

**Muting** is written as `_$:`.

---

## Piece A — Bright House

### Loadout

- `cps = 0.52`
- Patterns (`id`, position first pass):
  - `"kick"` — close, front centre
  - `"clap"` — close, front left
  - `"openhat"` — mid, front right
  - `"hats"` — mid, right
  - `"bass"` — close, left
  - `"chords"` — mid, behind left
  - `"lead"` — far, behind right
- Effect seeds (connected on entry):
  - LPF `lpf = 800` → `["bass"]`
  - ADSR `decay = 0.15, sustain = 0` → `["chords"]`
  - LPF `lpf = 1500` → `["chords"]`
  - Delay bus — send 0
  - Room bus — wet 0
- Tempo block: not seeded (user spawns in step 7).

### Step 1 — Listen (0 ops)

- Walk the space: near the bass, then the lead, then the drums.

```js
samples('github:tidalcycles/dirt-samples')
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

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))
```

### Step 2 — Ambient breakdown (4 ops)

- Mute kick, clap, hats.
- Raise room wet.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.52)
const room = 0.8, delay = 0                                           // ← room up

_$: s("bd bd bd bd")                                                  // ← muted
_$: s("~ cp ~ cp").gain(0.7)                                          // ← muted
$: s("~ ho ~ ho ~ ho ~ ho").gain(0.45)
_$: s("hh hh hh hh hh hh hh hh").gain(0.2)                            // ← muted
$: n("[~ 0] [~ 0] [~ 3] [~ 4]").scale("C2:major").s("square").lpf(800).gain(0.45)
$: n("[~ [0,2,4,6]] ~ [~ [3,5,7,9]] ~").scale("C4:major").s("sawtooth")
    .decay(0.15).sustain(0).lpf(1500).gain(0.3)
$: n("[0 2] [4 ~] [~ 6] [4 2]").scale("C5:major").s("arpy").gain(0.35)

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))
```

### Step 3 — Dub (3 ops)

- Unmute kick.
- Raise delay send.
- Lower room.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.52)
const room = 0, delay = 0.5                                           // ← room down, delay up

$: s("bd bd bd bd")                                                   // ← unmuted
_$: s("~ cp ~ cp").gain(0.7)
$: s("~ ho ~ ho ~ ho ~ ho").gain(0.45)
_$: s("hh hh hh hh hh hh hh hh").gain(0.2)
$: n("[~ 0] [~ 0] [~ 3] [~ 4]").scale("C2:major").s("square").lpf(800).gain(0.45)
$: n("[~ [0,2,4,6]] ~ [~ [3,5,7,9]] ~").scale("C4:major").s("sawtooth")
    .decay(0.15).sustain(0).lpf(1500).gain(0.3)
$: n("[0 2] [4 ~] [~ 6] [4 2]").scale("C5:major").s("arpy").gain(0.35)

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))
```

### Step 4 — Half-time (5 ops)

- Unmute clap and hats.
- Lower delay.
- Slow kick ×2, slow clap ×2.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.52)
const room = 0, delay = 0                                             // ← delay down

$: s("bd bd bd bd").slow(2)                                           // ← slow ×2
$: s("~ cp ~ cp").slow(2).gain(0.7)                                   // ← unmuted, slow ×2
$: s("~ ho ~ ho ~ ho ~ ho").gain(0.45)
$: s("hh hh hh hh hh hh hh hh").gain(0.2)                             // ← unmuted
$: n("[~ 0] [~ 0] [~ 3] [~ 4]").scale("C2:major").s("square").lpf(800).gain(0.45)
$: n("[~ [0,2,4,6]] ~ [~ [3,5,7,9]] ~").scale("C4:major").s("sawtooth")
    .decay(0.15).sustain(0).lpf(1500).gain(0.3)
$: n("[0 2] [4 ~] [~ 6] [4 2]").scale("C5:major").s("arpy").gain(0.35)

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))
```

### Step 5 — Backwards (2 ops)

- Reverse bass, reverse lead.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.52)
const room = 0, delay = 0

$: s("bd bd bd bd").slow(2)
$: s("~ cp ~ cp").slow(2).gain(0.7)
$: s("~ ho ~ ho ~ ho ~ ho").gain(0.45)
$: s("hh hh hh hh hh hh hh hh").gain(0.2)
$: n("[~ 0] [~ 0] [~ 3] [~ 4]").scale("C2:major").s("square").lpf(800).gain(0.45)
    .rev()                                                            // ← reversed
$: n("[~ [0,2,4,6]] ~ [~ [3,5,7,9]] ~").scale("C4:major").s("sawtooth")
    .decay(0.15).sustain(0).lpf(1500).gain(0.3)
$: n("[0 2] [4 ~] [~ 6] [4 2]").scale("C5:major").s("arpy").gain(0.35)
    .rev()                                                            // ← reversed

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))
```

### Step 6 — Dark (4 ops)

- Scale wheel major → minor on bass, chords, lead.
- Speed hats ×2.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.52)
const room = 0, delay = 0

$: s("bd bd bd bd").slow(2)
$: s("~ cp ~ cp").slow(2).gain(0.7)
$: s("~ ho ~ ho ~ ho ~ ho").gain(0.45)
$: s("hh hh hh hh hh hh hh hh").fast(2).gain(0.2)                     // ← fast ×2
$: n("[~ 0] [~ 0] [~ 3] [~ 4]").scale("C2:minor").s("square").lpf(800).gain(0.45)  // ← minor
    .rev()
$: n("[~ [0,2,4,6]] ~ [~ [3,5,7,9]] ~").scale("C4:minor").s("sawtooth")            // ← minor
    .decay(0.15).sustain(0).lpf(1500).gain(0.3)
$: n("[0 2] [4 ~] [~ 6] [4 2]").scale("C5:minor").s("arpy").gain(0.35)             // ← minor
    .rev()

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))
```

### Step 7 — Peak-time rave (5 ops)

- Speed kick and clap back to ×1.
- Open chords LPF to ~5000.
- Spawn tempo block, push to ~0.6.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.6)                                                           // ← tempo up
const room = 0, delay = 0

$: s("bd bd bd bd")                                                   // ← back to ×1
$: s("~ cp ~ cp").gain(0.7)                                           // ← back to ×1
$: s("~ ho ~ ho ~ ho ~ ho").gain(0.45)
$: s("hh hh hh hh hh hh hh hh").fast(2).gain(0.2)
$: n("[~ 0] [~ 0] [~ 3] [~ 4]").scale("C2:minor").s("square").lpf(800).gain(0.45)
    .rev()
$: n("[~ [0,2,4,6]] ~ [~ [3,5,7,9]] ~").scale("C4:minor").s("sawtooth")
    .decay(0.15).sustain(0).lpf(5000).gain(0.3)                       // ← LPF open
$: n("[0 2] [4 ~] [~ 6] [4 2]").scale("C5:minor").s("arpy").gain(0.35)
    .rev()

all(x => x.room(room).roomsize(6).delay(delay).delaytime(0.375).delayfeedback(0.55))
```

### Step 8 — Land (open)

- User's choice: un-reverse, flip back to major, slow down, or keep
  going. No fixed end state.

**Total: ~23 ops across steps 2–7.**

---

## Piece B — Minimal Techno

### Loadout

- `cps = 0.54`
- Patterns (`id`, position first pass):
  - `"kick"` — close, front centre
  - `"openhat"` — mid, front right
  - `"rim"` — mid, right
  - `"tom"` — mid, front left
  - `"bass"` — close, left
  - `"stab"` — mid, behind left
  - `"lead"` — far, behind right
- Effect seeds (connected on entry):
  - LPF `lpf = 500, lpq = 0` → `["bass"]`
  - ADSR `decay = 0.1, sustain = 0` → `["bass"]`
  - ADSR `decay = 0.2, sustain = 0` → `["stab"]`
  - LPF `lpf = 1200` → `["stab", "lead"]` (pre-fanned)
  - Delay bus — send 0
  - Room bus — wet 0
- Tempo block: not seeded (user spawns in step 6).

### Step 1 — Listen (0 ops)

- Walk the space.

```js
samples('github:tidalcycles/dirt-samples')
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

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))
```

### Step 2 — Acid (2 ops)

- Bass LPF: drag cutoff up to ~1800, resonance up to ~18.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.54)
const room = 0, delay = 0

$: s("bd bd bd bd")
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.4)
$: s("[~ ~ ~ rs] ~ [~ ~ rs ~] ~").gain(0.6)
$: s("~ ~ [~ ~ ~ ht] ~").gain(0.5)
$: n("[~ 0 0 0] [~ 0 0 0] [~ 0 0 0] [~ 0 0 0]").scale("A1:minor").s("square")
    .lpf(1800).lpq(18).decay(0.1).sustain(0).gain(0.4)               // ← cutoff + resonance up
$: n("~ [~ [0,2,4]] ~ ~").scale("A3:minor").s("sawtooth")
    .decay(0.2).sustain(0).lpf(1200).gain(0.3)
$: n("[0 ~ 0 3] [~ 0 ~ ~] [0 ~ 4 ~] [~ 3 ~ ~]").scale("A4:minor").s("triangle")
    .lpf(1200).gain(0.35)

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))
```

### Step 3 — Euphoric (2 ops)

- Scale wheel minor → major on stab and lead.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.54)
const room = 0, delay = 0

$: s("bd bd bd bd")
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.4)
$: s("[~ ~ ~ rs] ~ [~ ~ rs ~] ~").gain(0.6)
$: s("~ ~ [~ ~ ~ ht] ~").gain(0.5)
$: n("[~ 0 0 0] [~ 0 0 0] [~ 0 0 0] [~ 0 0 0]").scale("A1:minor").s("square")
    .lpf(1800).lpq(18).decay(0.1).sustain(0).gain(0.4)
$: n("~ [~ [0,2,4]] ~ ~").scale("A3:major").s("sawtooth")           // ← major
    .decay(0.2).sustain(0).lpf(1200).gain(0.3)
$: n("[0 ~ 0 3] [~ 0 ~ ~] [0 ~ 4 ~] [~ 3 ~ ~]").scale("A4:major").s("triangle")  // ← major
    .lpf(1200).gain(0.35)

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))
```

### Step 4 — Half-time heavy (2 ops)

- Slow kick ×2, slow lead ×2.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.54)
const room = 0, delay = 0

$: s("bd bd bd bd").slow(2)                                           // ← slow ×2
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.4)
$: s("[~ ~ ~ rs] ~ [~ ~ rs ~] ~").gain(0.6)
$: s("~ ~ [~ ~ ~ ht] ~").gain(0.5)
$: n("[~ 0 0 0] [~ 0 0 0] [~ 0 0 0] [~ 0 0 0]").scale("A1:minor").s("square")
    .lpf(1800).lpq(18).decay(0.1).sustain(0).gain(0.4)
$: n("~ [~ [0,2,4]] ~ ~").scale("A3:major").s("sawtooth")
    .decay(0.2).sustain(0).lpf(1200).gain(0.3)
$: n("[0 ~ 0 3] [~ 0 ~ ~] [0 ~ 4 ~] [~ 3 ~ ~]").scale("A4:major").s("triangle")
    .slow(2).lpf(1200).gain(0.35)                                     // ← slow ×2

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))
```

### Step 5 — Space echo (2 ops)

- Mute kick.
- Raise delay send.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.54)
const room = 0, delay = 0.5                                           // ← delay up

_$: s("bd bd bd bd").slow(2)                                          // ← muted
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.4)
$: s("[~ ~ ~ rs] ~ [~ ~ rs ~] ~").gain(0.6)
$: s("~ ~ [~ ~ ~ ht] ~").gain(0.5)
$: n("[~ 0 0 0] [~ 0 0 0] [~ 0 0 0] [~ 0 0 0]").scale("A1:minor").s("square")
    .lpf(1800).lpq(18).decay(0.1).sustain(0).gain(0.4)
$: n("~ [~ [0,2,4]] ~ ~").scale("A3:major").s("sawtooth")
    .decay(0.2).sustain(0).lpf(1200).gain(0.3)
$: n("[0 ~ 0 3] [~ 0 ~ ~] [0 ~ 4 ~] [~ 3 ~ ~]").scale("A4:major").s("triangle")
    .slow(2).lpf(1200).gain(0.35)

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))
```

### Step 6 — Lo-fi slowdown (3 ops)

- Lower the shared stab + lead LPF to ~500 (one drag, both patterns).
- Spawn tempo block, pull down to ~0.36.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.36)                                                          // ← tempo down
const room = 0, delay = 0.5

_$: s("bd bd bd bd").slow(2)
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.4)
$: s("[~ ~ ~ rs] ~ [~ ~ rs ~] ~").gain(0.6)
$: s("~ ~ [~ ~ ~ ht] ~").gain(0.5)
$: n("[~ 0 0 0] [~ 0 0 0] [~ 0 0 0] [~ 0 0 0]").scale("A1:minor").s("square")
    .lpf(1800).lpq(18).decay(0.1).sustain(0).gain(0.4)
$: n("~ [~ [0,2,4]] ~ ~").scale("A3:major").s("sawtooth")
    .decay(0.2).sustain(0).lpf(500).gain(0.35)                        // ← shared LPF down
$: n("[0 ~ 0 3] [~ 0 ~ ~] [0 ~ 4 ~] [~ 3 ~ ~]").scale("A4:major").s("triangle")
    .slow(2).lpf(500).gain(0.4)                                       // ← shared LPF down

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))
```

### Step 7 — Tribal ending (8 ops)

- Mute bass, stab, lead.
- Unmute kick, speed it back to ×1.
- Speed tom ×2.
- Lower delay.
- Push tempo back to ~0.54.

```js
samples('github:tidalcycles/dirt-samples')
setcps(0.54)                                                          // ← tempo back up
const room = 0, delay = 0                                             // ← delay down

$: s("bd bd bd bd")                                                   // ← unmuted, back to ×1
$: s("[~ ho] [~ ho] [~ ho] [~ ho]").gain(0.4)
$: s("[~ ~ ~ rs] ~ [~ ~ rs ~] ~").gain(0.6)
$: s("~ ~ [~ ~ ~ ht] ~").fast(2).gain(0.6)                            // ← fast ×2
_$: n("[~ 0 0 0] [~ 0 0 0] [~ 0 0 0] [~ 0 0 0]").scale("A1:minor").s("square")  // ← muted
    .lpf(1800).lpq(18).decay(0.1).sustain(0).gain(0.4)
_$: n("~ [~ [0,2,4]] ~ ~").scale("A3:major").s("sawtooth")          // ← muted
    .decay(0.2).sustain(0).lpf(500).gain(0.35)
_$: n("[0 ~ 0 3] [~ 0 ~ ~] [0 ~ 4 ~] [~ 3 ~ ~]").scale("A4:major").s("triangle") // ← muted
    .slow(2).lpf(500).gain(0.4)

all(x => x.room(room).roomsize(4).delay(delay).delaytime(0.375).delayfeedback(0.6))
```

**Total: ~19 ops across steps 2–7.**

---

## Open decisions

- One piece or both. If both, the second can become the first
  open-task preset.
- S5 panel: none, or the arc's step names as a "things to try" list.
- Tempo steps need the user to spawn a tempo block (cps can't be
  seeded as a block).
- Positions are a first pass; tune in-headset so walking between
  bass and lead clearly changes the mix.
