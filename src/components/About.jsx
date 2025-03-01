import React from 'react';
import { Link } from 'react-router-dom';
import iceCreamBg from '../images/lody1.jpg';
import iceCream1 from '../images/lody1.jpg';
import iceCream2 from '../images/lody1.jpg';

const About = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center bg-cover bg-center w-full" style={{ backgroundImage: `url(${iceCreamBg})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white">
          <h1 className="text-6xl font-bold mb-6">O Nas</h1>
          <p className="text-2xl mb-8">Poznaj historię Polish Lody</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="w-full py-16 px-4 flex flex-col md:flex-row items-center justify-between bg-white">
        <div className="md:w-1/2 px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Nasza Historia</h2>
          <p className="text-lg text-gray-600 mb-4">
            Polish Lody to firma z wieloletnią tradycją, założona z pasji do tworzenia doskonałych lodów. Nasza podróż rozpoczęła się w małej manufakturze, gdzie eksperymentowaliśmy z naturalnymi składnikami i tradycyjnymi recepturami.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Dziś jesteśmy liderem w produkcji wysokiej jakości lodów w Polsce, dostarczając nasze produkty do najlepszych restauracji, hoteli i sklepów delikatesowych w całym kraju.
          </p>
        </div>
        <div className="md:w-1/2 px-6 mt-8 md:mt-0 flex justify-center">
          <img src={iceCream1} alt="Ice Cream Production" className="rounded-lg shadow-lg w-full max-w-md" />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-pink-100 py-16 w-full">
        <div className="px-4 w-full">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Nasze Wartości</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Jakość</h3>
              <p className="text-gray-600">Używamy tylko najlepszych, naturalnych składników, aby zapewnić naszym klientom wyjątkowe doznania smakowe.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Innowacja</h3>
              <p className="text-gray-600">Stale rozwijamy nowe smaki i formaty, aby zaskakiwać i inspirować naszych klientów.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Zrównoważony rozwój</h3>
              <p className="text-gray-600">Dbamy o środowisko poprzez odpowiedzialne praktyki produkcyjne i minimalizację odpadów.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="w-full py-16 px-4 bg-white">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Nasz Zespół</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
            <img src={iceCream2} alt="Team Member" className="rounded-full w-40 h-40 object-cover mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Piotr Ch.</h3>
            <p className="text-gray-600">Założyciel</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
            <img src={iceCream2} alt="Team Member" className="rounded-full w-40 h-40 object-cover mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Kamil W</h3>
            <p className="text-gray-600">Założyciel</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
            <img src={iceCream2} alt="Team Member" className="rounded-full w-40 h-40 object-cover mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Wojciech T.</h3>
            <p className="text-gray-600">Dyrektor Sprzedaży</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full py-16 px-4 text-center bg-pink-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Dołącz do naszej lodowej przygody</h2>
        <p className="text-lg text-gray-600 mb-8">Odkryj nasze wyjątkowe produkty i przekonaj się o ich jakości.</p>
        <Link to="/redirect-to-products" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition">
          Zobacz produkty
        </Link>
      </div>
    </div>
  );
};

export default About;
