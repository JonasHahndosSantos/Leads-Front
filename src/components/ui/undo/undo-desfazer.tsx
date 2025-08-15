'use client'
import { motion, AnimatePresence } from 'framer-motion';
import {useUndo} from "@/components/ui/undo/undo-provider";

export default function DesfazerButton() {
    const { isVisible, executeUndo } = useUndo();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white text-black py-3 px-6 rounded-lg shadow-lg flex items-center gap-4 z-50 border border-gray-300"
                >
                    <span>Operação realizada.</span>
                    <button
                        onClick={executeUndo}
                        className="font-bold uppercase text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Desfazer
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}