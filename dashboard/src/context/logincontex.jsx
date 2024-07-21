// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:5500/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        setUser({ id: token, ...response.data });
      }).catch(() => {
        localStorage.removeItem('authToken');
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('authToken', userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ User, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
