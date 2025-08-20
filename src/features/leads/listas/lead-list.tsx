"use client";
import {Table, TableHeader, TableHead, TableBody, TableRow, TableCell} from "@/components/ui/table";
import { LeadType } from "@/features/leads/schemas/lead-schema";
import { Briefcase, CalendarDays, Handshake, Megaphone, MoreVertical, User, Zap } from "lucide-react";
import LeadItem from "@/features/leads/itens/lead-item";
import { ListaVazia } from "@/components/sections/listas/lista-vazia";
import React from "react";

interface LeadListProps {
    leads: LeadType[];
    onLeadUpdated: () => void;
    interesse: string;
    loading: boolean;
}

export default function LeadList({ leads, onLeadUpdated, interesse, loading }: LeadListProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="min-w-[150px] max-w-9xl flex-1 text-muted-foreground pl-13">
                        <User className="inline-block h-4 w-4 mr-2" />
                        Contato
                    </TableHead>
                    <TableHead className="min-w-[120px] flex-1 text-muted-foreground">
                        <Zap className="inline-block h-4 w-4 mr-2" />
                        Origem
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-muted-foreground">
                        <Megaphone className="inline-block h-4 w-4 mr-2" />
                        Anúncio
                    </TableHead>
                    {interesse.toLowerCase() !== "revenda" && (
                        <TableHead className="min-w-[150px] flex-1 text-muted-foreground pl-14">
                            <Handshake className="inline-block h-4 w-4 mr-2" />
                            Parceiro
                        </TableHead>
                    )}
                    <TableHead className="min-w-[100px] flex-1 text-muted-foreground pl-5">
                        <Briefcase className="inline-block h-4 w-4 mr-2" />
                        Tipo
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-muted-foreground pl-6">
                        <CalendarDays className="inline-block h-4 w-4 mr-2" />
                        Data
                    </TableHead>
                    <TableHead className="min-w-[100px] flex-1 text-muted-foreground pl-6">
                        <MoreVertical className="inline-block h-4 w-4 mr-1" />
                        Ações
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7}>
                            <ListaVazia descricao={"Nenhum item encontrado. Tente ajustar os filtros"} />
                        </TableCell>
                    </TableRow>
                ) : (
                    leads.map((lead, index) => (
                        <LeadItem
                            key={lead.id_leads_comercial}
                            lead={lead}
                            onLeadUpdated={onLeadUpdated}
                            interesse={interesse}
                            delay={index * 0.05}
                            loadingitens={loading}
                        />
                    ))
                )}
            </TableBody>
        </Table>
    );
}