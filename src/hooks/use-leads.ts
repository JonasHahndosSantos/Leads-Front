
import { useState, useEffect } from 'react';
import { getLeads } from "@/services/leads/get-leads";
import { LeadType } from "@/features/leads/schemas/lead-schema";

interface UseLeadsProps {
    status?: string;
    interesse?: string | null;
    fonte?: string | null;
    refreshKey: number;
}

export default function UseLeads({ status, interesse, fonte, refreshKey }: UseLeadsProps) {
    const [leads, setLeads] = useState<LeadType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false); // AQUI: Novo estado
    const [error, setError] = useState<string | null>(null);

    const filterInteresse = interesse === 'all' ? null : interesse;
    const filterFonte = fonte === 'all' ? null : fonte;

    useEffect(() => {
        const delay = setTimeout(async () => {
            try {
                if (!loading) {
                    setIsFetching(true);
                }
                const newLeads = await getLeads({
                    status,
                    interesse: filterInteresse,
                    fonte: filterFonte,
                    limit: 10,
                    offset: 0
                });
                setLeads(newLeads);
            } catch (err) {
                setError("Não foi possível carregar os leads.");
            } finally {
                setLoading(false);
                setIsFetching(false);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [status, filterInteresse, filterFonte, refreshKey]);

    return { leads, loading, isFetching, error };
}