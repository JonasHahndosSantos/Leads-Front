'use client';

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry: () => void;
    className?: string;
    errorDetails?: string;
}

export function ErrorState({
    title = "Ocorreu um Erro",
    message,
    onRetry,
    className,
    errorDetails,
}: ErrorStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "flex flex-col items-center justify-center text-center p-8 max-w-md w-full",
                "bg-card border border-border rounded-xl shadow-lg",
                className
            )}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
                <AlertTriangle className="w-14 h-14 text-destructive mb-4" />
            </motion.div>

            <h3 className="text-2xl font-bold text-destructive">{title}</h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">{message}</p>

            <Button onClick={onRetry} variant="destructive">
                Tentar Novamente
            </Button>

            {errorDetails && (
                <details className="mt-6 text-left w-full">
                    <summary className="cursor-pointer text-xs text-muted-foreground">Detalhes técnicos</summary>
                    <pre className="mt-2 p-2 bg-muted/50 rounded-md text-xs text-muted-foreground overflow-auto">
                        {errorDetails}
                    </pre>
                </details>
            )}
        </motion.div>
    );
}
