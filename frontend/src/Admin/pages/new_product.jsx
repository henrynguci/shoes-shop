import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import axios from "axios";

export default function New_product() {
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Brand_ID: "",
    Gift_ID: "",
    Img_url: "",
    Color: "",
    Size: "",
    Price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/products", {
        Product: {
          Name: formData.Name,
          Description: formData.Description,
          Brand_ID: formData.Brand_ID,
          Gift_ID: formData.Gift_ID || null,
          Img_url: formData.Img_url,
        },
        Version: {
          Color: formData.Color,
          Size: formData.Size,
          Price: parseFloat(formData.Price),
        },
      });
      alert(response.data.message || "Product created successfully!");
      setFormData({
        Name: "",
        Description: "",
        Brand_ID: "",
        Gift_ID: "",
        Img_url: "",
        Color: "",
        Size: "",
        Price: 0,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="THÊM SẢN PHẨM" subtitle="Tạo mới ngay" />
      <main className="p-3 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="Name"
              required
              onChange={handleChange}
              value={formData.Name}
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="Description"
              required
              onChange={handleChange}
              value={formData.Description}
            />
            <input
              type="text"
              placeholder="Brand ID"
              className="border p-3 rounded-lg"
              id="Brand_ID"
              required
              onChange={handleChange}
              value={formData.Brand_ID}
            />
            <input
              type="text"
              placeholder="Gift ID (optional)"
              className="border p-3 rounded-lg"
              id="Gift_ID"
              onChange={handleChange}
              value={formData.Gift_ID}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-3 rounded-lg"
              id="Img_url"
              required
              onChange={handleChange}
              value={formData.Img_url}
            />
            <input
              type="text"
              placeholder="Color"
              className="border p-3 rounded-lg"
              id="Color"
              required
              onChange={handleChange}
              value={formData.Color}
            />
            <input
              type="text"
              placeholder="Size"
              className="border p-3 rounded-lg"
              id="Size"
              required
              onChange={handleChange}
              value={formData.Size}
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-3 rounded-lg"
              id="Price"
              required
              onChange={handleChange}
              value={formData.Price}
            />
            <button
              disabled={loading}
              className="p-3 bg-[#02c457] text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Đang tạo..." : "TẠO MỚI"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </main>
    </Box>
  );
}
