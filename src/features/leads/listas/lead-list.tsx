"use client";
import {Table, TableHeader, TableHead, TableBody, TableRow} from "@/components/ui/table";
import {LeadType} from "@/features/leads/schemas/lead-schema";
import {Briefcase, CalendarDays, Handshake, Megaphone, MoreVertical, User, Zap} from "lucide-react";
import LeadItem from "@/features/leads/itens/lead-item";
import {ListaVazia} from "@/components/sections/listas/lista-vazia";
import React from "react";

interface LeadListProps {
    leads: LeadType[];
    onLeadUpdated: () => void;
    interesse: string;
    loading: boolean;
}

export default function LeadList({leads, onLeadUpdated, interesse, loading}: LeadListProps) {

    if(leads.length === 0 && !loading) return (
        <ListaVazia descricao={"Nenhum item encontrado. Tente ajustar os filtros"}/>
    );

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-[150px] max-w-9xl flex-1 text-gray-600 pl-13">
                        <User className="inline-block h-4 w-4 mr-2 text-black"/>
                        Contato
                    </TableHead>
                    <TableHead className="min-w-[120px] flex-1 text-gray-600">
                        <Zap className="inline-block h-4 w-4 mr-2 text-black"/>
                        Origem
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-gray-600">
                        <Megaphone className="inline-block h-4 w-4 mr-2 text-gray-800"/>
                        Anúncio
                    </TableHead>
                    {interesse.toLowerCase() !== "revenda" && (
                        <TableHead className="min-w-[150px] flex-1 text-gray-600 pl-14">
                            <Handshake className="inline-block h-4 w-4 mr-2 text-black "/>
                            Parceiro
                        </TableHead>
                    )}
                    <TableHead className="min-w-[100px] flex-1 text-gray-600 pl-5">
                        <Briefcase className="inline-block h-4 w-4 mr-2 text-black"/>
                        Tipo
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-gray-600 pl-6">
                        <CalendarDays className="inline-block h-4 w-4 mr-2 text-black"/>
                        Data
                    </TableHead>
                    <TableHead className="min-w-[100px] flex-1 text-gray-600 pl-6">
                        <MoreVertical className="inline-block h-4 w-4 mr-1 text-black"/>
                        Ações
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=" overflow-y-auto">
                {leads.map((lead, index) => (
                    <LeadItem
                        key={lead.id_leads_comercial}
                        lead={lead}
                        onLeadUpdated={onLeadUpdated}
                        interesse={interesse}
                        delay = {index * 0.05 }
                        loadingitens = {loading}
                    />
                ))}
            </TableBody>
        </Table>
    );
}
