import {cn} from "@/lib/utils";
import {AlertTriangle} from "lucide-react";
import React from "react";

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
   mensagem = "Não foi possível carregar os dados. Tente novamente.",
   textoBotao = "Tentar Novamente",
   handleRetry,
   icone = <AlertTriangle className="w-8 h-8 text-red-500"/>,
   className,
}: ListaErrorProps) {
    return (
        <div
            className={cn(
                "bg-red-50 border border-red-300 text-red-800 px-4 py-5 rounded-lg text-center max-w-[350px]",
                className
            )}
        >
            {icone && (
                <div className="mx-auto w-fit mb-2">
                    {icone}
                </div>
            )}

            <h1 className="font-bold">{titulo}</h1>
            <p className="block sm:inline ml-2">{mensagem}</p>

            <div className="mt-4">
                <button
                    onClick={handleRetry}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    {textoBotao}
                </button>
            </div>
        </div>
    );
}