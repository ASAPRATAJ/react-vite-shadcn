import React from 'react';
import { Link } from 'react-router-dom';
import iceCreamBg from '../images/lody1.jpg';

const Contact = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center bg-cover bg-center w-full" style={{ backgroundImage: `url(${iceCreamBg})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white">
          <h1 className="text-6xl font-bold mb-6">Kontakt</h1>
          <p className="text-2xl mb-8">Jesteśmy tutaj, aby Ci pomóc</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-screen py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Napisz do nas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-pink-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Informacje kontaktowe</h3>
              <div className="mb-4">
                <p className="text-gray-700 font-bold">Adres:</p>
                <p className="text-gray-600">ul. Lodowa 123, 00-000 Warszawa</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 font-bold">Telefon:</p>
                <p className="text-gray-600">+48 123 456 789</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 font-bold">Email:</p>
                <p className="text-gray-600">polishlodyapp@gmail.com</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 font-bold">Godziny pracy:</p>
                <p className="text-gray-600">Poniedziałek - Piątek: 8:00 - 16:00</p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Imię i nazwisko
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                    id="name"
                    type="text"
                    placeholder="Twoje imię i nazwisko"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 bg-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                    id="email"
                    type="email"
                    placeholder="Twój adres email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="subject">
                    Temat
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                    id="subject"
                    type="text"
                    placeholder="Temat wiadomości"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                    Wiadomość
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-32 bg-white"
                    id="message"
                    placeholder="Twoja wiadomość"
                  ></textarea>
                </div>
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition w-full"
                  type="submit"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full py-16 px-4 bg-pink-100">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Gdzie nas znaleźć</h2>
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
          {/* Tutaj możesz dodać mapę Google lub inną mapę */}
          <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 text-lg">Mapa zostanie tutaj umieszczona</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Często zadawane pytania</h2>
          <div className="space-y-6">
            <div className="bg-pink-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Jak mogę złożyć zamówienie hurtowe?</h3>
              <p className="text-gray-600">Zamówienia hurtowe można składać poprzez formularz kontaktowy lub bezpośrednio dzwoniąc na nasz numer telefonu.</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Jakie są minimalne ilości zamówień?</h3>
              <p className="text-gray-600">Minimalna ilość zamówienia to 10 kg dla każdego smaku lodów.</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Czy oferujecie dostawę?</h3>
              <p className="text-gray-600">Tak, oferujemy dostawę na terenie całej Polski. Koszt dostawy zależy od wielkości zamówienia i odległości.</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Jakie są warunki przechowywania waszych produktów?</h3>
              <p className="text-gray-600">Nasze produkty należy przechowywać w temperaturze -18°C lub niższej.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full py-16 px-4 text-center bg-pink-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Gotowy do współpracy?</h2>
        <p className="text-lg text-gray-600 mb-8">Skontaktuj się z nami już dziś i odkryj, jak nasze lody mogą wzbogacić Twoją ofertę.</p>
        <Link to="/redirect-to-products" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition">
          Sprawdź nasze produkty
        </Link>
      </div>
    </div>
  );
};

export default Contact;
