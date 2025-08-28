'use client';
import { Check, Pencil, X } from "lucide-react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import { cn } from "@/lib/utils";
import CopyDados from "@/features/leads/components/copy-dados";
import {Textarea} from "@/features/leads/components/textarea";

interface ParceirosProps {
    parceiro: string;
    onSave: (novoValor: string) => void;
}

export default function Parceiros({ parceiro, onSave }: ParceirosProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(parceiro || "");
    const editingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLocalValue(parceiro || "");
    }, [parceiro]);

    const handleCancel = useCallback(() => {
        setIsEditing(false);
        setLocalValue(parceiro || "");
    }, [parceiro]);

    useEffect(() => {
        if (!isEditing) return;

        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if (editingRef.current && !editingRef.current.contains(event.target as Node)) {
                handleCancel();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isEditing, handleCancel]);

    const handleSave = () => {
        if (localValue !== parceiro) {
            onSave(localValue);
        }
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    //funçao para salvar com Enter e Shift Enter agora quebra a linha
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div ref={editingRef} className="relative flex w-full max-w-xs flex-col items-start gap-2 text-foreground">
                <Textarea
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-2 pr-14 w-full bg-card min-h-[40px] resize-y"
                    autoFocus
                    rows={3}
                    maxLength={255}
                />
                <span className="text-xs text-muted-foreground self-end">
                    {localValue.length} / 255
                </span>
                <div className="absolute top-2 right-0 flex items-center pr-2">
                    {localValue !== parceiro && (
                        <button onClick={handleSave} className="p-1 rounded-md hover:bg-muted">
                            <Check className="h-4 w-4 text-green-600" />
                        </button>
                    )}
                    <button onClick={handleCancel} className="p-1 rounded-md hover:bg-muted">
                        <X className="h-4 w-4 text-destructive" />
                    </button>
                </div>
            </div>
        );
    }

    const displayValue = parceiro && parceiro.trim() !== "" ? parceiro : "Sem parceiros";
    const hasValue = displayValue !== "Sem parceiros";

    return (
        <div
            className="flex items-center gap-2 cursor-pointer group max-w-[250px]"
            onClick={handleEdit}
        >
            <div className={cn(
                "text-sm whitespace-pre-wrap truncate",
                !hasValue ? "text-muted-foreground italic" : "text-foreground"
            )}>
                {displayValue}
            </div>

            {hasValue && (
                <div className="flexbox flex-col">
                    <div onClick={(e) => e.stopPropagation()}>
                        <CopyDados item={parceiro} />
                    </div>
                    <Pencil className="h-7 w-7 text-muted-foreground pl-3 hover:text-ring" />

                </div>
            )}
        </div>
    );
}
