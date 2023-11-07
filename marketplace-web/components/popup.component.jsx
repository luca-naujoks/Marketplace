import React, { useEffect, useState } from 'react';

export function Popup({ show, message, onClose, time, type }) {
  const [isHovering, setIsHovering] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);

  // Map types to colors
  const typeToColor = {
    warning: 'bg-red-500',
    check: 'bg-green-500',
    popup: 'bg-white',
  };

  // Close the popup after 3 seconds
  useEffect(() => {
    if (show) {
      const timer = setInterval(() => {
        if (!isHovering && timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else if (timeLeft === 0) {
          onClose();
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [show, onClose, isHovering, timeLeft]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-end pr-10 bg-black bg-opacity-50">
      <div 
        className={`relative flex items-center p-2 h-12 w-1/5 rounded-md ${typeToColor[type]} mt-4 text-center`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button onClick={onClose} className="absolute right-2 top-2 text-lg font-bold hover:text-white">X</button>
        <p>{message}</p>
      </div>
    </div>
  );
}
