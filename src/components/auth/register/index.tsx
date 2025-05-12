'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import AuthForm from '../form';
import { auth, db } from '@/config/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { ref, set } from 'firebase/database';

export default function RegisterContainer() {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: values.name });

      await set(ref(db, 'users/' + user.uid), {
        name: values.name,
        email: values.email,
        createdAt: new Date().toISOString(),
        role: 'user',
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-email':
            setError('Invalid email format.');
            break;
          case 'auth/email-already-in-use':
            setError('This email is already registered.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Must be at least 6 characters.');
            break;
          case 'auth/too-many-requests':
            setError('Too many attempts. Please try again later.');
            break;
          default:
            setError(err.message);
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="register"
      onSubmit={handleSubmit}
      onChange={handleChange}
      values={values}
      loading={loading}
      error={error}
    />
  );
}
