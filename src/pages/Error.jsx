import React from "react";
import { Link } from "react-router-dom";   
import ErrorImg from "../assets/ErrorImg.png";  

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-5 bg-gray-50">

      <img
        src={ErrorImg}
        alt="404 Error"
        className="w-72 md:w-96 mb-6" />

      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
        Oops! Page Not Found
      </h1>

      <p className="text-gray-600 max-w-md mb-2">
        The page you're looking for doesn't exist. It may have been moved or deleted.
      </p>

      <p className="text-gray-600 max-w-md mb-6">
        Please check the URL or go back to the homepage.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition">
        Go Home
      </Link>
    </div>
  );
};

export default Error;