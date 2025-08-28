import {useEffect, useRef, useState} from 'react';
import {getLeads} from "@/services/leads/get-leads";
import {LeadType} from "@/features/leads/schemas/lead-schema";

interface UseLeadsProps {
    status?: string;
    interesse?: string | null;
    fonte?: string | null;
    busca?: string;
    page?: number;
    limit?: number;
    refreshKey: number;
    pollingInterval?: number;
}

export default function UseLeads({ status, interesse, fonte, page, refreshKey, busca, pollingInterval = 0 }: UseLeadsProps) {
    const [leads, setLeads] = useState<LeadType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const limit = parseInt(
        process.env.NEXT_PUBLIC_LIMIT_ITENS_POR_PAGE || "10",
        10
    )

    const isInitialMount = useRef(true);

    const filterInteresse = interesse === 'all' ? null : interesse;
    const filterFonte = fonte === 'all' ? null : fonte;

    const [filterBusca, setFilterBusca] = useState(busca);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilterBusca(busca);
        }, 100);

        return () => {
            clearTimeout(handler);
        };
    }, [busca]);

    useEffect(() => {
        const fetchLeads = async () => {
            if (isInitialMount.current) {
                setLoading(true);
                isInitialMount.current = false;
            } else {
                setIsFetching(true);
            }
            setError(null);

            try {
                const newLeads = await getLeads({
                    status,
                    interesse: filterInteresse,
                    fonte: filterFonte,
                    busca: filterBusca,
                    limit,
                    offset: page ?? 1,
                });
                setLeads(newLeads);
            } catch (err: unknown) {
                setError("Não foi possível carregar os leads.");
            } finally {
                setLoading(false);
                setIsFetching(false);
            }
        };

        fetchLeads();

        if (pollingInterval > 0) {
            const intervalId = setInterval(() => {
                fetchLeads();
            }, pollingInterval);

            return () => clearInterval(intervalId);
        }

    }, [status, filterFonte, filterInteresse, filterBusca, page, limit, refreshKey, pollingInterval]);

    return { leads, loading, isFetching, error };
}
