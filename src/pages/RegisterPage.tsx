import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../stores/useLanguageStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function RegisterPage() {
  const { language } = useLanguageStore();
  const { register, isLoading, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError(
        language === 'km'
          ? 'ពាក្យសម្ងាត់មិនត្រូវគ្នា'
          : 'Passwords do not match'
      );
      return;
    }

    await register(email, password);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {language === 'km' ? 'ចុះឈ្មោះ' : 'Register'}
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

            <Input
              label={language === 'km' ? 'បញ្ជាក់ពាក្យសម្ងាត់' : 'Confirm Password'}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={passwordError}
              icon={<Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
              placeholder={language === 'km' ? 'បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត' : 'Confirm your password'}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {language === 'km' ? 'ចុះឈ្មោះ' : 'Register'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {language === 'km' ? 'មានគណនីរួចហើយ?' : 'Already have an account?'}{' '}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            {language === 'km' ? 'ចូល' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
}