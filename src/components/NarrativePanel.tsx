import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORY_CHAPTERS } from '../data/frontierData';
import { SceneMode } from '../types';
import { westernSynth } from '../utils/audioSynth';
import { BookOpen, ChevronRight, X, Feather } from 'lucide-react';

interface NarrativePanelProps {
  sceneMode: SceneMode;
  cleanView: boolean;
}

export const NarrativePanel: React.FC<NarrativePanelProps> = ({ sceneMode, cleanView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  if (cleanView) return null;

  const currentChapter = STORY_CHAPTERS[activeChapterIndex];
  const isDusk = sceneMode === 'dusk';

  return (
    <>
      {/* Right Side Subtle Button for Narrative Chronicles (placed below Visual Specs) */}
      {!isOpen && (
        <div className="fixed top-36 right-6 z-30 pointer-events-auto">
          <button
            onClick={() => {
              westernSynth.playLaserPing();
              setIsOpen(true);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl ${
              isDusk
                ? 'bg-[#0c0505]/80 border-[#ff4e00]/40 text-[#f2e8cf]/80 hover:text-[#ff4e00] hover:border-[#ff4e00]'
                : 'bg-[#0c0505]/80 border-[#00f2ff]/40 text-[#f2e8cf]/80 hover:text-[#00f2ff] hover:border-[#00f2ff]'
            }`}
            title="Narrative Chronicles"
          >
            <BookOpen className={`w-3.5 h-3.5 ${isDusk ? 'text-[#ff4e00]' : 'text-[#00f2ff]'}`} />
            <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase">
              CHRONICLES
            </span>
          </button>
        </div>
      )}

      {/* Right Side Drawer Panel for Narrative */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-80 md:w-[460px] z-50 pointer-events-auto bg-[#0c0505]/95 backdrop-blur-2xl border-l border-[#f2e8cf]/20 p-6 md:p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.9)] overflow-y-auto text-[#f2e8cf]"
          >
            {/* Header Accent Line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 ${
                isDusk
                  ? 'bg-gradient-to-r from-[#ff4e00] via-[#ff7700] to-transparent'
                  : 'bg-gradient-to-r from-[#00f2ff] via-[#00aaff] to-transparent'
              }`}
            />

            <div className="flex items-center justify-between border-b border-[#f2e8cf]/15 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Feather className={`w-4 h-4 ${isDusk ? 'text-[#ff4e00]' : 'text-[#00f2ff]'}`} />
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#f2e8cf]">
                  NARRATIVE CHRONICLES
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

            <div className="space-y-6 flex-1 flex flex-col">
              <div className="text-xs font-mono text-[#f2e8cf]/50 uppercase tracking-widest">
                CHAPTER {activeChapterIndex + 1} OF {STORY_CHAPTERS.length} // {currentChapter.epoch}
              </div>

              {/* Chapter Selection Tabs */}
              <div className="flex items-center gap-2 border-b border-[#f2e8cf]/15 pb-3 overflow-x-auto">
                {STORY_CHAPTERS.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => {
                      westernSynth.playLaserPing();
                      setActiveChapterIndex(idx);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                      idx === activeChapterIndex
                        ? isDusk
                          ? 'bg-[#ff4e00]/20 text-[#f2e8cf] border border-[#ff4e00]/60 font-bold'
                          : 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/60 font-bold'
                        : 'text-[#f2e8cf]/50 hover:text-[#f2e8cf] bg-[#f2e8cf]/5 border border-[#f2e8cf]/10'
                    }`}
                  >
                    {chap.code}
                  </button>
                ))}
              </div>

              {/* Chapter Title & Content */}
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-serif text-[#f2e8cf] font-normal leading-tight">
                  {currentChapter.title}
                </h3>
                <div className="p-5 rounded-xl bg-[#f2e8cf]/5 border border-[#f2e8cf]/10 text-sm font-sans text-[#f2e8cf]/90 leading-relaxed font-light">
                  {currentChapter.content}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="pt-4 border-t border-[#f2e8cf]/15 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => {
                    westernSynth.playLaserPing();
                    setActiveChapterIndex((prev) => (prev + 1) % STORY_CHAPTERS.length);
                  }}
                  className={`flex items-center gap-1.5 transition-colors ${isDusk ? 'text-[#ff4e00] hover:text-[#f2e8cf]' : 'text-[#00f2ff] hover:text-[#f2e8cf]'}`}
                >
                  <span>NEXT EPOCH</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10px] text-[#f2e8cf]/40 font-mono">
                  TRANSMISSION SECURE
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
