import React,{ useState, useEffect } from 'react'
import axios from "axios";
//  import AOS from 'aos'; 
//  import 'aos/dist/aos.css'; 

const Categories = ({ darkMode }) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categories, setCategories] = useState([]);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [loading, setLoading] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

        const fetchCategories = async () => {
            setLoading(true);
            try{
                const response = await axios.get("http://localhost:3000/api/category", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
            }); 
            console.log(response.data.categories);
            setCategories(response.data.categories);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setLoading(false);
        }
        };
        
    useEffect(() => {
        fetchCategories();
    }, []);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editCategory) {
            const response = await axios.put(`http://localhost:3000/api/category/${editCategory}`,
                { categoryName, categoryDescription },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );
            if (response.data.success) {
                setEditCategory(null);
                setCategoryName("");
                setCategoryDescription("");
                alert("Category updated successfully !");
                fetchCategories();
            } else {
                console.error("error editing category:", data);
                alert("Error editing category. Please try again");
            }
        } else {

        };

    

        
        const response = await axios.post('http://localhost:3000/api/category/add', 
            { categoryName, categoryDescription },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
        }
    );
    if (response.data.success) {
        setCategoryName("");
        setCategoryDescription("");
        alert("Category added successfully !");
        fetchCategories();
    } else {
        console.error("error adding category:", response.data);
        alert("Error adding category. Please try again");
    }
    };

    const handleDelete = async (id) => {
const confirmDelete = window.confirm("Are you sure you want to delete this category?");
if (confirmDelete) {
    try {
        const response = await axios.delete(
            `http://localhost:3000/api/category/${id}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            }
        );
        if(response.data.success) {
            alert("Category deleted successfully!");
            fetchCategories();
        } else {
            console.error("Error deleting category:", data);
            alert("Error deleting category. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error deleting category. Please try again.");
    }
}
    }

    const handleEdit = async (category) => {
        setEditCategory(category._id);
        setCategoryName(category.categoryName);
        setCategoryDescription(category.categoryDescription);
    };

    const handleCancel = async () => {
        setEditCategory(null);
        setCategoryName("");
        setCategoryDescription("");
    };


    if(loading) return <div>Loading ....</div>
    return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">Manajemen Kategori</h1>

        <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/3">
                    <div className={`${darkMode ? 'bg-gray-800' : 'primary-light-3'} shadow-md rounded-lg p-4`}>
                        <h2 className="text-center text-xl font-bold mb-4">{editCategory ? "Ubah Kategori" : "Tambah Kategori"}</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <input type="text" 
                      placeholder="Nama Kategori" 
                      value={categoryName}
                      className="border w-full p-2 rounded-md"
                      onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    <div>
                      <input type="text" 
                      placeholder="Deskripsi Kategori" 
                      value={categoryDescription}
                      className="border w-full p-2 rounded-md" 
                     onChange={(e) => setCategoryDescription(e.target.value)} />
                    </div>

                    <div className="flex space-x-2">
                    <button 
                    type="submit"
                    className="w-full mt-2 rounded-md bg-blue-700 text-white p-3 cursor-pointer hover:bg-blue-800"
                    >
                        {editCategory ? "Simpan Perubahan" : "Tambah Kategori"}
                    </button>
                    {
                        editCategory && (
                            <button
                            type="button"
                            className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                            onClick={handleCancel}
                            >
                                Batal
                            </button>
                        )
                    }

                    </div>
                </form>
            </div>
        </div>

    <div className="lg:w-2/3">
                    <div className={`${darkMode ? 'bg-gray-800' : 'primary-light-3'} shadow-md rounded-lg p-4`}>
        <table className="w-full border-collapse border border-gray-200">
            <thead>
                <tr className="primary-dark-10">
                    <th className="border  p-2">No</th>
                    <th className="border  p-2">Nama Kategori</th>
                    <th className="border  p-2">Deskripsi Kategori</th>
                    <th className="border  p-2">Aksi</th>
                </tr>
            </thead>

                <tbody>
                        {categories
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((category, index) => (
                                <tr key={category._id || index}>
                                    <td className="border  p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="border  p-2">{category.categoryName}</td>
                                    <td className="border  p-2">{category.categoryDescription}</td>
                                    <td className="border  p-2">
                                        <button className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2 hover:bg-yellow-700 transition" onClick={() => handleEdit(category)}>
                                            Ubah
                                        </button>
                                        <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer mr-2 hover:bg-red-700 transition"
                                            onClick={() => handleDelete(category._id)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                </tbody>

                </table>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4 gap-2">
                    <button
                        className="px-3 py-1 rounded  bg-blue-600 hover:bg-blue-700"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span>Halaman {currentPage} dari {Math.ceil(categories.length / itemsPerPage)}</span>
                    <button
                        className="px-3 py-1 rounded  bg-blue-600 hover:bg-blue-700"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(categories.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(categories.length / itemsPerPage) || categories.length === 0}
                    >
                        Next
                    </button>
                </div>
                </div>

                </div>
        </div>
</div>
    );
}

export default Categories