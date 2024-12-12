import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from '../public/c392ba101244345.5f1a2d7ad1371.jpg'

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex h-[90vh] bg-gray-100">
      {/* Left Side: Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-10">
        <div className="flex flex-col flex-wrap content-center justify-center items-stretch">
            <h1 className="font-bold mb-4 text-[xxx-large]">WELCOME BACK</h1>
            <p className="text-gray-500 mb-6">Welcome back! Please enter your details.</p>

            <form className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-red-500" />
                <span className="ml-2 text-gray-700 text-sm">Remember me</span>
                </label>
                <a href="/" className="text-sm text-red-500 hover:underline">Forgot password?</a>
            </div>

            <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                onClick={handleSubmit}
            >
                Sign in
            </button>
            </form>

            <p className="mt-6 text-center text-gray-500">
            Don't have an account? <a href="/" className="text-red-500 hover:underline">Sign up for free!</a>
            </p>
        </div>
      </div>

      {/* Right Side: Illustration */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <img
          src={img}
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

  );
}