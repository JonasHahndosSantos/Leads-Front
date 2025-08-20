import { useState, useEffect } from 'react';
import {getLeadsCount} from "@/services/leads/get-leads-count";

export interface LeadsCountType {
  total_ativos: number;
  total_revendas: number;
  total_utilizacao: number;
  count_pagin: number;
}

interface UseLeadsCountResult {
  data: LeadsCountType | null;
  loading: boolean;
  error: string | null;
}

interface useGet {
  status: string;
  interesse?: string | null;
  fonte?: string | null;
  busca?: string;
  refreshKey: number;
}

export function useLeadsCount({ status, interesse, fonte, busca, refreshKey }: useGet): UseLeadsCountResult {
  const [data, setData] = useState<LeadsCountType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filterInteresse = interesse === 'all' ? null : interesse;
  const filterFonte = fonte === 'all' ? null : fonte;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getLeadsCount({ status, interesse: filterInteresse, fonte: filterFonte, busca });
        setData(result);
      } catch (err: any) {
        setError("Não foi possível carregar os contadores.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [status, filterInteresse, filterFonte, busca, refreshKey]);

  return { data, loading, error };
}