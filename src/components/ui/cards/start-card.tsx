'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import CountUp from "react-countup";

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

    return (
        <Card className="flex-1 min-w-[280px] shadow-sm bg-card transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <h2 className="text-4xl font-bold text-card-foreground mt-1">
                        {loading && showLoadingAnimation ? (
                            <motion.div
                                animate={{
                                    opacity: [0.6, 1, 0.6],
                                    transition: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    },
                                }}
                                className="h-9 w-20 bg-muted rounded-md"
                            />
                        ) : (
                            <CountUp
                                end={value}
                                duration={1.2}
                                separator=""
                                preserveValue={true}
                            />
                        )}
                    </h2>
                </div>
                <div className="p-3 rounded-lg bg-muted text-primary">
                    {icon}
                </div>
            </CardContent>
        </Card>
    );
}
