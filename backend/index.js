
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './db/connection.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplier.js";
import productRoutes from "./routes/product.js";
import userRoutes from './routes/user.js';
import contactRoutes from './routes/contact.js';


const app = express();
app.use(cors());
app.use(express.json());
// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

app.listen(process.env.PORT, () => {
    connectDB();
  console.log('Server is running on http://localhost:3000');
});