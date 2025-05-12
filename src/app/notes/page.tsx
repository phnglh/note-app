import NotesContent from '@/components/note/content';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
  title: 'Notes - My App',
  description: 'Manage your notes',
};

export default function NotesPage() {
  return (
    <ProtectedRoute redirectIfAuthenticated={false} redirectTo="/login">
      <main className="max-w-7xl mx-auto py-6">
        <NotesContent />
      </main>
    </ProtectedRoute>
  );
}
