import RootLayout from '../../components/Layouts/RootLayout';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useWishlist } from '../../lib/wishlistContext';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

const Account = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(auth.currentUser);
    const { wishlist, isLoading, removeFromWishlist } = useWishlist();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setEmail('');
            setPassword('');
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (isLoading) {
        return (
            <RootLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            </RootLayout>
        );
    }

    return (
        <RootLayout>
            <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-background text-foreground">
                <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8">
                    {user ? (
                        <>
                            <section className="w-full">
                                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                                <div className="flex flex-col md:flex-row items-center p-6 bg-card rounded-lg shadow-md">
                                    <div className="flex flex-col items-center md:items-start">
                                        <p className="text-xl font-semibold mb-2">{user.email}</p>
                                        <button
                                            onClick={handleSignOut}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <section className="w-full">
                                <h2 className="text-2xl font-bold mb-4">My Wishlist ({wishlist.length} items)</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {wishlist.map((item) => (
                                        <div key={item.id} className="p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <div className="relative w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                                    {item.images && item.images.length > 0 ? (
                                                        <Image
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover hover:scale-105 transition-transform duration-200"
                                                            sizes="(max-width: 640px) 100vw, 128px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span className="text-gray-400">No image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow space-y-2">
                                                    <h3 className="text-lg font-bold line-clamp-2">{item.name}</h3>
                                                    <p className="text-xl font-semibold text-primary">${item.price}</p>
                                                </div>
                                                <div className="flex items-center sm:self-start mt-2 sm:mt-0">
                                                    <Button 
                                                        variant="ghost"
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-full"
                                                        aria-label="Remove from wishlist"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {wishlist.length === 0 && (
                                        <div className="text-center p-8 bg-card rounded-lg">
                                            <p className="text-gray-500">Your wishlist is empty</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </>
                    ) : (
                        <section className="w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">
                                {isSignUp ? 'Create Account' : 'Sign In'}
                            </h2>
                            <form onSubmit={handleAuth} className="space-y-4">
                                {error && (
                                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                                        {error}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                                >
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                </button>
                            </form>
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="w-full text-center mt-4 text-primary hover:underline"
                            >
                                {isSignUp
                                    ? 'Already have an account? Sign in'
                                    : "Don't have an account? Sign up"}
                            </button>
                        </section>
                    )}
                </div>
            </div>
        </RootLayout>
    );
};

export default Account;
