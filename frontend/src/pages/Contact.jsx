import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = ({ darkMode }) => (
  <div className="min-h-screen bg-base-100 text-base-content">
    <div className="container mx-auto py-20">
      <ContactForm darkMode={darkMode} />
    </div>
  </div>
);

export default Contact;
