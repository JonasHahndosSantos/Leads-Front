import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";
import React from "react";

interface ListaVaziaProps {
    icone?: boolean;
    descricao: string;
    children?: React.ReactNode;
    className?: string;
}

export function ListaVazia({ descricao, children, className, }: ListaVaziaProps) {
    return (
        <div
            className={cn(
                "flex h-60 flex-col items-center justify-center gap-[10px]",
                className,
            )}
        >
            <div
                className="flex h-[50px] w-[50px] items-center justify-center rounded-full md:h-[60px] md:w-[60px]">
                <SearchX
                    size={36}
                    className="text-blue-500 md:h-[50px] md:w-[50px]"
                />
            </div>
            <div
                className="text-texto-card-sm md:text-titulo-card-2 text-muted-foreground flex flex-col items-center text-center">
                <span>{descricao}</span>
                {children}
            </div>
        </div>
    );
}