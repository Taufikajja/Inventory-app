import React, { useEffect, useState} from 'react'
import axios from 'axios'


const Products = ({ darkMode }) => {
    const [ openModal, setOpenModal] = useState(false);
    const [ editProduct, setEditProduct ] = useState(null);
    const [ categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [ formData, setFormData] = useState({
        image: null,
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        supplierId: "",
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [modalPreviewImage, setModalPreviewImage] = useState(null);



    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            if(response.data.success) {
                setSuppliers(response.data.suppliers);
                setCategories(response.data.categories);
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            } else {
                console.error("Error fetching products:", response.data.message);
                alert("Error fetching products. please try again ");
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
            if (file) {
                setPreviewImage(URL.createObjectURL(file));
            } else {
                setPreviewImage(null);
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    const handleEdit = (product) => {
        setOpenModal(true);
        setEditProduct(product._id);
        setFormData ({
            image: null,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId._id, 
            supplierId: product.supplierId._id, 
        });
        // Tampilkan gambar lama jika ada
        if (product.image) {
            setPreviewImage(`http://localhost:3000/uploads/${product.image}`);
        } else {
            setPreviewImage(null);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `http://localhost:3000/api/products/${id}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    alert("Product deleted successfully!");
                    fetchProducts();
                } else {
                    console.error("Error deleting product:", data);
                    alert("Error deleting product. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error deleting product. Please try again.");
            }
        }
    }

    const closeModel = () => {
        setOpenModal(false);
        setEditProduct(null);
        setFormData({
            image: null,
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            supplierId: "",
        });
        setPreviewImage(null);
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("stock", formData.stock);
        data.append("categoryId", formData.categoryId);
        data.append("supplierId", formData.supplierId);
        if (formData.image) {
            data.append("image", formData.image);
        }

        if(editProduct) {
            try {
                const response = await axios.put(
                    `http://localhost:3000/api/products/${editProduct}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                if (response.data.success) {
                    alert("Product updated successfully!");
                    fetchProducts();
                    setOpenModal(false);
                    setEditProduct(null);
                    setFormData({
                        image: null,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        categoryId: "",
                        supplierId: "",
                    });
                } else {
                    alert("Error updating Product. Please try again.");
                }
            } catch (error) {
                alert("Error updating Product. Please try again.");
            }
            return;
        } else {
            try {
                const response = await axios.post('http://localhost:3000/api/products/add',
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                if (response.data.success) {
                    fetchProducts();
                    alert("Products added successfully !");
                    setOpenModal(false);
                    setFormData({
                        image: null,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        categoryId: "",
                        supplierId: "",
                    });
                } else {
                    alert("Error adding Product. Please try again");
                }
            } catch (error) {
                alert("Error adding product. Please try again");
            }
        }
    };

    const handleSearch = (e) => {
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
        setCurrentPage(1); // Reset ke halaman pertama saat search
    }
    

  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
          <h1 className='text-2xl font-bold'>Manajemen Produk</h1>
          <div className='flex justify-between items-center'>
              <input
                  type="text"
                  placeholder='Cari Produk'
                  className='border p-1 rounded px-4'
                  onChange={handleSearch}
              />
              <button className='bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition'
                  onClick={() => setOpenModal(true)}
                  >
                    Tambah Produk
                  </button>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'primary-light-3'} shadow-md rounded-lg p-4`}>
                            <table className="w-full border-collapse border border-gray-300 mt-4">
                                    <thead>
                                            <tr className="primary-dark-10">
                                                    <th className="border p-2">No</th>
                                                    <th className="border p-2">Nama Produk</th>
                                                    <th className="border p-2">Gambar Produk</th>
                                                    <th className="border p-2">Nama Kategori</th>
                                                    <th className="border p-2">Nama Supplier</th>
                                                    <th className="border p-2">Harga</th>
                                                    <th className="border p-2">Stok</th>
                                                    <th className="border p-2">Aksi</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {filteredProducts &&
                                                filteredProducts
                                                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                                    .map((product, index) => (
                                                        <tr key={product._id}>
                                                            <td className="border  p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                            <td className="border  p-2">{product.name}</td>
                                                            <td className="border  p-2">
                                                                {product.image ? (
                                                                    <img
                                                                        src={`http://localhost:3000/uploads/${product.image}`}
                                                                        alt={product.name}
                                                                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                                                                        onClick={() => setModalPreviewImage(`http://localhost:3000/uploads/${product.image}`)}
                                                                    />
                                                                ) : (
                                                                    <span className="text-gray-400">Tidak ada gambar</span>
                                                                )}
                                                            </td>
                                                            <td className="border  p-2">{product.categoryId.categoryName}</td>
                                                            <td className="border  p-2">{product.supplierId.name}</td>
                                                            <td className="border  p-2">Rp.{product.price},00</td>
                                                            <td className="border  p-2">
                                                                <span className="rounded-full font-semibold">
                                                                    {product.stock == 0 ? (
                                                                        <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full">{product.stock}</span>
                                                                    ) : product.stock < 5 ? (
                                                                        <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">{product.stock}</span>
                                                                    ) : (
                                                                        <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full">{product.stock}</span>
                                                                    )}
                                                                </span>
                                                            </td>
                                                            <td className="border  p-2">
                                                                <button className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2 hover:bg-yellow-700 transition"
                                                                    onClick={() => handleEdit(product)}>
                                                                    Ubah
                                                                </button>
                                                                <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer mr-2 hover:bg-red-600 transition"
                                                                    onClick={() => handleDelete(product._id)}>
                                                                    Hapus
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                    </tbody>
                            </table>
                            {filteredProducts.length === 0 && <div>Data tidak ada</div>}
                            {/* Pagination Controls */}
                            <div className="flex justify-center items-center mt-4 gap-2">
                                <button
                                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                <span>Halaman {currentPage} dari {Math.ceil(filteredProducts.length / itemsPerPage)}</span>
                                <button
                                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProducts.length / itemsPerPage)))}
                                    disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage) || filteredProducts.length === 0}
                                >
                                    Next
                                </button>
                            </div>
                    </div>

          { openModal && (
              <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
                  <div className={`${darkMode ? 'bg-gray-800' : 'primary-light-3'} p-4 rounded shadow-md w-1/3 relative`}>
                      <h1 className='text-xl font-bold'>Tambah Produk</h1>
                      <button 
                      className='absolute top-4 right-4 font-bold text-lg cursor-pointer' 
                      onClick={closeModel}
                      >
                        X
                        </button>
                      <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
                          <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder='Nama'
                              className='border p-1 rounded px-4'
                          />

                        {/* gambar */}
                        <input 
                            type="file" 
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className='border p-1 rounded px-4'
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }}
                            />
                        )}
        
                          <input
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              placeholder='Deskripsi'
                              className='border p-1 rounded px-4'
                          />
                          <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              placeholder='Harga'
                              className='border p-1 rounded px-4'
                          />
                          <input
                              type="number"
                              name="stock"
                              min="0"
                              value={formData.stock}
                              onChange={handleChange}
                              placeholder='Stok'
                              className='border p-1 rounded px-4'
                          />

                          <div className="w-full border rounded p-0.5">
                              <select name="categoryId" className={`w-full p-2  ${darkMode ? 'bg-gray-800 text-white' : 'primary-light-3 text-black'}`}
                                                        onChange={handleChange} value={formData.categoryId}>
                                <option value="">Pilih Kategori</option>
                                  {categories && categories.map ((category) => (
                                    <option key={category._id} value={category._id}>
                                          {category.categoryName}
                                    </option>
                                  ))}
                            </select>
                          </div>

                          <div className="w-full border rounded p-0.5">
                              <select name="supplierId" className={`w-full p-2 ${darkMode ? 'bg-gray-800 text-white' : 'primary-light-3 text-black'}`}
                              onChange={handleChange} value={formData.supplierId}>
                                  <option value="">Pilih Supplier</option>
                                  {suppliers && suppliers.map ((supplier) => (
                                  <option key={supplier._id} value={supplier._id}>
                                      {supplier.name}
                                  </option>
                                  ))}

                              </select>
                          </div>

                          <div className="flex space-x-2">
                              <button
                                  type="submit"
                                  className="w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-700"
                              >
                                  {editProduct ? "Simpan Perubahan" : "Tambah Produk"}
                              </button>
                            
                    
                                      <button
                                          type="button"
                                          className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                                          onClick={closeModel}
                                      >
                                          Batal
                                      </button>
                            

                          </div>
                      </form>
                  </div>
              </div>
          )}
        {/* Modal preview gambar besar */}
        {modalPreviewImage && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50" onClick={() => setModalPreviewImage(null)}>
                <div className={`${darkMode ? 'bg-gray-800' : 'primary-light-3'} p-4 rounded shadow-md relative`} style={{ maxWidth: '80vw', maxHeight: '80vh' }}>
                    <img src={modalPreviewImage} alt="Preview" style={{ maxWidth: '70vw', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px' }} />
                    <button className="absolute top-2 right-2 text-xl font-bold bg-red-500 text-white rounded px-3 py-1" onClick={() => setModalPreviewImage(null)}>
                        X
                    </button>
                </div>
            </div>
        )}
    </div>
    )
}

export default Products