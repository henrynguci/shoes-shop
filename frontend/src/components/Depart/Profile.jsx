import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Profile() {
  const [profile, setProfile] = useState("");
  const accountId = localStorage.getItem("id");

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Return formatted date as 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  }

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/customer/${accountId}`
      );
      setProfile(response.data[0]);
      console.log(response.data); // Log the customer data
    } catch (error) {
      console.error(
        "Error fetching customer data:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);
  // Render loading message if profile data isn't yet available
  if (!profile) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Profile:</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Field
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">Full Name</td>
            <td className="px-4 py-2 text-gray-700">{profile.Fullname}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">Email</td>
            <td className="px-4 py-2 text-gray-700">{profile.Email}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">Phone</td>
            <td className="px-4 py-2 text-gray-700">{profile.PhoneNumber}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">BirthDay</td>
            <td className="px-4 py-2 text-gray-700">
              {formatDate(profile.Bdate)}
            </td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">Address</td>
            <td className="px-4 py-2 text-gray-700">{profile.Address}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">CurentPoint</td>
            <td className="px-4 py-2 text-gray-700">{profile.CurrentPoint}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">TotalPoint</td>
            <td className="px-4 py-2 text-gray-700">{profile.TotalPoint}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-800">Level</td>
            <td className="px-4 py-2 text-gray-700">{profile.Level}</td>
          </tr>
          {/* Add other fields as needed */}
        </tbody>
      </table>
    </div>
  );
}
