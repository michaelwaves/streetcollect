import { motion } from "framer-motion"

const tooltipVariants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
        y: -20,
        x: -20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0
    }
}


export default function Tooltip({ title, text }: { title: string, text: string }) {
    return (
        <motion.div className=" w-full h-full cursor-pointer bg-blue-100"
            initial={"hidden"}
            whileHover={"visible"}
            variants={tooltipVariants}>
            <h2>{title}</h2>
            <div className="absolute top-0 left-0 w-0 h-0 border-4 border-p-5 border-solid rounded-full">
                {text}
            </div>
        </motion.div>

    )
}