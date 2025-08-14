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

export default function PaginacaoPage({pageAtual, pageMax , onPageChange}: LeadPageProps){
    const numeroPage = Math.ceil(pageMax / 10) || 1;
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
        if (pageAtual < numeroPage) {
            pageScroll(pageAtual + 1);
        }
    };

    const pagesToShow = [];
    if (numeroPage > 0) {
        if (pageAtual > 1) {
            pagesToShow.push(pageAtual - 1);
        }
        pagesToShow.push(pageAtual);
        if (pageAtual < numeroPage) {
            pagesToShow.push(pageAtual + 1);
        }
    }

    const showLeadingEllipsis = pageAtual > 2;
    const showTrailingEllipsis = pageAtual < numeroPage - 1;



    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={"cursor-pointer"}
                        onClick={handlePrevious}
                    />
                </PaginationItem>

                {numeroPage > 1 && pageAtual > 2 && (
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
                {numeroPage > 1 && pageAtual < numeroPage - 1 && (
                    <PaginationItem>
                        <PaginationLink className={"cursor-pointer"} onClick={() => pageScroll(numeroPage)}>
                            {numeroPage}
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