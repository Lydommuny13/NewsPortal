import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Newspaper, Settings, User } from 'lucide-react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { LanguageSwitch } from './LanguageSwitch';
import { Button } from '../ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const location = useLocation();
  const isAdminSection = location.pathname.startsWith('/admin');

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-gray-800 transition-all duration-200 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Newspaper className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'km' ? 'ព័ត៌មាន' : 'News'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <LanguageSwitch />
            
            {user ? (
              <div className="flex items-center gap-4">
                {isAdminSection ? (
                  <Link to="/">
                    <Button variant="secondary">
                      <Newspaper className="w-4 h-4 mr-2" />
                      {language === 'km' ? 'ទំព័រព័ត៌មាន' : 'News Site'}
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/profile">
                      <Button variant="secondary">
                        <User className="w-4 h-4 mr-2" />
                        {language === 'km' ? 'គណនី' : 'Profile'}
                      </Button>
                    </Link>
                    {user.role === 'admin' && (
                      <>
                        <Link to="/dashboard">
                          <Button variant="secondary">
                            {language === 'km' ? 'ផ្ទាំងគ្រប់គ្រង' : 'Dashboard'}
                          </Button>
                        </Link>
                        <Link to="/admin">
                          <Button variant="secondary">
                            <Settings className="w-4 h-4 mr-2" />
                            {language === 'km' ? 'អ្នកគ្រប់គ្រង' : 'Admin'}
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button>
                  {language === 'km' ? 'ចូល' : 'Login'}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <div className="flex items-center gap-2 px-3 py-2">
                <LanguageSwitch />
              </div>
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {language === 'km' ? 'ទំព័រដើម' : 'Home'}
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {language === 'km' ? 'គណនី' : 'Profile'}
                  </Link>
                  {user.role === 'admin' && (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {language === 'km' ? 'ផ្ទាំងគ្រប់គ្រង' : 'Dashboard'}
                      </Link>
                      <Link
                        to="/admin"
                        className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {language === 'km' ? 'អ្នកគ្រប់គ្រង' : 'Admin'}
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'km' ? 'ចូល' : 'Login'}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}