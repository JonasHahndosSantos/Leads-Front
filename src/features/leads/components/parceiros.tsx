'use client';
import {Input} from "@/components/ui/input";
import {Check, Pencil, X} from "lucide-react";
import React, {useState} from "react";

interface ParceirosProps {
    parceiro: string;
    onSave: (novoValor: string) => void;
}

export default function Parceiros({ parceiro, onSave }: ParceirosProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(parceiro);

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
            <div className="relative flex-1 sm:max-w-xs flex items-center pl-12">
                <div className="relative w-full">
                    <Input
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                        className="w-full pr-8"
                    />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={handleCancel}>
                            <X className="h-4 w-4 text-red-500" />

                        </div>
                        <div className="absolute inset-y-0 right-6 flex items-center pr-2 cursor-pointer" onClick={handleSave}>
                            {localValue != parceiro && (<Check className="h-4 w-4 text-green-600" />)}

                        </div>


                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 pl-12">
            <div className="text-sm text-gray-700">{parceiro}</div>
            <Pencil
                className="h-4 w-4 cursor-pointer text-gray-600 hover:text-orange-900"
                onClick={handleEdit}
            />
        </div>
    );
}