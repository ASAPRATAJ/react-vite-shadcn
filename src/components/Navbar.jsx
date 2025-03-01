import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { AuthContext } from './AuthContext'; // Importujemy AuthContext

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, handleLogout } = useContext(AuthContext); // Używamy AuthContext

  // Obsługa scrollowania
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Zamknij menu mobilne po kliknięciu linku
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Lewa strona: Ikonki społecznościowe i linki */}
        <div className="flex items-center space-x-6">
          {/* Ikonki społecznościowe (widoczne zawsze) */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/polishlody"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-pink-500 transition duration-300"
            >
              <FaFacebook size={14} />
            </a>
            <a
              href="https://instagram.com/polishlody"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-pink-500 transition duration-300"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://tiktok.com/@polishlodywroclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-pink-500 transition duration-300"
            >
              <FaTiktok size={14} />
            </a>
          </div>
          {/* Linki w zależności od roli użytkownika */}
          {isAuthenticated ? (
            user?.is_superuser && user?.is_staff ? (
              // Linki dla admina
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/orders"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                >
                  Wszystkie zamówienia
                </Link>
                <Link
                  to="/users"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                >
                  Użytkownicy
                </Link>
              </div>
            ) : (
              // Linki dla zwykłego użytkownika
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/products"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                >
                  Produkty
                </Link>
                <Link
                  to="/users/orders"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                >
                  Zamówienia
                </Link>
              </div>
            )
          ) : (
            // Linki dla niezalogowanych użytkowników
            <div className="hidden md:flex space-x-6">
              <Link
                to="/about"
                className="text-gray-800 hover:text-pink-500 transition duration-300"
              >
                O Nas
              </Link>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-pink-500 transition duration-300"
              >
                Kontakt
              </Link>
            </div>
          )}
        </div>

        {/* Środek: Logo */}
        <div className="flex justify-center mx-4">
          <Link to="/">
            <img
              src="/images/logo.jpg" // Upewnij się, że ścieżka jest poprawna
              alt="Logo"
              className="h-12" // Dostosuj wysokość logo
            />
          </Link>
        </div>

        {/* Prawa strona: Linki w zależności od roli użytkownika */}
        <div className="hidden md:flex space-x-6">
          {isAuthenticated ? (
            user?.is_superuser && user?.is_staff ? (
              // Linki dla admina
              <>
                <Link
                  to="/products/create"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                >
                  Dodaj produkt
                </Link>
                <Link
                  to="/products-admin"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                >
                  Zarządzaj produktami
                </Link>
                <Link
                  to="/logout"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                  onClick={handleLogout}
                >
                  Wyloguj
                </Link>
              </>
            ) : (
              // Linki dla zwykłego użytkownika
              <>
                <Link
                  to="/profile"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                >
                  Mój profil
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-800 hover:text-pink-500 transition duration-300 flex items-center"
                >
                  <FaShoppingCart className="mr-2" /> Koszyk
                </Link>
                <Link
                  to="/logout"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                  onClick={handleLogout}
                >
                  Wyloguj
                </Link>
              </>
            )
          ) : (
            // Linki dla niezalogowanych użytkowników
            <>
              <Link
                to="/register"
                className="text-gray-800 hover:text-pink-500 transition duration-300"
              >
                Utwórz Konto
              </Link>
              <Link
                to="/login"
                className="text-gray-800 hover:text-pink-500 transition duration-300"
              >
                Zaloguj się
              </Link>
            </>
          )}
        </div>

        {/* Przycisk menu mobilnego */}
        <button
          className="md:hidden bg-gray-300 text-gray-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menu mobilne */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 p-4">
            {isAuthenticated ? (
              user?.is_superuser && user?.is_staff ? (
                // Linki dla admina
                <>
                  <Link
                    to="/orders"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Wszystkie zamówienia
                  </Link>
                  <Link
                    to="/users"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Użytkownicy
                  </Link>
                  <Link
                    to="/products"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Produkty
                  </Link>
                  <Link
                    to="/products/create"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Dodaj produkt
                  </Link>
                  <Link
                    to="/products-admin"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Zarządzaj produktami
                  </Link>
                  <Link
                    to="/logout"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={handleLogout}
                  >
                    Wyloguj
                  </Link>
                </>
              ) : (
                // Linki dla zwykłego użytkownika
                <>
                  <Link
                    to="/products"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Produkty
                  </Link>
                  <Link
                    to="/users/orders"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Moje zamówienia
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-800 hover:text-pink-500 transition duration-300 flex items-center"
                    onClick={closeMobileMenu}
                  >
                    <FaShoppingCart className="mr-2" /> Koszyk
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-800 hover:text-pink-500 transition duration-300 flex items-center"
                    onClick={closeMobileMenu}
                  >
                    Mój profil
                  </Link>
                  <Link
                    to="/logout"
                    className="text-gray-800 hover:text-pink-500 transition duration-300"
                    onClick={handleLogout}
                  >
                    Wyloguj
                  </Link>
                </>
              )
            ) : (
              // Linki dla niezalogowanych użytkowników
              <>
                <Link
                  to="/about"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                  onClick={closeMobileMenu}
                >
                  O Nas
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                  onClick={closeMobileMenu}
                >
                  Kontakt
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                  onClick={closeMobileMenu}
                >
                  Utwórz Konto
                </Link>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-pink-500 transition duration-300"
                  onClick={closeMobileMenu}
                >
                  Zaloguj się
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
