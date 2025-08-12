'use client';
import React from "react"
import {Users, Clock, CalendarDays,} from "lucide-react"
import LeadList from "@/features/leads/listas/lead-list";
import {StatCard} from "@/components/ui/cards/start-card";
import UseLeads from "@/hooks/use-leads";
import {useLeadsCount} from "@/hooks/use-leads-count";
import PaginacaoPage from "@/features/leads/pagination/paginacao";
import LeadsFilter from "@/features/leads/filters/leads-filter";
import {useLeadsFilters} from "@/features/leads/hooks/use-leads-filter";

export default function LeadsDashboard() {
    const {status, interesse, fonte, busca, debouncedBusca, pageAtual, refreshKey, handleStatus, handleInteresse, handleFonte, handleLeadUpdated, setBusca, setPageAtual,
    } = useLeadsFilters();

    const { data: leadsCount, loading: loadingCount, error: errorCount } = useLeadsCount({status, interesse, fonte, busca: debouncedBusca, refreshKey});

    const statusValue = status === "pendente" ? "Leads ativos" : "Leads Concluídos"
    const textStatus = status === "pendente" ? "Todos os leads Ativos" : "Todos os leads Concluídos"
    const countAtivo = status === "pendente" ? "Total de leads Ativos" : "Todos os leads Concluídos"
    const countRevenda = status === "pendente" ? "Total de leads Ativos para Revenda" : "Total de leads Concluidos para Revenda"
    const countUtilizacao = status === "pendente" ? "Total de leads Ativos para Utilização" : "Total de leads Concluidos para Utilização"

    const leadsAtivos = leadsCount?.total_ativos ?? 0;
    const leadsRevenda = leadsCount?.total_revendas ?? 0;
    const leadsUtilizacao = leadsCount?.total_utilizacao ?? 0;

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

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                <StatCard title={countAtivo} value={leadsAtivos} icon={<Users className="h-6 w-6"/>}/>
                <StatCard title={countRevenda} value={leadsRevenda} icon={<Clock className="h-6 w-6"/>}/>
                <StatCard title={countUtilizacao} value={leadsUtilizacao} icon={<CalendarDays className="h-6 w-6"/>}/>
            </section>

                <LeadsFilter
                    status={status}
                    onStatusChange={handleStatus}
                    busca={busca}
                    onBuscaChange={(e) => setBusca(e.target.value)}
                    fonte={fonte}
                    onFonteChange={handleFonte}
                    interesse={interesse}
                    onInteresseChange={handleInteresse}/>

            <section className="bg-white p-6 rounded-lg shadow-sm">
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