"use client";

import * as React from "react";
import { Check, Loader2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// A estrutura de dados da API do IBGE
interface City {
    id: number;
    nome: string;
    microrregiao: {
        mesorregiao: {
            UF: {
                sigla: string;
            }
        }
    }
}

interface BuscarCidadeProps {
    initialValue: string | null;
    onSave: (cityName: string) => void;
}

export function BuscarCidades({ initialValue, onSave }: BuscarCidadeProps) {
    const [open, setOpen] = useState(false);
    const [selectedCityName, setSelectedCityName] = useState(initialValue || "");
    const [searchTerm, setSearchTerm] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelectedCityName(initialValue || "");
    }, [initialValue]);

    useEffect(() => {
        if (searchTerm.length < 2) {
            setCities([]);
            return;
        }

        setLoading(true);
        const handler = setTimeout(() => {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`)
                .then(res => res.json())
                .then((allCities: City[]) => {
                    const filtered = allCities.filter(city =>
                        city.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
                    );
                    setCities(filtered);
                })
                .catch(err => console.error("Falha ao buscar cidades", err))
                .finally(() => setLoading(false));
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleSelect = (city: City) => {
        const cityNameWithState = `${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`;
        setSelectedCityName(cityNameWithState);
        onSave(cityNameWithState);
        setOpen(false);
    };

    const hasValue = !!selectedCityName;

    const TriggerElement = (
        <div className="flex items-center gap-2 cursor-pointer group max-w-[150px]">
            <span className={cn("truncate", "text-accent-foreground", !hasValue && "italic text-muted-foreground")}>
                {selectedCityName || "Não informado"}
            </span>
                <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />

        </div>
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            {hasValue ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                {TriggerElement}
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{selectedCityName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <PopoverTrigger asChild>
                    {TriggerElement}
                </PopoverTrigger>
            )}

            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Buscar cidade..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        {loading && <div className="p-2 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}

                        {!loading && cities.length === 0 && searchTerm.length > 1 && (
                            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                        )}

                        <CommandGroup>
                            {cities.map((city) => (
                                <CommandItem
                                    key={city.id}
                                    value={`${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`}
                                    onSelect={() => handleSelect(city)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4 ",
                                            selectedCityName.startsWith(city.nome) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {city.nome} - {city.microrregiao.mesorregiao.UF.sigla}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
