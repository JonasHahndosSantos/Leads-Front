'use client'
import { Button } from "@/components/ui/button";
import React from 'react';

interface CancelButtonProps {
    onClick?: () => void;
}

export default function CancelButton({ onClick }: CancelButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            onClick={onClick}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 font-medium rounded-md text-sm px-4 py-2.5"
        >
            Cancelar
        </Button>
    )
}
