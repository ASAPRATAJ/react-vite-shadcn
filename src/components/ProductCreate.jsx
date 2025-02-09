import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]); // Stan do przechowywania tagów
  const [selectedTags, setSelectedTags] = useState([]); // Stan do przechowywania wybranych tagów
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/products/tags/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTags(response.data); // Ustawiamy pobrane tagi w stanie
      } catch (error) {
        console.error('Error fetching tags:', error);
        setError('There was an error fetching the tags.');
      }
    };

    fetchTags();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId)); // Usuwamy tag, jeśli już jest wybrany
    } else {
      setSelectedTags([...selectedTags, tagId]); // Dodajemy tag do wybranych
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }
    // Dodajemy wybrane tagi do formData
    selectedTags.forEach(tagId => {
      formData.append('tags', tagId);
    });

    axios.post(
      'http://127.0.0.1:8000/api/products/create/',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((response) => {
      setMessage('Produkt został dodany pomyślnie!');
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
      setSelectedTags([]);
    })
    .catch((error) => {
      setError('There was an error creating the product!');
    });
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl flex items-center justify-center font-bold text-gray-800 mb-6">Dodaj produkt</h2>

        {message && <p className="flex items-center justify-center font-bold text-green-600 mb-4">{message}</p>}
        {error && <p className="flex items-center justify-center font-bold text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nazwa:</label>
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
            <label className="block text-gray-700 font-medium mb-2">Zdjęcie produktu:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              accept="image/*"
            />
          </div>

          {/* Wyświetlanie tagów do wyboru */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tags:</label>
            <div className="space-y-2">
              {tags.map(tag => (
                <div key={tag.id}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagChange(tag.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{tag.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductCreate;
