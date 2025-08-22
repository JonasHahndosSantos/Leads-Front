'use client';

import { useEffect } from 'react';
import {ErrorState} from "@/components/sections/listas/erro_state";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    const isDeselopment = process.env.NODE_ENV === 'development';

    return (
        <html>
        <body>
        <div className="flex h-screen w-full items-center justify-center">
            <ErrorState
                title="Algo correu mal!"
                message="Ocorreu um erro inesperado na aplicação. Por favor, tente recarregar a página."
                onRetry={() => reset()}
                errorDetails={isDeselopment ? `${error.message}\n\n${error.stack}`: undefined}
            />
        </div>
        </body>
        </html>
    );
}
