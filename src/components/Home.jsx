import React from 'react';
import { Link } from 'react-router-dom';
import iceCreamBg from '../images/lody1.jpg';
import iceCream1 from '../images/lody1.jpg';
import iceCream2 from '../images/lody1.jpg';

const Home = () => {
  return (
    <>
      <div className="min-h-screen w-full">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center bg-cover bg-center w-full" style={{ backgroundImage: `url(${iceCreamBg})` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative text-center text-white">
            <h1 className="text-6xl font-bold mb-6">Polish Lody</h1>
            <p className="text-2xl mb-8">Najlepsze lody dla Twojego biznesu</p>
            <Link to="/products" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition">
              Zamów teraz
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="w-full py-16 px-4 flex flex-col md:flex-row items-center justify-between bg-white">
          <div className="md:w-1/2 px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">O Nas</h2>
            <p className="text-lg text-gray-600 mb-8">Jesteśmy liderem w produkcji wysokiej jakości lodów w Polsce. Nasze lody są tworzone z naturalnych składników, bez sztucznych dodatków.</p>
            <Link to="/about" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition">
              Dowiedz się więcej
            </Link>
          </div>
          <div className="md:w-1/2 px-6 mt-8 md:mt-0 flex justify-center">
            <img src={iceCream1} alt="Ice Cream" className="rounded-lg shadow-lg w-full max-w-md" />
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-pink-100 py-16 w-full">
          <div className="px-4 w-full">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Nasze Produkty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <img src={iceCream2} alt="Ice Cream" className="rounded-lg mb-4 w-full" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Lody na kilogramy</h3>
                <p className="text-gray-600">Klasyczne lody na patyku w różnych smakach.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <img src={iceCream2} alt="Ice Cream" className="rounded-lg mb-4 w-full" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Torty lodowe</h3>
                <p className="text-gray-600">Klasyczne lody zamienione w torty w różnych smakach.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <img src={iceCream2} alt="Ice Cream" className="rounded-lg mb-4 w-full" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Praliny lodowe</h3>
                <p className="text-gray-600">Klasyczne lody zamienione w praliny w różnych smakach.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full py-16 px-4 text-center bg-white">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Skontaktuj się z nami</h2>
          <p className="text-lg text-gray-600 mb-8">Masz pytania? Chętnie na nie odpowiemy!</p>
          <Link to="/contact" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition">
            Kontakt
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
