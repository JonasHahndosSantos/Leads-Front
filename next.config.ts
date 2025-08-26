import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',

    async rewrites() {
        return [
            {
                // A sua regra para a API continua aqui, pois está correta.
                source: '/api/:path*',
                destination: 'http://localhost:8080/:path*',
            },
        ]
    },

    // A função 'rewrites' para a rota '/' foi removida.
    // Em vez dela, usamos a função 'redirects'.
    async redirects() {
        return [
            {
                // Quando alguém aceder à rota principal...
                source: '/',
                // ...envie-o para a rota /leads e MUDE a URL no navegador.
                destination: '/leads',
                permanent: true, // Diz aos navegadores que esta é uma mudança permanente.
            },
        ]
    },
};

export default nextConfig;
