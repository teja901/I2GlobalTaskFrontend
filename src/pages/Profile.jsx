import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import apiService from "../api/authApi"; 
import { useAuthStore } from "../context/authStore";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const token = useAuthStore((s) => s.token);

 useEffect(() => {
  const fetchProfile = async () => {
    if (!token) return;
    try {
      const data = await apiService.me(token);
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please sign in again.");
        logout();
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [token]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        No user data found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8">
         
          <div className="flex flex-col items-center md:items-start">
            <div className="text-blue-600 text-8xl sm:text-9xl">
              <FaUserCircle />
            </div>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">
              Member since 2025
            </p>
          </div>

          
          <div className="mt-6 md:mt-0 flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
                {userData.user_name}
              </h2>
              {/* <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-medium">
                <FaEdit />
                Edit
              </button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-gray-700">
              <div>
                <p className="font-extrabold text-gray-500 text-sm sm:text-base">
                  Email
                </p>
                <p className="mt-1 text-gray-800">{userData.user_email || "N/A"}</p>
              </div>

              <div>
                <p className="font-extrabold text-gray-500 text-sm sm:text-base">
                  Username
                </p>
                <p className="mt-1 text-gray-800 capitalize">{userData.user_name || "N/A"}</p>
              </div>

              <div>
                <p className="font-extrabold text-gray-500 text-sm sm:text-base">
                  Phone
                </p>
                <p className="mt-1 text-gray-800">{userData.phone || "N/A"}</p>
              </div>

              {/* <div>
                <p className="font-medium text-gray-500 text-sm sm:text-base">
                  Role
                </p>
                <p className="mt-1 text-gray-800">{userData.role || "User"}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
