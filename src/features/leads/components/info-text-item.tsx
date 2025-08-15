import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, renderValue } from "@/utils/funcoes";
import CopyDados from "@/features/leads/components/copy-dados";
import { formatarCNPJ } from "@/utils/formatar-cnpj";
import type { LeadType } from "@/features/leads/schemas/lead-schema";

interface LeadInfoCellProps {
    lead: LeadType;
}

export function LeadInfoItem({ lead }: LeadInfoCellProps) {
    const emailExibido = lead.email && lead.email.length > 35
        ? `${lead.email.slice(0, 35)}...`
        : lead.email;

    return (
        <div className="flex items-center gap-3">
            {lead.nome ? (
                <Avatar className="h-9 w-9 font-semibold border-0">
                    <AvatarFallback className="bg-blue-500 text-white">{getInitials(lead.nome)}</AvatarFallback>
                </Avatar>
            ) : (
                <Avatar className="invisible h-9 w-9" />
            )}

            <div className="min-w-[150px] max-w-[200px]">
                <div className="flex font-medium text-gray-900">
                    {renderValue(lead.nome, "font-medium text-gray-900")}
                    {lead.nome && <CopyDados item={lead.nome} />}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    {renderValue(emailExibido, "font-medium text-gray-600")}
                    {lead.email && <CopyDados item={lead.email} />}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    {renderValue(formatarCNPJ(lead.cnpj))}
                    {lead.cnpj && <CopyDados item={lead.cnpj} />}
                </div>
            </div>
        </div>
    );
}