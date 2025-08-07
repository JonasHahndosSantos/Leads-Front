import apiLead from "@/api/api_lead";

export interface LeadsCountType {
    total_ativos: number;
    total_revendas: number;
    total_utilizacao: number;
}

export async function getLeadsCount(): Promise<LeadsCountType> {
    const response = await apiLead.get<LeadsCountType>("/count");

    return response.data;
}