import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {CheckCircle, ChevronDown, RotateCcw} from "lucide-react";
import type { LeadType } from "@/features/leads/schemas/lead-schema";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import FilterDropdown from "@/components/ui/dropdown/filter-dropdown";
import CopyDados from "@/features/leads/components/copy-dados";
import {useUpdateLeads} from "@/hooks/use-lead-update";

interface LeadItemProps {
    lead: LeadType;
    onLeadUpdated: () => void;
    interesse: string;
}
const formatarData = (dataString: any) => {
    const dataObj = new Date(dataString);
    const opcoes = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    } as const;
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(dataObj);
};

export default function LeadItem({ lead, onLeadUpdated, interesse }: LeadItemProps) {
    const [parceiros, setParceiros] = useState(lead.parceiros);
    const handleInputValue = (event: any) => {
        setParceiros(event.target.value);
    };
    const [localInteresse, setLocalInteresse] = useState(lead.interesse);
    const {updateLead, loading, error} = useUpdateLeads();
    const [ localLeadStatus, setLocalLeadStatus ] = useState(lead.status);
    const initials = lead.nome ? lead.nome.split(' ').map(n => n[0]).join('') : '';
    const interessePrincipal = lead.interesse?.toLowerCase() || 'utilização';
    const statusButtonText = localLeadStatus === "pendente" ? "Concluir" : "Voltar para Ativo";
    const interesseText = localInteresse === "revenda" ? "Revenda" : "Utilização";

    const StatusUpdate = async () => {
        const newStatus = localLeadStatus === "pendente" ? "concluido" : "pendente";
        const leadToUpdate = { ...lead, status: newStatus };

        try {
            await updateLead(leadToUpdate);
            onLeadUpdated();
            setLocalLeadStatus(newStatus);
        } catch (err) {
            console.error("Falha ao atualizar o status do lead:", err);
        }
    };
    const handleInteresseUpdate = async (novoInteresse: string) => {
        const leadToUpdate = { ...lead, interesse: novoInteresse };
        try {
            await updateLead(leadToUpdate);
            onLeadUpdated();
            setLocalInteresse(novoInteresse);
        } catch (err) {
            console.error("Falha ao atualizar o interesse do lead:", err);
        }
    };

    const handleBlur = async () => {
        if(parceiros !== lead.parceiros) {
            const updatedLead = {
                ...lead,
                parceiros: parceiros
            }
            try {
                await updateLead(updatedLead);
                onLeadUpdated();
            }catch (error) {}
        }
    }

    return (
        <TableRow key={lead.id_leads_comercial}>
            <TableCell className="py-4">
                <div className="flex items-center gap-3">
                    <Avatar className={"h-9 w-9 font-semibold border-0"}>
                        <AvatarFallback className="bg-blue-500 text-white">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex font-medium text-gray-900">
                            {lead.nome}
                            <CopyDados item={lead.nome}/>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            {lead.email}
                            <CopyDados item={lead.email}/>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            {lead.cnpj}
                            <CopyDados item={lead.cnpj}/>
                        </div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="text-sm text-gray-700">{lead.fonte}</div>
            </TableCell>
            <TableCell>
                <div className="text-sm text-blue-600">{lead.anuncio}</div>
                <div className="text-sm text-gray-600">{lead.meio}</div>
            </TableCell>
            {interesse !== "revenda" && (
                <TableCell>
                    {localInteresse === "revenda" ? (
                        <div className="relative flex-1 w-50 sm:max-w-xs flex items-center justify-center">
                            <span className="text-gray-400 font-bold text-lg">—</span>
                        </div>
                    ) : (
                        <div className="relative flex-1 w-50 sm:max-w-xs">
                            <Input
                                value={parceiros}
                                onChange={handleInputValue}
                                onBlur={handleBlur}
                                className="pl-7 w-full"
                            />
                        </div>
                    )}
                </TableCell>
            )}

            <TableCell>
                <FilterDropdown
                    label={interessePrincipal}
                    items={[
                        {value: "revenda", label: "Revenda"},
                        {value: "utilizacao", label: "Utilização"},
                    ]}
                    onSelect={handleInteresseUpdate}
                    customTrigger={
                        <Badge
                            variant="outline"
                            className={`cursor-pointer flex items-center gap-1 ${
                                localInteresse === "revenda"
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : "bg-green-100 text-green-700 border-green-200"
                            }`}
                        >
                            {interesseText}
                            <ChevronDown className="w-4 h-4" />
                        </Badge>
                    }
                />
            </TableCell>
            <TableCell className="text-sm text-gray-600">
                {formatarData(lead.data_hora)}
            </TableCell>
            <TableCell>
                <Button
                    variant="ghost"
                    className={
                        statusButtonText === "Concluir"
                            ? "bg-white hover:bg-green-50 text-green-500 hover:text-green-600 cursor-pointer"
                            : "bg-white hover:bg-blue-50 text-blue-500 hover:text-blue-600 cursor-pointer"
                    }
                    onClick={StatusUpdate}
                    disabled={loading}>
                    {statusButtonText === "Concluir" ? (
                        <CheckCircle className="w-5 h-5" />
                    ):(
                        <RotateCcw className="w-5 h-5" />
                    )}

                    {loading ? "Aguardar..." : statusButtonText}
                </Button>
            </TableCell>
        </TableRow>
    );
}