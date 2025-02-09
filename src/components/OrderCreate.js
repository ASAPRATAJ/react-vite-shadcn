//import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
//import { jwtDecode } from 'jwt-decode';
//
//const OrderCreate = () => {
//  const [products, setProducts] = useState([]);
//  const [orderProducts, setOrderProducts] = useState([]);
//  const [message, setMessage] = useState('');
//  const [errorMessage, setErrorMessage] = useState('');
//  const navigate = useNavigate();
//
//  const token = localStorage.getItem('token');
//  let decodedToken = null;
//  let userId = null;
//
//  if (token) {
//    try {
//      decodedToken = jwtDecode(token);
//      userId = decodedToken.user_id;
//    } catch (error) {
//      console.error('Error decoding token:', error);
//    }
//  }
//
//  useEffect(() => {
//    if (!token) {
//      navigate('/login');
//    }
//  }, [token, navigate]);
//
//  useEffect(() => {
//    const fetchProducts = async () => {
//      try {
//        const response = await axios.get('http://127.0.0.1:8000/api/products/', {
//          headers: {
//            Authorization: `Bearer ${token}`,
//          },
//        });
//        setProducts(response.data);
//        setOrderProducts(response.data.map(product => ({ product_id: product.id, quantity: 0 })));
//      } catch (error) {
//        console.error('Error fetching products:', error);
//      }
//    };
//
//    if (token) {
//      fetchProducts();
//    }
//  }, [token]);
//
//  const handleQuantityChange = (index, value) => {
//    const newOrderProducts = [...orderProducts];
//    newOrderProducts[index].quantity = Math.max(0, parseInt(value) || 0); // Upewniamy się, że ilość to liczba >= 0
//    setOrderProducts(newOrderProducts);
//  };
//
//  const handleIncrement = (index) => {
//    const newOrderProducts = [...orderProducts];
//    newOrderProducts[index].quantity += 1;
//    setOrderProducts(newOrderProducts);
//  };
//
//  const handleDecrement = (index) => {
//    const newOrderProducts = [...orderProducts];
//    if (newOrderProducts[index].quantity > 0) {
//      newOrderProducts[index].quantity -= 1;
//      setOrderProducts(newOrderProducts);
//    }
//  };
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    setErrorMessage(''); // Czyścimy wiadomość o błędzie przed próbą wysłania zamówienia
//
//    const data = {
//      user: userId,
//      products: orderProducts.filter(product => product.quantity > 0),
//    };
//
//    try {
//      const response = await axios.post('http://127.0.0.1:8000/api/orders/create/', data, {
//        headers: {
//          Authorization: `Bearer ${token}`,
//        },
//      });
//      setMessage('Order created successfully!');
//      console.log(response.data);
//    } catch (error) {
//      console.error('Full error response:', error);
//
//      if (error.response) {
//        const errorData = error.response.data;
//
//        if (errorData.non_field_errors) {
//          setErrorMessage(errorData.non_field_errors.join(' '));
//        } else if (errorData.message) {
//          setErrorMessage(errorData.message);
//        } else if (errorData.detail) {
//          setErrorMessage(errorData.detail);
//        } else if (typeof errorData === 'string') {
//          setErrorMessage(errorData);
//        } else {
//          setErrorMessage('An error occurred while creating the order.');
//        }
//      } else {
//        setErrorMessage('Error creating order.');
//      }
//    }
//  };
//
//  if (!token) {
//    return <p>You must be logged in to create an order.</p>;
//  }
//
//  return (
//    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//      <h2 className="text-2xl font-bold mb-6 text-center">Create Order</h2>
//
//      {/* Wiadomość o sukcesie */}
//      {message && (
//        <p className="mb-4 text-center text-green-500">
//          {message}
//        </p>
//      )}
//
//      {/* Komunikaty o błędach */}
//      {errorMessage && (
//        <p className="mb-4 text-center text-red-500">
//          {errorMessage}
//        </p>
//      )}
//
//      <form onSubmit={handleSubmit} className="space-y-6">
//        <h3 className="text-xl font-semibold">Products</h3>
//        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//          {products.length === 0 ? (
//            <p className="text-center">Loading products...</p>
//          ) : (
//            products.map((product, index) => (
//              <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
//                <img
//                  src={product.image} // Zakładamy, że API zwraca URL w polu "image"
//                  alt={product.title}
//                  className="w-32 h-32 object-cover mb-4"
//                />
//                <h4 className="text-lg font-bold mb-2">{product.title}</h4>
//                <div className="flex items-center justify-between w-full">
//                  <button
//                    type="button"
//                    onClick={() => handleDecrement(index)}
//                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                  >
//                    -
//                  </button>
//                  <span className="text-lg font-bold">{orderProducts[index]?.quantity || 0}</span>
//                  <button
//                    type="button"
//                    onClick={() => handleIncrement(index)}
//                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
//                  >
//                    +
//                  </button>
//                </div>
//              </div>
//            ))
//          )}
//        </div>
//        <button
//          type="submit"
//          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
//        >
//          Create Order
//        </button>
//      </form>
//    </div>
//  );
//};
//
//export default OrderCreate;
