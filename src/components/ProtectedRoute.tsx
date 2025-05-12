'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectIfUnauthenticated?: boolean;
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectIfUnauthenticated = false,
  redirectIfAuthenticated = false,
  redirectTo = '/notes',
}: ProtectedRouteProps) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (redirectIfAuthenticated && user) {
      router.push(redirectTo);
    }

    if (redirectIfUnauthenticated && !user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectIfAuthenticated, redirectIfUnauthenticated, redirectTo]);

  if (redirectIfUnauthenticated && !user) return null;

  return <>{children}</>;
}
