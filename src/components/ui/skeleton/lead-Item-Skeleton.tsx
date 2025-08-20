"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { motion, type Variants } from "framer-motion";

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

export function LeadItemSkeleton() {
    return (
        <TableRow className="border-border">
            <TableCell className="py-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        variants={skeletonVariants}
                        animate="pulsing"
                        className="h-9 w-9 rounded-full bg-muted"
                    />
                    <div className="flex flex-col gap-2">
                        <motion.div
                            variants={skeletonVariants}
                            animate="pulsing"
                            className="h-4 w-32 rounded-md bg-muted"
                        />
                        <motion.div
                            variants={skeletonVariants}
                            animate="pulsing"
                            className="h-3 w-40 rounded-md bg-muted"
                        />
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <motion.div
                    variants={skeletonVariants}
                    animate="pulsing"
                    className="h-5 w-24 rounded-md bg-muted"
                />
            </TableCell>
            <TableCell>
                <motion.div
                    variants={skeletonVariants}
                    animate="pulsing"
                    className="h-4 w-28 rounded-md bg-muted"
                />
            </TableCell>
            <TableCell>
                <motion.div
                    variants={skeletonVariants}
                    animate="pulsing"
                    className="h-5 w-20 rounded-md bg-muted"
                />
            </TableCell>
            <TableCell>
                <motion.div
                    variants={skeletonVariants}
                    animate="pulsing"
                    className="h-6 w-24 rounded-md bg-muted"
                />
            </TableCell>
            <TableCell>
                <motion.div
                    variants={skeletonVariants}
                    animate="pulsing"
                    className="h-4 w-32 rounded-md bg-muted"
                />
            </TableCell>
            <TableCell>
                <motion.div
                    variants={skeletonVariants}
                    animate="pulsing"
                    className="h-8 w-[110px] rounded-md bg-muted"
                />
            </TableCell>
        </TableRow>
    );
}
