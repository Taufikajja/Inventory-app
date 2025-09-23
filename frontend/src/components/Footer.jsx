import React from 'react';

const Footer = () => (
  <footer className="bg-base-300 text-base-content py-6 mt-12">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <span className="font-semibold">InventoryApp &copy; {new Date().getFullYear()}</span>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="/contact" className="hover:underline">Contact</a>
        <a href="/faq" className="hover:underline">FAQ</a>
      </div>
    </div>
  </footer>
);

export default Footer;
