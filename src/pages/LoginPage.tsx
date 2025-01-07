import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../stores/useLanguageStore';
import { useAuthStore } from '../stores/useAuthStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { language } = useLanguageStore();
  const { login, isLoading, error } = useAuth();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect to profile if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {language === 'km' ? 'ចូលគណនី' : 'Sign In'}
        </h1>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              label={language === 'km' ? 'អ៊ីមែល' : 'Email'}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
              placeholder={language === 'km' ? 'បញ្ចូលអ៊ីមែល' : 'Enter your email'}
            />

            <Input
              label={language === 'km' ? 'ពាក្យសម្ងាត់' : 'Password'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
              placeholder={language === 'km' ? 'បញ្ចូលពាក្យសម្ងាត់' : 'Enter your password'}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {language === 'km' ? 'ចូល' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {language === 'km' ? 'មិនទាន់មានគណនី?' : "Don't have an account?"}{' '}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            {language === 'km' ? 'ចុះឈ្មោះ' : 'Register'}
          </Link>
        </p>
      </div>
    </div>
  );
}