'use client';
import type React from "react";
import {Card, CardContent} from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatCardProps {
    title: string
    value: number
    icon: React.ReactNode,
}

export function StatCard({title, value, icon}: StatCardProps) {
    return (
        <Card className="flex-1 min-w-[280px] shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <motion.div
                        key={value}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 0.8, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="text-sm text-gray-500">{title}</p>
                        <h2 className="text-4xl font-bold text-gray-900 mt-1">
                            {value}
                        </h2>
                    </motion.div>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 text-purple-500">{icon}</div>
            </CardContent>
        </Card>
    )
}
