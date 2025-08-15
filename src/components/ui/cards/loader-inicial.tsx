import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export default function AppLoader() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-300 text-white">

            <div className="flex items-center gap-3">
                <LoaderCircle className="h-6 w-6 animate-spin text-gray-600" />
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <span className="text-xl font-medium tracking-wider text-black">Carregando...</span>
                </motion.div>

            </div>
        </div>
    );
}