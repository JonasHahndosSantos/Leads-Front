"use client";
import {TableCell} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {ChevronDown} from "lucide-react";
import type {LeadType} from "@/features/leads/schemas/lead-schema";
import React, {useEffect, useState} from "react";
import FilterDropdown from "@/components/ui/dropdown/filter-dropdown";
import {useUpdateLeads} from "@/hooks/use-lead-update";
import Parceiros from "@/features/leads/components/parceiros";
import FormatarData from "@/utils/formatar-data";
import { renderValue} from "@/utils/funcoes";
import {cn} from "@/lib/utils";
import {corFonteBg, corFonteText} from "@/features/leads/utils/efeitosCor";
import {motion} from "framer-motion";
import {StatusButton} from "@/features/leads/components/status-button";
import {LeadInfoItem} from "@/features/leads/components/info-text-item";

interface LeadItemProps {
    lead: LeadType;
    onLeadUpdated: () => void;
    interesse: string;
    delay: number;
    loadingitens: boolean;
}

export default function LeadItem({lead, onLeadUpdated, interesse, delay, loadingitens}: LeadItemProps) {
    const [localInteresse, setLocalInteresse] = useState(lead.interesse);
    const {updateLead, loading,} = useUpdateLeads(onLeadUpdated);
    const [localLeadStatus, setLocalLeadStatus] = useState(lead.status);
    const interessePrincipal = lead.interesse?.toLowerCase() || 'utilização';
    const interesseText = localInteresse === "revenda" ? "Revenda" : "Utilização";
    const parceiroValidator = lead.parceiros === null ? " " : lead.parceiros;

    const parceiroSave = async (novoValor: string) => {
        if (novoValor !== lead.parceiros) {
            const updatedLead = {...lead, parceiros: novoValor};
            await updateLead(updatedLead, lead);
        }
    };

    const StatusUpdate = async () => {
        const newStatus = localLeadStatus === "pendente" ? "concluido" : "pendente";
        const leadToUpdate = {...lead, status: newStatus};

        await updateLead(leadToUpdate, lead);
        setLocalLeadStatus(newStatus);
    };

    const handleInteresseUpdate = async (novoInteresse: string) => {
        const leadToUpdate = {...lead, interesse: novoInteresse};

        await updateLead(leadToUpdate, lead);
        setLocalInteresse(novoInteresse)
    };

    return (
        <motion.tr
            key={lead.id_leads_comercial}
            className={cn(
                "hover:bg-gray-50",
                {
                    "opacity-50 animate-pulse pointer-events-none": loadingitens
                }
            )}
            initial={{opacity: 0,}}
            animate={{opacity: 1,}}
            transition={{duration: 0.4, delay: delay}}
        >
            <TableCell className="py-4">
                <LeadInfoItem lead={lead}/>
            </TableCell>
            <TableCell>
                <Badge className={`h-6 font-normal ${corFonteBg(lead.fonte)}`}>
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
                <StatusButton
                    status={localLeadStatus}
                    isLoading={loading}
                    onUpdate={StatusUpdate}
                />
            </TableCell>
        </motion.tr>
    );
}
