"use client";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import type { LeadType } from "@/features/leads/schemas/lead-schema";
import React, { useEffect, useState } from "react";
import FilterDropdown from "@/components/ui/dropdown/filter-dropdown";
import { useUpdateLeads } from "@/hooks/use-lead-update";
import Parceiros from "@/features/leads/components/parceiros";
import FormatarData from "@/utils/formatar-data";
import { renderValue } from "@/utils/funcoes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { StatusButton } from "@/features/leads/components/status-button";
import { LeadInfoItem } from "@/features/leads/components/info-text-item";
import {DrowpButton} from "@/features/leads/itens/butoon/drowp-button";

interface LeadItemProps {
    lead: LeadType;
    onLeadUpdated: () => void;
    interesse: string;
    delay: number;
    loadingitens: boolean;
}

export default function LeadItem({ lead, onLeadUpdated, interesse, delay, loadingitens }: LeadItemProps) {
    const [localInteresse, setLocalInteresse] = useState(lead.interesse);
    const { updateLead, loading, } = useUpdateLeads(onLeadUpdated);
    const [localLeadStatus, setLocalLeadStatus] = useState(lead.status);
    useEffect(() => {
        setLocalLeadStatus(lead.status);
    }, [lead.status]);

    useEffect(() => {
        setLocalInteresse(lead.interesse);
    }, [lead.interesse]);

    const parceiroValidator = lead.parceiros === null ? " " : lead.parceiros;

    const handleFieldUpdate = async (fieldName: keyof LeadType, newValue: any) => {
        const leadToUpdate = { ...lead, [fieldName]: newValue };
        await updateLead(leadToUpdate, lead);

        if (fieldName === 'status') {
            setLocalLeadStatus(newValue);
        } else if (fieldName === 'interesse') {
            setLocalInteresse(newValue);
        }
    };

    const parceiroSave = async (novoValor: string) => {
        if (novoValor !== lead.parceiros) {
            await handleFieldUpdate('parceiros', novoValor);
        }
    };

    const StatusUpdate = async () => {
        const newStatus = localLeadStatus.toLowerCase() === "pendente" ? "concluido" : "pendente";
        await handleFieldUpdate('status', newStatus);
    };

    const handleInteresseUpdate = async (novoInteresse: string) => {
        await handleFieldUpdate('interesse', novoInteresse);
    };

    return (
        <motion.tr
            key={lead.id_leads_comercial}
            className={cn(
                "hover:bg-muted/50 border-border",
                {
                    "opacity-50 animate-pulse pointer-events-none": loadingitens
                }
            )}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.4, delay: delay }}
        >
            <TableCell className="py-4">
                <LeadInfoItem lead={lead} />
            </TableCell>
            <TableCell>
                    {renderValue(lead.fonte)}
            </TableCell>

            <TableCell className="text-sm text-muted-foreground">
                {lead.anuncio !== null ? (
                    <>
                        <div>{renderValue(lead.anuncio)}</div>
                        <div>{lead.meio}</div>
                    </>
                ) : (
                    <div>{renderValue(lead.anuncio)}</div>
                )}
            </TableCell>

            {interesse.toLowerCase() !== "revenda" && (
                <TableCell>
                    {localInteresse === "revenda" ? (
                        <div className="relative flex-1 w-50 sm:max-w-xs flex items-center justify-center">
                            <span className="text-muted-foreground font-bold text-lg">—</span>
                        </div>
                    ) : (
                        <Parceiros parceiro={parceiroValidator} onSave={parceiroSave} />
                    )}
                </TableCell>
            )}

            <DrowpButton value={localInteresse} onInterestChange={handleInteresseUpdate}/>

            <TableCell className="text-sm text-muted-foreground">
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