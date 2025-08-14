'use client';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {useState} from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
    // Inicializamos o QueryClient uma vez por ciclo de vida do componente.
    // Usamos useState para garantir que o cliente não é recriado em cada renderização.
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
