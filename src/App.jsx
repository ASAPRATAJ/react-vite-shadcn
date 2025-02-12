import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCreate from './components/ProductCreate';
import ProductList from './components/ProductList';
import ProductListAdmin from './components/ProductListAdmin';
import UserCreate from './components/UserCreate';
import UserList from './components/UserList';
// import OrderCreate from './components/OrderCreate';
import OrderList from './components/OrderList';
import UserLogin from './components/UserLogin';
import UserLogout from './components/UserLogout';
import Navbar from './components/Navbar';
import UserOrderList from './components/UserOrderList';
import ProductEdit from './components/ProductEdit'; // Import nowego komponentu
import Cart from './components/Cart'; // Import komponentu Cart
import OrderSummary from './components/OrderSummary'; // Import komponentu OrderSummary
import Home from './components/Home';
import EditProfile from './components/EditProfile';



const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products-admin" element={<ProductListAdmin />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/register" element={<UserCreate />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/profile" element={<EditProfile />} />

{/*           <Route path="/orders/create" element={<OrderCreate />} /> */}
          <Route path="/orders" element={<OrderList />} />
          <Route path="/users/orders" element={<UserOrderList />} />
          <Route path="/logout" element={<UserLogout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-summary" element={<OrderSummary />} /> Dodano trasę do koszyka
          <Route path="/product-edit/:id" element={<ProductEdit />} /> Dodano trasę do edytowania produktu
        </Routes>
      </div>
    </Router>
  );
};

export default App;
