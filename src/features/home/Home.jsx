import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-20">
        {/* updated title using #3498db */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          MindAR{" "}
          <span className="relative inline-block text-[#3498db]">
            Dashboard
            <span className="absolute left-0 bottom-0 w-full h-1 bg-[#3498db] rounded-full" />
          </span>
        </h1>

        {/* updated description */}
        <p className="mt-4 max-w-md text-lg text-gray-500">
          Aquí están los datos de los niños ingresados en MindAR.
        </p>

        <div className="mt-8">
          <button
            className="inline-flex items-center rounded-md border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
            onClick={() => alert("Reproducir video")}
          >
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
            Watch video
          </button>
        </div>
      </main>
    </div>
  );
}
