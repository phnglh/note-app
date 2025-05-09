'use client';
import { auth } from '@/config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/notes');
      } else {
        router.push('/login');
      }
    });
    return () => unsub();
  }, [router]);

  return null;
}
