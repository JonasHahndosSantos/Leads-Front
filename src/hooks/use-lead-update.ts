// Em: hooks/use-lead-update.ts

import { useState } from "react";
import { putLeads } from "@/services/leads/put-leads";
import { LeadType } from "@/features/leads/schemas/lead-schema";
import {useUndo} from "@/components/ui/undo/undo-provider";

export function useUpdateLeads(onSuccessCallback: () => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<LeadType | null>(null);

    const { showUndo } = useUndo();

    const updateLead = async (
        leadsUpdate: LeadType,
        previousLeadState: LeadType
    ) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const updatedLead = await putLeads(leadsUpdate);
            setData(updatedLead);

            if (onSuccessCallback) {
                onSuccessCallback();
            }

            const undoAction = async () => {
                await putLeads(previousLeadState);

                if (onSuccessCallback) {
                    onSuccessCallback();
                }
            };

            showUndo(undoAction);

        } catch (err) {
            setError("Erro ao atualizar o lead. Por favor, tente novamente.");
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetData = () => setData(null);

    return { updateLead, loading, error, data, resetData };
}