import React from 'react';

const Testimonials = () => (
  <section className="py-12 bg-base-100">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="mb-4 italic">"InventoryApp has made managing my business so much easier!"</p>
          <span className="font-semibold">- User A</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="mb-4 italic">"The product listing and filtering is super smooth and professional."</p>
          <span className="font-semibold">- User B</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="mb-4 italic">"Highly recommend for any business owner!"</p>
          <span className="font-semibold">- User C</span>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
