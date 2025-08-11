import { useState } from "react";
import { putLeads } from "@/services/leads/put-leads";
import { LeadType } from "@/features/leads/schemas/lead-schema";

export function useUpdateLeads() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<LeadType | null>(null);

    const updateLead = async (leadsupdate: LeadType) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const updatedLead = await putLeads(leadsupdate);
            setData(updatedLead);
        } catch (err) {
            setError("Erro ao atualizar o lead. Por favor, tente novamente.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const resetData = () => setData(null);

    return { updateLead, loading, error, data, resetData };
}