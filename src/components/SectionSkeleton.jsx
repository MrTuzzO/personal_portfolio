import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from "@/components/SkeletonCard";
import { cn } from "@/lib/utils";

const SectionSkeleton = ({ 
  className, 
  hasTitle = true, 
  hasParagraph = true, 
  cardCount = 3,
  gridCols = "md:grid-cols-2 lg:grid-cols-3",
  customCard = null 
}) => {
  return (
    <section className={cn("py-20 container mx-auto px-6", className)}>
      {hasTitle && <Skeleton className="h-12 w-1/2 md:w-1/3 mx-auto mb-6" />}
      {hasParagraph && <Skeleton className="h-6 w-3/4 md:w-1/2 mx-auto mb-16" />}
      
      {cardCount > 0 && (
        <div className={`grid ${gridCols} gap-8`}>
          {Array.from({ length: cardCount }).map((_, index) => 
            customCard ? React.cloneElement(customCard, { key: index }) : <SkeletonCard key={index} />
          )}
        </div>
      )}
    </section>
  );
};

export default SectionSkeleton;