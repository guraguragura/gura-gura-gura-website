
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const CategoryPagination = ({ currentPage, totalPages, setCurrentPage }: CategoryPaginationProps) => {
  const isMobile = useIsMobile();
  
  if (totalPages <= 1) return null;

  // Show fewer pages on mobile
  const pagesToShow = isMobile ? 3 : 7;

  return (
    <Pagination className="mt-4 sm:mt-8">
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {Array.from({ length: Math.min(totalPages, pagesToShow) }).map((_, i) => {
          let pageNumber;
          
          if (isMobile) {
            // Simplified pagination for mobile
            if (totalPages <= 3) {
              pageNumber = i + 1;
            } else if (currentPage <= 2) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 1) {
              pageNumber = totalPages - (2 - i);
            } else {
              pageNumber = currentPage + (i - 1);
            }
          } else {
            // Desktop pagination
            if (totalPages <= 7) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i < 5 ? i + 1 : (i === 5 ? "..." : totalPages);
            } else if (currentPage >= totalPages - 2) {
              pageNumber = i < 2 ? (i === 0 ? 1 : "...") : totalPages - (6 - i);
            } else {
              pageNumber = i === 0 ? 1 : i === 1 ? "..." : i === 5 ? "..." : i === 6 ? totalPages : currentPage + (i - 3);
            }
          }

          return (
            <PaginationItem key={i} className={isMobile ? "text-sm" : ""}>
              {pageNumber === "..." ? (
                <span className="py-1 px-2 sm:py-2 sm:px-4">...</span>
              ) : (
                <PaginationLink
                  onClick={() => typeof pageNumber === 'number' && setCurrentPage(pageNumber)}
                  isActive={currentPage === pageNumber}
                  className={typeof pageNumber === 'number' ? "cursor-pointer" : ""}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CategoryPagination;
