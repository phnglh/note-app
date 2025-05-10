import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export const metadata = {
  title: 'Authentication - My App',
  description: 'Manage your account',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute redirectIfAuthenticated={true} redirectTo="/notes">
      <main className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Note App
            </Link>
            <nav className="flex space-x-4">
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </footer>
      </main>
    </ProtectedRoute>
  );
}
