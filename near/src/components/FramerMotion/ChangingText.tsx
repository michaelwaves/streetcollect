import React, { useEffect, useState } from "react";

interface ChangingTextProps {
    texts: string[];
    delay: number;
}

const ChangingText: React.FC<ChangingTextProps> = ({ texts, delay }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, delay * 1000);

      return () => clearInterval(interval);
    }, [texts, delay]);

    return (
        <h2 className="text-s-3 md:text-5xl text-2xl py-4 text-center ">
          {texts[currentTextIndex]}
        </h2>
        
    );
  };

export default ChangingText;
