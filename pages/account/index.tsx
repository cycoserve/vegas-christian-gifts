import RootLayout from '../../components/Layouts/RootLayout';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useWishlist } from '../../lib/wishlistContext';




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
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {wishlist.map((item) => (
                                        <div key={item.id} className="p-6 bg-card rounded-lg shadow-md relative">
                                            <button 
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 transition-colors"
                                                aria-label="Remove from wishlist"
                                            >
                                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                            </button>
                                            <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                                            <p className="mb-2">${item.price}</p>
                                        </div>
                                    ))}
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
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
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
