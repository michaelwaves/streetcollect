import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

export default function Backdrop({ children, onClick }: { children: any, onClick: MouseEventHandler<HTMLDivElement> }) {


    return (
        <motion.div
            onClick={onClick}
            className="absolute h-full w-full  flex items-center justify-center overflow-y-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}