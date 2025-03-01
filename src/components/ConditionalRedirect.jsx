import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ConditionalRedirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    const token = localStorage.getItem('token');

    if (token) {
      // Jeśli zalogowany, przekieruj bezpośrednio do docelowej strony
      navigate(to);
    } else {
      // Jeśli niezalogowany, przekieruj do logowania z parametrem redirect
      navigate(`/login?redirect=${to}`);
    }
  }, [navigate, to]);

  return null; // Ten komponent nie renderuje nic
};

export default ConditionalRedirect;
