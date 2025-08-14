"use client";
import {Table, TableHeader, TableHead, TableBody, TableRow} from "@/components/ui/table";
import {LeadType} from "@/features/leads/schemas/lead-schema";
import {Briefcase, CalendarDays, Handshake, Megaphone, MoreVertical, User, Zap} from "lucide-react";
import LeadItem from "@/features/leads/itens/lead-item";
import {ListaVazia} from "@/components/sections/listas/lista-vazia";
import {ListaErro} from "@/components/sections/listas/lista-erro";

interface LeadListProps {
    leads: LeadType[];
    onLeadUpdated: () => void;
    interesse: string;
    error: boolean | null;
}

export default function LeadList({leads, onLeadUpdated, interesse, error}: LeadListProps) {

    if(error) return (
        <ListaErro descricao={"Erro inesperado. Tente recarregar a Pagina"}/>
    );

    if(leads.length === 0) return (
        <ListaVazia descricao={"Nenhum item encontrado. Tente ajustar os filtros"}/>
    );

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-[150px] max-w-9xl flex-1 text-gray-500 pl-13">
                        <User className="inline-block h-4 w-4 mr-2 text-gray-800"/>
                        Contato
                    </TableHead>
                    <TableHead className="min-w-[120px] flex-1 text-gray-500">
                        <Zap className="inline-block h-4 w-4 mr-2 text-orange-500"/>
                        Origem
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-gray-500">
                        <Megaphone className="inline-block h-4 w-4 mr-2 text-gray-800"/>
                        Anúncio
                    </TableHead>
                    {interesse.toLowerCase() !== "revenda" && (
                        <TableHead className="min-w-[150px] flex-1 text-gray-500 pl-14">
                            <Handshake className="inline-block h-4 w-4 mr-2 text-orange-500 "/>
                            Parceiro
                        </TableHead>
                    )}
                    <TableHead className="min-w-[100px] flex-1 text-gray-500 pl-5">
                        <Briefcase className="inline-block h-4 w-4 mr-2 text-gray-800"/>
                        Tipo
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-gray-500 pl-6">
                        <CalendarDays className="inline-block h-4 w-4 mr-2 text-gray-800"/>
                        Data
                    </TableHead>
                    <TableHead className="min-w-[100px] flex-1 text-gray-500 pl-6">
                        <MoreVertical className="inline-block h-4 w-4 mr-1 text-gray-800"/>
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
                    />
                ))}
            </TableBody>
        </Table>
    );
}
