import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorAlert from "./ErrorAlert";

function ProductCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://ordermanagement-production-0b45.up.railway.app/api/products/tags/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTags(response.data);
      } catch (err) {
        console.error("Error fetching tags:", err);
        if (err.response) {
          setError(`Wystąpił błąd (${err.response.status}): ${err.response.data.detail || "Nieznany błąd."}`);
        } else if (err.request) {
          setError("Brak odpowiedzi od serwera. Spróbuj ponownie później.");
        } else {
          setError(`Wystąpił nieoczekiwany błąd: ${err.message}`);
        }
      }
    };

    fetchTags();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) {
      alert("Nazwa tagu nie może być pusta!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/tags/create/",
        { name: newTagName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTags([...tags, response.data]);
      setNewTagName("");
    } catch (error) {
      console.error("Error creating new tag:", error);
      alert("Wystąpił błąd podczas tworzenia nowego tagu.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }
    selectedTags.forEach((tagId) => {
      formData.append("tag_ids", tagId); // Zmieniono z 'tags' na 'tag_ids'
    });

    axios
      .post("https://ordermanagement-production-0b45.up.railway.app/api/products/create/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage("Produkt został dodany pomyślnie!");
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
        setSelectedTags([]);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        setError("There was an error creating the product!");
      });
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl flex items-center justify-center font-bold text-gray-800 mb-6">Dodaj produkt</h2>
        {message && (
          <p className="flex items-center justify-center font-bold text-green-600 mb-4">{message}</p>
        )}
        {error && (
          <p className="flex items-center justify-center font-bold text-red-600 mb-4">{error}</p>
        )}
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
          <div>
            <label className="block text-gray-700 font-medium mb-2">Dodaj nowy tag:</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Nazwa nowego tagu"
                className="flex-grow px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Dodaj
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Dodaj produkt
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductCreate;
