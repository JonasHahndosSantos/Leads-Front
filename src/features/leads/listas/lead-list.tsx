"use client";
import {Table, TableHeader, TableHead, TableBody, TableRow} from "@/components/ui/table";
import {LeadType} from "@/features/leads/schemas/lead-schema";
import {CalendarDays, Megaphone, User, Users, Zap} from "lucide-react";
import LeadItem from "@/features/leads/itens/lead-item";

interface LeadListProps {
    leads: LeadType[];
    onLeadUpdated: () => void;
    interesse: string;

}

export default function LeadList({leads, onLeadUpdated, interesse}: LeadListProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-[200px] text-gray-500">
                        <User className="inline-block h-4 w-4 mr-2"/>
                        Contato
                    </TableHead>
                    <TableHead className="min-w-[120px] text-gray-500">
                        <Zap className="inline-block h-4 w-4 mr-2 text-yellow-500"/>
                        Origem
                    </TableHead>
                    <TableHead className="min-w-[150px] text-gray-500">
                        <Megaphone className="inline-block h-4 w-4 mr-2 text-blue-500"/>
                        Anúncio
                    </TableHead>
                    {interesse !== "revenda" && (
                        <TableHead className="min-w-[150px] text-gray-500 pl-15">
                            <Users className="inline-block h-4 w-4 mr-2 "/>
                            Parceiro
                        </TableHead>
                    )}
                    <TableHead className="min-w-[100px] text-gray-500 pl-7">Tipo</TableHead>
                    <TableHead className="min-w-[150px] text-gray-500 pl-6">
                        <CalendarDays className="inline-block h-4 w-4 mr-2 text-gray-500"/>
                        Data
                    </TableHead>
                    <TableHead className="min-w-[100px] text-gray-500 pl-8">Ações</TableHead>
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
