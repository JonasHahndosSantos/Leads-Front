"use client";

import { Button } from "@/components/ui/button";
import {Home, FileSearch} from "lucide-react";
import Link from "next/link";
import { CardContent } from "@/components/ui/CardContent";
import { Card } from "@/components/ui/card";

export default function NotFoundd() {
    return (
        <div className="flex h-screen w-full items-center justify-center border border-black p-4">
            <Card>
                <CardContent className="space-y-6 p-8 text-center justify-center items-center">
                    <FileSearch className="h-24 w-24 text-gray-400 mx-auto" />
                    {/* Mensagem de Erro */}
                    <div className="space-y-3">
                        <h1 className="text-6xl font-bold text-gray-700">404</h1>
                        <h2 className="text-xl font-semibold text-gray-600">
                            Página não encontrada
                        </h2>
                        <p className="px-4 text-sm leading-relaxed text-gray-600">
                            A página que você está procurando não existe ou foi removida.
                        </p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="space-y-3 pt-2">
                        <Link href="/" className="block">
                            <Button className="bg-black w-full rounded-lg py-3 font-medium text-white transition-colors hover:bg-gray-800">
                                <Home className="mr-2 h-5 w-5" />
                                Voltar ao início
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
