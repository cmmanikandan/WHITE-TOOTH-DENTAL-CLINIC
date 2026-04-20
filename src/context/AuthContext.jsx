import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        setUser(user);
        if (user) {
          setUserData(null);
          // Fetch additional user data from Firestore (role, name, etc.)
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            // Check in patients collection if not in users
            const patientDoc = await getDoc(doc(db, 'patients', user.uid));
            if (patientDoc.exists()) {
              setUserData({ ...patientDoc.data(), role: 'patient' });
            } else {
              setUserData(null);
            }
          }
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("AuthContext Error:", err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userData,
    loading,
    role: userData?.role || null,
    isAdmin: userData?.role === 'admin',
    isDoctor: userData?.role === 'doctor',
    isReception: userData?.role === 'reception',
    isPatient: userData?.role === 'patient',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
