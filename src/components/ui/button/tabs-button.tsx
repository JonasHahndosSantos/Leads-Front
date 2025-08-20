'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCheckBig, Users } from "lucide-react";
import type React from "react";

interface IProps {
    campo1: string;
    campo2: string;
    onSelect: (value: string) => void;
    value: string;
}

export default function TabsButton({ campo1, campo2, onSelect, value }: IProps) {
    return (
        <Tabs value={value} onValueChange={onSelect}>
            <TabsList className="grid w-fit grid-cols-2 bg-secondary rounded-md p-1">
                <TabsTrigger
                    value="pendente"
                    //  mantive o dark:data-[state=active]:bg-button-active pois estava dando conflito com o componente do shadcn/ui
                    className="flex items-center gap-2 text-secondary-foreground
                               data-[state=active]:bg-button-active
                               data-[state=active]:text-button-active-foreground
                               dark:data-[state=active]:bg-button-active
                               rounded-sm"
                >
                    <Users className="h-5 w-5" /> {campo1}
                </TabsTrigger>
                <TabsTrigger
                    value="concluido"
                    className="flex items-center gap-2 text-secondary-foreground
                               data-[state=active]:bg-button-active
                               data-[state=active]:text-button-active-foreground
                               dark:data-[state=active]:bg-button-active
                               rounded-sm"
                >
                    <CircleCheckBig className="h-5 w-5" /> {campo2}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}