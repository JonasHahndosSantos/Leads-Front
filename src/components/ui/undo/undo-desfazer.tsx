'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useUndo } from "@/components/ui/undo/undo-provider";
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';

export default function DesfazerButton() {
    const { isVisible, executeUndo } = useUndo();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isUndoShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z';

            if (isUndoShortcut && isVisible) {
                event.preventDefault();
                executeUndo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, executeUndo]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-card text-card-foreground py-2 px-4 rounded-lg shadow-lg flex items-center gap-4 z-50 border border-border"
                >
                    <span className="text-sm">Operação realizada.</span>
                    <Button
                        variant="ghost"
                        onClick={executeUndo}
                        className="font-bold uppercase text-primary hover:text-primary/90 transition-colors"
                    >
                        Desfazer
                        <Undo2 className="h-4 w-4 mr-2"/>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
