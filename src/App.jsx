import React, { useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { BadgeCheck, Shield, Stars, Layers, Zap, Copy, Check } from 'lucide-react'

function generateUID() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = 'ZEO-' // personalized prefix
  for (let i = 0; i < 4; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
  out += '-'
  for (let i = 0; i < 4; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
  return out
}

const glow = 'shadow-[0_0_60px_rgba(99,102,241,0.25)]'

export default function App() {
  const uid = useMemo(() => generateUID(), [])
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uid)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (_) {}
  }

  const badges = [
    { icon: <BadgeCheck className="w-4 h-4" />, label: 'Verified' },
    { icon: <Shield className="w-4 h-4" />, label: 'Secure' },
    { icon: <Stars className="w-4 h-4" />, label: 'Cosmic' },
    { icon: <Layers className="w-4 h-4" />, label: 'Liquid Glass' },
    { icon: <Zap className="w-4 h-4" />, label: 'Ultra Fast' },
  ]

  return (
    <div className="relative min-h-screen bg-[#0b0b11] text-white overflow-hidden">
      {/* Spline Hero */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Ao-qpnKUMOxV2eTA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient and vignette overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.25)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_120%_at_50%_120%,rgba(20,20,30,0)_40%,rgba(0,0,0,0.6)_100%)]" />

      {/* Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`w-full max-w-5xl`}
        >
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-white/80 backdrop-blur-md">
              <span className="size-2 rounded-full bg-indigo-400 shadow-[0_0_16px_4px_rgba(99,102,241,0.6)]" />
              Liquid Glass Cosmic Bio
            </span>
          </div>

          {/* Glass Card */}
          <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${glow}`}>
            {/* subtle inner gradient lines */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-60 [background:conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.12)_0deg,rgba(56,189,248,0.12)_120deg,rgba(168,85,247,0.12)_240deg,rgba(99,102,241,0.12)_360deg)]" />

            <div className="relative grid grid-cols-1 md:grid-cols-2">
              {/* Left: Identity */}
              <div className="p-8 md:p-12">
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight"
                >
                  zeozcb
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 max-w-md text-white/70"
                >
                  Futuristic explorer of the dark cosmos. Distorted glass, glossy orbs, and HUD signals in constant motion.
                </motion.p>

                {/* UID row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md"
                >
                  <span className="text-xs font-mono tracking-widest text-white/80">
                    UID: {uid}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20 active:scale-[0.98] transition"
                    aria-label="Copy UID"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </motion.div>

                {/* Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {badges.map((b, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md"
                    >
                      {b.icon}
                      {b.label}
                    </span>
                  ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-8 grid grid-cols-3 gap-3 max-w-sm"
                >
                  <Stat label="Signal" value="99.97%" />
                  <Stat label="Flux" value="8.2k" />
                  <Stat label="Orbit" value="#42" />
                </motion.div>
              </div>

              {/* Right: Framed orb focus area */}
              <div className="relative p-8 md:p-12 flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_50%,rgba(99,102,241,0.18)_0%,rgba(0,0,0,0.0)_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-40 md:size-56 rounded-full bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-cyan-400/20 blur-2xl" />
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] text-white/60 font-mono tracking-widest">
                    ZE0-CB • COSMIC • HUD
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer micro-copy */}
          <div className="mt-6 flex items-center justify-between text-xs text-white/50">
            <span>Cosmic identity crafted with liquid glass aesthetics.</span>
            <span>© {new Date().getFullYear()} zeozcb</span>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-md">
      <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  )
}
