"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import FilterDropdown from "@/components/ui/dropdown/filter-dropdown";
import { cn } from "@/lib/utils";

interface DrowpButtonProps {
    /** O valor atual do interesse ('revenda' ou 'utilizacao') */
    value: string;
    /** Função a ser chamada quando um novo item é selecionado */
    onInterestChange: (newInterest: string) => void;
}

export function DrowpButton({ value, onInterestChange }: DrowpButtonProps) {
    const interestText = value === "revenda" ? "Revenda" : "Utilização";

    return (
        <FilterDropdown
            label={value}
            items={[
                { value: "revenda", label: "Revenda" },
                { value: "utilizacao", label: "Utilização" },
            ]}
            onSelect={onInterestChange}
            customTrigger={
                <Badge
                    variant="outline"
                    className={cn(
                        "cursor-pointer flex items-center gap-1 text-sm border-transparent transition-colors duration-300",
                        value === "revenda"
                            ? "bg-revenda text-revenda-foreground"
                            : "bg-utilizacao text-utilizacao-foreground"
                    )}
                >
                    {interestText}
                    <ChevronDown className="w-4 h-4" />
                </Badge>
            }
            value={value}
        />
    );
}
