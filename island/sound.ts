// Island sound. Every cue is synthesised with Web Audio (no audio files), so nothing loads until it is switched on.
// Off by default; the AudioContext is only created after the visitor has interacted with the page.

export type Cue = 'move' | 'enter' | 'exit' | 'day' | 'night' | 'place' | 'break' | 'deny'

const VOICE: Record<string, number> = { eng: 200, lib: 160, post: 250, hiker: 225 }

export function createSound() {
  let ctx: AudioContext | null = null
  let master: GainNode, sfx: GainNode, amb: GainNode, wind: GainNode, rumble: GainNode
  let noise: AudioBuffer
  let on = false
  let birdIn = 2, cricketIn = 1, clackIn = 0, landAt = -1

  const gain = (v: number, to?: AudioNode) => {
    const g = ctx!.createGain()
    g.gain.value = v
    if (to) g.connect(to)
    return g
  }
  const filter = (type: BiquadFilterType, hz: number, q = 0.7) => {
    const f = ctx!.createBiquadFilter()
    f.type = type
    f.frequency.value = hz
    f.Q.value = q
    return f
  }
  const noiseSrc = (loop: boolean) => {
    const s = ctx!.createBufferSource()
    s.buffer = noise
    s.loop = loop
    return s
  }
  // Attack to `peak`, then an exponential fall, which is what makes short synth hits sound like knocks rather than beeps.
  function env(g: GainNode, t: number, a: number, peak: number, d: number) {
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(peak, t + a)
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d)
  }
  function tone(type: OscillatorType, f0: number, f1: number, t: number, dur: number, vol: number, to: AudioNode = sfx, lp = 0) {
    const o = ctx!.createOscillator(), g = gain(0)
    o.type = type
    o.frequency.setValueAtTime(f0, t)
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur)
    if (lp) o.connect(filter('lowpass', lp)).connect(g)
    else o.connect(g)
    g.connect(to)
    env(g, t, Math.min(0.012, dur / 4), vol, dur)
    o.start(t)
    o.stop(t + dur + 0.05)
  }
  function burst(t: number, dur: number, vol: number, type: BiquadFilterType, hz: number, q = 0.7, to: AudioNode = sfx) {
    const s = noiseSrc(false), g = gain(0)
    s.connect(filter(type, hz, q)).connect(g).connect(to)
    env(g, t, 0.004, vol, dur)
    s.start(t, Math.random() * 1.5)
    s.stop(t + dur + 0.05)
  }

  function init() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return false
    ctx = new AC()
    master = gain(0, ctx.destination)
    sfx = gain(1, master)
    amb = gain(0.7, master)
    noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const d = noise.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1

    // Wind: looping noise through a low-pass whose cutoff drifts slowly.
    const w = filter('lowpass', 380), lfo = ctx.createOscillator(), depth = gain(160)
    lfo.frequency.value = 0.07
    lfo.connect(depth).connect(w.frequency)
    wind = gain(0.05, amb)
    const ws = noiseSrc(true)
    ws.connect(w).connect(wind)
    // Minecart rumble, silent until a ride starts.
    rumble = gain(0, sfx)
    const rs = noiseSrc(true)
    rs.connect(filter('lowpass', 140)).connect(rumble)
    lfo.start(); ws.start(); rs.start()
    return true
  }

  const running = () => on && !!ctx && ctx.state === 'running'
  function wake() {
    if (!on || document.hidden) return
    if (!ctx && !init()) return
    ctx!.resume().catch(() => {})
    master.gain.setTargetAtTime(0.55, ctx!.currentTime, 0.08)
  }
  // Browsers only let audio start after a gesture; when sound was left on from an earlier visit, wait for one.
  const onGesture = () => wake()
  window.addEventListener('pointerdown', onGesture)
  window.addEventListener('keydown', onGesture)
  const onVisibility = () => {
    if (!ctx) return
    if (document.hidden) ctx.suspend().catch(() => {})
    else wake()
  }
  document.addEventListener('visibilitychange', onVisibility)

  return {
    setEnabled(v: boolean) {
      on = v
      const activated = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? true
      if (on && activated) wake()
      else if (!on && ctx) {
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.05)
        setTimeout(() => { if (!on) ctx?.suspend().catch(() => {}) }, 300)
      }
    },

    /** Blocks hitting the island during the intro; `count` is how many landed this frame. */
    land(count: number) {
      if (!running() || count <= 0) return
      const t = ctx!.currentTime
      if (t - landAt < 0.045) return
      landAt = t
      const v = Math.min(0.5, 0.12 + 0.06 * Math.sqrt(count))
      burst(t, 0.09, v * 0.7, 'lowpass', 900)
      tone('sine', 140 * (0.85 + Math.random() * 0.3), 60, t, 0.12, v * 0.8)
    },

    /** An islander answering a click: a villager-style mumble, or clucks for the hens. */
    talk(key: string) {
      if (!running()) return
      const t = ctx!.currentTime
      if (key === 'hen') {
        for (let i = 0; i < 3; i++) tone('square', i === 2 ? 760 : 600, 380, t + i * 0.09, 0.05, 0.05, sfx, 1600)
        return
      }
      const base = (VOICE[key] ?? 210) * (0.94 + Math.random() * 0.12)
      const n = 2 + Math.round(Math.random())
      for (let i = 0; i < n; i++) {
        const s = t + i * 0.17, f = base * (i === n - 1 ? 0.88 : 1 + Math.random() * 0.15)
        tone('sawtooth', f, f * 0.9, s, 0.14, 0.1, sfx, 900)
      }
    },

    cue(c: Cue) {
      if (!running()) return
      const t = ctx!.currentTime
      if (c === 'move') {
        const s = noiseSrc(false), bp = filter('bandpass', 300, 1.2), g = gain(0)
        bp.frequency.setValueAtTime(300, t)
        bp.frequency.exponentialRampToValueAtTime(1100, t + 0.35)
        bp.frequency.exponentialRampToValueAtTime(300, t + 0.8)
        s.connect(bp).connect(g).connect(sfx)
        g.gain.setValueAtTime(0.0001, t)
        g.gain.linearRampToValueAtTime(0.07, t + 0.3)
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.85)
        s.start(t, Math.random() * 1.5)
        s.stop(t + 0.9)
      } else if (c === 'place') {
        burst(t, 0.07, 0.25, 'lowpass', 1400)
        tone('sine', 190 * (0.9 + Math.random() * 0.2), 90, t, 0.09, 0.3)
      } else if (c === 'break') {
        for (let i = 0; i < 3; i++) burst(t + i * 0.03, 0.06, 0.18, 'bandpass', 900 + Math.random() * 900, 1.5)
      } else if (c === 'deny') {
        tone('square', 140, 120, t, 0.12, 0.05, sfx, 700)
      } else if (c === 'enter' || c === 'exit') {
        const up = c === 'enter'
        tone('triangle', up ? 330 : 660, up ? 660 : 330, t, 0.12, 0.08)
        tone('triangle', up ? 494 : 988, up ? 988 : 494, t + 0.08, 0.12, 0.06)
      } else {
        const notes = c === 'day' ? [523, 659, 784] : [784, 622, 523]
        notes.forEach((f, i) => tone('triangle', f, f, t + i * 0.09, 0.35, 0.06))
      }
    },

    /** Ambient life, called every frame: wind, birds by day, crickets at night, and the minecart while riding. */
    update(dt: number, nightT: number, riding: boolean) {
      if (!running()) return
      const t = ctx!.currentTime
      wind.gain.setTargetAtTime(0.05 - 0.02 * nightT, t, 0.5)
      rumble.gain.setTargetAtTime(riding ? 0.12 : 0, t, 0.15)
      if ((birdIn -= dt) <= 0) {
        birdIn = 3 + Math.random() * 6
        if (nightT < 0.5) {
          const n = 2 + Math.floor(Math.random() * 3), f = 2600 + Math.random() * 600
          for (let i = 0; i < n; i++) tone('sine', f, f * 1.35, t + i * 0.08, 0.06, 0.03 * (1 - nightT), amb)
        }
      }
      if ((cricketIn -= dt) <= 0) {
        cricketIn = 0.9 + Math.random() * 1.6
        if (nightT > 0.5) for (let i = 0; i < 3; i++) tone('sine', 4400, 4400, t + i * 0.05, 0.035, 0.02 * nightT, amb)
      }
      if (riding && (clackIn -= dt) <= 0) {
        clackIn = 0.55
        for (const s of [t, t + 0.11]) {
          burst(s, 0.03, 0.1, 'highpass', 2000)
          tone('sine', 90, 70, s, 0.05, 0.08)
        }
      }
    },

    dispose() {
      on = false
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
      document.removeEventListener('visibilitychange', onVisibility)
      ctx?.close().catch(() => {})
      ctx = null
    }
  }
}
