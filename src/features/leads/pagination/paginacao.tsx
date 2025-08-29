import {
    Pagination, PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LeadPageProps {
    pageAtual: number;
    pageMax: number;
    onPageChange: (page: number) => void;
}

export default function PaginacaoPage({ pageAtual, pageMax, onPageChange }: LeadPageProps) {
    const limit = parseInt(
        process.env.NEXT_PUBLIC_LIMIT_ITENS_POR_PAGE || "10",
        10
    )
    const totalPages = Math.ceil(pageMax / limit) || 1;
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
        <Pagination className="pb-3">
            <PaginationContent>
                <PaginationItem>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <PaginationPrevious
                            className={cn("cursor-pointer hover:bg-muted", pageAtual === 1 && disabledClasses)}
                            onClick={handlePrevious}
                        />
                    </motion.div>
                </PaginationItem>

                {startPage > 1 && (
                    <PaginationItem>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <PaginationLink className="cursor-pointer hover:bg-muted" onClick={() => pageScroll(1)}>
                                1
                            </PaginationLink>
                        </motion.div>
                    </PaginationItem>
                )}
                {startPage > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                {pages.map(page => (
                    <PaginationItem key={page}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <PaginationLink
                                className={cn(
                                    "cursor-pointer",
                                    page === pageAtual
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "hover:bg-muted"
                                )}
                                onClick={() => pageScroll(page)}
                            >
                                {page}
                            </PaginationLink>
                        </motion.div>
                    </PaginationItem>
                ))}

                {endPage < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                {endPage < totalPages && (
                    <PaginationItem>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <PaginationLink className="cursor-pointer hover:bg-muted" onClick={() => pageScroll(totalPages)}>
                                {totalPages}
                            </PaginationLink>
                        </motion.div>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <PaginationNext
                            className={cn("cursor-pointer hover:bg-muted", pageAtual === totalPages && disabledClasses)}
                            onClick={handleNext}
                        />
                    </motion.div>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}