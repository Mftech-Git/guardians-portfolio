import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-guardian-black/80 backdrop-blur-md border-b border-guardian-trace/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Mainframe Tech"
                className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-guardian-cyan/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-white tracking-wider">
                MAINFRAME <span className="text-guardian-cyan">TECH</span>
              </span>
              <p className="text-[9px] text-guardian-gold/70 tracking-widest uppercase -mt-1">
                Guardians AZ - To Mend and Defend
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 font-body text-sm tracking-wide uppercase transition-colors"
              >
                <span className={`relative z-10 ${
                  location.pathname === link.path
                    ? 'text-guardian-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-guardian-cyan/10 border border-guardian-cyan/30 rounded"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-guardian-cyan transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-guardian-navy/95 backdrop-blur-md border-b border-guardian-trace/50"
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 font-body text-sm tracking-wide uppercase rounded transition-colors ${
                location.pathname === link.path
                  ? 'bg-guardian-cyan/10 text-guardian-cyan border border-guardian-cyan/30'
                  : 'text-gray-400 hover:text-white hover:bg-guardian-trace/30'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}
