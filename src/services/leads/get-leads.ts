import {LeadType} from "@/features/leads/schemas/lead-schema";
import apiLead from "@/api/api_lead";

interface GetLeadsParams {
    limit: number;
    offset: number;
    status?: string;
    interesse?: string | null;
    fonte?: string | null;
    busca?: string | null;
}

export async function getLeads({ limit, offset, status, interesse, fonte, busca }: GetLeadsParams): Promise<LeadType[]> {
    const params = new URLSearchParams();

    params.append('pageSize', limit);
    params.append('page', offset);

    if (status) {
        params.append('status', status);
    }
    if (interesse) {
        params.append('interesse', interesse);
    }
    if (fonte) {
        params.append('fonte', fonte);
    }
    if (busca) {
        params.append('busca', busca);
    }

    const response = await apiLead.get<LeadType[]>(`/?${params.toString()}`);
    return response.data;
}