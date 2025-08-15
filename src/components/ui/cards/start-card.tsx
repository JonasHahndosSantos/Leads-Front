'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    loading: boolean;
}

export function StatCard({ title, value, icon, loading = true }: StatCardProps) {
    const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
    const delayDuration = 1000;

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (loading) {
            timer = setTimeout(() => {
                setShowLoadingAnimation(true);
            }, delayDuration);
        } else {
            if (timer) {
                clearTimeout(timer);
            }
            setShowLoadingAnimation(false);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [loading]);

    const numberVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    };

    return (
        <Card className="flex-1 min-w-[280px] shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h2 className="text-4xl font-bold text-gray-900 mt-1">
                        {loading && showLoadingAnimation ? (
                            <motion.div
                                animate={{
                                    opacity: [0.4, 0.7, 0.4],
                                    transition: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    },
                                }}
                                className="h-7 w-20 bg-gray-200 rounded-md"
                            />
                        ) : (
                            <motion.span
                                key={value}
                                variants={numberVariants}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.4 }}
                                className="inline-block"
                            >
                                {value}
                            </motion.span>
                        )}
                    </h2>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 text-purple-500">{icon}</div>
            </CardContent>
        </Card>
    );
}
