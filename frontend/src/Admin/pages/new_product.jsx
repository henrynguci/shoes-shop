import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";

export default function New_product() {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
    })
    
  };

  const handleSubmit = () => {
    console.log("success");
  };

  return (
    <Box m="20px">
      <Header title="THÊM SẢN PHẨM" subtitle="Tạo mới ngay" />
      <main className="p-3 max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <p>Size: </p>
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
              </div>
              <div className="flex items-center gap-2">
                <p>Color: </p>
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                    <span className="text-xs">($ / month)</span>
                </div>
              </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>
                      <span className="text-xs">($ / month)</span>
                  </div>
                </div>
            </div>
            {/* BUTTON SUBMIT */}
            <button
              disabled={loading || uploading}
              className="p-3 bg-[#02c457] text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Updating..." : "TẠO MỚI"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </main>
    </Box>
  );
}
