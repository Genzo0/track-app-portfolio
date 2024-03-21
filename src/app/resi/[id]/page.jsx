"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function DetailPage({ params }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.genzoproject.my.id/api/resi/${params.id}`
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex-1 p-8 text-white bg-gradient-to-r from-cyan-500 to-cyan-900 flex flex-col items-center justify-center sm:flex-row sm:text-left">
        <div className="flex flex-col items-center justify-center ">
          <div className="container mx-auto p-12 bg-gray-800 rounded-lg shadow-lg my-8 sm:ml-4 sm:mr-4">
            <h1 className="text-3xl font-bold mb-6">Detail Resi</h1>

            <div className="p-6 bg-white bg-opacity-15 rounded-lg flex flex-col sm:flex-row items-center">
              <div className="mb-6 sm:mr-6 sm:mb-0">
                <img
                  src={`https://www.genzoproject.my.id${data.photo}`}
                  alt="Received Data"
                  className="w-48 h-48 object-cover rounded"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Data Resi</h2>
                <p className="mb-2">No Resi: {data.noResi}</p>
                <p className="mb-2">Nama Tujuan: {data.name}</p>
                <p className="mb-2">Telp: {data.telp}</p>
                <p className="mb-2">Ekspedisi: {data.vendor}</p>
                <p className="mb-2">
                  Status:{" "}
                  {data.isAccepted ? (
                    <span className="text-green-500">Sudah diterima</span>
                  ) : (
                    <span className="text-red-500">Belum diterima</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
