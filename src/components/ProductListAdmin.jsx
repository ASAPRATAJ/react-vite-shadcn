import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importujemy bibliotekę do dekodowania JWT
import { useNavigate } from 'react-router-dom'; // Zmieniamy useHistory na useNavigate

function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // Stan admina
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Zmieniamy useHistory na useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Dekodowanie tokena, aby odczytać rolę użytkownika (is_staff)
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.is_staff); // Ustawiamy stan na podstawie is_staff
    }

    const fetchProductsAndTags = async () => {
      try {
        // Pobieranie produktów
        const productsResponse = await axios.get('http://127.0.0.1:8000/api/products/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Pobieranie tagów
        const tagsResponse = await axios.get('http://127.0.0.1:8000/api/products/tags/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Mapowanie tagów, aby można było szybko dopasować ID -> Nazwa
        const tagsMap = {};
        tagsResponse.data.forEach(tag => {
          tagsMap[tag.id] = tag.name;  // Mapujemy tag ID na jego nazwę
        });

        setProducts(productsResponse.data);  // Ustaw produkty
        setTags(tagsMap);  // Ustaw tagi (ID -> Nazwa)
      } catch (error) {
        setError('There was an error fetching the products or tags!');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndTags();
  }, []);

  // Funkcja do edycji produktu, nawigacja do odpowiedniego widoku
  const handleEdit = (productId) => {
    navigate(`/product-edit/${productId}`); // Używamy navigate zamiast history.push
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-screen mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Zarządzaj produktami</h1>
      {products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-2">{product.price} zł</p>

              {/* Wyświetlanie tagów */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap space-x-2 mt-2">
                  {product.tags.map((tagId) => (
                    <span
                      key={tagId}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {tags[tagId]} {/* Wyświetlanie nazwy tagu na podstawie ID */}
                    </span>
                  ))}
                </div>
              )}

              {/* Wyświetlanie przycisku Edytuj produkt tylko dla admina */}
              {isAdmin && (
                <button
                  onClick={() => handleEdit(product.id)}
                  className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Edytuj produkt
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListAdmin;
