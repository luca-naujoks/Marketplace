import React, { useState, useEffect } from "react";

export const TypingText = ({ text, size, time, color}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setTimeout(100);
    const timeout = setTimeout(() => {
      setTextIndex(textIndex + 1);
      if (textIndex === text.length - 1) {
        setTyping(false);
      }
    }, time);
    return () => clearTimeout(timeout);
  }, [textIndex]);

  return (
    <span className= "typing-text font-mono  leading-tight {color} {size}">
      {typing ? text.substring(0, textIndex + 1) : text}
    </span>
  );
};