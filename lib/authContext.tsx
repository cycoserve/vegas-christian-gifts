import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import Cookies from 'js-cookie';

interface User {
  email: string | null;
  uid: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseDisplayName(displayName: string | null): { firstName?: string; lastName?: string } {
  if (!displayName) return {};
  const names = displayName.split(' ');
  return {
    firstName: names[0],
    lastName: names.slice(1).join(' ') || undefined
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get the auth token and set it in a cookie
        const token = await firebaseUser.getIdToken();
        Cookies.set('auth_token', token, { secure: true, sameSite: 'strict' });
        
        const names = parseDisplayName(firebaseUser.displayName);
        setUser({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          firstName: names.firstName,
          lastName: names.lastName
        });
      } else {
        // Remove the auth token cookie when user is signed out
        Cookies.remove('auth_token');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        const token = await userCredential.user.getIdToken();
        Cookies.set('auth_token', token, { secure: true, sameSite: 'strict' });
        
        const names = parseDisplayName(userCredential.user.displayName);
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          firstName: names.firstName,
          lastName: names.lastName
        });
        const from = router.query.from as string;
        await router.push(from || '/account');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        throw new Error('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      } else {
        throw new Error('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      if (userCredential.user) {
        const token = await userCredential.user.getIdToken();
        Cookies.set('auth_token', token, { secure: true, sameSite: 'strict' });
        
        const names = parseDisplayName(userCredential.user.displayName);
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          firstName: names.firstName,
          lastName: names.lastName
        });
        const from = router.query.from as string;
        await router.push(from || '/account');
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login cancelled. Please try again.');
      } else {
        throw new Error('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('auth_token');
      await router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
