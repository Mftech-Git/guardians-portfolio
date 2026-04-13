import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
} from 'lucide-react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Wire up actual form handler
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Get In</span>{' '}
            <span className="text-guardian-cyan">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            I'm currently open to new opportunities. Whether you have a question,
            want to discuss a project, or just want to connect, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {isSubmitted ? (
              <div className="p-8 bg-guardian-navy/50 border border-guardian-cyan/50 rounded-xl text-center">
                <div className="w-16 h-16 bg-guardian-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-guardian-cyan" size={32} />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-gray-400 mb-6">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormState({ name: '', email: '', subject: '', message: '' })
                  }}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-display text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg text-white placeholder-gray-500 focus:border-guardian-cyan focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-display text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg text-white placeholder-gray-500 focus:border-guardian-cyan focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-display text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg text-white placeholder-gray-500 focus:border-guardian-cyan focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-display text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg text-white placeholder-gray-500 focus:border-guardian-cyan focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-guardian-cyan/30 border-t-guardian-cyan rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg"
            >
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="text-guardian-gold" size={20} />
                Direct Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:mftech@mainframetech.us" className="flex items-center gap-3 text-gray-400 hover:text-guardian-cyan transition-colors">
                    <Mail size={18} />
                    <span>mftech@mainframetech.us</span>
                  </a>
                </li>
                <li>
                  <a href="tel:5209064889" className="flex items-center gap-3 text-gray-400 hover:text-guardian-cyan transition-colors">
                    <Phone size={18} />
                    <span>520.906.4889</span>
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-3 text-gray-400">
                    <MapPin size={18} />
                    <span>Phoenix, Arizona</span>
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg"
            >
              <h3 className="font-display text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Clock className="text-guardian-cyan" size={20} />
                Response Time
              </h3>
              <p className="text-gray-400 text-sm">
                I typically respond within 24–48 hours. For urgent matters,
                please mention it in the subject line.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-gold/30 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 bg-guardian-cyan rounded-full animate-pulse" />
                <span className="font-display text-white font-semibold">Currently Available</span>
              </div>
              <p className="text-gray-400 text-sm">
                Open to full-time positions and contract work in systems administration,
                cloud infrastructure (M365/Entra ID), and IT leadership.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
