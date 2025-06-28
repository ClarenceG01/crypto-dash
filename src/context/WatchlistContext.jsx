import { createContext, useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * React context for the watchlist feature.
 * Provides default no-op implementations for actions and an empty watchlist.
 */
export const WatchlistContext = createContext({
    watchlist: [],
    addToWatchlist: () => {},
    removeFromWatchlist: () => {},
    isInWatchlist: () => false,
});

/**
 * WatchlistProvider component wraps its children with WatchlistContext.
 * - Loads the watchlist from localStorage on initial mount.
 * - Persists the watchlist to localStorage whenever it changes.
 * - Provides functions to add, remove, and check cryptocurrencies in the watchlist.
 *
 * @param children React children to be rendered within the provider.
 */
export function WatchlistProvider({ children }) {
    // State for the current user (null if not logged in)
    const [user, setUser] = useState(null);
    // State for the list of cryptocurrency IDs in the watchlist.
    const [watchlist, setWatchlist] = useState(() => {
        // On initial mount, try to load the watchlist from localStorage.
        const saved = localStorage.getItem('watchlist');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error parsing watchlist from localStorage", e);
            return [];
        }
    });

    // Listen for Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    // Load watchlist from Firestore if user is logged in
    useEffect(() => {
        if (!user) return; // Only fetch from Firestore if logged in
        async function fetchFirestoreWatchlist() {
            try {
                const docRef = doc(db, 'watchlists', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setWatchlist(docSnap.data().coins || []);
                }
            } catch (e) {
                console.error('Error loading watchlist from Firestore:', e);
            }
        }
        fetchFirestoreWatchlist();
    }, [user]);

    // Whenever the watchlist changes, persist it to Firestore (if logged in) and localStorage
    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        if (!user) return; // Only save to Firestore if logged in
        async function saveToFirestore() {
            try {
                const docRef = doc(db, 'watchlists', user.uid);
                await setDoc(docRef, { coins: watchlist });
            } catch (e) {
                console.error('Error saving watchlist to Firestore:', e);
            }
        }
        saveToFirestore();
    }, [watchlist, user]);

    // Add a cryptocurrency ID to the watchlist
    const addToWatchlist = (id) => {
        setWatchlist((prev) => prev.includes(id) ? prev : [...prev, id]);
    };

    // Remove a cryptocurrency ID from the watchlist
    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((item) => item !== id));
    };

    // Check if a cryptocurrency ID is in the watchlist
    const isInWatchlist = (id) => watchlist.includes(id);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, user }}>
            {children}
        </WatchlistContext.Provider>
    );
}