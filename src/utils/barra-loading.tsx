'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
    message?: string;
}

export function LoadingIndicator({ message = "Carregando..." }: LoadingIndicatorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-500 p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400 mb-4" />
            <p className="text-lg font-medium">{message}</p>
        </div>
    );
}
