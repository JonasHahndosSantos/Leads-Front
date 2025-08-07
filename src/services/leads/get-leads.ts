import {LeadType} from "@/features/leads/schemas/lead-schema";
import apiLead from "@/api/api_lead";

interface GetLeadsParams {
    limit: number;
    offset: number;
    status?: string;
    interesse?: string | null;
    fonte?: string | null;
}

export async function getLeads({ limit, offset, status, interesse, fonte }: GetLeadsParams): Promise<LeadType[]> {
    const params = new URLSearchParams();

    params.append('limit', limit.toString());
    params.append('offset', offset.toString());

    if (status) {
        params.append('status', status);
    }
    if (interesse) {
        params.append('interesse', interesse);
    }
    if (fonte) {
        params.append('fonte', fonte);
    }

    const response = await apiLead.get<LeadType[]>(`/?${params.toString()}`);
    return response.data;
}