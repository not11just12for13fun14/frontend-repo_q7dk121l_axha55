import React, { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useAnimation } from 'framer-motion'
import { BadgeCheck, Shield, Stars, Layers, Zap, Copy, Check, Plus, Minus, Play, Pause } from 'lucide-react'

// iOS "Liquid Glass" helper: subtle vibrant gradient + frosted blur + hairline stroke
const glassBase = 'relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_rgba(0,0,0,0.35)]'

function formatUID(n) {
  // Displays as #0000 style
  return '#' + n.toString().padStart(4, '0')
}

export default function App() {
  // UID is numeric sequence: #0000, #0001, ...
  const [uid, setUid] = useState(() => {
    const saved = localStorage.getItem('zeo_uid')
    return saved ? parseInt(saved, 10) || 0 : 0
  })
  const [copied, setCopied] = useState(false)
  const [auto, setAuto] = useState(false)

  useEffect(() => {
    localStorage.setItem('zeo_uid', String(uid))
  }, [uid])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setUid((n) => (n + 1) % 10000), 1200)
    return () => clearInterval(t)
  }, [auto])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatUID(uid))
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch {}
  }

  // Interactive tilt for the main card
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      setTilt({ x: py * -10, y: px * 10 })
    }
    const onLeave = () => setTilt({ x: 0, y: 0 })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const badges = [
    { icon: <BadgeCheck className="w-4 h-4" />, label: 'Verified' },
    { icon: <Shield className="w-4 h-4" />, label: 'Secure' },
    { icon: <Stars className="w-4 h-4" />, label: 'Cosmic' },
    { icon: <Layers className="w-4 h-4" />, label: 'Liquid Glass' },
    { icon: <Zap className="w-4 h-4" />, label: 'Ultra Fast' },
  ]
  const [activeBadges, setActiveBadges] = useState(new Set())
  const toggleBadge = (i) => {
    setActiveBadges((prev) => {
      const s = new Set(prev)
      s.has(i) ? s.delete(i) : s.add(i)
      return s
    })
  }

  // Floating 3D-ish objects (chips) controls
  const orbControls = useAnimation()
  useEffect(() => {
    orbControls.start({ rotateY: [0, 360], transition: { duration: 16, ease: 'linear', repeat: Infinity } })
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* 3D Hero Spline */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Ao-qpnKUMOxV2eTA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Dark gradients + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/80" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_60%_at_50%_-10%,rgba(99,102,241,0.25),rgba(0,0,0,0)_60%)]" />

      {/* Floating 3D chips */}
      <FloatingChip idx={1} top="12%" left="8%" hue="indigo" delay={0} />
      <FloatingChip idx={2} top="70%" left="12%" hue="cyan" delay={2} />
      <FloatingChip idx={3} top="20%" left="78%" hue="fuchsia" delay={1} />

      {/* Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-6xl"
        >
          {/* Header chip */}
          <div className="mb-8 flex items-center gap-3">
            <span className={`${glassBase} inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-wider text-white/90` }>
              <span className="size-2 rounded-full bg-indigo-400 shadow-[0_0_16px_6px_rgba(99,102,241,0.55)]" />
              iOS Liquid Glass • Cosmic Bio
            </span>
          </div>

          {/* Main card with iOS 16/17-like liquid glass finish and tilt */}
          <div
            ref={cardRef}
            style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            className={`${glassBase} overflow-hidden`}
          >
            {/* vibrant tint + inner light sweep */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-1/2 left-0 right-0 h-[140%] bg-[radial-gradient(80%_50%_at_50%_0%,rgba(255,255,255,0.25),rgba(255,255,255,0)_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.20),rgba(168,85,247,0.16),rgba(56,189,248,0.14))] mix-blend-screen" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2">
              {/* Left: Identity + Controls */}
              <div className="p-8 md:p-12">
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight"
                >
                  zeozcb
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mt-4 max-w-md text-white/80"
                >
                  Futuristic explorer. Glossy orbs, HUD signals, and liquid glass aesthetics tuned to an iOS vibe.
                </motion.p>

                {/* UID controls */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className={`${glassBase} mt-6 inline-flex items-center gap-3 px-4 py-2`}
                >
                  <span className="text-xs font-mono tracking-widest text-white/90">
                    UID: {formatUID(uid)}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <IconButton onClick={() => setUid((n) => (n - 1 + 10000) % 10000)} ariaLabel="Decrement UID"><Minus className="w-3.5 h-3.5" /></IconButton>
                    <IconButton onClick={() => setUid((n) => (n + 1) % 10000)} ariaLabel="Increment UID"><Plus className="w-3.5 h-3.5" /></IconButton>
                    <IconButton onClick={() => setAuto((a) => !a)} ariaLabel="Auto">
                      {auto ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5" />}
                    </IconButton>
                    <IconButton onClick={handleCopy} ariaLabel="Copy UID">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </IconButton>
                  </div>
                </motion.div>

                {/* Badges (toggleable) */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {badges.map((b, i) => {
                    const active = activeBadges.has(i)
                    return (
                      <button
                        key={i}
                        onClick={() => toggleBadge(i)}
                        className={`group ${glassBase} inline-flex items-center gap-2 px-3 py-1.5 text-xs transition outline-none focus:ring-2 focus:ring-indigo-400/40 ${active ? 'bg-white/20 border-white/30' : ''}`}
                        aria-pressed={active}
                      >
                        <span className={`transition ${active ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{b.icon}</span>
                        <span className={`${active ? 'text-white' : 'text-white/90'}`}>{b.label}</span>
                      </button>
                    )
                  })}
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 grid grid-cols-3 gap-3 max-w-sm"
                >
                  <Stat label="Signal" value="99.97%" />
                  <Stat label="Flux" value="8.2k" />
                  <Stat label="Orbit" value="#42" />
                </motion.div>
              </div>

              {/* Right: Focus frame with inner 3D orb aura */}
              <div className="relative p-8 md:p-12 flex items-center justify-center">
                <motion.div
                  animate={orbControls}
                  className={`${glassBase} relative aspect-square w-full max-w-md overflow-hidden`}
                >
                  {/* depth shine */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(99,102,241,0.20),rgba(0,0,0,0)_60%)]" />
                    <div className="absolute -inset-16 rounded-[40px] blur-3xl bg-[conic-gradient(from_0deg,rgba(99,102,241,0.2),rgba(56,189,248,0.15),rgba(168,85,247,0.15),rgba(99,102,241,0.2))] opacity-50" />
                  </div>

                  {/* pseudo 3D orbs inside */}
                  <Orb3D className="left-10 top-10" size="w-24 h-24" colors="from-indigo-400 via-fuchsia-400 to-cyan-400" />
                  <Orb3D className="right-10 top-20" size="w-16 h-16" colors="from-cyan-400 via-indigo-400 to-fuchsia-400" delay={0.3} />
                  <Orb3D className="left-1/2 -translate-x-1/2 bottom-10" size="w-28 h-28" colors="from-fuchsia-400 via-cyan-400 to-indigo-400" delay={0.6} />

                  <div className="absolute bottom-3 right-3 text-[10px] text-white/70 font-mono tracking-widest">
                    ZE0-CB • COSMIC • HUD
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between text-xs text-white/60">
            <span>Interactive cosmic ID with iOS liquid glass styling.</span>
            <span>© {new Date().getFullYear()} zeozcb</span>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

function IconButton({ children, onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${glassBase} inline-flex items-center justify-center w-8 h-8 active:scale-95 transition`}
    >
      {children}
    </button>
  )
}

function Stat({ label, value }) {
  return (
    <div className={`${glassBase} p-3 text-center`}>
      <div className="text-[10px] uppercase tracking-widest text-white/70">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  )
}

function FloatingChip({ idx, top, left, hue = 'indigo', delay = 0 }) {
  const palette = {
    indigo: 'from-indigo-400/50 via-fuchsia-400/40 to-cyan-400/40',
    cyan: 'from-cyan-400/50 via-indigo-400/40 to-fuchsia-400/40',
    fuchsia: 'from-fuchsia-400/50 via-cyan-400/40 to-indigo-400/40',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ delay, duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="pointer-events-none absolute"
      style={{ top, left }}
    >
      <div className={`${glassBase} px-3 py-2 text-[10px] tracking-widest font-mono`}>OBJ-{idx.toString().padStart(2, '0')}</div>
      <div className={`mt-2 h-1 w-full rounded-full bg-gradient-to-r ${palette[hue]}`} />
    </motion.div>
  )
}

function Orb3D({ className = '', size = 'w-24 h-24', colors = 'from-indigo-400 via-fuchsia-400 to-cyan-400', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: [1, 1.05, 1] }}
      transition={{ delay, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`relative ${size} rounded-full bg-gradient-to-br ${colors} opacity-90`}> 
        {/* specular highlight */}
        <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full bg-white/40 blur-2xl" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(50%_50%_at_30%_30%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]" />
        {/* inner shadow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_-20px_40px_rgba(0,0,0,0.35)]" />
      </div>
    </motion.div>
  )
}
