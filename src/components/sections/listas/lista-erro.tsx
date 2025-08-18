import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface ListaErrorProps {
    titulo?: string;
    mensagem?: string;
    textoBotao?: string;
    handleRetry: () => void;
    icone?: React.ReactNode;
    className?: string;
}

export function ListaError({
   titulo = "Erro de conexão!",
   mensagem = "Não foi possível carregar os dados.",
   textoBotao = "Tentar Novamente",
   handleRetry,
   icone = <AlertTriangle className="w-8 h-8" />,
   className,
}: ListaErrorProps) {
    return (
        <div
            className={cn(
                " bg-card text-destructive px-4 py-5 rounded-lg text-center max-w-[350px] ",
                className
            )}
        >
            {icone && (
                <div className="mx-auto w-fit mb-2">
                    {icone}
                </div>
            )}

            <h1 className="font-bold">{titulo}</h1>
            <p className="block sm:inline ml-2 ">{mensagem}</p>

            <div className="mt-4">
                <Button
                    onClick={handleRetry}
                    variant="destructive"
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                    {textoBotao}
                </Button>
            </div>
        </div>
    );
}