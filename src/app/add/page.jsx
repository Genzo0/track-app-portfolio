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
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    const data = new FormData();
    data.append("noResi", formData.noResi);
    data.append("name", formData.name);
    data.append("telp", formData.telp);
    data.append("vendor", formData.vendor);
    data.append("photo", formData.photo);

    try {
      const response = await fetch(`https://www.genzoproject.biz.id/api/resi`, {
        method: "POST",
        body: data,
      });

      if (response.status === 201) {
        const result = await response.json();
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
        const result = await response.json();
        setError(result.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
      setError("Failed to submit data");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setIsLoading(false);
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
              Nama Tujuan
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
              Ekspedisi
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
            {isLoading ? (
              <button
                disabled
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 -ml-1 w-4 h-4 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Mengupload data...
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
