import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/authStore";

export default function Navbar() {
  
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            I2 GLOBAL
          </Link>

          <div className="flex items-center gap-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="font-medium text-gray-700">
                    Hi, {user ? user.user_name : "User"}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-100 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition" onClick={() => setMenuOpen(false)}>Profile</Link>
                    <Link to="/notes/add" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition" onClick={() => setMenuOpen(false)}>Add Note</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
