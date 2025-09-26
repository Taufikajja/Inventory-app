
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Category from './models/Category.js';
import Supplier from './models/Supplier.js';
import Product from './models/Product.js';
import connectDB from './db/connection.js';
import dotenv from 'dotenv';
dotenv.config();

const seed = async () => {
    try {
        connectDB();
        // admin user
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User ({
            name: "admin",
            email: "admin@gmail.com",
            password: hashPassword,
            address: "admin address",
            role: "admin"
        });
        await newUser.save();
        console.log("Admin user created successfully");

        // kategori
        const categories = [
            { categoryName: "Aksesoris", categoryDescription: "Topi, Tas" },
            { categoryName: "Bawahan", categoryDescription: "Celana" },
            { categoryName: "T-Shirt", categoryDescription: "Kaos" },
            { categoryName: "Shirt", categoryDescription: "Kemeja, Kaos Polo" },
            { categoryName: "Luaran", categoryDescription: "Hoodie, Jaket" }
        ];
        const categoryDocs = [];
        for (const cat of categories) {
            const newCategory = new Category(cat);
            await newCategory.save();
            categoryDocs.push(newCategory);
            console.log(`Category '${cat.categoryName}' created successfully`);
        }

        // suppliers
        const suppliers = [
            { name: "Taufik", email: "taufik@supplier.com", number: "081234567890", address: "Bandung" },
            { name: "Hidayat", email: "hidayat@supplier.com", number: "081234567891", address: "Bandung" }
        ];
        const supplierDocs = [];
        for (const sup of suppliers) {
            const newSupplier = new Supplier(sup);
            await newSupplier.save();
            supplierDocs.push(newSupplier);
            console.log(`Supplier '${sup.name}' created successfully`);
        }

        // products
        const products = [
            {
                name: "Topi",
                image: "1758755592985-topi.png",
                description: "Warna Hitam, Bahan yang elastis ke dua arah memberikan fit yang sangat baik.",
                price: 200000,
                stock: 5,
                categoryId: categoryDocs[0]._id,
                supplierId: supplierDocs[0]._id
            },
            {
                name: "Tas Bahu",
                image: "1758756060514-tasbahu.png",
                description: "Warna Hitam, Bahan nilon kasual dengan tekstur kerut alami.",
                price: 100000,
                stock: 10,
                categoryId: categoryDocs[0]._id,
                supplierId: supplierDocs[0]._id
            },
            {
                name: "Kemeja",
                image: "1758756232569-kemeja.png",
                description: "Warna Biru, Bahan yang terbuat dari benang combed triple-twisted. Benang dipilih secara khusus untuk menghasilkan kombinasi ideal antara tekstur yang lembut dan kualitas premium.",
                price: 300000,
                stock: 15,
                categoryId: categoryDocs[3]._id,
                supplierId: supplierDocs[0]._id
            },
            {
                name: "Kaos Polo",
                image: "1758756373108-bajupolo.png",
                description: "Warna Biru, Bahan micro-pique yang halus dan lembut dengan tampilan katun.",
                price: 250000,
                stock: 3,
                categoryId: categoryDocs[3]._id,
                supplierId: supplierDocs[0]._id
            },
             {
                 name: "Kaos",
                 image: "1758756465365-tshirt.png",
                 description: "Warna Abu, Dibuat dari 100% katun premium untuk tekstur yang halus dan lembut, lebar kerah dan jahitan yang stylish dan terlihat indah.",
                price: 100000,
                stock: 10,
                categoryId: categoryDocs[2]._id,
                supplierId: supplierDocs[1]._id
            },
            {
                name: "Sweater",
                image: "1758756577551-sweater.png",
                description: "Warna Cream, Dimensi bagian bahu dan body juga lebar, desain simpel yang versatile.",
                price: 300000,
                stock: 5,
                categoryId: categoryDocs[4]._id,
                supplierId: supplierDocs[1]._id
            },
            {
                name: "Hoodie",
                image: "1758756688520-hoodie.png",
                description: "Warna Biru, Bahan premium dengan tekstur halus di kedua sisi untuk kesan yang halus. Lapisan khusus untuk mencegak lapisan berbulu dan melar.",
                price: 300000,
                stock: 10,
                categoryId: categoryDocs[4]._id,
                supplierId: supplierDocs[1]._id
            },
            {
                name: "Jeans",
                image: "1758756816669-celanajeans.png",
                description: "Warna Biru, Denim berkontur yang nyaman. Fit skinny dengan taper hingga pergelangan kaki.",
                price: 400000,
                stock: 10,
                categoryId: categoryDocs[1]._id,
                supplierId: supplierDocs[0]._id
            },
            {
                name: "Chino",
                image: "1758756912789-celanachino.png",
                description: "Warna Cream, Bahan yang rapi dan elegan dengan teknologi elastis. Dirancang dengan jahitan yang minim terlihat untuk tampilan ramping.",
                price: 450000,
                stock: 7,
                categoryId: categoryDocs[1]._id,
                supplierId: supplierDocs[1]._id
            },
        ];
        for (const prod of products) {
            const newProduct = new Product(prod);
            await newProduct.save();
            console.log(`Product '${prod.name}' created successfully`);
        }
    } catch(error) {
        console.log(error);
    }
}

seed();
