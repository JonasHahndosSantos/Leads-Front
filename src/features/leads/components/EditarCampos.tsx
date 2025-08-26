'use client';
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import React, {useState, useEffect, useRef} from "react";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
    initialValue: string;
    onSave: (newValue: string) => void;
    className?: string;
}

export function EditarCampo({ initialValue, onSave, className }: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const editingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
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
    }, [isEditing]);

    const handleSave = () => {
        if (value !== initialValue) {
            onSave(value);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setValue(initialValue);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div ref={editingRef} className="relative flex items-center w-full min-w-[250px] z-10">
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-8 pr-14 bg-card"
                    autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                    <button onClick={handleSave} className="p-1 rounded-md hover:bg-muted">
                        <Check className="h-4 w-4 text-green-600" />
                    </button>
                    <button onClick={handleCancel} className="p-1 rounded-md hover:bg-muted">
                        <X className="h-4 w-4 text-destructive" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={() => setIsEditing(true)}
            className={cn("cursor-pointer hover:bg-muted/50 p-1 rounded-md", className)}
        >
            {initialValue || <span className="italic text-muted-foreground">Não informado</span>}
        </div>
    );
}
