export default function Loading() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skeleton Header */}
        <div className="mb-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Skeleton Sidebar Filter */}
          <div className="w-full md:w-64 lg:w-72 hidden md:block animate-pulse">
             <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Skeleton Grid Produk */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Buat 6 kotak skeleton */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex justify-between items-center pt-2">
                       <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                       <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}