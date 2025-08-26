'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FilterDropdown from '@/components/ui/dropdown/filter-dropdown';
import TabsButton from '@/components/ui/button/tabs-button';

interface LeadsFilterProps {
    status: string;
    onStatusChange: (newStatus: string) => void;
    busca: string;
    onBuscaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fonte: string;
    onFonteChange: (newFonte: string) => void;
    interesse: string;
    onInteresseChange: (newInteresse: string) => void;
}

export default function LeadsFilter({ status, onStatusChange, busca, onBuscaChange, fonte, onFonteChange, interesse, onInteresseChange, }: LeadsFilterProps) {
    return (
        <>
            <div className="flex gap-4 items-center mb-6">
                <TabsButton
                    campo1={'Leads Ativos'}
                    campo2={'Leads Concluídos'}
                    onSelect={onStatusChange}
                    value={status}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
                <div className="relative flex-1 w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nome..."
                        className="pl-9 w-full bg-card"
                        value={busca}
                        onChange={onBuscaChange}
                    />
                </div>
                <FilterDropdown
                    label="Todas as Origens"
                    items={[
                        { value: 'all', label: 'Todas as origens' },
                        { value: 'Instagram', label: 'Instagram' },
                        { value: 'Facebook', label: 'Facebook' },
                        { value: 'Google', label: 'Google' },
                        { value: 'outros', label: 'Outros' },
                    ]}
                    onSelect={onFonteChange}
                    value={fonte}
                />
                <FilterDropdown
                    label="Revenda"
                    items={[
                        { value: 'revenda', label: 'Revenda' },
                        { value: 'utilizacao', label: 'Utilização' },
                        { value: 'all', label: 'Todos os Tipos' },
                    ]}
                    onSelect={onInteresseChange}
                    value={interesse}
                />
            </div>
        </>
    );
}