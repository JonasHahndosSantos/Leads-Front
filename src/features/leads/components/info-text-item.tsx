import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/funcoes";
import CopyDados from "@/features/leads/components/copy-dados";
import { formatarCNPJ } from "@/utils/formatar-cnpj";
import type { LeadType } from "@/features/leads/schemas/lead-schema";
import { EditarCampo } from "@/features/leads/components/EditarCampos";
import {formatarTelefone} from "@/utils/formar-telefone"; // Usando o seu componente de edição

interface LeadInfoItemProps {
    lead: LeadType;
    onFieldUpdate: (fieldName: keyof LeadType, newValue: string) => void;
}

export function LeadInfoItem({ lead, onFieldUpdate }: LeadInfoItemProps) {

    const unFormatNumber = (value: string) => value.replace(/[^\d]/g, '');

    return (
        <div className="flex items-center gap-3">
            {lead.nome ? (
                <Avatar className="h-9 w-9 font-semibold border-0">
                    <AvatarFallback className="bg-foreground text-background">{getInitials(lead.nome)}</AvatarFallback>
                </Avatar>
            ) : (
                <Avatar className="invisible h-9 w-9" />
            )}

            <div className="min-w-[150px] max-w-[200px] space-y-1">
                {/* Nome */}
                <div className="flex items-center">
                    <EditarCampo
                        initialValue={lead.nome}
                        onSave={(newValue) => onFieldUpdate('nome', newValue)}
                        className="font-medium text-foreground truncate"
                    />
                    {lead.nome && <CopyDados item={lead.nome} />}
                </div>

                {/* Telefone */}
                <div className="flex items-center text-sm">
                    <EditarCampo
                        initialValue={formatarTelefone(lead.telefone)}
                        onSave={(newValue) => onFieldUpdate('telefone', unFormatNumber(newValue))}
                        className="text-muted-foreground truncate"
                    />
                    {lead.telefone && <CopyDados item={formatarTelefone(lead.telefone)} />}
                </div>

                {/* CNPJ */}
                <div className="flex items-center text-sm">
                    <EditarCampo
                        initialValue={formatarCNPJ(lead.cnpj)}
                        onSave={(newValue) => onFieldUpdate('cnpj', unFormatNumber(newValue))}
                        className="text-muted-foreground truncate"
                    />
                    {lead.cnpj && <CopyDados item={formatarCNPJ(lead.cnpj)} />}
                </div>

                {/* Email */}
                <div className="flex items-center text-sm">
                    <EditarCampo
                        initialValue={lead.email}
                        onSave={(newValue) => onFieldUpdate('email', newValue)}
                        className="text-muted-foreground truncate"
                    />
                    {lead.email && <CopyDados item={lead.email} />}
                </div>
            </div>
        </div>
    );
}
