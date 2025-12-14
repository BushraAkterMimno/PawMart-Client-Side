import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password, photoURL } = e.target;

    // Password validation
    const pwd = password.value;
    if (!/(?=.*[a-z])/.test(pwd) || !/(?=.*[A-Z])/.test(pwd) || pwd.length < 6) {
      setError("Password must have 1 uppercase, 1 lowercase, min 6 characters.");
      return;
    }

    try {
      await registerUser(name.value, email.value, pwd, photoURL.value);
      alert("Account Created Successfully!");
      e.target.reset();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    try {
      await googleLogin();
      alert("Google Login Successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input 
        name="name" 
        type="text" 
        required 
        placeholder="Name" 
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" />

        <input 
        name="email" 
        type="email" 
        required 
        placeholder="Email" 
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" />

        <input 
        name="password" 
        type="password" 
        required 
        placeholder="Password" 
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" />

        <input 
        name="photoURL" 
        type="text" 
        placeholder="Photo URL" 
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" />

        <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Register</button>

        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <span>─────────</span>
          <span>OR</span>
          <span>─────────</span>
        </div>

        <button type="button" onClick={handleGoogleRegister} className="w-full flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-gray-100">
          <FcGoogle className="text-xl" /> Register with Google
        </button>

        <p className="text-center text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;