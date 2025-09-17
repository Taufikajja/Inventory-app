import React,{ useState } from 'react';
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router";
import axios from 'axios';

const Login = () => {
    const [ email,setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        

        try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/login", {
            email, password
        }
    );
    console.log(response.data);
        
            if (response.data.success) {
                await login(response.data.user, response.data.token);
                if(response.data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/customer-dashboard");
                }
            } else {
                alert(response.data.error);
            }

        } catch (error) {
            if(error.response) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
        }
    

    return(
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 space-y-6">
            <h2 className="text-3xl text-white">Inventory</h2>
            <div className="border shadow-lg p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && (
                    <div className= "bg-red-200 text-red-700 p-2 mb-4 rounded">
                        {error}
                    </div>
                )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                    type="email" 
                    className="w-full px-3 py-2 border" 
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required>
                    </input>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input 
                    type="password" 
                    className="w-full px-3 py-2 border" 
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required></input>
                </div>
                <div className="mb-4">
                <button 
                type="submit"
                className="w-full bg-cyan-600 text-white py-2"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Login;
