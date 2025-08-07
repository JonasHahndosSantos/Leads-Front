
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
    const filterbusca = busca === 'all' ? null : busca;

    useEffect(() => {
        const delay = setTimeout(async () => {
            try {
                if (!isInitialMount.current) {
                    setIsFetching(true);
                }
                const offset = page;

                const newLeads = await getLeads({
                    status,
                    interesse: filterInteresse,
                    fonte: filterFonte,
                    busca: filterbusca,
                    limit,
                    offset
                });
                setLeads(newLeads);
                setError(null);
            } catch (err) {
                setError("Não foi possível carregar os leads.");
            } finally {
                setLoading(false);
                setIsFetching(false);
            }
        }, 300);

        return () => {
            clearTimeout(delay);
        };
    }, [status, filterInteresse, filterFonte, filterbusca, page, limit, refreshKey]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
    }, []);

    return { leads, loading, isFetching, error };
}