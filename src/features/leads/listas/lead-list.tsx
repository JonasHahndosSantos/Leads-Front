"use client";
import {Table, TableHeader, TableHead, TableBody, TableRow} from "@/components/ui/table";
import {LeadType} from "@/features/leads/schemas/lead-schema";
import {Briefcase, CalendarDays, Handshake, Megaphone, MoreVertical, User, Zap} from "lucide-react";
import LeadItem from "@/features/leads/itens/lead-item";
import {ListaVazia} from "@/components/sections/listas/lista-vazia";

interface LeadListProps {
    leads: LeadType[];
    onLeadUpdated: () => void;
    interesse: string;

}

export default function LeadList({leads, onLeadUpdated, interesse}: LeadListProps) {

    if(leads.length === 0) return (
        <ListaVazia icone={true} descricao={"Nenhum item encontrado. Tente ajustar os filtros"}/>
    );
    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-[200px] flex-1 text-gray-500 pl-13">
                        <User className="inline-block h-4 w-4 mr-2 text-orange-400"/>
                        Contato
                    </TableHead>
                    <TableHead className="min-w-[120px] flex-1 text-gray-500">
                        <Zap className="inline-block h-4 w-4 mr-2 text-orange-400"/>
                        Origem
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-gray-500">
                        <Megaphone className="inline-block h-4 w-4 mr-2 text-orange-400"/>
                        Anúncio
                    </TableHead>
                    {interesse.toLowerCase() !== "revenda" && (
                        <TableHead className="min-w-[150px] flex-1 text-gray-500 pl-15">
                            <Handshake className="inline-block h-4 w-4 mr-2 text-orange-400 "/>
                            Parceiro
                        </TableHead>
                    )}
                    <TableHead className="min-w-[100px] flex-1 text-gray-500 pl-5">
                        <Briefcase className="inline-block h-4 w-4 mr-2 text-orange-400"/>
                        Tipo
                    </TableHead>
                    <TableHead className="min-w-[150px] flex-1 text-gray-500 pl-6">
                        <CalendarDays className="inline-block h-4 w-4 mr-2 text-orange-400"/>
                        Data
                    </TableHead>
                    <TableHead className="min-w-[100px] flex-1 text-gray-500 pl-6">
                        <MoreVertical className="inline-block h-4 w-4 mr-1 text-orange-400"/>
                        Ações
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map((lead) => (
                    <LeadItem key={lead.id_leads_comercial} lead={lead} onLeadUpdated={onLeadUpdated} interesse={interesse}/>
                ))}
            </TableBody>
        </Table>
    );
}
