import {useState, useEffect, useRef} from 'react';
import {getLeadsCount, LeadsCountType} from "@/services/leads/get-leads-count";

interface UseLeadsCountResult {
  data: LeadsCountType | null;
  loading: boolean;
  error: string | null;
}
interface useGet{
  status: string;
  interesse?: string;
  fonte?: string;
  busca?: string;
  refreshKey: number;
}

export function useLeadsCount({ status, interesse, fonte, busca, refreshKey }: useGet): UseLeadsCountResult {
  const [data, setData] = useState<LeadsCountType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isInitialMount = useRef(true);
  const filterInteresse = interesse === 'all' ? null : interesse;
  const filterFonte = fonte === 'all' ? null : fonte;

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (isInitialMount.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }
      setError(null);

      try {
        const result = await getLeadsCount({ status, interesse: filterInteresse, fonte: filterFonte, busca: busca });
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    }, 200);

    isInitialMount.current = false;

    return () => clearTimeout(delay);
  }, [status, interesse, fonte, busca, refreshKey]);

  return { data, loading, error };
}