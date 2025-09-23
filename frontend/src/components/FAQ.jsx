import React from 'react';

const FAQ = () => (
  <section className="py-12 bg-base-200">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">How do I explore products?</h3>
          <p>Click the "Explore Products" button on the landing page or use the navigation bar.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Is there a contact form?</h3>
          <p>Yes, you can reach us via the contact form on the support page.</p>
        </div>
      </div>
    </div>
  </section>
);

export default FAQ;
