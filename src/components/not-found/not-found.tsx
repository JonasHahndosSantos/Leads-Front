"use client";

import { Button } from "@/components/ui/button";
import {Home, FileX} from "lucide-react";
import Link from "next/link";
import { CardContent } from "@/components/ui/CardContent";
import { Card } from "@/components/ui/card";

export default function NotFoundd() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <Card >
                <CardContent className="space-y-6 p-8 text-center justify-center items-center">
                    <FileX className="h-24 w-24 text-revenda-foreground mx-auto" />
                    <div className="space-y-3">
                        <h1 className="text-6xl font-bold text-popover-foreground">404</h1>
                        <h2 className="text-xl font-semibold text-popover-foreground">
                            Página não encontrada
                        </h2>
                        <p className="px-4 text-sm leading-relaxed text-popover-foreground">
                            A página que você está procurando não existe ou foi removida.
                        </p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <Link href="/leads" className="block">
                            <Button className="bg-blue-700 w-full rounded-lg py-4 font-medium text-white transition-colors hover:bg-blue-600">
                                <Home className="mr-2 h-5 w-5" />
                                Voltar a Tela principal
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
