import type React from "react";
import {Card, CardContent} from "@/components/ui/card";

interface StatCardProps {
    title: string
    value: number
    icon: React.ReactNode
}

export function StatCard({title, value, icon}: StatCardProps) {
    return (
        <Card className="flex-1 min-w-[280px] shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h2 className="text-4xl font-bold text-gray-900 mt-1">{value}</h2>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 text-purple-500">{icon}</div>
            </CardContent>
        </Card>
    )
}