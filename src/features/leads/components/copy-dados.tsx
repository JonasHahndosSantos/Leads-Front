'use client';
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CopyDadosProps {
    item: string;
    className?: string;
}

export default function CopyDados({ item, className }: CopyDadosProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (textToCopy: string) => {
        // O método 'navigator.clipboard' é a primeira escolha, mas só funciona em contextos seguros.
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }).catch(err => {
                console.error("Falha ao copiar com a API moderna, a tentar o método antigo.", err);
                fallbackCopyTextToClipboard(textToCopy);
            });
        } else {
            fallbackCopyTextToClipboard(textToCopy);
        }
    };

    const fallbackCopyTextToClipboard = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }
        } catch (err) {
            console.error('Falha ao usar o método de cópia antigo', err);
        }

        document.body.removeChild(textArea);
    };

    return (
        <button
            className={cn("h-4 w-4 ml-1 cursor-pointer text-muted-foreground pl-2", className)}
            onClick={() => handleCopy(item)}
            aria-label="Copiar"
        >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 hover:text-blue-500" />}
        </button>
    );
}
