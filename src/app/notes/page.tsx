import NotesContent from '@/components/note/content';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
  title: 'Notes - My App',
  description: 'Manage your notes',
};

export default function NotesPage() {
  return (
    <ProtectedRoute redirectIfAuthenticated={false} redirectTo="/login">
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Notes</h1>
        <NotesContent />
      </div>
    </ProtectedRoute>
  );
}
