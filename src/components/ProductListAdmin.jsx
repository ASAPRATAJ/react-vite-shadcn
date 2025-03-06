import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.is_staff);
    }

    const fetchProductsAndTags = async () => {
      try {
        const productsResponse = await axios.get("https://ordermanagement-production-0b45.up.railway.app/api/products/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(productsResponse.data);
      } catch (error) {
        setError("There was an error fetching the products or tags!");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndTags();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/product-edit/${productId}`);
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
        <p className="text-center">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition duration-300 flex flex-col h-full"
            >
              <div className="flex-grow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold mb-2">{product.price} zł</p>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap space-x-2 mt-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
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
