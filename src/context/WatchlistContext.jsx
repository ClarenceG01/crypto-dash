import { createContext, useEffect, useState } from 'react';

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
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error parsing watchlist from localStorage", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (id) => {
        setWatchlist((prev) => [...prev, id]);
    };

    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((item) => item !== id));
    };

    const isInWatchlist = (id) => watchlist.includes(id);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}