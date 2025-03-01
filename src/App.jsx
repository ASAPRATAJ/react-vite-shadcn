import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
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
import ConditionalRedirect from './components/ConditionalRedirect';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <AuthProvider> {/* Przeniesiono AuthProvider do wnętrza Router */}
        <Navbar />
        <div style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Nowe trasy do warunkowego przekierowania */}
            <Route path="/redirect-to-products" element={<ConditionalRedirect to="/products" />} />

            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products-admin" element={<ProductListAdmin />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product-edit/:id" element={<ProductEdit />} />

            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserCreate />} />
            <Route path="/logout" element={<UserLogout />} />

            <Route path="/users" element={<UserList />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/users/orders" element={<UserOrderList />} />

{/*           <Route path="/orders/create" element={<OrderCreate />} /> */}
            <Route path="/orders" element={<OrderList />} />
            <Route path="/order-summary" element={<OrderSummary />} />

            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
