"use client";

import { useState, useEffect } from "react";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data for the report table
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resi");
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
    <div className="flex-1 p-8 text-white bg-gradient-to-r from-cyan-400 to-cyan-900">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Laporan Resi</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  No Resi
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Nama
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  No Telp
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Vendor
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Gambar
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Status
                </th>
                {/* For mobile view */}
                <th className="py-2 px-4 text-left sm:hidden">No Resi</th>
                <th className="py-2 px-4 text-left sm:hidden">Nama</th>
                <th className="py-2 px-4 text-left sm:hidden">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="bg-gray-700">
                    <td className="py-2 px-4 hidden sm:table-cell">
                      {item.noResi}
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell">
                      {item.telp}
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell">
                      {item.vendor}
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell">
                      <img
                        src={`${item.photo}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell">
                      {item.isAccepted ? (
                        <span className="bg-green-500 text-white p-1 rounded">
                          Sudah diterima
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white p-1 rounded">
                          Belum diterima
                        </span>
                      )}
                    </td>
                    {/* For mobile view */}
                    <td className="py-2 px-4 sm:hidden">{item.noResi}</td>
                    <td className="py-2 px-4 sm:hidden">{item.name}</td>
                    <td className="py-2 px-4 sm:hidden">
                      {item.isAccepted ? (
                        <span className="bg-green-500 text-white p-1 rounded">
                          Sudah diterima
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white p-1 rounded">
                          Belum diterima
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-3xl">
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
