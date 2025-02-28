import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [deliveryDate, setDeliveryDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchCart = async () => {
      try {
        const response = await axios.get('https://ordermanagement-production-0b45.up.railway.app:8080/api/cart/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCart(response.data);
        const initialQuantities = {};
        response.data.items.forEach((item) => {
          initialQuantities[item.product.id] = item.quantity;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('Error fetching cart.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleUpdateCart = async () => {
    const token = localStorage.getItem('token');
    try {
      for (const item of cart.items) {
        if (quantities[item.product.id] !== item.quantity) {
          await axios.patch(
            `https://ordermanagement-production-0b45.up.railway.app:8080/api/cart/items/${item.id}/`,
            { quantity: quantities[item.product.id] },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      navigate('/order-summary', { state: { cart, quantities, deliveryDate } });
    } catch (error) {
      console.error('Error updating cart:', error);
      setError('Error updating cart.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/cart/items/${itemId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response = await axios.get('https://ordermanagement-production-0b45.up.railway.app:8080/api/cart/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Error removing item from cart.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading cart...</p>
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
      <div className="w-screen p-6 bg-white mx-auto">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Twój Koszyk</h2>

          <div className="p-6 bg-gray-100 rounded-lg shadow-lg ">
            {cart && cart.items.length === 0 ? (
              <p className="text-center">Twój koszyk jest pusty.</p>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center w-full">
                    <div>
                      <h3 className="text-xl font-semibold">{item.product.title}</h3>
                      <p className="text-lg">{quantities[item.product.id]} x {item.product.price} zł</p>
                      <p className="text-gray-500">Razem: {quantities[item.product.id] * item.product.price} zł</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <input
                        type="number"
                        min="1"
                        value={quantities[item.product.id]}
                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 w-16 text-center bg-gray-300"
                      />
                      <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 bg-white">
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart && cart.items.length > 0 && (
            <>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full">
                <h4 className="text-xl font-semibold">Grand Total: {cart.items.reduce((total, item) => total + quantities[item.product.id] * item.product.price, 0)} zł</h4>
                <button onClick={handleUpdateCart} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                  Przejdź do podsumowania
                </button>
              </div>
            </>
          )}
        </div>
      </div>
  );
};

export default Cart;
