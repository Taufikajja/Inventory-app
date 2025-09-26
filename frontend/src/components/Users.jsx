import React, { useState, useEffect } from 'react'
import axios from "axios";


const Users = ({ darkMode }) => {
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        address : "",
        role : "",

    })
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });
            setUsers(response.data.users);
            setLoading(false);
            setFilteredUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:3000/api/users/add',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            }
        );
        if (response.data.success) {
            alert("User berhasil ditambahkan !");
            setFormData({
                name : "",
                email : "",
                password : "",
                address : "",
                role : "",
            });
            fetchUsers();
        } else {
            console.error("error saat menambahkan user:");
            alert("Error saat menambahkan user. Silakan coba lagi");
        }
    };

    const handleSearch = (e) => {
        setFilteredUsers(
            users.filter(user =>
                user.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
        setCurrentPage(1); // Reset ke halaman pertama saat search
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus User ini?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `http://localhost:3000/api/users/${id}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    alert("User berhasil dihapus!");
                    fetchUsers();
                } else {
                    console.error("Error saat menghapus User");
                    alert("Error saat menghapus User. Silakan coba lagi.");
                }
            } catch (error) {
                console.error("Error saat menghapus User", error);
                alert("Error saat menghapus User. Silakan coba lagi.");
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value,
        }));
    }

    if (loading) return <div>Loading ....</div>
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-8">Manajemen User</h1>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/3">
                    <div className={`${darkMode ? 'bg-gray-800' : 'primary-light-3'} shadow-md rounded-lg p-4`}>
                        <h2 className="text-center text-xl font-bold mb-4">Tambah User</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <input type="text"
                                    placeholder="Nama"
                                    name="name"
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                    />
                            </div>
                            <div>
                                <input type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange} 
                                    />
                            </div>
                            <div>
                                <input type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input type="address"
                                    placeholder="Alamat"
                                    name="address"
                                    className="border w-full p-2 rounded-md"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <select name="role" className={`border w-full p-2 rounded p-1 ${darkMode ? 'bg-gray-800 text-white' : 'primary-light-3 text-black'}`} onChange={handleChange}>
                                    <option value="">Pilih Role</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="w-full mt-2 rounded-md bg-blue-700 text-white p-3 cursor-pointer hover:bg-blue-800"
                                >
                                   Tambah User
                                </button>

                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:w-2/3">
                
                    <input type="text" placeholder="Cari User" className="border p-2 w-full mb-4 rounded" onChange={handleSearch} />
                    <div className={`${darkMode ? 'bg-gray-800' : 'primary-light-3'} shadow-md rounded-lg p-4`}>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="primary-dark-10">
                                    <th className="border  p-2">No</th>
                                    <th className="border  p-2">Nama</th>
                                    <th className="border  p-2">Email</th>
                                    <th className="border  p-2">Alamat</th>
                                    <th className="border  p-2">Role</th>
                                    <th className="border  p-2">Aksi</th>
                                </tr>
                            </thead>

                                                        <tbody>
                                                                {filteredUsers &&
                                                                    filteredUsers
                                                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                                                        .map((user, index) => (
                                                                            <tr key={user._id || index}>
                                                                                <td className="border  p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                                                <td className="border  p-2">{user.name}</td>
                                                                                <td className="border  p-2">{user.email}</td>
                                                                                <td className="border  p-2">{user.address}</td>
                                                                                <td className="border  p-2">{user.role}</td>
                                                                                <td className="border  p-2">
                                                                                    <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer mr-2 hover:bg-red-700 transition"
                                                                                        onClick={() => handleDelete(user._id)}>Hapus</button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                        </tbody>
                        </table>
                                                {filteredUsers.length === 0 && <div>Data tidak ada</div>}
                                                {/* Pagination Controls */}
                                                <div className="flex justify-center items-center mt-4 gap-2">
                                                    <button
                                                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
                                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Prev
                                                    </button>
                                                    <span>Halaman {currentPage} dari {Math.ceil(filteredUsers.length / itemsPerPage)}</span>
                                                    <button
                                                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
                                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage)))}
                                                        disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage) || filteredUsers.length === 0}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Users