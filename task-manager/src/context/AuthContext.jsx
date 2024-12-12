import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function loginWithGoogle() {
        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Erro ao fazer login com Google:', error);
        }
    }


    const value = {
        currentUser,
        login,
        loginWithGoogle,
          
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
