import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { loginUser, googleLogin, resetPassword } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [forgetMode, setForgetMode] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = e.target;
    try {
      await loginUser(email.value, password.value);
      alert("Login Successful!");
      e.target.reset();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await googleLogin();
      alert("Google Login Successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Forget password
  const handleForget = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    try {
      await resetPassword(email);
      alert("Password reset email sent! Check your inbox.");
      setForgetMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">

        {!forgetMode ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 pr-10" />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-500">
                  {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-purple-600" />
                  Remember Me
                </label>
                <button
                  type="button"
                  onClick={() => setForgetMode(true)}
                  className="text-purple-600 hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Login</button>
            </form>

            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span>─────────</span>
              <span>OR</span>
              <span>─────────</span>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-gray-100 transition-colors">
              <FcGoogle className="text-xl" /> Login with Google
            </button>

            <p className="text-center text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-purple-600 hover:underline">
                Register here
              </a>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">Forget Password</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                
              <button
                type="button"
                onClick={handleForget}
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Send Password Reset Email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;