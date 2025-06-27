// Firebase Authentication context for CryptoDash
// ---------------------------------------------
// This context provides authentication state and actions to the app.

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Create the AuthContext
const AuthContext = createContext({
  user: null,
  loading: true,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
});

// AuthProvider component wraps the app and provides auth state/actions
export function AuthProvider({ children }) {
  // State for the current user (null if not logged in)
  const [user, setUser] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Create user object with email and displayName
        const userData = {
          email: firebaseUser.email,
          displayName: firebaseUser.email?.split("@")[0] ?? "User",
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sign up with email and password
  async function signUp(email, password) {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  }

  // Login with email and password
  async function login(email, password) {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  }

  // Logout the current user
  async function logout() {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  }

  // Provide user, loading, and auth actions to children
  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
} 