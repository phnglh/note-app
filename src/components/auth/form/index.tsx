'use client';

import Spinner from '@/components/ui/Spinner';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent } from 'react';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (field: string, value: string) => void;
  values: { name: string; email: string; password: string; confirmPassword?: string };
  loading?: boolean;
  error?: string | null;
}

export default function AuthForm({
  mode,
  onSubmit,
  onChange,
  values,
  loading,
  error,
}: AuthFormProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        {mode === 'register' && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="name"
              id="name"
              value={values.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('name', e.target.value)}
              placeholder="Enter your name"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('email', e.target.value)}
            placeholder="Enter your email"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('password', e.target.value)}
            placeholder="Enter your password"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Confirm Password Field (only for register) */}
        {mode === 'register' && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={values.confirmPassword || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange('confirmPassword', e.target.value)
              }
              placeholder="Confirm your password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Error Message */}
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {/* Submit Button and Links */}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Spinner />
                {mode === 'register' ? 'Registering...' : 'Logging in...'}
              </>
            ) : mode === 'register' ? (
              'Register'
            ) : (
              'Login'
            )}
          </button>

          <div className="mt-4 text-sm text-gray-600">
            {mode === 'login' ? (
              <span>
                Chưa có tài khoản?{' '}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => router.push('/register')}
                >
                  Đăng ký
                </span>
              </span>
            ) : (
              <span>
                Đã có tài khoản?{' '}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => router.push('/login')}
                >
                  Đăng nhập
                </span>
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
