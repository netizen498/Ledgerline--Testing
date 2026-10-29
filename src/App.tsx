import { useEffect, useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';

function parseHash(): { page: 'home' | 'pricing'; hash: string } {
  const raw = window.location.hash.replace(/^#/, '');
  if (raw.startsWith('pricing')) return { page: 'pricing', hash: raw.replace('pricing', '') };
  return { page: 'home', hash: raw };
}

export default function App() {
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((target: string) => {
    if (target === 'home' || target === '') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setRoute({ page: 'home', hash: '' });
      return;
    }
    if (target.startsWith('pricing')) {
      window.location.hash = target;
      if (target === 'pricing') window.scrollTo({ top: 0, behavior: 'smooth' });
      setRoute(parseHash());
      return;
    }
    // home with hash section
    window.location.hash = target.startsWith('home#') ? target.replace('home#', '') : target;
    setRoute({ page: 'home', hash: target.split('#')[1] ?? '' });
    // scroll to section after render
    setTimeout(() => {
      const el = document.getElementById(target.split('#')[1] ?? '');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }, []);

  // scroll to hash on page change
  useEffect(() => {
    if (route.hash) {
      const el = document.getElementById(route.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [route]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation current={route.page} onNavigate={navigate} />
      <main className="flex-1">
        {route.page === 'pricing' ? <Pricing onNavigate={navigate} /> : <Home onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
