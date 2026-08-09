import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SceneMode } from '../types';
import { westernSynth } from '../utils/audioSynth';
import { SlidersHorizontal, Layers, Sparkles, X } from 'lucide-react';

interface ConceptSpecOverlayProps {
  sceneMode: SceneMode;
  onSceneChange?: (mode: SceneMode) => void;
  cleanView: boolean;
  showGrid: boolean;
  onToggleGrid: () => void;
  showParticles: boolean;
  onToggleParticles: () => void;
}

export const ConceptSpecOverlay: React.FC<ConceptSpecOverlayProps> = ({
  sceneMode,
  onSceneChange,
  cleanView,
  showGrid,
  onToggleGrid,
  showParticles,
  onToggleParticles,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (cleanView) return null;

  return (
    <>
      {/* Right Side Subtle Button for Visual Specs */}
      {!isOpen && (
        <div className="fixed top-24 right-6 z-30 pointer-events-auto">
          <button
            onClick={() => {
              westernSynth.playLaserPing();
              setIsOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0c0505]/80 border border-[#f2e8cf]/15 text-[#f2e8cf]/70 hover:text-[#00f2ff] hover:border-[#00f2ff]/40 text-xs font-mono backdrop-blur-md transition-all duration-300 shadow-xl"
            title="Visual Specs & Tuner"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00f2ff]" />
            <span className="hidden sm:inline">VISUAL SPECS</span>
          </button>
        </div>
      )}

      {/* Right Side Drawer Panel for Visual Specs */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-80 md:w-96 z-50 pointer-events-auto bg-[#0c0505]/95 backdrop-blur-2xl border-l border-[#f2e8cf]/20 p-6 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.9)] overflow-y-auto text-[#f2e8cf]"
          >
            <div className="flex items-center justify-between border-b border-[#f2e8cf]/15 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00f2ff]" />
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#f2e8cf] uppercase">
                  VISUAL SPECS & TUNER
                </h4>
              </div>
              <button
                onClick={() => {
                  westernSynth.playLaserPing();
                  setIsOpen(false);
                }}
                className="text-[#f2e8cf]/60 hover:text-[#00f2ff] p-1.5 rounded-full hover:bg-[#f2e8cf]/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              {/* Toggles */}
              <div className="space-y-3 font-mono text-xs">
                <span className="text-[10px] text-[#f2e8cf]/40 uppercase tracking-widest block mb-1">
                  RENDER LAYERS
                </span>
                <button
                  onClick={() => {
                    westernSynth.playLaserPing();
                    onToggleGrid();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#f2e8cf]/5 border border-[#f2e8cf]/10 hover:border-[#f2e8cf]/30 transition-colors text-[#f2e8cf]"
                >
                  <span>NET-GRID OVERLAY</span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${showGrid ? 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40' : 'bg-[#f2e8cf]/10 text-[#f2e8cf]/40'}`}>
                    {showGrid ? 'ACTIVE' : 'MUTED'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    westernSynth.playLaserPing();
                    onToggleParticles();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#f2e8cf]/5 border border-[#f2e8cf]/10 hover:border-[#f2e8cf]/30 transition-colors text-[#f2e8cf]"
                >
                  <span>CYBER DUST PARTICLES</span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${showParticles ? 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40' : 'bg-[#f2e8cf]/10 text-[#f2e8cf]/40'}`}>
                    {showParticles ? 'ACTIVE' : 'MUTED'}
                  </span>
                </button>
              </div>

              {/* Anomaly Archives DLC */}
              {onSceneChange && (
                <div className="pt-4 border-t border-[#f2e8cf]/15">
                  <span className="text-[10px] font-mono text-[#f2e8cf]/50 block mb-3 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
                    <span>ANOMALY ARCHIVES (DLC)</span>
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <button
                      onClick={() => {
                        westernSynth.playLaserPing();
                        onSceneChange('pandemonium');
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-colors ${
                        sceneMode === 'pandemonium'
                          ? 'bg-[#ff2a00]/20 text-[#ff4e00] border-[#ff2a00]/60'
                          : 'bg-[#f2e8cf]/5 text-[#f2e8cf]/80 border-[#f2e8cf]/10 hover:border-[#f2e8cf]/30'
                      }`}
                    >
                      <div className="font-bold">01. PANDEMONIUM</div>
                      <div className="text-[10px] text-[#f2e8cf]/50 mt-0.5">SUBTERRANEAN OBSIDIAN VAULT</div>
                    </button>

                    <button
                      onClick={() => {
                        westernSynth.playLaserPing();
                        onSceneChange('paradiso');
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-colors ${
                        sceneMode === 'paradiso'
                          ? 'bg-[#eab308]/20 text-[#eab308] border-[#eab308]/60'
                          : 'bg-[#f2e8cf]/5 text-[#f2e8cf]/80 border-[#f2e8cf]/10 hover:border-[#f2e8cf]/30'
                      }`}
                    >
                      <div className="font-bold">02. PARADISO</div>
                      <div className="text-[10px] text-[#f2e8cf]/50 mt-0.5">CELESTIAL ZENITH SPHERES</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Palette Info */}
              <div className="pt-4 border-t border-[#f2e8cf]/15">
                <span className="text-[10px] font-mono text-[#f2e8cf]/50 block mb-3 uppercase">
                  CURRENT PALETTE MATRIX
                </span>
                <div className="flex items-center gap-2">
                  {sceneMode === 'dusk' && (
                    <>
                      <div className="flex-1 h-3.5 rounded bg-[#ff4e00]" title="Volcanic Orange" />
                      <div className="flex-1 h-3.5 rounded bg-[#ea580c]" title="Rust Mesa" />
                      <div className="flex-1 h-3.5 rounded bg-[#f2e8cf]" title="Warm Cream" />
                      <div className="flex-1 h-3.5 rounded bg-[#00f2ff]" title="Cyan Accent" />
                    </>
                  )}
                  {sceneMode === 'night' && (
                    <>
                      <div className="flex-1 h-3.5 rounded bg-[#00f2ff]" title="Cyan Lunar" />
                      <div className="flex-1 h-3.5 rounded bg-[#3a1510]" title="Deep Rust" />
                      <div className="flex-1 h-3.5 rounded bg-[#0c0505]" title="Obsidian Base" />
                      <div className="flex-1 h-3.5 rounded bg-[#f2e8cf]" title="Parchment Cream" />
                    </>
                  )}
                  {sceneMode === 'pandemonium' && (
                    <>
                      <div className="flex-1 h-3.5 rounded bg-[#ff2a00]" title="Infernal Crimson" />
                      <div className="flex-1 h-3.5 rounded bg-[#b91c1c]" title="Obsidian Red" />
                      <div className="flex-1 h-3.5 rounded bg-[#ea580c]" title="Molten Copper" />
                      <div className="flex-1 h-3.5 rounded bg-[#00f2ff]" title="Vector Cyan" />
                    </>
                  )}
                  {sceneMode === 'paradiso' && (
                    <>
                      <div className="flex-1 h-3.5 rounded bg-[#00f2ff]" title="Celestial Cyan" />
                      <div className="flex-1 h-3.5 rounded bg-[#eab308]" title="Sacred Gold" />
                      <div className="flex-1 h-3.5 rounded bg-[#ffffff]" title="Ivory Light" />
                      <div className="flex-1 h-3.5 rounded bg-[#0f172a]" title="Cosmic Obsidian" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
