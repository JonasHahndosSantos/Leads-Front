import { useState, useEffect } from 'react';
import {getLeadsCount, LeadsCountType} from "@/services/leads/get-leads-count";

interface UseLeadsCountResult {
  data: LeadsCountType | null;
  loading: boolean;
  error: string | null;
}

export function useLeadsCount(): UseLeadsCountResult {
  const [data, setData] = useState<LeadsCountType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeadsCount() {
      try {
        const result = await getLeadsCount();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeadsCount();
  }, []);

  return { data, loading, error };
}