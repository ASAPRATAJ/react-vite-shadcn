import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Usunięcie tokenu i danych o użytkowniku z localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Funkcja do odświeżenia strony
        const refreshPage = () => {
            window.location.reload(); // Odświeża stronę
        };

        // Przekierowanie do strony logowania i odświeżenie strony
        navigate('/home');
        refreshPage();

    }, [navigate]);

    return <h2>Logging out...</h2>; // Możesz dodać komunikat ładowania lub spinner
};

export default UserLogout;
