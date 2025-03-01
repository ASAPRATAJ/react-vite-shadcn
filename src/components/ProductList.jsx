import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importujemy jwtDecode, aby odczytać token (opcjonalnie)
import ErrorAlert from './ErrorAlert'; // Import komponentu do wyświetlania błędów
import SuccessAlert from './SuccessAlert'; // Import komponentu do wyświetlania sukcesów

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Produkty po filtracji
  const [tags, setTags] = useState([]); // Lista tagów
  const [selectedTag, setSelectedTag] = useState('all'); // Wybrany tag (domyślnie "all")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // Przechowuje komunikaty o sukcesie
  const [quantities, setQuantities] = useState({});
  // Dodaj nowy stan dla animacji
  const [addedProducts, setAddedProducts] = useState({});
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
        const productsResponse = await axios.get('https://ordermanagement-production-0b45.up.railway.app/api/products/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tagsResponse = await axios.get('https://ordermanagement-production-0b45.up.railway.app/api/products/tags/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tagsWithAllOption = [{ id: 'all', name: 'Wszystkie' }, ...tagsResponse.data];

        setProducts(productsResponse.data); // Ustaw produkty
        setFilteredProducts(productsResponse.data); // Domyślnie wyświetl wszystkie produkty
        setTags(tagsWithAllOption); // Dodaj opcję "Wszystkie" na początku listy tagów
      } catch (error) {
        console.error('There was an error fetching the products or tags!', error);
        setError('There was an error fetching the products or tags!');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndTags();
  }, []);

  // Funkcja do filtrowania produktów po tagu
  const handleTagChange = (tagId) => {
    setSelectedTag(tagId);

    if (tagId === 'all') {
      // Jeśli wybrano "Wszystkie", pokaż wszystkie produkty
      setFilteredProducts(products);
    } else {
      // Filtruj produkty po tagu
      const filtered = products.filter((product) =>
        product.tags.includes(parseInt(tagId)) // Upewnij się, że porównujesz typy zgodnie z formatem danych
      );
      console.log("Filtered products:", filtered); // Debugowanie filtrowanych produktów
      setFilteredProducts(filtered);
    }
  };



  // Funkcja do dodawania produktu do koszyka
  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'https://ordermanagement-production-0b45.up.railway.app/api/cart/items/',
        { product_id: productId, quantity: quantity},
        { headers: { Authorization: `Bearer ${token}` } }
      );

          // Znajdź produkt w tablicy produktów
      const product = products.find(p => p.id === productId);
      const productName = product ? product.title : 'nieznany';

      setQuantities((prev) => ({
        ...prev,
        [productId]: 4
      }));

      // Ustawienie flagi animacji dla tego produktu
      setAddedProducts((prev) => ({
        ...prev,
        [productId]: true
      }));

      // Usunięcie flagi animacji po 1 sekundzie
      setTimeout(() => {
        setAddedProducts((prev) => ({
          ...prev,
          [productId]: false
        }));
      }, 1500);

      setMessage(`${quantity} kg produktu "${productName}" zostało pomyślnie dodane do koszyka!`); // Komunikat o sukcesie
    } catch (error) {
      console.error('Błąd podczas dodawania produktu do koszyka:', error);
      setError('Nie udało się dodać produktu do koszyka.'); // Komunikat o błędzie
    }
  };

  // Funkcje do zwiększania i zmniejszania ilości
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

      {/* Alert błędu */}
      <ErrorAlert error={error} onClose={() => setError(null)} />

      {/* Alert sukcesu */}
      <SuccessAlert message={message} onClose={() => setMessage(null)} />


      {/* Dropdown do filtrowania po tagach */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedTag}
          onChange={(e) => handleTagChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
          focus:ring-blue-500 bg-white"
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
              className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition duration-300
              flex flex-col justify-between h-full"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="flex justify-center text-xl font-semibold mb-2">{product.title}</h3>
              <div
                className="product-description-container cursor-pointer"
                onClick={() => alert(product.description)} // Wyświetlenie pełnego opisu w oknie alertu
              >
                <p className="flex justify-center text-gray-600 mb-2">
                  {product.description}
                </p>
              </div>
              <p className="flex justify-center text-lg font-bold mb-2">{product.price} zł/kg</p>

              {/* Wyświetlanie tagów */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex justify-center space-x-2 mt-2">
                  {product.tags.map((tagId) => (
                    <span
                      key={tagId}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {tags[tagId]?.name || 'Nieznany'}
                    </span>
                  ))}
                </div>
              )}

              {/* Kontrolki ilości */}
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
                className={`mt-4 w-full py-2 rounded-md transition duration-300
                  ${addedProducts[product.id] ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}
                  text-white`}
              >
                {addedProducts[product.id] ? 'Dodano!' : 'Dodaj do koszyka'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
