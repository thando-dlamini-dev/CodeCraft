export default function InfiniteScroll() {
    return (
      <div className="relative w-full h-32 overflow-hidden">
        {/* Fade Effect (Left) */}
        <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10"></div>
  
        {/* Scrolling Container */}
        <div className="flex w-max animate-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-24 h-24 bg-red-500 mx-2 rounded-lg"></div>
          ))}
          {/* Duplicate for smooth infinite scrolling */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={`duplicate-${index}`} className="w-24 h-24 bg-red-500 mx-2 rounded-lg"></div>
          ))}
        </div>
  
        {/* Fade Effect (Right) */}
        <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    );
  }
  