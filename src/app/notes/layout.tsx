import ProtectedRoute from '@/components/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'View your notes',
};

export default function NoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute redirectIfUnauthenticated={true} redirectTo="/login">
      <main className="flex flex-col justify-center items-center">{children}</main>
    </ProtectedRoute>
  );
}
