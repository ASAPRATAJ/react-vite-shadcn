import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importujemy jwtDecode, aby odczytać token (opcjonalnie)

function ProductList() {
 const [products, setProducts] = useState([]);
 const [tags, setTags] = useState({});
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 // Dodajemy stan dla ilości produktów w koszyku
 const [quantities, setQuantities] = useState({});

 useEffect(() => {
   const token = localStorage.getItem('token');

   if (!token) {
     setError('You need to be logged in to view the products.');
     setLoading(false);
     return;
   }

   try {
     const decodedToken = jwtDecode(token);
     console.log('Logged in as:', decodedToken.username);
   } catch (e) {
     console.error('Failed to decode token:', e);
     setError('Invalid token.');
     setLoading(false);
     return;
   }

   const fetchProductsAndTags = async () => {
     try {
       const productsResponse = await axios.get('http://127.0.0.1:8000/api/products/', {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       const tagsResponse = await axios.get('http://127.0.0.1:8000/api/products/tags/', {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

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

 // Funkcja do dodawania produktu do koszyka
 const addToCart = async (productId, quantity) => {
   const token = localStorage.getItem('token');

   try {
     await axios.post('http://127.0.0.1:8000/api/cart/items/', {
       product_id: productId,
       quantity: quantity,
     }, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     alert('Product added to cart successfully!');
   } catch (error) {
     console.error('Error adding to cart:', error);
     alert('Failed to add product to cart.');
   }
 };

 // Funkcje do zwiększania i zmniejszania ilości
 const increaseQuantity = (productId) => {
   setQuantities((prev) => ({
     ...prev,
     [productId]: (prev[productId] || 0) + 1,
   }));
 };

 const decreaseQuantity = (productId) => {
   setQuantities((prev) => {
     const currentQuantity = prev[productId] || 0;
     if (currentQuantity > 0) {
       return {
         ...prev,
         [productId]: currentQuantity - 1,
       };
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

 if (error) {
   return (
     <div className="flex justify-center items-center h-screen">
       <p className="text-red-500">{error}</p>
     </div>
   );
 }

 return (
    <div className="w-full min-h-screen px-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      {products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
              <p className="text-lg font-bold mb-2">{product.price} zł/kg</p>

              {/* Wyświetlanie tagów */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap space-x-2 mt-2">
                  {product.tags.map((tagId) => (
                    <span
                      key={tagId}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {tags[tagId]}
                    </span>
                  ))}
                </div>
              )}

              {/* Kontrolki ilości */}
              <div className="flex items-center mt-4">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  -
                </button>
                <span className="mx-2">{quantities[product.id] || 0}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product.id, quantities[product.id] || 0)}
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

 );
}

export default ProductList;
