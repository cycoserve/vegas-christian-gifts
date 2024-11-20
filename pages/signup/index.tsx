import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../lib/authContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export default function SignUp() {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      if (e.target.name === 'confirmPassword' && formData.password !== e.target.value) {
        setPasswordError('Passwords do not match');
      } else if (e.target.name === 'password' && formData.confirmPassword && formData.confirmPassword !== e.target.value) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
    setError(''); // Clear general error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`.trim()
      });

      // Redirect to account page or the page they came from
      const from = router.query.from as string;
      await router.push(from || '/account');
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsLoading(true);
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register with:</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full max-w-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} className="mr-2" />
            Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              required
              minLength={8}
            />
            <p className="mt-1 text-xs text-gray-500">Minimum length is 8 characters.</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              minLength={8}
            />
            {passwordError && (
              <p className="mt-1 text-xs text-red-500">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !!passwordError}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center">
          By creating an account, you agree to the{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          . We&apos;ll occasionally send you account-related emails.
        </p>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
