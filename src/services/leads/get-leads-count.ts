import apiLead from "@/api/api_lead";

export interface LeadsCountType {
    total_ativos: number;
    total_revendas: number;
    total_utilizacao: number;
}
interface getParams {
    status: string;
    interesse?: string | null;
    fonte?: string | null;
    busca?: string;
}
export async function getLeadsCount({status, interesse, fonte, busca}: getParams ): Promise<LeadsCountType> {
    const params = new URLSearchParams();
    params.append('status', status);

    if (interesse) {
        params.append('interesse', interesse);
    }
    if (fonte) {
        params.append('fonte', fonte);
    }
    if(busca) {
        params.append('busca', busca);
    }

    const response = await apiLead.get<LeadsCountType>(`/count?${params}`);

    return response.data;
}