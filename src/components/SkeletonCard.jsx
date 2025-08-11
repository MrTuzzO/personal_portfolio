import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2 mt-auto">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-8 w-28 mt-2" />
    </div>
  );
};

export default SkeletonCard;