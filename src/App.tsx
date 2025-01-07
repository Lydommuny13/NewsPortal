import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes';
import { useAuthStore } from './stores/useAuthStore';
import { useThemeStore } from './stores/useThemeStore';
import { initAuth } from './lib/auth';

const queryClient = new QueryClient();

// Helper component to handle location-based footer rendering
function AppContent() {
  const location = useLocation();
  const { setUser, setLoading } = useAuthStore();
  const { theme } = useThemeStore();

  // Don't show footer on these paths
  const hideFooterPaths = [
    '/profile',
    '/dashboard',
    '/admin'
  ];

  const shouldShowFooter = !hideFooterPaths.some(path => 
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    async function init() {
      try {
        const { user } = await initAuth();
        setUser(user);
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [setUser, setLoading]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppRoutes />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;