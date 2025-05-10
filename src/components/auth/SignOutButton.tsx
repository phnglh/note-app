'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

export default function SignOutButton() {
  const { signOut } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="border rounded p-1 text-sm" onClick={handleSignOut} disabled={loading}>
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
