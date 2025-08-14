"use client";
import { TableCell} from "@/components/ui/table";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {CheckCircle, ChevronDown, RotateCcw} from "lucide-react";
import type {LeadType} from "@/features/leads/schemas/lead-schema";
import React, {useEffect, useState} from "react";
import FilterDropdown from "@/components/ui/dropdown/filter-dropdown";
import CopyDados from "@/features/leads/components/copy-dados";
import {useUpdateLeads} from "@/hooks/use-lead-update";
import {formatarCNPJ} from "@/utils/formatar-cnpj";
import Parceiros from "@/features/leads/components/parceiros";
import FormatarData from "@/utils/formatar-data";
import {getInitials, renderValue} from "@/utils/funcoes";
import {cn} from "@/lib/utils";
import {corFonteBg, corFonteText} from "@/features/leads/utils/efeitosCor";
import { motion } from "framer-motion";

interface LeadItemProps {
    lead: LeadType;
    onLeadUpdated: () => void;
    interesse: string;
    delay: number;
}

export default function LeadItem({lead, onLeadUpdated, interesse, delay}: LeadItemProps) {

    const [localInteresse, setLocalInteresse] = useState(lead.interesse);
    const {updateLead, loading, error, data, resetData} = useUpdateLeads();
    const [localLeadStatus, setLocalLeadStatus] = useState(lead.status);
    const interessePrincipal = lead.interesse?.toLowerCase() || 'utilização';
    const statusButtonText = localLeadStatus === "pendente" ? "Concluir" : "Voltar para Ativo";
    const interesseText = localInteresse === "revenda" ? "Revenda" : "Utilização";
    const parceiroValidator = lead.parceiros === null ? " " : lead.parceiros;
    const parceiroSave = async (novoValor: string) => {
        if (novoValor !== lead.parceiros) {
            const updatedLead = {...lead, parceiros: novoValor};
            await updateLead(updatedLead);
        }
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
        <motion.tr
            key={lead.id_leads_comercial}
            className={"hover:bg-gray-50"}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.4, delay: delay }}
        >
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

                    <div className={"min-w-[150px] max-w-[200px]"}>
                        <div className="flex font-medium text-gray-900 ">
                            {renderValue(lead.nome, "font-medium text-gray-900")}
                            {lead.nome && <CopyDados item={lead.nome}/>}
                        </div>

                        <div className="flex items-center text-sm text-gray-600 max-w-55">
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
                <Badge className={`h-6 font-normal ${corFonteBg(lead.fonte)}`  }>
                    {renderValue(lead.fonte, cn("text-sm font-semibold", corFonteText(lead.fonte)))}
                </Badge>
            </TableCell>

            {lead.anuncio !== null ? (
                <TableCell>
                    <div className="text-sm">{lead.anuncio}</div>
                    <div className="text-sm ">{renderValue(lead.meio)}</div>
                </TableCell>
            ) : (
                <TableCell>
                    <div className="text-sm ">{renderValue(lead.anuncio)}</div>
                </TableCell>
            )}

            {interesse.toLowerCase() !== "revenda" && (
                <TableCell>
                    {localInteresse === "revenda" ? (
                        <div className="relative flex-1 w-50 sm:max-w-xs flex items-center justify-center">
                            <span className="text-gray-400 font-bold text-lg">—</span>
                        </div>
                    ) : (
                        <Parceiros parceiro={parceiroValidator} onSave={parceiroSave}/>
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
                            className={`cursor-pointer flex items-center gap-1 text-sm ${
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

            <TableCell className="max-w-[120px]">
                <Button
                    variant="ghost"
                    className={
                        statusButtonText === "Concluir"
                            ? "bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 cursor-pointer"
                            : "bg-transparent hover:bg-orange-50 text-orange-400 hover:text-orange-500 cursor-pointer"
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
        </motion.tr>
    );
}
