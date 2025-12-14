import React from "react";
import { NavLink } from "react-router-dom";

const MyLink = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className} font-semibold ${isActive ? "text-indigo-600" : ""}`
      }>
      {children}
    </NavLink>
  );
};

export default MyLink;