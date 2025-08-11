
import {useState, useEffect, useRef} from 'react';
import { getLeads } from "@/services/leads/get-leads";
import { LeadType } from "@/features/leads/schemas/lead-schema";

interface UseLeadsProps {
    status?: string;
    interesse?: string | null;
    fonte?: string | null;
    busca?: string;
    page?: number;
    limit?: number;
    refreshKey: number;
}

export default function UseLeads({ status, interesse, fonte, page, limit=10, refreshKey, busca }: UseLeadsProps) {
    const [leads, setLeads] = useState<LeadType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isInitialMount = useRef(true);

    const filterInteresse = interesse === 'all' ? null : interesse;
    const filterFonte = fonte === 'all' ? null : fonte;

    const [filterBusca, setFilterBusca] = useState(busca);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilterBusca(busca);
        }, 300);

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
            } catch (err) {
                setError("Não foi possível carregar os leads.");
            } finally {
                setLoading(false);
                setIsFetching(false);
            }
        };

        fetchLeads();

    }, [status, interesse, fonte, filterBusca, page, limit, refreshKey]);

    return { leads, loading, isFetching, error };
}