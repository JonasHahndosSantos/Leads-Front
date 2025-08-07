import {LeadType} from "@/features/leads/schemas/lead-schema";
import apiLead from "@/api/api_lead";

export async function putLeads(leadsupdate: LeadType): Promise<LeadType> {
    try {
        const response = await apiLead.put<LeadType>(`/edit`, leadsupdate);

        return response.data;
    } catch (error) {
        console.error(`Falha ao atualizar o lead :`, error);
        throw new Error("Não foi possível atualizar o lead.");
    }
}