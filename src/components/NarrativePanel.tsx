import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORY_CHAPTERS } from '../data/frontierData';
import { SceneMode } from '../types';
import { westernSynth } from '../utils/audioSynth';
import { BookOpen, ChevronRight, X, Sparkles, Feather } from 'lucide-react';

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
      {/* Floating Bottom Left Drawer Trigger */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 pointer-events-auto">
          <button
            onClick={() => {
              westernSynth.playLaserPing();
              setIsOpen(true);
            }}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-2xl group ${
              isDusk
                ? 'bg-[#0c0505]/90 border-[#ff4e00]/50 text-[#f2e8cf] hover:bg-[#ff4e00] hover:text-[#0c0505] shadow-[0_0_20px_rgba(255,78,0,0.25)]'
                : 'bg-[#0c0505]/90 border-[#00f2ff]/50 text-[#00f2ff] hover:bg-[#00f2ff] hover:text-[#0c0505] shadow-[0_0_20px_rgba(0,242,255,0.25)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-mono tracking-widest uppercase font-semibold">
              NARRATIVE CHRONICLES
            </span>
          </button>
        </div>
      )}

      {/* Floating Narrative Reading View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-6 md:inset-x-auto md:right-8 md:bottom-8 md:w-[500px] z-40 pointer-events-auto"
          >
            <div className="bg-[#0c0505]/95 backdrop-blur-2xl border border-[#f2e8cf]/20 p-6 md:p-8 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden text-[#f2e8cf]">
              {/* Header Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isDusk
                    ? 'bg-gradient-to-r from-[#ff4e00] via-[#ff7700] to-transparent'
                    : 'bg-gradient-to-r from-[#00f2ff] via-[#00aaff] to-transparent'
                }`}
              />

              {/* Close Button */}
              <button
                onClick={() => {
                  westernSynth.playLaserPing();
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 p-2 text-[#f2e8cf]/60 hover:text-[#00f2ff] transition-colors rounded-full hover:bg-[#f2e8cf]/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & Epoch info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Feather className={`w-4 h-4 ${isDusk ? 'text-[#ff4e00]' : 'text-[#00f2ff]'}`} />
                  <span className="text-xs font-mono tracking-widest text-[#f2e8cf]/60 uppercase">
                    CHAPTER {activeChapterIndex + 1} OF {STORY_CHAPTERS.length}
                  </span>
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
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-all whitespace-nowrap ${
                        idx === activeChapterIndex
                          ? isDusk
                            ? 'bg-[#ff4e00]/20 text-[#f2e8cf] border border-[#ff4e00]/60'
                            : 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/60'
                          : 'text-[#f2e8cf]/50 hover:text-[#f2e8cf]'
                      }`}
                    >
                      {chap.code}
                    </button>
                  ))}
                </div>

                {/* Chapter Title */}
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-[#f2e8cf] font-normal">
                    {currentChapter.title}
                  </h3>
                  <p className="text-[10px] font-mono text-[#f2e8cf]/50 tracking-widest mt-1">
                    ANOMALY ARCHIVE // {currentChapter.epoch}
                  </p>
                </div>

                {/* Body Content */}
                <div className="pt-2">
                  <p className="text-sm font-sans text-[#f2e8cf]/90 leading-relaxed font-light bg-[#f2e8cf]/5 p-4 rounded-xl border border-[#f2e8cf]/10">
                    {currentChapter.content}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => {
                      westernSynth.playLaserPing();
                      setActiveChapterIndex((prev) => (prev + 1) % STORY_CHAPTERS.length);
                    }}
                    className="flex items-center gap-1.5 text-[#00f2ff] hover:text-[#f2e8cf] transition-colors"
                  >
                    <span>NEXT EPOCH</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] text-[#f2e8cf]/40 font-mono">
                    STATUS: TRANSMITTING
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
