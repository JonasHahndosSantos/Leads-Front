'use client';
import React, {useState, useEffect} from "react";
import {Users, Clock, CalendarDays,} from "lucide-react";
import LeadList from "@/features/leads/listas/lead-list";
import {StatCard} from "@/components/ui/cards/start-card";
import UseLeads from "@/hooks/use-leads";
import {useLeadsCount} from "@/hooks/use-leads-count";
import PaginacaoPage from "@/features/leads/pagination/paginacao";
import LeadsFilter from "@/features/leads/filters/leads-filter";
import {useLeadsFilters} from "@/features/leads/hooks/use-leads-filter";
import {DarkButton} from "@/components/ui/button/button-darkmode";
import {motion} from "framer-motion";
import {ListaError} from "@/components/sections/listas/lista-erro";

const POLLING_INTERVAL = parseInt(process.env.NEXT_PUBLIC_POLLING_INTERVAL || "10000");

export default function LeadsDashboard() {
    const {
        status,
        interesse,
        fonte,
        busca,
        debouncedBusca,
        pageAtual,
        refreshKey,
        handleStatus,
        handleInteresse,
        handleFonte,
        handleLeadUpdated,
        setBusca,
        setPageAtual,
    } = useLeadsFilters();

    const {data: leadsCount, loading: loadingCount, error: errorCount} = useLeadsCount({
        status,
        interesse,
        fonte,
        busca: debouncedBusca,
        refreshKey
    });
    const [currentPollingInterval, setCurrentPollingInterval] = useState(POLLING_INTERVAL);

    const leadsAtivos = leadsCount?.total_ativos ?? 0;
    const leadsRevenda = leadsCount?.total_revendas ?? 0;
    const leadsUtilizacao = leadsCount?.total_utilizacao ?? 0;
    const countLeadsPagination = leadsCount?.count_pagin ?? 0;

    const {leads, loading, isFetching, error} = UseLeads({
        status,
        interesse,
        fonte,
        page: pageAtual,
        busca: debouncedBusca,
        refreshKey,
        pollingInterval: currentPollingInterval
    });
    const isError = !!error || !!errorCount;

    useEffect(() => {
        if (isError) {
            setCurrentPollingInterval(0);
        }
    }, [isError]);

    const handleRetry = () => {
        setCurrentPollingInterval(POLLING_INTERVAL);
        handleLeadUpdated();
    };

    return (
        <div className="min-h-screen p-8">
            <header className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Leads</h1>
                    <p className="text-muted-foreground">Gerencie e visualize todos os leads das suas campanhas</p>
                </div>
                <DarkButton/>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                <StatCard title={"Total de leads"} value={leadsAtivos} icon={<Users className="h-6 w-6"/>}
                          loading={loadingCount}/>
                <StatCard title={"Total de leads para Revenda"} value={leadsRevenda} icon={<Clock className="h-6 w-6"/>}
                          loading={loadingCount}/>
                <StatCard title={"Total de leads para Utilização"} value={leadsUtilizacao}
                          icon={<CalendarDays className="h-6 w-6"/>}
                          loading={loadingCount}/>
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

            <section className="bg-card text-card-foreground  rounded-lg shadow-sm transition-colors">
                <div
                    className="flex items-baseline gap-2 pl-3 pt-3"
                >
                    <h3 className="text-lg font-semibold text-foreground">
                        <motion.span
                            key={countLeadsPagination}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.4}}
                            className="inline-block"
                        >
                            {countLeadsPagination}
                        </motion.span>
                    </h3>
                    <h4 className="text-sm text-muted-foreground">Leads pelo filtro</h4>
                </div>

                {isError ? (
                    <div className="flex w-full items-center justify-center min-h-[170px]">
                        <ListaError handleRetry={handleRetry}/>
                    </div>
                ) : (
                    <>
                        <div>
                            <LeadList
                                leads={leads || []}
                                onLeadUpdated={handleLeadUpdated}
                                interesse={interesse}
                                loading={loading || isFetching}
                            />
                        </div>
                        {countLeadsPagination > 11 && !isError && (
                            <PaginacaoPage
                                pageAtual={pageAtual}
                                pageMax={countLeadsPagination}
                                onPageChange={setPageAtual}
                            />
                        )}
                    </>
                )}
            </section>
        </div>
    );
}