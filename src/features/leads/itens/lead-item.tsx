import {TableRow, TableCell} from "@/components/ui/table";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {CheckCircle, ChevronDown, RotateCcw} from "lucide-react";
import type {LeadType} from "@/features/leads/schemas/lead-schema";
import React, {useEffect, useState} from "react";
import FilterDropdown from "@/components/ui/dropdown/filter-dropdown";
import CopyDados from "@/features/leads/components/copy-dados";
import {useUpdateLeads} from "@/hooks/use-lead-update";
import {formatarCNPJ} from "@/features/leads/hooks/formatar-cnpj";
import Parceiros from "@/features/leads/components/parceiros";
import {cn} from "@/lib/utils";
import FormatarData from "@/features/leads/hooks/formatar-data";

interface LeadItemProps {
    lead: LeadType;
    onLeadUpdated: () => void;
    interesse: string;
}

export default function LeadItem({lead, onLeadUpdated, interesse}: LeadItemProps) {

    const [localInteresse, setLocalInteresse] = useState(lead.interesse);
    const {updateLead, loading, error, data, resetData} = useUpdateLeads();
    const [localLeadStatus, setLocalLeadStatus] = useState(lead.status);
    const interessePrincipal = lead.interesse?.toLowerCase() || 'utilização';
    const statusButtonText = localLeadStatus === "pendente" ? "Concluir" : "Voltar para Ativo";
    const interesseText = localInteresse === "revenda" ? "Revenda" : "Utilização";
    const nomeCompleto = lead.nome;
    const parceiroSave = async (novoValor: string) => {
        if (novoValor !== lead.parceiros) {
            const updatedLead = {...lead, parceiros: novoValor};
            await updateLead(updatedLead);
        }
    };
    const renderValue = (value: string | null | undefined, customClass = "") => {
        const finalClass = cn("text-sm text-gray-700", customClass);
        return value
            ? <div className={finalClass}>{value}</div>
            : <span className="text-gray-400 font-bold text-lg pl-9">—</span>;
    };
    const getInitials = (nome: any) => {
        const nomes = nome?.trim().split(' ').filter((n: any) => n) || [];
        if (nomes.length > 1) {
            return `${nomes[0][0]}${nomes[nomes.length - 1][0]}`;
        }
        if (nomes.length === 1) {
            return nomes[0][0];
        }
        return '';
    };

    useEffect(() => {
        if (data) {
            onLeadUpdated();
            resetData();
        }
    }, [data, onLeadUpdated, resetData]);


    const StatusUpdate = async () => {
        const newStatus = localLeadStatus === "pendente" ? "concluido" : "pendente";
        const leadToUpdate = {...lead, status: newStatus};

        await updateLead(leadToUpdate);
        setLocalLeadStatus(newStatus);

    };

    const handleInteresseUpdate = async (novoInteresse: string) => {
        const leadToUpdate = {...lead, interesse: novoInteresse};

        await updateLead(leadToUpdate);
        setLocalInteresse(novoInteresse)

    };

    return (
        <TableRow key={lead.id_leads_comercial} className={"hover:bg-gray-50"}>
            <TableCell className="py-4">
                <div className="flex items-center gap-3">
                    {lead.nome ? (
                        <Avatar className={"h-9 w-9 font-semibold border-0"}>
                            <AvatarFallback className="bg-blue-500 text-white">{getInitials(lead.nome)}</AvatarFallback>
                        </Avatar>
                    ) : (
                        <Avatar className={"invisible h-9 w-9"}>
                        </Avatar>
                    )}

                    <div>
                        <div className="flex font-medium text-gray-900">
                            {renderValue(lead.nome, "font-medium text-gray-900")}
                            {lead.nome && <CopyDados item={lead.nome}/>}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            {renderValue(lead.email, "font-medium text-gray-600")}
                            <CopyDados item={lead.email}/>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            {renderValue(formatarCNPJ(lead.cnpj))}
                            <CopyDados item={lead.cnpj}/>
                        </div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="text-sm text-gray-700">{renderValue(lead.fonte)}</div>
            </TableCell>

            <TableCell>
                <div className="text-sm text-blue-600">{renderValue(lead.anuncio)}</div>
                <div className="text-sm text-purple-700">{renderValue(lead.meio)}</div>
            </TableCell>

            {interesse.toLowerCase() !== "revenda" && (
                <TableCell>
                    {localInteresse === "revenda" ? (
                        <div className="relative flex-1 w-50 sm:max-w-xs flex items-center justify-center">
                            <span className="text-gray-400 font-bold text-lg">—</span>
                        </div>
                    ) : (
                        <Parceiros parceiro={lead.parceiros} onSave={parceiroSave}/>
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
                            <ChevronDown className="w-4 h-4"/>
                        </Badge>
                    }
                    value={interessePrincipal}
                />
            </TableCell>
            <TableCell className="text-sm text-gray-600">
                {FormatarData(lead.data_hora)}
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
                        <CheckCircle className="w-5 h-5"/>
                    ) : (
                        <RotateCcw className="w-5 h-5"/>
                    )}

                    {loading ? "Aguardar..." : statusButtonText}
                </Button>
            </TableCell>
        </TableRow>
    );
}