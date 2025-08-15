import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";

interface StatusButtonProps {
    status: string;
    isLoading: boolean;
    onUpdate: () => void;
}

export function StatusButton({ status, isLoading, onUpdate }: StatusButtonProps) {
    const isPendente = status === "pendente" ? "pendente" : "concluido";
    const text = isPendente ? "Concluir" : "Voltar para Ativo";

    const buttonClasses = isPendente
        ? "bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600"
        : "bg-transparent hover:bg-orange-50 text-orange-400 hover:text-orange-500";

    return (
        <Button
            variant="ghost"
            className={`${buttonClasses} cursor-pointer max-w-[100px]`}
            onClick={onUpdate}
            disabled={isLoading}
        >
            {isPendente ? (
                <CheckCircle className="w-5 h-5" />
            ) : (
                <RotateCcw className="w-5 h-5" />
            )}
            {isLoading ? "Aguardar..." : text}
        </Button>
    );
}