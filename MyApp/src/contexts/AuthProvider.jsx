import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoverUser = async () => {
      try {
        const recoveredUser = await AsyncStorage.getItem('user');
        if (recoveredUser) {
          setUser(JSON.parse(recoveredUser));
        }
      } catch (error) {
        console.error('Error recovering user data:', error);
      }
      setLoading(false);
    };

    recoverUser();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('idUsers');
      await AsyncStorage.removeItem('login');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
