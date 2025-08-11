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
    const pageScroll = (page: number) => {
        onPageChange(page);
        window.scrollTo(0,0)
    }
    const handlePrevious = () => {
        if (pageAtual > 1) {
            pageScroll(pageAtual - 1);
        }
    };

    const handleNext = () => {
        if (pageAtual < pageMax) {
            pageScroll(pageAtual + 1);
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
                    />
                </PaginationItem>

                {pageMax > 1 && pageAtual > 2 && (
                    <PaginationItem>
                        <PaginationLink className={"cursor-pointer"} onClick={() => pageScroll(1)}>
                            1
                        </PaginationLink>
                    </PaginationItem>
                )}
                {showLeadingEllipsis && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                {pagesToShow.map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink className={"cursor-pointer"}
                            onClick={() => pageScroll(page)}
                            isActive={page === pageAtual}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {showTrailingEllipsis && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                {pageMax > 1 && pageAtual < pageMax - 1 && (
                    <PaginationItem>
                        <PaginationLink className={"cursor-pointer"} onClick={() => pageScroll(pageMax)}>
                            {pageMax}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        className={"cursor-pointer"}
                        onClick={handleNext}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}