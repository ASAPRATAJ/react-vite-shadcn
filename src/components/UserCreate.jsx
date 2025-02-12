import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserCreate = () => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Funkcja do pobierania wartości ciasteczka
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const csrfToken = getCookie('csrftoken');

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/users/create/',
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

      setMessage('User created successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.email) {
          setError(errorData.email.join(' '));
        } else if (errorData.password) {
          setError(errorData.password.join(' '));
        } else if (errorData.detail) {
          setError(errorData.detail);
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
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
              Company Name:
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
              Password:
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
