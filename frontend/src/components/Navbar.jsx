import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode }) => (
  <nav className={`${darkMode ? 'primary-dark-5' : 'primary-light-2'} text-base-content shadow py-4`}>
    <div className="container mx-auto flex justify-between items-center">
      <a href="/" className="flex items-center gap-2 text-xl font-bold">
  <img src={darkMode ? "/logo-white.png" : "/logo-black.png"} alt="Logo" className="w-10 h-10" /> OpiqueClothes
      </a>
      <div className="flex gap-6 items-center">
        <a href="/products" className="hover:underline">Produk</a>
        <a href="/contact" className="hover:underline">Kontak</a>
        <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</a>
        <button
          className="ml-4 px-4 py-2 rounded bg-base-200 text-base-content hover:bg-base-100 transition"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? (<FaMoon className="text-white-800 text-white-200 text-lg" />) : (<FaSun className="text-yellow-400 text-lg" />) }
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
