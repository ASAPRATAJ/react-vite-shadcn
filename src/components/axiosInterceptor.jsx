import axios from 'axios';

const setupAxiosInterceptors = (handleLogout) => {
  // Dodaj interceptor dla odpowiedzi
  axios.interceptors.response.use(
    (response) => response, // Zwróć odpowiedź, jeśli jest poprawna
    (error) => {
      if (error.response && error.response.status === 401) {
        // Jeśli serwer zwrócił 401 Unauthorized
        handleLogout(); // Wyloguj użytkownika
      }
      return Promise.reject(error); // Zwróć błąd, aby można było go obsłużyć lokalnie
    }
  );
};

export default setupAxiosInterceptors;
