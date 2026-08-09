export interface Waypoint {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  x: number; // percentage X on screen
  y: number; // percentage Y on screen
  description: string;
  lore: string;
  coordinates: string;
  spectralFrequency: string;
}

export interface StoryChapter {
  id: string;
  code: string;
  title: string;
  content: string;
  epoch: string;
}

export type SceneMode = 'dusk' | 'night' | 'pandemonium' | 'paradiso';

export interface AudioState {
  isPlaying: boolean;
  volume: number;
  mode: 'drone' | 'wind' | 'pulse';
}
