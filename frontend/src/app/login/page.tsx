'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { client } from '@/services/graphql';
import { GET_USER_BY_EMAIL } from '@/lib/queries';
import { User } from '@/lib/types';

interface GetUserByEmailResponse {
  userByEmail: User;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { userByEmail } = await client.request<GetUserByEmailResponse>(GET_USER_BY_EMAIL, { email });
      if (userByEmail) {
        login(userByEmail);
        router.push('/');
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('User not found or an error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your EdTech account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full btn-primary text-center py-3 rounded-xl font-semibold text-white"
            >
              Sign in
            </button>
          </form>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Test Accounts:</p>
            <div className="text-xs text-blue-600 space-y-1">
              <p>• john.doe@example.com (Student)</p>
              <p>• jane.smith@example.com (Student)</p>
              <p>• alice.johnson@example.com (Professor)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
