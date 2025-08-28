
export default function FormatarData(data: string | null | undefined): string {
    if (!data) return "Data inválida";
    try {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        const horas = String(dataObj.getHours()).padStart(2, '0');
        const minutos = String(dataObj.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    } catch {
        return "Data inválida";
    }
}

import React from "react";
import { cn } from "@/lib/utils";

export function renderValue(value: string | null | undefined, className?: string) {
    if (!value || value.trim() === "") {
        return <span className="text-nao-informado italic font-normal text-sm">Não informado</span>;
    }
    return <span className={cn("text-sm text-foreground", className)}>{value}</span>;
}

export function getInitials(name: string | null | undefined): string {
    if (!name) return "?";

    const names = name.trim().split(' ').filter(n => n);

    if (names.length === 0) {
        return "?";
    }
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return `${names[0][0]}`.toUpperCase();
}
