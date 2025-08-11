import {cn} from "@/lib/utils";
import {UsersFour} from "@phosphor-icons/react";

interface ListaVaziaProps {
    icone?: boolean;
    descricao: string;
    children?: React.ReactNode;
    className?: string;
}

export function ListaVazia({icone, descricao, children, className,}: ListaVaziaProps) {
    return (
        <div
            className={cn(
                "flex h-80 flex-col items-center justify-center gap-[20px]",
                className,
            )}
        >
            {icone ? (
                <div
                    className=" flex h-[50px] w-[50px] items-center justify-center rounded-full md:h-[80px] md:w-[80px]">
                    <UsersFour
                        size={36}
                        className="text-blue-400 md:h-[50px] md:w-[50px]"
                    />
                </div>
            ) : null}
            <div
                className="text-texto-card-sm md:text-titulo-card-2 text-cinza-500 flex flex-col items-center text-center">
                <span>{descricao}</span>
                {children}
            </div>
        </div>
    );
}
