import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavProps {
  current: string;
  onNavigate: (page: string, hash?: string) => void;
}

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'pricing', label: 'Pricing & Plans' },
  { id: 'home#banking', label: 'Business Banking' },
  { id: 'home#resources', label: 'Resources' },
];

export default function Navigation({ current, onNavigate }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handle = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  const activePage = current === 'home' ? 'home' : 'pricing';

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <button
          onClick={() => handle('home')}
          className="flex items-center"
          aria-label="Ledgerline home"
        >
          <Logo className="h-8 w-auto" />
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const page = l.id.split('#')[0];
            const isActive = page === activePage;
            return (
              <button
                key={l.id}
                onClick={() => handle(l.id)}
                className={`rounded-[6px] px-3.5 py-2 font-heading text-sm font-medium transition-colors ${
                  isActive ? 'text-accent-600' : 'text-primary/80 hover:text-primary hover:bg-bg'
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>

        <div className="hidden md:block">
          <button onClick={() => handle('pricing')} className="btn-primary">
            Explore Plans
          </button>
        </div>

        <button
          className="rounded-[6px] p-2 text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-surface animate-fade-in">
          <div className="container-px flex flex-col py-3">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handle(l.id)}
                className="rounded-[6px] px-3 py-3 text-left font-heading text-sm font-medium text-primary hover:bg-bg"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handle('pricing')}
              className="btn-primary mt-2 w-full"
            >
              Explore Plans
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
