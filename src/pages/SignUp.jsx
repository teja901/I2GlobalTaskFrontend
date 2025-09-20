import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

import CompanyLogo from '../../public/Images/CompanyLogo.jpeg'
export default function SignUp() {
  const [form, setForm] = useState({ user_name: "", user_email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.signup(form);
      alert("Registered successfully. Please login.");
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen grid place-items-center bg-gradient-to-r from-green-100 to-teal-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
       
        <div className="hidden lg:flex bg-teal-600 items-center justify-center">
          <img
            src={CompanyLogo}
            alt="Sign Up Illustration"
            className="object-cover h-full w-full"
          />
        </div>

       
        <div className="p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center lg:text-left">
            Sign up to start creating and managing your notes
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="user_name" className="text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                id="user_name"
                name="user_name"
                value={form.user_name}
                onChange={onChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="user_email" className="text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                id="user_email"
                name="user_email"
                value={form.user_email}
                onChange={onChange}
                type="email"
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="your email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={onChange}
                type="password"
                required
                minLength={6}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-teal-600 font-medium hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
