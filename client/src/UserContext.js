import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the UserContext
const UserContext = createContext();

// UserProvider component wraps your app and provides user state and setter
export const UserProvider = ({ children }) => {
  // user state holds the logged-in user info (null if not logged in)
  const [user, setUser] = useState(null);
  
  // initialized state tells if we finished loading user info from server
  const [initialized, setInitialized] = useState(false);

  // useEffect runs once on mount to fetch user info from /me endpoint
  useEffect(() => {
    axios.get("https://rhombus-tnso.onrender.com/api/auth/me", { withCredentials: true })
      .then(res => {
        // setUser with the user data received from backend
        setUser(res.data.user);
      })
      .catch(() => {
        // on error or no user, setUser to null
        setUser(null);
      })
      .finally(() => {
        // mark initialized true after the request is done
        setInitialized(true);
      });
  }, []);

  // Provide user, setUser, and initialized flag to children components
  return (
    <UserContext.Provider value={{ user, setUser, initialized }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access to UserContext in your components
export const useUser = () => useContext(UserContext);
