
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js'

// Konfigurasi multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(process.cwd(), 'uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage: storage });

const router = express.Router();


router.get('/', getProducts);
// Route untuk upload gambar produk
// Gabungkan upload gambar ke route add dan update
router.post('/add', authMiddleware, upload.single('image'), addProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
