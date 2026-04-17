import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Volume2, VolumeX, Smartphone, Move } from 'lucide-react'

export default function Card() {
  const cardPath = '/assets/derp_holo_card_v2.html'
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [gyroEnabled, setGyroEnabled] = useState(false)
  const [gyroAvailable, setGyroAvailable] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ---- Music player ----
  useEffect(() => {
    audioRef.current = new Audio('/assets/card-music.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  function toggleMusic() {
    if (!audioRef.current) return
    if (musicPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setMusicPlaying(!musicPlaying)
  }

  // ---- Gyroscope tilt -> inject mousemove into iframe ----
  useEffect(() => {
    // Check if device orientation is available
    if ('DeviceOrientationEvent' in window) {
      setGyroAvailable(true)
    }
  }, [])

  useEffect(() => {
    if (!gyroEnabled) return

    let permissionGranted = false

    async function requestPermission() {
      // iOS 13+ requires explicit permission
      const DOE = DeviceOrientationEvent as any
      if (typeof DOE.requestPermission === 'function') {
        try {
          const perm = await DOE.requestPermission()
          if (perm === 'granted') {
            permissionGranted = true
            window.addEventListener('deviceorientation', handleOrientation)
          }
        } catch {
          setGyroEnabled(false)
        }
      } else {
        // Android / older iOS - no permission needed
        permissionGranted = true
        window.addEventListener('deviceorientation', handleOrientation)
      }
    }

    function handleOrientation(e: DeviceOrientationEvent) {
      if (!iframeRef.current?.contentWindow) return

      // Map tilt angles to mouse-like coordinates
      // beta = front-back tilt (-180 to 180), gamma = left-right tilt (-90 to 90)
      const beta = Math.max(-30, Math.min(30, e.beta || 0))
      const gamma = Math.max(-30, Math.min(30, e.gamma || 0))

      // Normalize to 0-1 range centered at 0.5
      const normalX = (gamma + 30) / 60
      const normalY = (beta + 30) / 60

      // Get iframe dimensions
      const rect = iframeRef.current.getBoundingClientRect()
      const clientX = normalX * rect.width
      const clientY = normalY * rect.height

      try {
        // Dispatch synthetic mousemove into iframe document
        const iframeDoc = iframeRef.current.contentDocument
        if (iframeDoc) {
          const event = new MouseEvent('mousemove', {
            clientX: clientX,
            clientY: clientY,
            bubbles: true,
          })
          iframeDoc.dispatchEvent(event)

          // Also try dispatching on the body/main element
          const target = iframeDoc.querySelector('.card, .holo-card, [class*="card"], body')
          if (target) {
            target.dispatchEvent(new MouseEvent('mousemove', {
              clientX: clientX,
              clientY: clientY,
              bubbles: true,
            }))
          }
        }
      } catch {
        // Cross-origin fallback - use postMessage
        iframeRef.current.contentWindow.postMessage({
          type: 'gyro-tilt',
          x: normalX,
          y: normalY,
          gamma: gamma,
          beta: beta,
        }, '*')
      }
    }

    requestPermission()

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [gyroEnabled])

  // ---- Touch-to-tilt for mobile (finger drag on iframe overlay) ----
  const overlayRef = useRef<HTMLDivElement>(null)

  function handleTouchMove(e: React.TouchEvent) {
    if (!iframeRef.current?.contentWindow || !overlayRef.current) return
    e.preventDefault()

    const touch = e.touches[0]
    const rect = overlayRef.current.getBoundingClientRect()
    const clientX = touch.clientX - rect.left
    const clientY = touch.clientY - rect.top

    try {
      const iframeDoc = iframeRef.current.contentDocument
      if (iframeDoc) {
        const event = new MouseEvent('mousemove', {
          clientX: clientX,
          clientY: clientY,
          bubbles: true,
        })
        iframeDoc.dispatchEvent(event)
        const target = iframeDoc.querySelector('.card, .holo-card, [class*="card"], body')
        if (target) {
          target.dispatchEvent(new MouseEvent('mousemove', {
            clientX: clientX,
            clientY: clientY,
            bubbles: true,
          }))
        }
      }
    } catch {
      const normalX = clientX / rect.width
      const normalY = clientY / rect.height
      iframeRef.current.contentWindow.postMessage({
        type: 'touch-tilt',
        x: normalX,
        y: normalY,
      }, '*')
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-8"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Card</span>{' '}
            <span className="text-guardian-cyan">Showcase</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Interactive holographic card display. {gyroAvailable ? 'Tilt your phone to rotate the card.' : 'Move your mouse over the card to interact.'}
          </p>
        </motion.div>

        {/* Controls bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display transition-all ${
              musicPlaying
                ? 'bg-guardian-cyan/20 border border-guardian-cyan/50 text-guardian-cyan'
                : 'bg-guardian-navy/50 border border-guardian-trace/50 text-gray-400 hover:text-white'
            }`}
          >
            {musicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {musicPlaying ? 'Music On' : 'Music Off'}
          </button>

          {/* Gyroscope toggle (mobile only) */}
          {gyroAvailable && (
            <button
              onClick={() => setGyroEnabled(!gyroEnabled)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display transition-all ${
                gyroEnabled
                  ? 'bg-guardian-gold/20 border border-guardian-gold/50 text-guardian-gold'
                  : 'bg-guardian-navy/50 border border-guardian-trace/50 text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone size={16} />
              {gyroEnabled ? 'Gyro Tilt On' : 'Gyro Tilt Off'}
            </button>
          )}

          {/* Open in new tab */}
          <a
            href={cardPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display bg-guardian-navy/50 border border-guardian-trace/50 text-gray-400 hover:text-white transition-all"
          >
            <ExternalLink size={16} />
            Full Screen
          </a>

          {/* Touch hint on mobile */}
          {gyroAvailable && !gyroEnabled && (
            <span className="inline-flex items-center gap-2 text-xs text-gray-500">
              <Move size={14} />
              Drag your finger over the card to tilt
            </span>
          )}
        </motion.div>

        {/* Card display */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-guardian-trace/40 bg-guardian-navy/40 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.25)]"
        >
          <div className="p-2 sm:p-4 lg:p-6">
            <div className="relative rounded-xl overflow-hidden border border-guardian-cyan/20 bg-black">
              {/* Touch overlay for mobile - sits on top of iframe to capture touch events */}
              <div
                ref={overlayRef}
                onTouchMove={handleTouchMove}
                className="absolute inset-0 z-10 md:hidden"
                style={{ touchAction: 'none' }}
              />
              <iframe
                ref={iframeRef}
                src={cardPath}
                title="Holographic Card"
                className="w-full bg-black"
                style={{ height: 'min(80vh, 700px)', minHeight: '400px' }}
                allow="accelerometer; gyroscope"
              />
            </div>
          </div>
        </motion.section>

        {/* Mobile tip */}
        {gyroAvailable && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs text-gray-600 mt-4"
          >
            For the best experience, enable gyro tilt and hold your phone flat, then tilt to rotate the card.
          </motion.p>
        )}
      </div>
    </div>
  )
}
