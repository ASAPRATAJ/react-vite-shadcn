import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import setupAxiosInterceptors from './axiosInterceptor'; // Import interceptora

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Przechowuje dane użytkownika
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Czy użytkownik jest zalogowany
  const navigate = useNavigate();

  // Sprawdź token w localStorage przy pierwszym załadowaniu
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Sprawdź, czy token wygasł
        if (decodedToken.exp * 1000 < Date.now()) {
          handleLogout(); // Wyloguj użytkownika
        } else {
          setUser(decodedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Zalogowana sesja wygasła:', error);
        handleLogout(); // Wyloguj użytkownika w przypadku błędu
      }
    }
  }, []);

  // Funkcja do obsługi wylogowania
  const handleLogout = () => {
    localStorage.removeItem('token'); // Usuń token z localStorage
    setUser(null); // Wyzeruj dane użytkownika
    setIsAuthenticated(false); // Ustaw stan jako niezalogowany
    navigate('/login'); // Przekierowanie na stronę logowania
  };

  // Skonfiguruj interceptor Axios przy pierwszym renderze
  useEffect(() => {
    setupAxiosInterceptors(handleLogout);
  }, [handleLogout]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
