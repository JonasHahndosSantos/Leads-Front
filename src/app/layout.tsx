'use client';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import "./globals.css";
import {DashboardSkeleton} from "@/components/ui/skeleton/skeleton-dashboard";
import { UndoProvider } from "@/components/ui/undo/undo-provider";
import DesfazerButton from "@/components/ui/undo/undo-desfazer";

import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");
        if (hasLoadedBefore) {
            setIsLoading(false);
        } else {
            sessionStorage.setItem("hasLoadedBefore", "true");
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, []);

    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={true}
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <DashboardSkeleton key="skeleton" />
                ) : (
                    <UndoProvider>
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {children}
                        </motion.div>
                        <DesfazerButton />
                    </UndoProvider>
                )}
            </AnimatePresence>
            <Toaster richColors/>
        </ThemeProvider>
        </body>
        </html>
    );
}