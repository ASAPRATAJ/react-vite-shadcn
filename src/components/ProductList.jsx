import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [quantities, setQuantities] = useState({});
  const [addedProducts, setAddedProducts] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to be logged in to view the products.");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log("Logged in as:", decodedToken.username);
    } catch (e) {
      console.error("Failed to decode token:", e);
      setError("Invalid token.");
      setLoading(false);
      return;
    }

    const fetchProductsAndTags = async () => {
      try {
        const productsResponse = await axios.get("https://ordermanagement-production-0b45.up.railway.app/api/products/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tagsResponse = await axios.get("https://ordermanagement-production-0b45.up.railway.app/api/products/tags/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tagsWithAllOption = [{ id: "all", name: "Wszystkie" }, ...tagsResponse.data];
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setTags(tagsWithAllOption);
      } catch (error) {
        console.error("There was an error fetching the products or tags!", error);
        setError("There was an error fetching the products or tags!");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndTags();
  }, []);

  const handleTagChange = (tagId) => {
    setSelectedTag(tagId);

    if (tagId === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.tags.some((tag) => tag.id === parseInt(tagId))
      );
      console.log("Filtered products:", filtered);
      setFilteredProducts(filtered);
    }
  };

  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://ordermanagement-production-0b45.up.railway.app/api/cart/items/",
        { product_id: productId, quantity: quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const product = products.find((p) => p.id === productId);
      const productName = product ? product.title : "nieznany";
      setQuantities((prev) => ({
        ...prev,
        [productId]: 4,
      }));
      setAddedProducts((prev) => ({
        ...prev,
        [productId]: true,
      }));
      setTimeout(() => {
        setAddedProducts((prev) => ({
          ...prev,
          [productId]: false,
        }));
      }, 1500);
      setMessage(`${quantity} kg produktu "${productName}" zostało pomyślnie dodane do koszyka!`);
    } catch (error) {
      console.error("Błąd podczas dodawania produktu do koszyka:", error);
      setError("Nie udało się dodać produktu do koszyka.");
    }
  };

  const increaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 4) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] || 4;
      if (currentQuantity > 4) {
        return { ...prev, [productId]: currentQuantity - 1 };
      }
      return prev;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen px-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista produktów</h1>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <SuccessAlert message={message} onClose={() => setMessage(null)} />
      <div className="mb-6 flex justify-center">
        <select
          value={selectedTag}
          onChange={(e) => handleTagChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      {filteredProducts.length === 0 ? (
        <p className="text-center">Brak dostępnych produktów</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition duration-300 flex flex-col justify-between h-full"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="flex justify-center text-xl font-semibold mb-2">{product.title}</h3>
              <div
                className="product-description-container cursor-pointer"
                onClick={() => alert(product.description)}
              >
                <p className="flex justify-center text-gray-600 mb-2">{product.description}</p>
              </div>
              <p className="flex justify-center text-lg font-bold mb-2">{product.price} zł/kg</p>
              {product.tags && product.tags.length > 0 && (
                <div className="flex justify-center space-x-2 mt-2">
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
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  -
                </button>
                <span className="mx-2">{quantities[product.id] || 4}</span>
                <span className="mx-2"> kg </span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart(product.id, quantities[product.id] || 4)}
                className={`mt-4 w-full py-2 rounded-md transition duration-300 ${
                  addedProducts[product.id] ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {addedProducts[product.id] ? "Dodano!" : "Dodaj do koszyka"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
