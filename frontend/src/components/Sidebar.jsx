import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa';
import {FaBox, FaCog, FaHome, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUsers} from "react-icons/fa"
import { NavLink } from 'react-router'

const Sidebar = ({ darkMode, setDarkMode }) => {
    const menuItems = [
        // {name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true},
        {name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent: true},
        { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />, isParent: false},
        { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent: false},
        // { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent: false},
        { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers />, isParent: false},
        // { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false},
        { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt />, isParent: false},
]

    return (
        <div className={`flex flex-col h-screen ${darkMode ? 'primary-dark-5' : 'primary-light-5'} w-16 md:w-64 fixed`}>
                        <div className='flex items-center justify-center relative w-full'>
                <span className={`justify-center md:hidden text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Opiq</span>
                        </div>
                         <div className='h-16 flex items-center px-5 relative w-full'> 
                                <span className={`hidden md:block text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Opique Clothes</span>
                                <button
                                    className="absolute right-4 flex items-center gap-2 px-3 py-2 rounded bg-base-200 text-base-content hover:bg-base-100 transition"
                                    onClick={() => setDarkMode((prev) => !prev)}
                                >
                                    {darkMode ? (<FaMoon className="text-white-800 text-white-200 text-lg" />) : (<FaSun className="text-yellow-400 text-lg" />) }
                                </button>
                        </div>

            <div className='flex-1'>
                <ul className='space-y-2 p-2'>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                                                        <NavLink
                                                                end={item.isParent}
                                                                className={({ isActive }) =>
                                                                    (isActive
                                                                        ? (darkMode ? 'primary-dark-9' : 'primary-light-3')
                                                                        : '') +
                                                                    ' flex items-center p-2 rounded-md ' +
                                                                    (darkMode ? 'hover:primary-dark-9' : 'hover:primary-light-3') +
                                                                    ' transition duration-200'
                                                                }
                                                                to={item.path} >
                                                                <span className='text-xl'>{item.icon}</span>
                                                                <span className='ml-4 hidden md:block'>{item.name}</span>
                                                        </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Removed bottom button, now in header */}
        </div>
    )
}

export default Sidebar