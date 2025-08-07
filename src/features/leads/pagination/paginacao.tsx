import {
    Pagination, PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import React from "react";

interface LeadPageProps {
    pageAtual: number;
    pageMax: number;
    onPageChange: (page: number) => void;
}

export default function PaginacaoPage({pageAtual, pageMax, onPageChange}: LeadPageProps){

    const handlePrevious = () => {
        if (pageAtual > 1) {
            onPageChange(pageAtual - 1);
        }
    };

    const handleNext = () => {
        if (pageAtual < pageMax) {
            onPageChange(pageAtual + 1);
        }
    };

    const pagesToShow = [];
    if (pageMax > 0) {
        if (pageAtual > 1) {
            pagesToShow.push(pageAtual - 1);
        }
        pagesToShow.push(pageAtual);
        if (pageAtual < pageMax) {
            pagesToShow.push(pageAtual + 1);
        }
    }

    const showLeadingEllipsis = pageAtual > 2;
    const showTrailingEllipsis = pageAtual < pageMax - 1;


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={"cursor-pointer"}
                        onClick={handlePrevious}
                        disabled={pageAtual === 1}
                    />
                </PaginationItem>

                {pageMax > 1 && pageAtual > 2 && (
                    <PaginationItem>
                        <PaginationLink className={"cursor-pointer"} onClick={() => onPageChange(1)}>
                            1
                        </PaginationLink>
                    </PaginationItem>
                )}
                {showLeadingEllipsis && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                {pagesToShow.map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink className={"cursor-pointer"}
                            onClick={() => onPageChange(page)}
                            isActive={page === pageAtual}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {showTrailingEllipsis && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                {pageMax > 1 && pageAtual < pageMax - 1 && (
                    <PaginationItem>
                        <PaginationLink className={"cursor-pointer"} onClick={() => onPageChange(pageMax)}>
                            {pageMax}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        className={"cursor-pointer"}
                        onClick={handleNext}
                        disabled={pageAtual === pageMax}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}