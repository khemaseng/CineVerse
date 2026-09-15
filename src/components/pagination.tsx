'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get current page from URL, defaulting to 1
  const currentPage = Number(searchParams.get('page')) || 1;

  // Helper to construct the new URL with updated search params
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Previous Button */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 border rounded-md ${
          currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>

      {/* Page Info */}
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 border rounded-md ${
          currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </div>
  );
}
