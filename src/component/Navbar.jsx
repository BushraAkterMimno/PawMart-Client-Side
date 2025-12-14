import React, { useState, useContext, useEffect  } from "react";
import MyLink from "./MyLink";
import Logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

       //  theme state
   const [theme, setTheme] = useState("light");

   //  load theme from localStorage on first render
   useEffect(() => {
     const savedTheme = localStorage.getItem("theme") || "light";
     setTheme(savedTheme);
     document.documentElement.setAttribute("data-theme", savedTheme);
   }, []);

   //  toggle theme
   const handleThemeChange = () => {
     const newTheme = theme === "light" ? "dark" : "light";
     setTheme(newTheme);
     localStorage.setItem("theme", newTheme);
     document.documentElement.setAttribute("data-theme", newTheme);
   };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50 px-4">
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><MyLink to="/">Home</MyLink></li>
            <li tabIndex={0}>
              <a className="justify-between">
                Services
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li><MyLink to="/pet-adopt">Pet Adopt</MyLink></li>
                <li><MyLink to="/pet-accessories">Pet Accessories</MyLink></li>
                <li><MyLink to="/veterinary-team">Veterinary Team</MyLink></li>
              </ul>
            </li>
            <li><MyLink to="/add-service">Add Services</MyLink></li>
            <li><MyLink to="/my-listings">My Listings</MyLink></li>
            <li><MyLink to="/my-orders">My Orders</MyLink></li>
          </ul>
        </div>
        <img src={Logo} alt="Logo" className="w-20 h-14 ml-2"/>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><MyLink to="/">Home</MyLink></li>
          <li className="relative group">
            <a className="flex items-center gap-1">
              Services
              <svg className="fill-current w-3 h-3 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </a>
            <ul className="absolute left-0 top-full mt-1 hidden group-hover:block bg-base-100 shadow-lg rounded-lg min-w-[180px] z-50">
              <li><MyLink to="/pet-adopt" className="px-4 py-2 block hover:bg-gray-100">Pet Adopt</MyLink></li>
              <li><MyLink to="/pet-accessories" className="px-4 py-2 block hover:bg-gray-100">Pet Accessories</MyLink></li>
              <li><MyLink to="/veterinary-team" className="px-4 py-2 block hover:bg-gray-100">Veterinary Team</MyLink></li>
            </ul>
          </li>
          <li><MyLink to="/add-service">Add Services</MyLink></li>
          <li><MyLink to="/my-listings">My Listings</MyLink></li>
          <li><MyLink to="/my-orders">My Orders</MyLink></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {!user ? (
          <>
            <MyLink to="/login" className="btn">Login</MyLink>
            <MyLink to="/register" className="btn">Register</MyLink>
          </>
        ) : (
          <>
            <MyLink to="/profile">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="rounded-full w-10 h-10" />
            </MyLink>
            <button onClick={handleLogout} className="btn">Logout</button>
            

         {/* Theme Toggle */}
         <label className="swap swap-rotate cursor-pointer">
           <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleThemeChange} />

           {/* sun icon */}
           <svg
             className="swap-off h-7 w-7 fill-current"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
             <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
           </svg>

           {/* moon icon */}
           <svg
             className="swap-on h-7 w-7 fill-current"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
             <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
           </svg>
         </label>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;