"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const [formData, setFormData] = useState({
    noResi: "",
    name: "",
    telp: "",
    vendor: "",
    photo: null,
  });

  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("noResi", formData.noResi);
    data.append("name", formData.name);
    data.append("telp", formData.telp);
    data.append("vendor", formData.vendor);
    data.append("photo", formData.photo);

    const response = await fetch(
      `https://track-app-backend.onrender.com/api/resi`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();
    if (response.status === 201) {
      setSuccess(result.message);
      setTimeout(() => {
        setFormData({
          noResi: "",
          name: "",
          telp: "",
          vendor: "",
          photo: null,
        });
        setSuccess("");
        router.push("/");
      }, 1000);
    } else {
      setError(response.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="flex-1 p-8 text-white bg-gradient-to-r from-cyan-400 to-cyan-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Tambah Data Resi</h2>
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-4">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="noResi"
              className="block text-sm font-medium text-gray-700"
            >
              No Resi
            </label>
            <input
              type="text"
              id="noResi"
              name="noResi"
              value={formData.noResi}
              onChange={handleChange}
              className="mt-1 px-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 px-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="telp"
              className="block text-sm font-medium text-gray-700"
            >
              Telp
            </label>
            <input
              type="number"
              id="telp"
              name="telp"
              value={formData.telp}
              onChange={handleChange}
              className="mt-1 px-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="vendor"
              className="block text-sm font-medium text-gray-700"
            >
              Vendor
            </label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className="mt-1 px-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8 text-black"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
