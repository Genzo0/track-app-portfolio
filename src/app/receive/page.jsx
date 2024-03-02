"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReceivePage() {
  const [noResi, setNoResi] = useState("");
  const [receivedData, setReceivedData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setNoResi(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you can perform the fetch request to get the data based on the No Resi
    try {
      const response = await fetch(
        `http://103.127.135.66:5000/api/resi/${noResi}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setReceivedData(data);
      } else {
        setError(data.message);
        setReceivedData(null);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Gagal mengambil data");
    }
  };

  const handleTerimaResi = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://103.127.135.66:5000/api/resi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noResi }),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess("");
          setReceivedData(null);
          setNoResi("");
          router.push("/");
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Gagal menerima resi");
    }
  };

  return (
    <div className="flex-1 p-8 text-white bg-gradient-to-r from-cyan-400 to-cyan-900 flex flex-col items-center justify-center">
      <div className="container mx-auto p-8 bg-gray-800 rounded-lg shadow-lg my-20 max-w-2xl sm:ml-4 sm:mr-4">
        <h1 className="text-3xl font-bold mb-4">Terima Resi</h1>
        {/* Error and success messages */}
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

        {/* Form for entering No Resi */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
          <input
            type="text"
            id="noResi"
            value={noResi}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-2 sm:mb-0 sm:mr-2 flex-grow text-black"
            placeholder="Masukkan No Resi"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Cari
          </button>
        </div>

        {/* Display received data */}
        {receivedData && (
          <div className="bg-white bg-opacity-25 rounded-lg shadow-md p-4 mb-4 flex flex-col sm:flex-row items-center">
            <div className="mb-4 sm:mr-4 sm:mb-0">
              <img
                src={`http://103.127.135.66:5000${receivedData.photo}`}
                alt="Received Data"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Data Resi</h2>
              <p>No Resi: {receivedData.noResi}</p>
              <p>Nama Tujuan: {receivedData.name}</p>
              <p>Telp: {receivedData.telp}</p>
              <p>Ekspedisi: {receivedData.vendor}</p>
            </div>
            <button
              onClick={handleTerimaResi}
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 sm:mt-0 ml-auto"
            >
              Terima Resi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
