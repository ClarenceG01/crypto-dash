import { createContext, useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    // Mock userId for now; replace with real auth user id later
    const userId = 'demoUser';

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

    // Load watchlist from Firestore if user is logged in (mocked here)
    useEffect(() => {
        async function fetchFirestoreWatchlist() {
            try {
                // Reference to the user's watchlist document in Firestore
                const docRef = doc(db, 'watchlists', userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // If Firestore doc exists, use it
                    setWatchlist(docSnap.data().coins || []);
                }
            } catch (e) {
                console.error('Error loading watchlist from Firestore:', e);
            }
        }
        fetchFirestoreWatchlist();
    }, [userId]);

    // Whenever the watchlist changes, persist it to Firestore and localStorage
    useEffect(() => {
        // Save to localStorage for offline/guest use
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        // Save to Firestore for logged-in users (mocked)
        async function saveToFirestore() {
            try {
                const docRef = doc(db, 'watchlists', userId);
                await setDoc(docRef, { coins: watchlist });
            } catch (e) {
                console.error('Error saving watchlist to Firestore:', e);
            }
        }
        saveToFirestore();
    }, [watchlist, userId]);

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
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}