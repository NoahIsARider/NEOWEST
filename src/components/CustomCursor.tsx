import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CustomCursorProps {
  mousePos: { x: number; y: number };
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mousePos }) => {
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.onclick !== null ||
        target.closest('button') !== null ||
        target.dataset.interactive === 'true'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <>
      {/* Reticle Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      >
        <div className="w-8 h-8 rounded-full border border-amber-400/80 flex items-center justify-center relative">
          <div className="w-1 h-1 bg-amber-400 rounded-full" />
          {/* Corner tick marks */}
          <div className="absolute -top-1 w-2 h-[1px] bg-amber-400" />
          <div className="absolute -bottom-1 w-2 h-[1px] bg-amber-400" />
          <div className="absolute -left-1 h-2 w-[1px] bg-amber-400" />
          <div className="absolute -right-1 h-2 w-[1px] bg-amber-400" />
        </div>
      </motion.div>

      {/* Floating Coordinate Tag */}
      {!(mousePos.x < 320 && mousePos.y < 100) && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 text-[10px] font-mono text-amber-400/80 tracking-tighter mix-blend-difference hidden md:block"
          animate={{
            x: mousePos.x + 24,
            y: mousePos.y + 20,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.1 }}
        >
          X:{mousePos.x.toString().padStart(4, '0')} Y:{mousePos.y.toString().padStart(4, '0')}
        </motion.div>
      )}
    </>
  );
};
