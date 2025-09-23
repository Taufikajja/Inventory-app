import Contact from '../models/Contact.js';

export const addContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    return res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};
