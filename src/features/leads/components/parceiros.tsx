'use client';
import {Input} from "@/components/ui/input";
import {Check, Pencil, X} from "lucide-react";
import React, {useEffect, useState} from "react";

interface ParceirosProps {
    parceiro: string;
    onSave: (novoValor: string) => void;
}

export default function Parceiros({ parceiro, onSave }: ParceirosProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(parceiro || "");

    useEffect(() => {
        setLocalValue(parceiro || "");
    }, [parceiro]);

    const handleSave = () => {
        onSave(localValue);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setIsEditing(false);
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <>
                <style jsx>{`
                    ::selection {
                        background: #dbeafe;
                        color: #1f2937; 
                    }
                `}</style>
                <div className="relative flex w-48 flex items-center gap-2 bg-white">
                    <Input
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                        className="pl-2 w-full"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                         onClick={handleCancel}>
                        <X className="h-4 w-4 text-red-500"/>

                    </div>
                    <div className="absolute inset-y-0 right-6 flex items-center pr-2 cursor-pointer" onClick={handleSave}>
                        {localValue != parceiro && (<Check className="h-4 w-4 text-green-600"/>)}

                    </div>
                </div>
            </>
        );
    }

    const displayValue = parceiro && parceiro.trim() !== "" ? parceiro : "Sem parceiros";

    return (
        <div
            className="flex items-center gap-2 cursor-pointer pl-12"
            onClick={handleEdit}
        >
            <div className={`text-sm ${parceiro ? "text-gray-700" : "text-gray-400 italic "}`}>
                {displayValue}
            </div>
            <Pencil className="h-4 w-4 text-gray-600 hover:text-orange-900" />
        </div>
    );
}