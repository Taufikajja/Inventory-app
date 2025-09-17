import User from '../models/User.js';
import bcrypt from 'bcrypt';

const addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        //check if the user already exist
        const exUser = await User.findOne({ email });
        if (exUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const newUser = new User({
            name,
            email,
            password : hashedPassword,
            address,
            role
        });

        await newUser.save();
        return res.status(201).json({ success: true, message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding users:', error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('error fetching users:', error);
        return res.status(500).json({ success: false, message: 'Server error in getting users' });
    }
}

//karek nepi dieu 1651
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        //check if the category exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'category not found' });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export { addUser, getUsers, deleteUser };