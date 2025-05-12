'use client';

import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';

export default function Header() {
  const { user, signOut } = useAuthContext();
  console.log(user);
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Note App
        </Link>
        <nav className="flex space-x-4">
          {user ? (
            <>
              <Link href="/notes" className="hover:underline">
                My Notes
              </Link>
              <button onClick={signOut} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
