import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function Card() {
  const cardPath = '/assets/derp_holo_card_v2.html'

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Card</span>{' '}
            <span className="text-guardian-cyan">Showcase</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Interactive holographic card display.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-2xl border border-guardian-trace/40 bg-guardian-navy/40 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.25)]"
        >
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-guardian-trace/30 bg-guardian-black/30">
            <div>
              <h2 className="font-display text-lg sm:text-xl text-white font-semibold">
                derp_holo_card_v2
              </h2>
              <p className="text-sm text-gray-400">
                Holographic trading card prototype
              </p>
            </div>
            <a
              href={cardPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-guardian-cyan hover:text-white transition-colors"
            >
              Open directly
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="p-3 sm:p-4 lg:p-6">
            <div className="rounded-xl overflow-hidden border border-guardian-cyan/20 bg-black min-h-[70vh]">
              <iframe
                src={cardPath}
                title="Holographic Card"
                className="w-full h-[70vh] sm:h-[75vh] lg:h-[80vh] bg-black"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
