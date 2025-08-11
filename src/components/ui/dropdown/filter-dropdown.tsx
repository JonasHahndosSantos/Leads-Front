'use client';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {Check, ChevronDown } from "lucide-react";

interface FilterItem {
    value: string;
    label: string;
}

interface FilterDropdownProps {
    label: string;
    items: FilterItem[];
    onSelect?: (value: string) => void;
    customTrigger?: React.ReactNode;
    ClassName?: string;
    value?: string | null;
}

export default function FilterDropdown({ label, items, onSelect, customTrigger, ClassName, value }: FilterDropdownProps) {
    const selectedItem = items.find(item => item.value === value);
    const displayLabel = selectedItem ? selectedItem.label : label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {customTrigger ?? (
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 w-full sm:w-auto bg-transparent cursor-pointer"
                    >
                        {displayLabel}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className={ClassName}>
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => onSelect?.(item.value)}
                        className={`flex justify-between items-center ${item.value === value ? "font-bold bg-gray-100" : ""}`}
                    >
                        <span>{item.label}</span>
                        {item.value === value && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}