import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex-1 p-8 text-white bg-gradient-to-r from-cyan-500 to-cyan-900 flex flex-col items-center justify-center sm:flex-row sm:text-left">
        <div className="flex flex-col items-center justify-center ">
          <div className="bg-red-300 p-5 font-bold">
            For security purposes, all functional is disabled!
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">RISPEG UB</h2>
          <h3 className="text-2xl font-bold mb-4 text-center">
            Riwayat Ekspedisi Pegawai UB
          </h3>
          <p className="mb-6 text-center sm:text-left">
            Cara mudah untuk menambah, menerima, dan mengelola data pengiriman
            Anda.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center sm:items-start">
            <a
              href="/add"
              className="flex-1 text-center bg-cyan-500 text-white py-3 px-6 rounded-full min-w-[200px]"
            >
              Tambah
            </a>
            <a
              href="/receive"
              className="flex-1 text-center bg-cyan-800 text-white py-3 px-6 rounded-full min-w-[200px]"
            >
              Terima
            </a>
          </div>
          <div className="mt-4">
            <a
              href="/reports"
              className="block text-center bg-orange-500 text-white py-3 px-6 rounded-full min-w-[200px]"
            >
              Laporan
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
