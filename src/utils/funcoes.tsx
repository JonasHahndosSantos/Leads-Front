import {cn} from "@/lib/utils";

export const getInitials = (nome: string) => {
    const nomes = nome?.trim().split(' ').filter((n: any) => n) || [];
    if (nomes.length > 1) {
        return `${nomes[0][0]}${nomes[nomes.length - 1][0]}`;
    }
    if (nomes.length === 1) {
        return nomes[0][0];
    }
    return '';
};
export const renderValue = (value: string | null | undefined, customClass = "") => {
    const finalClass = cn("text-sm text-accent-foreground", customClass);
    return value
        ? <div className={finalClass}>{value}</div>
        : <span className="text-nao-informado italic font-normal text-sm">Não informado</span>;
};

