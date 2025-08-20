"use client";
import { motion, type Variants } from "framer-motion";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import {LeadItemSkeleton} from "@/components/ui/skeleton/lead-Item-Skeleton";

const skeletonVariants: Variants = {
    pulsing: {
        opacity: [0.6, 1, 0.6],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

function SkeletonBlock({ className }: { className?: string }) {
    return <motion.div
        variants={skeletonVariants}
        animate="pulsing"
        className={`bg-muted rounded-md ${className}`}
    />;
}

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen p-8">
            <header className="mb-8 flex items-start justify-between">
                <div>
                    <SkeletonBlock className="h-9 w-32 mb-2" />
                    <SkeletonBlock className="h-4 w-72" />
                </div>
                <SkeletonBlock className="h-9 w-9" />
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                <SkeletonBlock className="h-[108px]" />
                <SkeletonBlock className="h-[108px]" />
                <SkeletonBlock className="h-[108px]" />
            </section>

            <div className="mb-6">
                <SkeletonBlock className="h-10 w-64 mb-6" />
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <SkeletonBlock className="h-10 w-full sm:max-w-xs" />
                    <SkeletonBlock className="h-10 w-40" />
                    <SkeletonBlock className="h-10 w-40" />
                </div>
            </div>

            <section className="bg-card text-card-foreground rounded-lg shadow-sm p-6">
                <div className="mb-3">
                    <SkeletonBlock className="h-6 w-24 mb-1" />
                    <SkeletonBlock className="h-4 w-48" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border">
                            <TableHead><SkeletonBlock className="h-4 w-24" /></TableHead>
                            <TableHead><SkeletonBlock className="h-4 w-20" /></TableHead>
                            <TableHead><SkeletonBlock className="h-4 w-28" /></TableHead>
                            <TableHead><SkeletonBlock className="h-4 w-24" /></TableHead>
                            <TableHead><SkeletonBlock className="h-4 w-16" /></TableHead>
                            <TableHead><SkeletonBlock className="h-4 w-32" /></TableHead>
                            <TableHead><SkeletonBlock className="h-4 w-20" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <LeadItemSkeleton key={index} />
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    );
}
