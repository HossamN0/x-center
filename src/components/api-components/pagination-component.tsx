'use client'

import { PaginationType } from '@/types/api'
import { buttonVariants } from '../ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function PaginationComponent({ data }: { data: PaginationType }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(data?.current_page || 1);
    const totalPages = Math.ceil(data.total / data.per_page);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const getVisiblePages = () => {
        const pages: (number | string)[] = []
        const delta = 1 // how many pages to show around the current page

        if (totalPages <= 7) {
            // Small number of pages → show all
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            // Always show first page
            pages.push(1)

            // Show left ellipsis if needed
            if (currentPage - delta > 2) pages.push('...')

            // Calculate visible range
            const start = Math.max(2, currentPage - delta)
            const end = Math.min(totalPages - 1, currentPage + delta)

            for (let i = start; i <= end; i++) pages.push(i)

            // Show right ellipsis if needed
            if (currentPage + delta < totalPages - 1) pages.push('...')

            // Always show last page
            pages.push(totalPages)
        }

        return pages
    }

    const visiblePages = getVisiblePages()
    return (
        <Pagination>
            <PaginationContent>
                {data?.current_page > 1 &&
                    <PaginationItem>
                        <PaginationPrevious className={`${buttonVariants()} cursor-pointer !px-1 md:!px-[12px]`} onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                }
                {visiblePages.map((page, index) =>
                    page === '...' ? (
                        <PaginationItem key={`dots-${index}`}>
                            <PaginationEllipsis className="text-white" />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                className={`${buttonVariants()} cursor-pointer !px-1 md:!px-[12px] ${currentPage === page
                                    ? 'bg-primary-foreground border-2 border-primary text-white'
                                    : ''
                                    }`}
                                onClick={() => handlePageChange(page as number)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}
                {data?.current_page < totalPages &&
                    <PaginationItem>
                        <PaginationNext className={`${buttonVariants()} cursor-pointer !px-1 md:!px-[12px]`} onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
