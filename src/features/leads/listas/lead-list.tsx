"use client";
import {Table, TableHeader, TableHead, TableBody, TableRow, TableCell} from "@/components/ui/table";
import { LeadType } from "@/features/leads/schemas/lead-schema";
import { Briefcase, CalendarDays, Handshake, MapPin, Megaphone, MoreVertical, User, Zap } from "lucide-react";
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

    const isRevendaView = interesse.toLowerCase() === "revenda";

    return (
        <Table className="w-full table-fixed">
            <TableHeader className="hover:bg-transparent border-border">
                <TableRow className={isRevendaView ? "w-[30%]" : "w-[25%]"}>
                    <TableHead className="min-w-[250px] text-muted-foreground pl-14">
                        <User className="inline-block h-4 w-4 mr-2" />
                        Contato
                    </TableHead>
                    <TableHead className={isRevendaView ? "w-[12%]" : "w-[10%]"}>
                        <Zap className="inline-block h-4 w-4 mr-2" />
                        Origem
                    </TableHead>
                    <TableHead className={isRevendaView ? "w-[15%]" : "w-[12%]"}>
                        <Megaphone className="inline-block h-4 w-4 mr-2" />
                        Anúncio
                    </TableHead>
                    <TableHead className={isRevendaView ? "w-[15%]" : "w-[12%]"}>
                        <MapPin className="inline-block h-4 w-4 mr-2"/>
                        Cidade
                    </TableHead>
                    {interesse.toLowerCase() !== "revenda" && (
                        <TableHead className="w-[12%]  text-muted-foreground ">
                            <Handshake className="inline-block h-4 w-4 mr-2" />
                            Parceiro
                        </TableHead>
                    )}
                    <TableHead className="w-[10%] text-muted-foreground ">
                        <Briefcase className="inline-block h-4 w-4 mr-2" />
                        Tipo
                    </TableHead>
                    <TableHead className="w-[12%] text-muted-foreground ">
                        <CalendarDays className="inline-block h-4 w-4 mr-2" />
                        Data
                    </TableHead>
                    <TableHead className="w-[10%] text-muted-foreground ">
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