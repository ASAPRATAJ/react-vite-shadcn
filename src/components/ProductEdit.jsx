import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductEdit() {
  const { id } = useParams(); // Pobierz ID produktu z parametrów URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Stan do przechowywania obiektu pliku dla obrazu
  const [tags, setTags] = useState([]); // Stan do przechowywania tagów
  const [selectedTags, setSelectedTags] = useState([]); // Stan do przechowywania wybranych tagów
  const [isActive, setIsActive] = useState(false); // Stan do przechowywania statusu is_active
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Użyj useNavigate do przekierowania

  // Pobranie danych produktu i tagów
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');
      try {
        // Pobierz dane pojedynczego produktu na podstawie ID
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { title, description, price, tags, is_active } = response.data;
        setTitle(title);
        setDescription(description);
        setPrice(price);
        setSelectedTags(tags); // Ustaw tagi na podstawie odpowiedzi API
        setIsActive(is_active); // Ustaw wartość isActive na podstawie odpowiedzi API
      } catch (error) {
        setError('Wystąpił błąd podczas pobierania produktu!');
        console.error('Błąd podczas pobierania produktu:', error);
      }
    };

    const fetchTags = async () => {
      const token = localStorage.getItem('token');
      try {
        // Pobierz wszystkie dostępne tagi
        const response = await axios.get('http://127.0.0.1:8000/api/products/tags/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTags(response.data); // Ustaw pobrane tagi w stanie
      } catch (error) {
        setError('Wystąpił błąd podczas pobierania tagów.');
        console.error('Błąd podczas pobierania tagów:', error);
      }
    };

    fetchProduct();
    fetchTags();
  }, [id]);

  // Obsługa zmiany obrazu
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]); // Przechowuj obiekt pliku
    } else {
      setImage(null); // Resetuj, jeśli nie wybrano pliku
    }
  };

  // Obsługa zmiany tagów
  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId)); // Usuń tag, jeśli jest już wybrany
    } else {
      setSelectedTags([...selectedTags, tagId]); // Dodaj tag do wybranych
    }
  };

  // Obsługa przesyłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('is_active', isActive); // Dodaj status is_active do FormData

    if (image) {
      formData.append('image', image);
    }

    selectedTags.forEach((tagId) => {
      formData.append('tags', tagId);
    });

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/products/${id}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Produkt został zaktualizowany pomyślnie!');
      navigate('/products-admin'); // Przekieruj po pomyślnej aktualizacji
    } catch (error) {
      console.error(
        'Błąd podczas aktualizacji produktu:',
        error.response ? error.response.data : error.message
      );
      setError('Wystąpił błąd podczas aktualizacji produktu!');
    }
  };

  // Obsługa usuwania produktu
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Produkt został usunięty pomyślnie!');
      navigate('/products/admin'); // Przekieruj po pomyślnym usunięciu
    } catch (error) {
      console.error(
        'Błąd podczas usuwania produktu:',
        error.response ? error.response.data : error.message
      );
      setError('Wystąpił błąd podczas usuwania produktu!');
    }
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edytuj produkt</h2>

        {message && (
          <p className="flex items-center justify-center font-bold text-green-600 mb-4">
            {message}
          </p>
        )}
        {error && (
          <p className="flex items-center justify-center font-bold text-red-600 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tytuł:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Opis:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Cena:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Obraz produktu:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              accept="image/*"
            />
          </div>

          {/* Checkbox dla is_active */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Aktywny:</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)} // Przełącz wartość isActive
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>

          {/* Wyświetl tagi do wyboru */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tagi:</label>
            <div className="space-y-2">
              {tags.map((tag) => (
                <div key={tag.id}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)} // Sprawdź, czy tag jest wybrany
                      onChange={() => handleTagChange(tag.id)} // Zmień stan wybranych tagów
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{tag.name}</span> {/* Wyświetl nazwę tagu */}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Przyciski */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Zaktualizuj
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Usuń
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;
