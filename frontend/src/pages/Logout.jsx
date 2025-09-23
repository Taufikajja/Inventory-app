import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.post("http://localhost:3000/api/auth/logout");
      } catch (err) {
        // Optional: handle error
      }
      logout();
      navigate("/login");
    };
    doLogout();
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
