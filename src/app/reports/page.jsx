"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Reports() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Fetch data for the report table
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.genzoproject.biz.id/api/resi`
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

  const filteredReport = data.filter(
    (item) =>
      item.noResi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 text-white bg-gradient-to-r from-cyan-400 to-cyan-900">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Laporan Resi</h1>
        <div className="flex justify-end items-center mb-3">
          <input
            type="text"
            placeholder="Cari berdasarkan No Resi atau Nama Tujuan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-300 bg-opacity-50 border border-gray-300 text-white placeholder-slate-600 text-sm rounded-lg w-96 p-2"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  No Resi
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Nama Tujuan
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  No Telp
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Ekspedisi
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Gambar
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  Status
                </th>
                {/* For mobile view */}
                <th
                  className="py-2 px-4 text-left sm:hidden"
                  style={{ width: "40%" }}
                >
                  No Resi
                </th>
                <th
                  className="py-2 px-4 text-left sm:hidden"
                  style={{ width: "30%" }}
                >
                  Nama Tujuan
                </th>
                <th
                  className="py-2 px-4 text-left sm:hidden"
                  style={{ width: "30%" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReport.length > 0 ? (
                filteredReport
                  .slice()
                  .reverse()
                  .map((item) => (
                    <tr
                      key={item._id}
                      className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
                      onDoubleClick={() => router.push(`/resi/${item.noResi}`)}
                    >
                      <td className="py-2 px-4 hidden sm:table-cell w-1/5 break-words">
                        {item.noResi}
                      </td>
                      <td className="py-2 px-4 hidden sm:table-cell w-1/5 break-words">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 hidden sm:table-cell w-1/5 break-words">
                        {item.telp}
                      </td>
                      <td className="py-2 px-4 hidden sm:table-cell w-1/12 break-words">
                        {item.vendor}
                      </td>
                      <td className="py-2 px-4 hidden sm:table-cell w-1/5 break-words">
                        <img
                          src={`https://www.genzoproject.biz.id${item.photo}`}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </td>
                      <td className="py-2 px-4 hidden sm:table-cell w-2/12 break-words">
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
                      <td className="py-2 px-4 sm:hidden w-2/5 break-words">
                        {item.noResi}
                      </td>
                      <td className="py-2 px-4 sm:hidden w-2/5 break-words">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 sm:hidden w-1/5">
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
                  <td
                    colSpan="6"
                    className="py-4 text-center text-3xl text-blue-300 font-bold"
                  >
                    Loading...
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
