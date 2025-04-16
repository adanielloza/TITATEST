// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Create the context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // Firebase user object
  const [role, setRole] = useState(null);     // "admin" or "user"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes.
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Retrieve the user's role from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Assumes { role: "admin" } or { role: "user" }
        } else {
          // Optionally, handle the case when there is no user document.
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {/* Render children only when not loading authentication status */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming authentication context
export function useAuth() {
  return useContext(AuthContext);
}
