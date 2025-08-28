import { z } from "zod";
export const leadSchema = z.object({
    id_leads_comercial: z.string(),
    data_hora: z.string(),
    nome: z.string(),
    email: z.string(),
    cnpj: z.string(),
    telefone: z.string(),
    interesse: z.string(),
    fonte: z.string(),
    meio: z.string(),
    parceiros: z.string(),
    anuncio: z.string(),
    status: z.string(),
    cidade: z.string(),
});

export type LeadType = z.infer<typeof leadSchema>;