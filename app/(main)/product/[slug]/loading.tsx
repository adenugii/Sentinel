export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-square bg-gray-200 rounded-md"></div>
               ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            
            <div className="space-y-2 pt-4">
               <div className="h-4 bg-gray-200 rounded w-1/6"></div>
               <div className="flex gap-2">
                  {[1, 2, 3].map(i => <div key={i} className="h-8 w-8 rounded-full bg-gray-200"></div>)}
               </div>
            </div>

            <div className="pt-4">
               <div className="h-12 bg-gray-200 rounded w-full mb-3"></div>
               <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}