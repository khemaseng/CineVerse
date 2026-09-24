'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If there is only 1 page or less, don't show pagination
  if (totalPages <= 1) return null;

  // Get current page from URL, defaulting to 1
  const currentPage = Math.max(1, Math.min(Number(searchParams.get('page')) || 1, totalPages));

  // Helper to construct the new URL with updated search params
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate page numbers to display with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav aria-label="Pagination Navigation" className="flex flex-wrap items-center justify-center gap-2 mt-10">
      {/* Previous Button */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg border border-border transition-all ${
          currentPage <= 1
            ? 'pointer-events-none opacity-40 bg-muted/20 text-muted-foreground'
            : 'bg-muted/40 text-foreground hover:bg-primary-gold hover:text-navy-blue shadow-sm'
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-xs text-muted-foreground select-none"
              >
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <Link
              key={`page-${page}`}
              href={createPageURL(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                isCurrent
                  ? 'bg-primary-gold text-navy-blue shadow-md'
                  : 'border border-border bg-muted/30 text-foreground hover:bg-muted hover:border-primary-gold/50'
              }`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg border border-border transition-all ${
          currentPage >= totalPages
            ? 'pointer-events-none opacity-40 bg-muted/20 text-muted-foreground'
            : 'bg-muted/40 text-foreground hover:bg-primary-gold hover:text-navy-blue shadow-sm'
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
