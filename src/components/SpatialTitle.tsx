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
  const isNight = sceneMode === 'night';
  const isPandemonium = sceneMode === 'pandemonium';
  const isParadiso = sceneMode === 'paradiso';

  const sceneInfo = {
    dusk: {
      eyebrow: 'RECLAMATION PROTOCOL // VECTOR 08.4',
      topText: 'NEO',
      unitText: 'RECLAMATION UNIT',
      mainTitle: 'WEST',
      accentColor: '#ff4e00',
      quote: RETRO_QUOTE.quoteEn,
      desc: 'Dust and silicon converge on the red horizon. The sun never sets on the automated range.',
      coords: '34.0522° N / 118.2437° W',
      atmo: 'OXYGEN: 14% // ARID SILICON',
    },
    night: {
      eyebrow: 'LUNAR MATRIX // VECTOR 20.88',
      topText: 'NEO',
      unitText: 'NIGHT RECONNAISSANCE',
      mainTitle: 'WEST',
      accentColor: '#00f2ff',
      quote: 'Electromagnetic whirlwinds stirring luminous particles across the quiet expanse of the desert plateau.',
      desc: 'In this minimalist field of vision, spiraling dust devils execute a silent digital choreography.',
      coords: '36.6000° N / 118.2000° W',
      atmo: 'OXYGEN: 18% // LUNAR CHILL',
    },
    pandemonium: {
      eyebrow: 'ANOMALY ARCHIVE 01 // SUBTERRANEAN',
      topText: 'OBSIDIAN',
      unitText: 'INFERNAL ENGINE',
      mainTitle: 'VAULT',
      accentColor: '#ff2a00',
      quote: 'Cavernous obsidian architecture and circuit-engraved columns pulse with subterranean cybernetic power.',
      desc: 'Molten copper conduits and fiery crimson light arrays slice through the deep dark abyss.',
      coords: '36.9000° N / 118.8800° W',
      atmo: 'OXYGEN: 8% // MOLTEN THERMAL',
    },
    paradiso: {
      eyebrow: 'ANOMALY ARCHIVE 02 // CELESTIAL',
      topText: 'DIVINE',
      unitText: 'QUANTUM ZENITH',
      mainTitle: 'SPHERES',
      accentColor: '#eab308',
      quote: 'Concentric rings of sacred gold and cyan energy suspended over a transcendent cybernetic realm.',
      desc: 'Luminous vector rays cut through celestial space, channeling infinite light and sacred geometry.',
      coords: '37.1000° N / 118.0500° W',
      atmo: 'OXYGEN: 99% // CELESTIAL RESONANCE',
    },
  }[sceneMode];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 md:p-12 pt-20 md:pt-28">
      {/* Upper Space Spacer */}
      <div className="h-6 md:h-10" />

      {/* Hero Immersive Spatial Overlay - Center Left */}
      <motion.div
        key={sceneMode}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl pointer-events-auto my-auto"
      >
        <div className="space-y-4">
          {/* Eyebrow System Protocol Tag */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#f2e8cf]/60">
              {sceneInfo.eyebrow}
            </span>
          </div>

          {/* Large Immersive Typography with Outlined Stroke & Solid Fill */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-4">
              <span 
                className="text-6xl sm:text-8xl md:text-9xl font-black tracking-[-0.05em] leading-none text-transparent select-none"
                style={{ WebkitTextStroke: '1px #f2e8cf', opacity: 0.35 }}
              >
                {sceneInfo.topText}
              </span>
              <span className="text-xs font-mono tracking-[0.5em] text-[#f2e8cf]/50 uppercase hidden sm:inline">
                {sceneInfo.unitText}
              </span>
            </div>

            <h1 className="text-7xl sm:text-9xl md:text-[140px] font-black tracking-[-0.08em] leading-[0.85] text-[#f2e8cf] drop-shadow-2xl">
              {sceneInfo.mainTitle}
            </h1>
          </div>

          {/* Neon Horizon Line Accent */}
          <div
            className="w-24 h-[2px] my-6 transition-colors duration-500"
            style={{
              backgroundColor: sceneInfo.accentColor,
              boxShadow: `0 0 12px ${sceneInfo.accentColor}`,
            }}
          />

          {/* Abstract Serif Quote & Tagline */}
          <div className="space-y-2 pt-1 max-w-lg">
            <p className="text-base sm:text-lg font-serif italic text-[#f2e8cf]/90 leading-relaxed font-light">
              "{sceneInfo.quote}"
            </p>
            <p className="text-xs font-mono text-[#f2e8cf]/60 tracking-wider">
              {sceneInfo.desc}
            </p>
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
            {sceneInfo.coords}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2e8cf]/40 mb-1">
            ATMOSPHERE
          </span>
          <span className="font-mono text-xs md:text-sm text-[#f2e8cf]">
            {sceneInfo.atmo}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2e8cf]/40 mb-1">
            SYSTEM STATUS
          </span>
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: sceneInfo.accentColor,
                boxShadow: `0 0 8px ${sceneInfo.accentColor}`,
              }}
            />
            <span
              className="font-mono text-xs md:text-sm uppercase"
              style={{ color: sceneInfo.accentColor }}
            >
              RELAY ACTIVE
            </span>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2e8cf]/40 mb-1">
            CURRENT PALETTE
          </span>
          <span
            className="font-mono text-xs md:text-sm uppercase"
            style={{ color: sceneInfo.accentColor }}
          >
            {isDusk && 'VOLCANIC DUSK // #FF4E00'}
            {isNight && 'CYAN MIDNIGHT // #00F2FF'}
            {isPandemonium && 'INFERNAL VAULT // #FF2A00'}
            {isParadiso && 'CELESTIAL REALM // #EAB308'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

