import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const textVariants = {
    offscreen: {
      opacity: 1,
      y: 30,
    },
    onscreen: {
      opacity: 1,
      y: -40,
    },
    exit:{
        opacity: 0,
        y: 20,
    }
  };

interface ChangingTextProps {
    texts: string[];
    delay: number;
}

const ChangingTextComplicated: React.FC<ChangingTextProps> = ({ texts, delay }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, delay * 1000);

      return () => clearInterval(interval);
    }, [texts, delay]);

    return (
      <motion.div className="relative h-auto mt-10 overflow-hidden"> 
        <h2 className="text-s-3 md:text-5xl text-2xl py-4 ">
          {texts[currentTextIndex]}
        </h2>
         {texts.map((text, index) => (
                  
  <motion.h2
    key={index}
    initial="offscreen"
    animate={index === currentTextIndex ? "onscreen" : "offscreen"}
    variants={textVariants}
    transition={{ duration: 0.3 }}
    className="absolute top-16 left-0 w-full h-full text-2xl md:text-4xl text-center"
  >
    {text}
  </motion.h2>
  
))}
</motion.div> 
        
    );
  };

export default ChangingTextComplicated;

