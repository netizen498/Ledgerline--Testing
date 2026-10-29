import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { DISCLAIMER } from '@/lib/plans';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-primary text-white">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-8 w-auto" variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A clearer view of your business finances. Business banking and financing
              information for SMEs and finance teams in Accra, Ghana.
            </p>
            <div className="mt-5 flex items-start gap-2 text-xs text-white/50">
              <ShieldCheck size={14} className="mt-0.5 shrink-0" />
              <span>{DISCLAIMER}</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/40">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('pricing')} className="text-white/70 hover:text-white">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home#banking')} className="text-white/70 hover:text-white">
                  Business Banking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home#cashflow')} className="text-white/70 hover:text-white">
                  Cash-flow insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home#financing')} className="text-white/70 hover:text-white">
                  Financing options
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/40">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>Resources</li>
              <li>Security</li>
              <li>Pricing terms</li>
              <li>Enquiries</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/40">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent-400" />
                <span>6 Aviation Road, Airport City, Accra</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-accent-400" />
                <span>+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-accent-400" />
                <span>hello@ledgerline.demo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© 2026 Ledgerline. A fictional demonstration. All rights reserved.</p>
          <p>Location: Airport City, Accra, Ghana · Currency: GHS</p>
        </div>
      </div>
    </footer>
  );
}
