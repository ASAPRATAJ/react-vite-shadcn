import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from './ErrorAlert'; // Import globalnego komponentu do wyświetlania błędów

const UserCreate = () => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Funkcja do pobierania wartości ciasteczka CSRF
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // Obsługa przesyłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const csrfToken = getCookie('csrftoken');

    try {
      await axios.post(
        'https://ordermanagement-production-0b45.up.railway.app/api/users/register/',
        {
          email,
          company_name: companyName,
          password,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );

      setMessage('Użytkownik został pomyślnie utworzony!');

      // Opcjonalnie przekieruj po kilku sekundach na stronę logowania
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Przekierowanie po 3 sekundach
    } catch (err) {
      console.error('Błąd rejestracji:', err);

      // Obsługa szczegółowych błędów
      if (err.response && err.response.data) {
        const errorData = err.response.data;

        // Wyświetl szczegółowe błędy (np. dla pola email lub password)
        if (errorData.email) {
          setError(`Email: ${errorData.email.join(' ')}`);
        } else if (errorData.password) {
          setError(`Hasło: ${errorData.password.join(' ')}`);
        } else if (errorData.detail) {
          setError(errorData.detail);
        } else {
          setError('Wystąpił nieznany błąd. Spróbuj ponownie.');
        }
      } else if (err.request) {
        // Brak odpowiedzi od serwera
        setError('Brak odpowiedzi od serwera. Spróbuj ponownie później.');
      } else {
        // Inny błąd
        setError(`Wystąpił błąd: ${err.message}`);
      }
    }
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Rejestracja</h2>

        {/* Globalny alert błędu */}
        <ErrorAlert error={error} onClose={() => setError(null)} />

        {/* Komunikat o sukcesie */}
        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-gray-700 font-semibold">
              Nazwa firmy:
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              aria-label="Company name"
              className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Hasło:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
