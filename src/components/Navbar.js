import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4 justify-center">
        <li>
          <Link to="/register" className="hover:underline">Register Face</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">Login with Face</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
