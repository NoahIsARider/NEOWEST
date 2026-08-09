import { Waypoint, StoryChapter, SceneMode } from '../types';
import duskImg from '../assets/images/retro_western_bg_1786200337572.jpg';
import nightImg from '../assets/images/retro_western_night_1786200351930.jpg';
import pandemoniumImg from '../assets/images/pandemonium_futurism_1786250537353.jpg';
import paradisoImg from '../assets/images/paradiso_futurism_1786250554189.jpg';

export const BACKGROUND_IMAGES: Record<SceneMode, string> = {
  dusk: duskImg,
  night: nightImg,
  pandemonium: pandemoniumImg,
  paradiso: paradisoImg,
};

export const WAYPOINTS: Record<SceneMode, Waypoint[]> = {
  dusk: [
    {
      id: 'sun_core',
      number: '01',
      title: 'SOLAR DUST REACTOR',
      subtitle: 'Copper Helios & Electronic Afterglow',
      x: 38,
      y: 28,
      coordinates: '36.57°N, 118.29°W • Elev 1,420m',
      spectralFrequency: '540 THz [Ochre Amber]',
      description: 'A monolithic cybernetic star sinking behind the copper red canyon monoliths, radiating thermal frequencies across the silicon sands.',
      lore: 'Along the twilight threshold of the western expanse, the incandescent geometric star hums softly. Ancient steam pipes and optical relays stretch across scorching ravines, feeding ionic warmth into the barren frontier.'
    },
    {
      id: 'mesa_monolith',
      number: '02',
      title: 'CHROMATIC MONOLITH',
      subtitle: 'Crystalline Mesa & High-Frequency Gratings',
      x: 68,
      y: 42,
      coordinates: '36.62°N, 118.15°W • Vector M-09',
      spectralFrequency: '410 THz [Burnt Rust]',
      description: 'Massive crimson canyon formations imbued with ancient silicon matrices and rusted memory array nodes.',
      lore: 'Eons of wind-sculpted sandstone conceal oxidized memory arrays. Red dust sweeps past the mesa edge like laser beams skimming across a photolithography wafer.'
    },
    {
      id: 'cyber_cactus',
      number: '03',
      title: 'SILICON CACTUS MATRIX',
      subtitle: 'Chrome Saguaro & Fiber Antenna Array',
      x: 22,
      y: 64,
      coordinates: '36.48°N, 118.34°W • Sector S-03',
      spectralFrequency: '680 THz [Neon Cyan]',
      description: 'Synthesized flora engineered to absorb atmospheric cosmic noise and convert desert winds into audio signals.',
      lore: 'Chromium needles capture high-frequency radio waves drifting on desert gusts. Before dusk falls, they pulse with faint luminescent cyan, relaying the drifter’s micro-signals into the vault of heaven.'
    },
    {
      id: 'horizon_wire',
      number: '04',
      title: 'NEON HORIZON VECTOR',
      subtitle: 'Vector Skyline & Optical Pulses',
      x: 82,
      y: 72,
      coordinates: '36.39°N, 118.02°W • Meridian West',
      spectralFrequency: '720 THz [Electric Blue]',
      description: 'The geometric vanishing point where the endless prairie meets the grid-aligned horizon of the neon wasteland.',
      lore: 'The horizon is no longer a physical boundary, but a digitized threshold sliced by minimalist wireframes. Here, sunset shadows and rider silhouettes merge into a silent hymn.'
    }
  ],
  night: [
    {
      id: 'cyan_lunar',
      number: '01',
      title: 'CYAN LUNAR TRANSMITTER',
      subtitle: 'Luminous Crescent & Undercurrent Pulse',
      x: 52,
      y: 22,
      coordinates: '36.55°N, 118.28°W • Night Vector',
      spectralFrequency: '620 THz [Laser Aqua]',
      description: 'A neon wireframe moon hanging suspended above the dark obsidian valley, emitting rhythmic pulse waves.',
      lore: 'When midnight fully engulfs the wild frontier, a cyan geometric orb ascends above silent mountain crests. Its icy glow casts a haunting radiance across the sleeping metallic plateau.'
    },
    {
      id: 'obsidian_mesa',
      number: '02',
      title: 'OBSIDIAN SHADOW RIDGE',
      subtitle: 'Dark Matter Mesa & Serrated Skyline',
      x: 30,
      y: 52,
      coordinates: '36.60°N, 118.20°W • Shadow Sector',
      spectralFrequency: '220 THz [Deep Indigo]',
      description: 'Geometric mountain contours cutting cleanly through the deep indigo night atmosphere like sharp obsidian edges.',
      lore: 'Obsidian ridges slice through the night sky as unseen data streams course silently beneath the canyon floor. The desert air is crisp and cool, reverberating with the faint hum of vintage analog signals.'
    },
    {
      id: 'dust_cyclone',
      number: '03',
      title: 'WIRE FRAME DUST DEVIL',
      subtitle: 'Optical Vortex & Micro-Particle Rhythm',
      x: 75,
      y: 65,
      coordinates: '36.42°N, 118.11°W • Vortex N-02',
      spectralFrequency: '580 THz [Luminous Gold]',
      description: 'Electromagnetic whirlwinds stirring luminous particles across the quiet expanse of the desert plateau.',
      lore: 'Night winds lift glowing microscopic particles into the air. In this minimalist field of vision, spiraling dust devils execute a silent digital choreography across the badlands.'
    }
  ],
  pandemonium: [
    {
      id: 'pandemonium_vault',
      number: 'P-01',
      title: 'INFERNAL VAULT',
      subtitle: 'Subterranean Obsidian Monoliths',
      x: 48,
      y: 32,
      coordinates: '36.90°N, 118.88°W • Vault Tier-9',
      spectralFrequency: '920 THz [Infernal Crimson]',
      description: 'Towering circuit-engraved obsidian columns fused with cyberpunk geometry and glowing molten conduits.',
      lore: 'Deep beneath desert fault lines lies an ancient fiery engine where molten copper conduits pulse with cybernetic electricity.'
    },
    {
      id: 'molten_abyss',
      number: 'P-02',
      title: 'MOLTEN VECTOR GRID',
      subtitle: 'Crimson Currents & Fiery Wireframes',
      x: 72,
      y: 64,
      coordinates: '36.82°N, 118.70°W • Vector C-04',
      spectralFrequency: '850 THz [Copper Neon]',
      description: 'Minimalist wireframe arrays bridging cavernous abyss formations surrounded by dark atmospheric mist.',
      lore: 'Fiery crimson light arrays slice through subterranean shadows as ancient architectural monoliths reflect the endless infernal hum.'
    }
  ],
  paradiso: [
    {
      id: 'paradiso_sphere',
      number: 'E-01',
      title: 'DIVINE CELESTIAL SPHERES',
      subtitle: 'Luminous Cybernetic Rings',
      x: 50,
      y: 28,
      coordinates: '37.10°N, 118.05°W • Zenith Realm',
      spectralFrequency: '1040 THz [Luminous Gold & Cyan]',
      description: 'Concentric rings of sacred gold and cyan energy suspended over a transcendent cybernetic realm.',
      lore: 'Luminous vector rays cut through celestial space, channeling infinite light and sacred geometry into the frontier.'
    },
    {
      id: 'crystal_sanctuary',
      number: 'E-02',
      title: 'CRYSTALLINE MATRIX',
      subtitle: 'Ivory Vector Spires & Quantum Energy',
      x: 28,
      y: 62,
      coordinates: '37.15°N, 118.12°W • Vector Zenith',
      spectralFrequency: '1120 THz [Celestial White]',
      description: 'Sleek crystalline obsidian and ivory structures radiating transcendent quantum luminescence.',
      lore: 'A sacred digital sanctuary where code dissolves into pure light and static echoes become harmonious celestial hymns.'
    }
  ]
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chap_1',
    code: 'EPOCH 01',
    title: 'THE SILICON DRIFTER',
    epoch: '1888 // 2088 ANOMALY',
    content: 'In a frontier stripped of clocks, time is measured not in hours, but in the rate red dust condenses over vacuum tubes. A lone wanderer atop a cybernetic steed rides through silent red-rock canyons, cloak fluttering against static-charged winds. No spoken words remain—only the faint hum of sawtooth waves over vintage radio.'
  },
  {
    id: 'chap_2',
    code: 'EPOCH 02',
    title: 'SYNTHESIS AT DUSK',
    epoch: 'SUNSET PROTOCOL',
    content: 'Dusk is a sacred ritual for minimalists. As the colossal geometric sun dips beneath the horizon, the world collapses into three core hues: oxidized copper red, withered prairie ochre, and the electric spark of fiber optics piercing airborne dust. No complex rules govern this land—only the vector horizon guiding the way.'
  },
  {
    id: 'chap_3',
    code: 'EPOCH 03',
    title: 'NOCTURNE OVER BADLANDS',
    epoch: 'OBSIDIAN ECHO',
    content: 'When night descends, the legends of the Wild West dissolve into cool waveform displays. Subterranean power grids hum softly beneath sandstone strata as a wireframe moon hangs in void space. Leaning against an abandoned transmission spire, the drifter polishes a chrome revolver—loaded not with lead, but with compressed light beams and memory fragments.'
  }
];

export const RETRO_QUOTE = {
  quoteEn: "Where analog dust settles on digital stone, the frontier lives forever in minimalist silence.",
  quoteZh: "An abstract exploration of retro-futuristic Western horizons and spatial wireframes."
};
