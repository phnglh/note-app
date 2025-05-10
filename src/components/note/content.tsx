'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/config/firebaseConfig';
import { signOut, User } from 'firebase/auth';
import { ref, set, onValue, update, remove, push } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { Note } from '@/types/note';

export default function NotesContent() {
  const [user, setUser] = useState<User | null>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editNoteId, setEditNoteId] = useState<string | null>();
  const [editNoteText, setEditNoteText] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchNotes(currentUser.uid);
      } else {
        setNotes([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchNotes = (uid: string) => {
    try {
      const notesRef = ref(db, `users/${uid}/notes`);
      onValue(notesRef, (snapshot) => {
        const data = snapshot.val();
        const notesList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
        setNotes(notesList);
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const addNote = async () => {
    if (!newNote || !user) return;
    try {
      const notesRef = ref(db, `users/${user.uid}/notes`);
      const newNoteRef = push(notesRef);
      await set(newNoteRef, { text: newNote, createdAt: new Date().toISOString() });
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (id: string) => {
    if (!editNoteText) return;
    try {
      const noteRef = ref(db, `users/${user?.uid}/notes/${id}`);
      await update(noteRef, { text: editNoteText });
      setEditNoteId(null);
      setEditNoteText('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const noteRef = ref(db, `users/${user?.uid}/notes/${id}`);
      await remove(noteRef);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  console.log(notes);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Welcome, {user?.email}</h2>
        <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note"
          className="w-full p-2 border rounded"
        />
        <button onClick={addNote} className="mt-2 p-2 bg-green-500 text-white rounded">
          Add Note
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="flex items-center mb-2">
            {editNoteId === note.id ? (
              <div className="flex w-full">
                <input
                  type="text"
                  value={editNoteText}
                  onChange={(e) => setEditNoteText(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => updateNote(note.id)}
                  className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex w-full">
                <span className="flex-1">{note.text}</span>
                <button
                  onClick={() => {
                    setEditNoteId(note.id);
                    setEditNoteText(note.text);
                  }}
                  className="ml-2 p-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="ml-2 p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
