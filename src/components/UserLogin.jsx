import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const UserLogin = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
       e.preventDefault();
       setError(''); // Czyścimy wcześniejsze błędy

       try {
           const response = await axios.post('http://127.0.0.1:8000/api/users/token/create/', {
               email,
               password
           });

           const { access } = response.data;

           // Zapisanie tokenu do localStorage
           localStorage.setItem('token', access);

           // Dekodowanie tokenu, aby sprawdzić uprawnienia
           const decodedToken = jwtDecode(access);
           console.log('Decoded Token:', decodedToken);

           // Zapisanie informacji o użytkowniku do localStorage
           localStorage.setItem('user', JSON.stringify({
               isStaff: decodedToken.is_staff,
               isSuperUser: decodedToken.is_superuser,
           }));

           // Przekierowanie na stronę główną po zalogowaniu
           navigate('/home');

           // Odświeżenie strony po zalogowaniu
           window.location.reload();

       } catch (error) {
           console.error('Login error:', error);
           if (error.response && error.response.data) {
               // Sprawdzamy odpowiedź serwera na błąd
               const errorData = error.response.data;
               if (errorData.detail) {
                   setError(errorData.detail); // Wyświetlamy szczegółowy błąd
               } else {
                   setError('Invalid email or password'); // Domyślny komunikat
               }
           } else {
               setError('Network error. Please try again later.'); // Błąd sieciowy
           }
       }
   };

   return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition duration-300"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>


   );
};

export default UserLogin;
