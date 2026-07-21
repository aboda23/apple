import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-[#111111] border border-white/5 rounded-[24px] p-6 flex flex-col gap-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-white/5 rounded-[16px]"></div>
      
      {/* Badges Skeleton */}
      <div className="flex gap-2">
        <div className="w-16 h-6 bg-white/5 rounded-full"></div>
        <div className="w-12 h-6 bg-white/5 rounded-full"></div>
      </div>
      
      {/* Text Skeleton */}
      <div className="space-y-2 mt-2">
        <div className="w-3/4 h-6 bg-white/5 rounded-md"></div>
        <div className="w-full h-4 bg-white/5 rounded-md"></div>
        <div className="w-5/6 h-4 bg-white/5 rounded-md"></div>
      </div>
      
      <div className="flex-grow"></div>
      
      {/* Price and Button Skeleton */}
      <div className="flex items-center justify-between mt-6">
        <div className="w-20 h-6 bg-white/5 rounded-md"></div>
        <div className="w-24 h-10 bg-white/10 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
