import { Link } from 'react-router-dom'
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-guardian-navy border-t border-guardian-trace/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Mainframe Tech" className="h-10 w-10" />
              <div>
                <span className="font-display text-lg font-bold text-white tracking-wider">
                  MAINFRAME <span className="text-guardian-cyan">TECH</span>
                </span>
                <p className="text-[9px] text-guardian-gold/70 tracking-widest uppercase">
                  Guardians AZ - To Mend and Defend
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              IT Professional specializing in Microsoft 365, Windows Server infrastructure,
              automation, and enterprise systems administration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-guardian-gold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Resume', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-guardian-cyan transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://linkedin.com/in/levi-oniszko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-guardian-cyan transition-colors text-sm"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-guardian-gold mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:loniszko@mainframetech.us"
                  className="flex items-center gap-2 text-gray-400 hover:text-guardian-cyan transition-colors text-sm"
                >
                  <Mail size={16} />
                  <span>loniszko@mainframetech.us</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:5209064889"
                  className="flex items-center gap-2 text-gray-400 hover:text-guardian-cyan transition-colors text-sm"
                >
                  <Phone size={16} />
                  <span>520.906.4889</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin size={16} />
                  <span>Tucson, Arizona</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-guardian-trace/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Mainframe Tech LLC - Guardians AZ. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs font-mono">
            Built with React + Vite &bull; Self-hosted with pride
          </p>
        </div>
      </div>
    </footer>
  )
}
