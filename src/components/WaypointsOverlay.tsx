import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waypoint, SceneMode } from '../types';
import { WAYPOINTS } from '../data/frontierData';
import { westernSynth } from '../utils/audioSynth';
import { Crosshair, X, Radio, ArrowRight, Activity } from 'lucide-react';

interface WaypointsOverlayProps {
  sceneMode: SceneMode;
  cleanView: boolean;
  selectedWaypointId: string | null;
  onSelectWaypoint: (id: string | null) => void;
}

export const WaypointsOverlay: React.FC<WaypointsOverlayProps> = ({
  sceneMode,
  cleanView,
  selectedWaypointId,
  onSelectWaypoint,
}) => {
  if (cleanView) return null;

  const waypoints = WAYPOINTS[sceneMode];
  const selectedWaypoint = waypoints.find((w) => w.id === selectedWaypointId);
  const isDusk = sceneMode === 'dusk';

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Floating Waypoint Pins */}
      {waypoints.map((wp) => {
        const isSelected = wp.id === selectedWaypointId;

        return (
          <div
            key={wp.id}
            className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
            onClick={() => {
              westernSynth.playLaserPing();
              onSelectWaypoint(isSelected ? null : wp.id);
            }}
            data-interactive="true"
          >
            {/* Outer Target Pulsing Ring */}
            <div
              className={`w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center relative ${
                isSelected
                  ? isDusk
                    ? 'border-[#ff4e00] bg-[#ff4e00]/20 shadow-[0_0_20px_#ff4e00]'
                    : 'border-[#00f2ff] bg-[#00f2ff]/20 shadow-[0_0_20px_#00f2ff]'
                  : isDusk
                  ? 'border-[#ff4e00]/50 hover:border-[#ff4e00] hover:bg-[#ff4e00]/10'
                  : 'border-[#00f2ff]/50 hover:border-[#00f2ff] hover:bg-[#00f2ff]/10'
              }`}
            >
              {/* Radar Ping Effect */}
              <div
                className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                  isDusk ? 'bg-[#ff4e00]' : 'bg-[#00f2ff]'
                }`}
              />

              {/* Number Label */}
              <span
                className={`text-[10px] font-mono font-bold ${
                  isDusk ? 'text-[#f2e8cf]' : 'text-[#00f2ff]'
                }`}
              >
                {wp.number}
              </span>

              {/* Crosshair Corner Indicators */}
              <div
                className={`absolute -top-1 w-2 h-[1px] ${
                  isDusk ? 'bg-[#ff4e00]' : 'bg-[#00f2ff]'
                }`}
              />
              <div
                className={`absolute -bottom-1 w-2 h-[1px] ${
                  isDusk ? 'bg-[#ff4e00]' : 'bg-[#00f2ff]'
                }`}
              />
              <div
                className={`absolute -left-1 h-2 w-[1px] ${
                  isDusk ? 'bg-[#ff4e00]' : 'bg-[#00f2ff]'
                }`}
              />
              <div
                className={`absolute -right-1 h-2 w-[1px] ${
                  isDusk ? 'bg-[#ff4e00]' : 'bg-[#00f2ff]'
                }`}
              />
            </div>

            {/* Hover Tooltip - Minimal Line Tag */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              <div className="bg-[#0c0505]/95 border border-[#f2e8cf]/20 px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest text-[#f2e8cf] backdrop-blur-md flex items-center gap-1.5 shadow-2xl">
                <Crosshair className="w-3 h-3 text-[#00f2ff]" />
                <span>{wp.title}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Selected Waypoint Spatial HUD Readout Overlay */}
      <AnimatePresence>
        {selectedWaypoint && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 left-6 right-6 md:left-12 md:right-auto md:max-w-xl pointer-events-auto"
          >
            {/* Seamless Spatial Reading Frame */}
            <div className="bg-[#0c0505]/90 backdrop-blur-2xl border border-[#f2e8cf]/20 p-6 md:p-8 rounded-2xl relative shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-[#f2e8cf]">
              {/* Top Accent Line */}
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
                  onSelectWaypoint(null);
                }}
                className="absolute top-4 right-4 p-2 text-[#f2e8cf]/60 hover:text-[#00f2ff] transition-colors rounded-full hover:bg-[#f2e8cf]/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Waypoint Telemetry Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isDusk
                        ? 'bg-[#ff4e00]/20 text-[#f2e8cf] border border-[#ff4e00]/50'
                        : 'bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/50'
                    }`}
                  >
                    NODE [{selectedWaypoint.number}]
                  </span>
                  <span className="text-[#f2e8cf]/40">•</span>
                  <span className="text-[#f2e8cf]/60 font-mono text-[11px]">
                    {selectedWaypoint.coordinates}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#f2e8cf] font-normal tracking-wide">
                    {selectedWaypoint.title}
                  </h2>
                  <p
                    className={`text-xs font-mono font-medium tracking-wider mt-0.5 ${
                      isDusk ? 'text-[#ff4e00]' : 'text-[#00f2ff]'
                    }`}
                  >
                    {selectedWaypoint.subtitle}
                  </p>
                </div>

                {/* Lore & Story Content */}
                <div className="space-y-3 pt-2 border-t border-[#f2e8cf]/15">
                  <p className="text-sm font-sans text-[#f2e8cf]/90 leading-relaxed font-light">
                    {selectedWaypoint.description}
                  </p>
                  <p className="text-xs font-sans text-[#f2e8cf] leading-relaxed font-light italic bg-[#f2e8cf]/5 p-3 rounded-lg border border-[#f2e8cf]/10">
                    "{selectedWaypoint.lore}"
                  </p>
                </div>

                {/* Spectral Frequency Status Footnote */}
                <div className="pt-3 flex items-center justify-between text-[10px] font-mono text-[#f2e8cf]/50 border-t border-[#f2e8cf]/15">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-[#00f2ff]" />
                    <span>FREQ: {selectedWaypoint.spectralFrequency}</span>
                  </div>
                  <button
                    onClick={() => onSelectWaypoint(null)}
                    className="text-[#00f2ff] hover:text-[#f2e8cf] flex items-center gap-1 transition-colors"
                  >
                    <span>RETURN TO FRONTIER</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
