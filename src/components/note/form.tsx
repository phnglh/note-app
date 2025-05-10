'use client';

import { useState, FormEvent } from 'react';
import { Note } from '@/types/note';
import Spinner from '../ui/Spinner';

interface NoteFormProps {
  onSubmit: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  initialValues?: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
  loading?: boolean;
}

export default function NoteForm({ onSubmit, initialValues, loading }: NoteFormProps) {
  const [formData, setFormData] = useState({
    text: initialValues?.text || '',
    content: initialValues?.content || '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex items-center justify-center py-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.text}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter note title"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content Field */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="Enter note content"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-y"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Spinner />
              Saving...
            </>
          ) : (
            'Save Note'
          )}
        </button>
      </form>
    </div>
  );
}
