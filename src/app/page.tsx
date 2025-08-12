'use client';
import React, {useState, useEffect} from "react"
import {Input} from "@/components/ui/input"
import {Users, Clock, Calendar, Search,} from "lucide-react"
import LeadList from "@/features/leads/listas/lead-list";
import {StatCard} from "@/components/ui/cards/start-card";
import FilterDropdown from "@/components/ui/dropdown/filter-dropdown";
import TabsButton from "@/components/ui/butoon/tabs-button";
import UseLeads from "@/hooks/use-leads";
import {useLeadsCount} from "@/hooks/use-leads-count";
import PaginacaoPage from "@/features/leads/pagination/paginacao";

export default function LeadsDashboard() {
    const [status, setStatus] = useState("pendente");
    const [interesse, setInteresse] = useState("revenda");
    const [fonte, setFonte] = useState("all");
    const [refreshKey, setRefreshKey] = useState(0);

    const [busca, setBusca] = useState('');
    const [debouncedBusca, setDebouncedBusca] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedBusca(busca);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [busca]);

    const handleStatus = (newStatus: string) => {
        setStatus(newStatus);
        setPageAtual(1);
    }
    const handleInteresse = (newInteresse: string) => {
        setInteresse(newInteresse);
        setPageAtual(1);
    }
    const handleFonte = (newFonte: string) => {
        setFonte(newFonte);
        setPageAtual(1);
    }

    const { data: leadsCount, loading: loadingCount, error: errorCount } = useLeadsCount({status, interesse, fonte, busca: debouncedBusca, refreshKey});
    const handleLeadUpdated = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    const statusValue = status === "pendente" ? "Leads ativos" : "Leads Concluídos"
    const textStatus = status === "pendente" ? "Todos os leads Ativos" : "Todos os leads Concluídos"
    const countAtivo = status === "pendente" ? "Total de leads Ativos" : "Todos os leads Concluídos"
    const countRevenda = status === "pendente" ? "Total de leads Ativos para Revenda" : "Total de leads Concluidos para Revenda"
    const countUtilizacao = status === "pendente" ? "Total de leads Ativos para Utilização" : "Total de leads Concluidos para Utilização"

    const leadsAtivos = leadsCount?.total_ativos ?? 0;
    const leadsRevenda = leadsCount?.total_revendas ?? 0;
    const leadsUtilizacao = leadsCount?.total_utilizacao ?? 0;

    const [pageAtual, setPageAtual] = useState(1);

    const pageMax = Math.ceil(leadsAtivos / 10) || 1;

    const { leads, loading, isFetching, error } = UseLeads({ status, interesse, fonte, refreshKey, page: pageAtual, busca: debouncedBusca, pollingInterval: 5000});

    if ((loading && leads.length === 0) || (loadingCount && leadsCount === null)) {
        return <div className="p-8 text-center">Carregando leads...</div>;
    }

    if (error || errorCount) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600">Gerencie e visualize todos os leads das suas campanhas</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title={countAtivo} value={leadsAtivos} icon={<Users className="h-6 w-6"/>}/>
                <StatCard title={countRevenda} value={leadsRevenda} icon={<Clock className="h-6 w-6"/>}/>
                <StatCard title={countUtilizacao} value={leadsUtilizacao} icon={<Calendar className="h-6 w-6"/>}/>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex gap-4 items-center mb-6">
                    <TabsButton campo1={'Leads Ativos'} campo2={'Leads Concluídos'} onSelect={handleStatus} value={status}/>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
                    <div className="relative flex-1 w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                        <Input
                            placeholder="Buscar por nome..."
                            className="pl-9 w-full"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    <FilterDropdown
                        label="Todas as Origens"
                        items={[
                            { value: 'all', label: 'Todas as origens' },
                            { value: 'Instagram', label: 'Instagram' },
                            { value: 'Facebook', label: 'Facebook' },
                            { value: 'Google', label: 'Google' },
                        ]}
                        onSelect={handleFonte}
                        value={fonte}
                    />
                    <FilterDropdown
                        label="Revenda"
                        items={[
                            {value: "revenda", label: "Revenda"},
                            {value: "utilizacao", label: "Utilização"},
                            {value: "all", label: "Todos os Tipos"},
                        ]}
                        onSelect={handleInteresse}
                        value={interesse}
                    />
                </div>
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{leadsAtivos} {statusValue}</h3>
                    <p className="text-sm text-gray-600">{textStatus}</p>
                </div>
                <div style={{ opacity: isFetching ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                    <LeadList leads={leads} onLeadUpdated={handleLeadUpdated} interesse={interesse} />
                </div>
                {leadsAtivos !== 0 && (
                    <PaginacaoPage
                        pageAtual={pageAtual}
                        pageMax={pageMax}
                        onPageChange={setPageAtual}
                    />
                )}


            </section>
        </div>
    );
}