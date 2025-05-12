import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
  title: 'Authentication - My App',
  description: 'Manage your account',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute redirectIfAuthenticated={true} redirectTo="/notes">
      {children}
    </ProtectedRoute>
  );
}
