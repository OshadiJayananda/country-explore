// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [firestoreError, setFirestoreError] = useState(null);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Create a user document in Firestore
        return (
          setDoc(doc(db, "users", userCredential.user.uid)),
          {
            favorites: [],
          }
        );
      }
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function addFavorite(countryCode) {
    if (!user) return;

    try {
      setFirestoreError(null);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favorites: arrayUnion(countryCode),
      });
      setFavorites((prev) => [...prev, countryCode]);
    } catch (error) {
      console.error("Error adding favorite:", error);
      setFirestoreError("Failed to update favorites. Please try again.");
    }
  }

  async function removeFavorite(countryCode) {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favorites: arrayRemove(countryCode),
      });
      setFavorites((prev) => prev.filter((code) => code !== countryCode));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get user's favorites from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        } else {
          // Create user document if it doesn't exist
          await setDoc(doc(db, "users", currentUser.uid), { favorites: [] });
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    favorites,
    signup,
    login,
    logout,
    addFavorite,
    removeFavorite,
    isFavorite: (countryCode) => favorites.includes(countryCode),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
