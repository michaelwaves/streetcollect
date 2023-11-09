import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Fail({ children }: { children: any }) {
    return (
        <div className="w-full h-full flex flex-col gap-8 items-center justify-center bg-p-5 mt-20">
            <motion.div
                className="w-20 h-20"
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            >
                <Image src="/fail.svg" width={400} height={400} alt="logo"></Image>
            </motion.div>
            <h1>That didn&apos;t work!</h1>
            <p>Our website broke for some reason. Maybe try again later</p>
            <h2 className="">Where to next?</h2>
            <div className="flex flex-row gap-4">
                <Link href={"/"}><h2 className="text-white p-2 rounded-xl bg-s-3">Home</h2></Link>
                <Link href={"/profile"}><h2 className="text-white p-2 rounded-xl bg-s-3">Profile</h2></Link>
            </div>
            {children}
        </div>
    )
}