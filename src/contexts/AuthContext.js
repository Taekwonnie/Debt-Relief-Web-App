import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //Sign up function
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  //Login Function
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  //Logout function
  function logout() {
    return auth.signOut();
  }

  //Reset password function
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  //Update email function
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  //Update password function
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  //Helper function
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //Export value to use in other files
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
