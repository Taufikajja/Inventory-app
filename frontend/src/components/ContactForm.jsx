import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Message sent successfully.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.message || "Failed to send message.");
      }
    } catch (err) {
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <form className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <input type="text" placeholder="Your Name" className="border p-2 rounded" required value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Your Email" className="border p-2 rounded" required value={email} onChange={e => setEmail(e.target.value)} />
      <textarea placeholder="Your Message" className="border p-2 rounded" rows={5} required value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">Send Message</button>
      {status && <div className="mt-2 text-center text-sm text-blue-600">{status}</div>}
    </form>
  );
};

export default ContactForm;
