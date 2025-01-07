import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { signInWithEmail, signUpWithEmail, signOut, AuthError } from '../lib/auth';
import { useLanguageStore } from '../stores/useLanguageStore';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { setUser } = useAuthStore();
  const { language } = useLanguageStore();
  const navigate = useNavigate();

  const getErrorMessage = (error: AuthError) => {
    switch (error.code) {
      case 'user_already_exists':
        return language === 'km'
          ? 'អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ'
          : 'This email is already registered';
      case 'invalid_credentials':
        return language === 'km'
          ? 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ'
          : 'Invalid email or password';
      default:
        return language === 'km'
          ? 'មានបញ្ហាកើតឡើង សូមព្យាយាមម្តងទៀត'
          : error.message || 'Something went wrong, please try again';
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const { user } = await signInWithEmail(email, password);
      setUser(user);
      navigate('/profile');
    } catch (err) {
      const authError = err as AuthError;
      setError(getErrorMessage(authError));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const { user } = await signUpWithEmail(email, password);
      setUser(user);
      navigate('/profile');
    } catch (err) {
      const authError = err as AuthError;
      setError(getErrorMessage(authError));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      // Clear user state
      setUser(null);
      // Clear any cached data or state
      localStorage.removeItem('sb-lcxsdrumvjvtzvswpkbg-auth-token');
      // Navigate to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
}