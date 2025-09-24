import React,{ useState } from 'react';
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router";
import axios from 'axios';

const Login = ({ darkMode }) => {
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
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
            await login(data.user, data.token);
            if (data.user.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/customer-dashboard");
            }
        } else {
            alert(data.error);
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
        <div className="min-h-screen bg-base-100 text-base-content">
            <div className="container mx-auto py-20">
                <form className={`max-w-lg mx-auto rounded-lg shadow p-8 flex flex-col gap-4 ${darkMode ? '  bg-gray-800 text-white ' : ' primary-light-6 text-black'}`} 
                      onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Login
                    </h2>
                {error && (
                    <div className= "bg-red-200 text-red-700 p-2 mb-4 rounded">
                        {error}
                    </div>
                )}
                
                <div className="mb-4">
                    <label>Email</label>
                    <input 
                    type="email" 
                    className="w-full px-3 py-2 border rounded" 
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukan Email"
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
                    placeholder="Masukan Password"
                    required></input>
                </div>
                <div className="mb-4">
                <button 
                type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition "
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
