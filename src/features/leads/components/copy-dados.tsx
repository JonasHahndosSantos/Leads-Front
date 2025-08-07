'use client';
import {Check, Copy} from "lucide-react";
import React, {useState} from "react";

interface CopyDadosProps{
    item: string
}

export default function CopyDados({ item }: CopyDadosProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);

    };
    return(
        <div
            className="h-4 w-4 ml-1 cursor-pointer text-gray-600"
            onClick={() => handleCopy(item)}
        >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </div>
    );

}