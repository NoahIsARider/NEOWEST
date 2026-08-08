import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SceneMode } from '../types';
import { westernSynth } from '../utils/audioSynth';
import { Sliders, Check, SlidersHorizontal, Layers, Sparkles, X } from 'lucide-react';

interface ConceptSpecOverlayProps {
  sceneMode: SceneMode;
  cleanView: boolean;
  showGrid: boolean;
  onToggleGrid: () => void;
  showParticles: boolean;
  onToggleParticles: () => void;
}

export const ConceptSpecOverlay: React.FC<ConceptSpecOverlayProps> = ({
  sceneMode,
  cleanView,
  showGrid,
  onToggleGrid,
  showParticles,
  onToggleParticles,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (cleanView) return null;

  const isDusk = sceneMode === 'dusk';

  return (
    <>
      {/* Visual Tuning Trigger Button - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
        <button
          onClick={() => {
            westernSynth.playLaserPing();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#0c0505]/90 border border-[#f2e8cf]/20 text-[#f2e8cf]/80 hover:text-[#00f2ff] hover:border-[#00f2ff]/50 text-xs font-mono backdrop-blur-md transition-all duration-300 shadow-xl"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#00f2ff]" />
          <span className="hidden sm:inline">VISUAL SPECS & TUNER</span>
        </button>
      </div>

      {/* Visual Tuner & Spec Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 bottom-20 md:inset-x-auto md:left-6 md:bottom-20 md:w-80 z-40 pointer-events-auto"
          >
            <div className="bg-[#0c0505]/95 backdrop-blur-2xl border border-[#f2e8cf]/20 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative text-[#f2e8cf]">
              <button
                onClick={() => {
                  westernSynth.playLaserPing();
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 text-[#f2e8cf]/60 hover:text-[#00f2ff] p-1"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[#f2e8cf]/15 pb-2">
                  <Layers className="w-4 h-4 text-[#00f2ff]" />
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#f2e8cf] uppercase">
                    CONCEPT TUNER
                  </h4>
                </div>

                {/* Toggles */}
                <div className="space-y-2 text-xs font-mono">
                  <button
                    onClick={() => {
                      westernSynth.playLaserPing();
                      onToggleGrid();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#f2e8cf]/5 border border-[#f2e8cf]/10 hover:border-[#f2e8cf]/30 transition-colors text-[#f2e8cf]"
                  >
                    <span>NET-GRID OVERLAY</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${showGrid ? 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40' : 'bg-[#f2e8cf]/10 text-[#f2e8cf]/40'}`}>
                      {showGrid ? 'ACTIVE' : 'MUTED'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      westernSynth.playLaserPing();
                      onToggleParticles();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#f2e8cf]/5 border border-[#f2e8cf]/10 hover:border-[#f2e8cf]/30 transition-colors text-[#f2e8cf]"
                  >
                    <span>CYBER DUST PARTICLES</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${showParticles ? 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40' : 'bg-[#f2e8cf]/10 text-[#f2e8cf]/40'}`}>
                      {showParticles ? 'ACTIVE' : 'MUTED'}
                    </span>
                  </button>
                </div>

                {/* Palette Info */}
                <div className="pt-2 border-t border-[#f2e8cf]/15">
                  <span className="text-[10px] font-mono text-[#f2e8cf]/50 block mb-2 uppercase">
                    CURRENT PALETTE MATRIX
                  </span>
                  <div className="flex items-center gap-2">
                    {isDusk ? (
                      <>
                        <div className="flex-1 h-3 rounded bg-[#ff4e00]" title="Volcanic Orange" />
                        <div className="flex-1 h-3 rounded bg-[#ea580c]" title="Rust Mesa" />
                        <div className="flex-1 h-3 rounded bg-[#f2e8cf]" title="Warm Cream" />
                        <div className="flex-1 h-3 rounded bg-[#00f2ff]" title="Cyan Accent" />
                      </>
                    ) : (
                      <>
                        <div className="flex-1 h-3 rounded bg-[#00f2ff]" title="Cyan Lunar" />
                        <div className="flex-1 h-3 rounded bg-[#3a1510]" title="Deep Rust" />
                        <div className="flex-1 h-3 rounded bg-[#0c0505]" title="Obsidian Base" />
                        <div className="flex-1 h-3 rounded bg-[#f2e8cf]" title="Parchment Cream" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
