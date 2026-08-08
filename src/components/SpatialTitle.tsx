import React from 'react';
import { motion } from 'motion/react';
import { SceneMode } from '../types';
import { RETRO_QUOTE } from '../data/frontierData';
import { Compass } from 'lucide-react';

interface SpatialTitleProps {
  sceneMode: SceneMode;
  cleanView: boolean;
  selectedWaypointId: string | null;
}

export const SpatialTitle: React.FC<SpatialTitleProps> = ({
  sceneMode,
  cleanView,
  selectedWaypointId,
}) => {
  if (cleanView || selectedWaypointId) return null;

  const isDusk = sceneMode === 'dusk';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 md:p-12 pt-20 md:pt-28">
      {/* Upper Space Spacer */}
      <div className="h-6 md:h-10" />

      {/* Hero Immersive Spatial Overlay - Center Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-2xl pointer-events-auto my-auto"
      >
        <div className="space-y-4">
          {/* Eyebrow System Protocol Tag */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#f2e8cf]/60">
              RECLAMATION PROTOCOL // VECTOR 08.4
            </span>
          </div>

          {/* Large Immersive Typography with Outlined Stroke & Solid Fill */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-4">
              <span 
                className="text-6xl sm:text-8xl md:text-9xl font-black tracking-[-0.05em] leading-none text-transparent select-none"
                style={{ WebkitTextStroke: '1px #f2e8cf', opacity: 0.35 }}
              >
                NEO
              </span>
              <span className="text-xs font-mono tracking-[0.5em] text-[#f2e8cf]/50 uppercase hidden sm:inline">
                RECLAMATION UNIT
              </span>
            </div>

            <h1 className="text-7xl sm:text-9xl md:text-[140px] font-black tracking-[-0.08em] leading-[0.85] text-[#f2e8cf] drop-shadow-2xl">
              WEST
            </h1>
          </div>

          {/* Neon Horizon Line Accent */}
          <div className="w-24 h-[2px] bg-[#00f2ff] shadow-[0_0_12px_#00f2ff] my-6" />

          {/* Abstract Serif Quote & Tagline */}
          <div className="space-y-2 pt-1 max-w-lg">
            <p className="text-base sm:text-lg font-serif italic text-[#f2e8cf]/90 leading-relaxed font-light">
              "{RETRO_QUOTE.quoteEn}"
            </p>
            <p className="text-xs font-mono text-[#f2e8cf]/60 tracking-wider">
              Dust and silicon converge on the red horizon. The sun never sets on the automated range.
            </p>
          </div>

          {/* Interactive Instruction Prompt */}
          <div className="pt-4 flex items-center gap-4 text-xs font-mono text-[#f2e8cf]/80">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0505]/80 border border-[#f2e8cf]/20 backdrop-blur-md shadow-lg">
              <Compass className="w-3.5 h-3.5 text-[#00f2ff] animate-spin-slow" />
              <span>SELECT OR HOVER COORDINATE NODES TO DECODE AURAL & SPATIAL DATA</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Immersive Functional Telemetry Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="pointer-events-auto grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#f2e8cf]/15 text-[#f2e8cf]"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2e8cf]/40 mb-1">
            COORDINATES
          </span>
          <span className="font-mono text-xs md:text-sm text-[#f2e8cf]">
            34.0522° N / 118.2437° W
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2e8cf]/40 mb-1">
            ATMOSPHERE
          </span>
          <span className="font-mono text-xs md:text-sm text-[#f2e8cf]">
            OXYGEN: 14% // ARID SILICON
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2e8cf]/40 mb-1">
            SYSTEM STATUS
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse shadow-[0_0_8px_#00f2ff]" />
            <span className="font-mono text-xs md:text-sm uppercase text-[#00f2ff]">
              RELAY ACTIVE
            </span>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2e8cf]/40 mb-1">
            CURRENT PALETTE
          </span>
          <span className={`font-mono text-xs md:text-sm uppercase ${isDusk ? 'text-[#ff4e00]' : 'text-[#00f2ff]'}`}>
            {isDusk ? 'VOLCANIC DUSK // #FF4E00' : 'CYAN MIDNIGHT // #00F2FF'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

