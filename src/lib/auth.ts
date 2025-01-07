import { supabase } from './supabase';
import { User } from '../types';

export type AuthError = {
  message: string;
  code?: string;
};

export async function initAuth() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return { user: null };

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, username, full_name, avatar_url, email')
      .eq('id', session.user.id)
      .single();

    return {
      user: {
        id: session.user.id,
        email: session.user.email!,
        role: profile?.role || 'reader',
        username: profile?.username,
        fullName: profile?.full_name,
        avatarUrl: profile?.avatar_url,
      } as User,
    };
  } catch (error) {
    console.error('Auth initialization error:', error);
    return { user: null };
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    if (!data.user) throw new Error('User not found');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, username, full_name, avatar_url, email')
      .eq('id', data.user.id)
      .single();

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        role: profile?.role || 'reader',
        username: profile?.username,
        fullName: profile?.full_name,
        avatarUrl: profile?.avatar_url,
      } as User,
    };
  } catch (error: any) {
    throw {
      message: error.message || 'Authentication failed',
      code: error.code,
    } as AuthError;
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    if (!data.user) throw new Error('Registration failed');

    // Create profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: data.user.email,
        role: 'reader'
      })
      .select()
      .single();

    if (profileError) throw profileError;

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        role: profile?.role || 'reader',
        username: profile?.username,
        fullName: profile?.full_name,
        avatarUrl: profile?.avatar_url,
      } as User,
    };
  } catch (error: any) {
    throw {
      message: error.message || 'Registration failed',
      code: error.code,
    } as AuthError;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}