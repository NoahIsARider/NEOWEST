import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SceneMode } from '../types';
import { westernSynth } from '../utils/audioSynth';
import { Volume2, VolumeX, Eye, EyeOff, Radio, Sun, Moon } from 'lucide-react';

interface MinimalHUDProps {
  sceneMode: SceneMode;
  onSceneChange: (mode: SceneMode) => void;
  cleanView: boolean;
  onToggleCleanView: () => void;
  selectedWaypointId: string | null;
}

export const MinimalHUD: React.FC<MinimalHUDProps> = ({
  sceneMode,
  onSceneChange,
  cleanView,
  onToggleCleanView,
  selectedWaypointId,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.3);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      const secs = now.getSeconds().toString().padStart(2, '0');
      const ms = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}:${secs}.${ms}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 50);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const playing = westernSynth.togglePlay(audioVolume);
    setIsPlayingAudio(playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAudioVolume(val);
    westernSynth.setVolume(val);
  };

  if (cleanView) {
    return (
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={onToggleCleanView}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0505]/90 border border-[#00f2ff]/50 text-[#00f2ff] text-xs font-mono backdrop-blur-md hover:bg-[#00f2ff] hover:text-[#0c0505] transition-all duration-300 group shadow-[0_0_15px_rgba(0,242,255,0.2)]"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>SHOW HUD</span>
        </button>
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-4">
        
        {/* Left: Brand Identity & Coordinates */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto flex flex-col gap-1 bg-[#0c0505]/85 backdrop-blur-md px-4 py-2 border border-[#f2e8cf]/20 rounded-2xl shadow-2xl max-w-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse shadow-[0_0_8px_#00f2ff]" />
            <h1 className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#f2e8cf] font-bold uppercase">
              FRONTIER_OS <span className="text-[#00f2ff]/80 font-normal">// 2088</span>
            </h1>
          </div>
          <p className="text-[10px] font-mono text-[#f2e8cf]/60 tracking-wider flex items-center gap-2">
            <span>SECTOR: BADLANDS-07</span>
            <span className="text-[#00f2ff]/40">•</span>
            <span className="text-[#00f2ff] font-medium">{currentTime}</span>
          </p>
        </motion.div>

        {/* Center/Right: Ambient Controls & Scene Selector */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="pointer-events-auto flex flex-wrap items-center gap-3 md:gap-4 bg-[#0c0505]/75 backdrop-blur-md px-4 py-2 border border-[#f2e8cf]/20 rounded-full shadow-2xl"
        >
          {/* Scene Switcher */}
          <div className="flex items-center gap-1 border-r border-[#f2e8cf]/15 pr-3">
            <button
              onClick={() => {
                westernSynth.playLaserPing();
                onSceneChange('dusk');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                sceneMode === 'dusk'
                  ? 'bg-[#ff4e00]/20 text-[#f2e8cf] border border-[#ff4e00]/60 shadow-[0_0_12px_rgba(255,78,0,0.3)]'
                  : 'text-[#f2e8cf]/60 hover:text-[#f2e8cf]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#ff4e00]" />
              <span>1888 DUSK</span>
            </button>

            <button
              onClick={() => {
                westernSynth.playLaserPing();
                onSceneChange('night');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                sceneMode === 'night'
                  ? 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/60 shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                  : 'text-[#f2e8cf]/60 hover:text-[#00f2ff]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span>2088 NIGHT</span>
            </button>
          </div>

          {/* Audio Synthesizer Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`p-1.5 rounded-full text-xs font-mono transition-colors flex items-center gap-1.5 ${
                isPlayingAudio
                  ? 'text-[#00f2ff] bg-[#00f2ff]/20 border border-[#00f2ff]/50 animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.2)]'
                  : 'text-[#f2e8cf]/60 hover:text-[#f2e8cf]'
              }`}
              title="Toggle Retro Frontier Synthesizer"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#00f2ff]" />
                  <span className="text-[10px] hidden sm:inline text-[#00f2ff] font-mono">SYNTH ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#f2e8cf]/40" />
                  <span className="text-[10px] hidden sm:inline text-[#f2e8cf]/40 font-mono">SYNTH MUTE</span>
                </>
              )}
            </button>

            {isPlayingAudio && (
              <div className="flex items-center gap-2 pl-1">
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.01"
                  value={audioVolume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-[#f2e8cf]/20 rounded-lg appearance-none cursor-pointer accent-[#00f2ff]"
                />
                {/* Audio visualizer micro-bars */}
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 bg-[#00f2ff] animate-[bounce_1s_infinite_100ms] h-full" />
                  <div className="w-0.5 bg-[#00f2ff] animate-[bounce_1s_infinite_300ms] h-2/3" />
                  <div className="w-0.5 bg-[#00f2ff] animate-[bounce_1s_infinite_200ms] h-5/6" />
                </div>
              </div>
            )}
          </div>

          {/* Hide HUD toggle */}
          <button
            onClick={onToggleCleanView}
            className="p-1.5 rounded-full text-[#f2e8cf]/50 hover:text-[#f2e8cf] transition-colors border-l border-[#f2e8cf]/15 pl-3"
            title="Clean View (Hide HUD)"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </header>
  );
};
