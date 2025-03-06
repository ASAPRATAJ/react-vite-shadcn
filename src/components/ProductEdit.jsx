import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://ordermanagement-production-0b45.up.railway.app/api/products/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { title, description, price, tags, is_active } = response.data;
        setTitle(title);
        setDescription(description);
        setPrice(price);
        setSelectedTags(tags.map((tag) => tag.id));
        setIsActive(is_active);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania produktu!");
        console.error("Błąd podczas pobierania produktu:", error);
      }
    };

    const fetchTags = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://ordermanagement-production-0b45.up.railway.app/api/products/tags/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTags(response.data);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania tagów.");
        console.error("Błąd podczas pobierania tagów:", error);
      }
    };

    fetchProduct();
    fetchTags();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("is_active", isActive);
    if (image) {
      formData.append("image", image);
    }
    selectedTags.forEach((tagId) => {
      formData.append("tag_ids", tagId); // Zmieniono z 'tags' na 'tag_ids'
    });

    try {
      await axios.put(`https://ordermanagement-production-0b45.up.railway.app/api/products/${id}/update/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Produkt został zaktualizowany pomyślnie!");
      navigate("/products-admin");
    } catch (error) {
      console.error("Błąd podczas aktualizacji produktu:", error.response ? error.response.data : error.message);
      setError("Wystąpił błąd podczas aktualizacji produktu!");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://ordermanagement-production-0b45.up.railway.app/api/products/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Produkt został usunięty pomyślnie!");
      navigate("/products-admin");
    } catch (error) {
      console.error("Błąd podczas usuwania produktu:", error.response ? error.response.data : error.message);
      setError("Wystąpił błąd podczas usuwania produktu!");
    }
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edytuj produkt</h2>
        {message && (
          <p className="flex items-center justify-center font-bold text-green-600 mb-4">{message}</p>
        )}
        {error && (
          <p className="flex items-center justify-center font-bold text-red-600 mb-4">{error}</p>
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
          <div>
            <label className="block text-gray-700 font-medium mb-2">Aktywny:</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tagi:</label>
            <div className="space-y-2">
              {tags.map((tag) => (
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
