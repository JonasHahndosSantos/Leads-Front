import { useState, useEffect } from "react";

export function useLeadsFilters() {
    const [status, setStatus] = useState("pendente");
    const [interesse, setInteresse] = useState("revenda");
    const [fonte, setFonte] = useState("all");
    const [busca, setBusca] = useState('');
    const [debouncedBusca, setDebouncedBusca] = useState("");
    const [pageAtual, setPageAtual] = useState(1);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedBusca(busca);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [busca]);

    const handleStatus = (newStatus: string) => {
        setStatus(newStatus);
        setPageAtual(1);
    };

    const handleInteresse = (newInteresse: string) => {
        setInteresse(newInteresse);
        setPageAtual(1);
    };

    const handleFonte = (newFonte: string) => {
        setFonte(newFonte);
        setPageAtual(1);
    };

    const handleLeadUpdated = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return {
        status,
        interesse,
        fonte,
        busca,
        debouncedBusca,
        pageAtual,
        refreshKey,
        handleStatus,
        handleInteresse,
        handleFonte,
        handleLeadUpdated,
        setBusca,
        setPageAtual,
    };
}