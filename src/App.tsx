import React, { useState, useEffect } from 'react';
import { SceneMode } from './types';
import { BackgroundLayer } from './components/BackgroundLayer';
import { MinimalHUD } from './components/MinimalHUD';
import { SpatialTitle } from './components/SpatialTitle';
import { WaypointsOverlay } from './components/WaypointsOverlay';
import { NarrativePanel } from './components/NarrativePanel';
import { ConceptSpecOverlay } from './components/ConceptSpecOverlay';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [sceneMode, setSceneMode] = useState<SceneMode>('dusk');
  const [cleanView, setCleanView] = useState(false);
  const [selectedWaypointId, setSelectedWaypointId] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax tilt and reticle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-zinc-950 font-sans text-zinc-100 select-none cursor-none">
      {/* Background Concept Artwork Layer */}
      <BackgroundLayer sceneMode={sceneMode} mousePos={mousePos} />

      {/* Top Borderless Minimal HUD */}
      <MinimalHUD
        sceneMode={sceneMode}
        onSceneChange={(mode) => {
          setSceneMode(mode);
          setSelectedWaypointId(null);
        }}
        cleanView={cleanView}
        onToggleCleanView={() => setCleanView(!cleanView)}
        selectedWaypointId={selectedWaypointId}
      />

      {/* Spatial Main Typography Title */}
      <SpatialTitle
        sceneMode={sceneMode}
        cleanView={cleanView}
        selectedWaypointId={selectedWaypointId}
      />

      {/* Interactive Concept Waypoints Overlay */}
      <WaypointsOverlay
        sceneMode={sceneMode}
        cleanView={cleanView}
        selectedWaypointId={selectedWaypointId}
        onSelectWaypoint={(id) => setSelectedWaypointId(id)}
      />

      {/* Narrative Chronicles Drawer */}
      <NarrativePanel sceneMode={sceneMode} cleanView={cleanView} />

      {/* Concept Spec & Visual Layer Tuner */}
      <ConceptSpecOverlay
        sceneMode={sceneMode}
        cleanView={cleanView}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        showParticles={showParticles}
        onToggleParticles={() => setShowParticles(!showParticles)}
      />

      {/* Custom Crosshair HUD Reticle Cursor */}
      <CustomCursor mousePos={mousePos} />
    </main>
  );
}
