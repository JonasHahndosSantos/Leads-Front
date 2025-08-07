import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {CircleCheckBig, Users} from "lucide-react";
import type React from "react";

interface IProps {
    campo1: string;
    campo2: string;
    ClassName?: string;
    onSelect: (value: string) => void;
    value: string;
}

export default function TabsButton({campo1, campo2, ClassName, onSelect, value}: IProps) {
    return (
        <Tabs value={value} className="mb-6 " onValueChange={onSelect}>
            <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger
                    value="pendente"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white cursor-pointer"
                >
                    <Users className="h-4 w-4"/> {campo1}
                </TabsTrigger>
                <TabsTrigger
                    value="concluido"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white cursor-pointer"
                >
                    <CircleCheckBig className="h-4 w-4"/> {campo2}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}