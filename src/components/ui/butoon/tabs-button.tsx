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
        <Tabs value={value} onValueChange={onSelect}>
            <TabsList className="grid w-fit grid-cols-2 bg-white">
                <TabsTrigger
                    value="pendente"
                    className="flex items-center gap-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-white  cursor-pointer"
                >
                    <Users className="h-5 w-5"/> {campo1}
                </TabsTrigger>
                <TabsTrigger
                    value="concluido"
                    className="flex items-center gap-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-white cursor-pointer"
                >
                    <CircleCheckBig className="h-5 w-5"/> {campo2}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}