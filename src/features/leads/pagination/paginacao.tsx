import {
    Pagination, PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import React from "react";
import {motion} from "framer-motion";

interface LeadPageProps {
    pageAtual: number;
    pageMax: number;
    onPageChange: (page: number) => void;
}

export default function PaginacaoPage({pageAtual, pageMax, onPageChange}: LeadPageProps) {
    const totalPages = Math.ceil(pageMax / 10) || 1;
    const pagesRange = 2;

    const pageScroll = (page: number) => {
        onPageChange(page);
        window.scrollTo(0, 0);
    };

    const handlePrevious = () => {
        if (pageAtual > 1) {
            pageScroll(pageAtual - 1);
        }
    };

    const handleNext = () => {
        if (pageAtual < totalPages) {
            pageScroll(pageAtual + 1);
        }
    };

    const pages = [];
    let startPage = Math.max(1, pageAtual - pagesRange);
    let endPage = Math.min(totalPages, pageAtual + pagesRange);

    if (endPage - startPage + 1 < (pagesRange * 2) + 1) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + (pagesRange * 2));
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - (pagesRange * 2));
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const disabledClasses = "opacity-50 cursor-not-allowed";

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                        <PaginationPrevious
                            className={`cursor-pointer ${pageAtual === 1 ? disabledClasses : "hover:bg-gray-100"}`}
                            onClick={handlePrevious}
                        />
                    </motion.div>
                </PaginationItem>

                {startPage > 1 && (
                    <PaginationItem>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <PaginationLink className={"cursor-pointer hover:bg-gray-100"} onClick={() => pageScroll(1)}>
                                1
                            </PaginationLink>
                        </motion.div>
                    </PaginationItem>
                )}
                {startPage > 2 && <PaginationItem><PaginationEllipsis/></PaginationItem>}

                {pages.map(page => (
                    <PaginationItem key={page}>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <PaginationLink
                                className={`cursor-pointer ${page === pageAtual ? "bg-gray-200 text-black hover:bg-gray-300" : "hover:bg-gray-100"}`}
                                onClick={() => pageScroll(page)}
                            >
                                {page}
                            </PaginationLink>
                        </motion.div>
                    </PaginationItem>
                ))}

                {endPage < totalPages - 1 && <PaginationItem><PaginationEllipsis/></PaginationItem>}
                {endPage < totalPages && (
                    <PaginationItem>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <PaginationLink className={"cursor-pointer hover:bg-gray-100"} onClick={() => pageScroll(totalPages)}>
                                {totalPages}
                            </PaginationLink>
                        </motion.div>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                        <PaginationNext
                            className={`cursor-pointer ${pageAtual === totalPages ? disabledClasses : "hover:bg-gray-100"}`}
                            onClick={handleNext}
                        />
                    </motion.div>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
