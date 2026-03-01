import { useEffect, useState } from 'react';
import { LayoutDashboard, Moon, Sun } from 'lucide-react';
import { LandingPage } from '@/components/sections/LandingPage';
import { Dashboard } from '@/components/sections/Dashboard';
import { Button } from '@/components/ui/button';
import { AdminPanel } from '@/components/sections/AdminPanel';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">InstaScale AI</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <Button variant="outline" onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />} Theme
            </Button>
          </div>
        </div>
      </header>
      <LandingPage />
      <Dashboard />
      <AdminPanel />
      <footer className="border-t border-border/70 py-6 text-center text-sm text-foreground/70">
        © {new Date().getFullYear()} InstaScale AI · Instagram analytics SaaS
      </footer>
    </div>
  );
}
