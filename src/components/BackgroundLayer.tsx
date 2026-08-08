import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SceneMode } from '../types';
import { BACKGROUND_IMAGES } from '../data/frontierData';

interface BackgroundLayerProps {
  sceneMode: SceneMode;
  mousePos: { x: number; y: number };
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ sceneMode, mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle floating dust particle system over the background art
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.1,
      alpha: Math.random() * 0.7 + 0.2,
      color: sceneMode === 'dusk' ? '#f97316' : '#22d3ee',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX + (mousePos.x / width - 0.5) * 0.2;
        p.y += p.speedY;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sceneMode, mousePos]);

  // Subtle mouse parallax tilt offset
  const parallaxX = (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * -15;
  const parallaxY = (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * -15;

  return (
    <div className="fixed inset-0 overflow-hidden bg-zinc-950 select-none z-0">
      {/* Background Concept Artwork with smooth crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneMode}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1, x: parallaxX, y: parallaxY }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -inset-6 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url(${BACKGROUND_IMAGES[sceneMode]})`,
          }}
        >
          {/* Subtle gradient overlay to enhance visual legibility without destroying artwork depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Canvas Dust / Energy Spec System */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-70" />

      {/* Analog CRT & Grid Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%), linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)`,
          backgroundSize: '100% 100%, 100% 4px',
        }}
      />

      {/* Minimalist Grid Line Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-15">
        <div className="w-full h-full border-t border-b border-amber-500/20 grid grid-cols-12 grid-rows-6">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border-r border-b border-amber-500/10" />
          ))}
        </div>
      </div>
    </div>
  );
};
