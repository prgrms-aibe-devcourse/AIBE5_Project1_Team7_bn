import type { Festival, FestivalTagVector, TagCompanion, TagTheme } from '../types.js';

type FestivalTagVectorInput = {
  theme?: Partial<Record<TagTheme, number>>;
  companion?: Partial<Record<TagCompanion, number>>;
  mood?: number;
  time_visual?: number;
  cost?: number;
  crowded?: number;
};

const tag = (t: FestivalTagVectorInput): FestivalTagVector => ({
  theme: {
    music: 0,
    food: 0,
    nature: 0,
    traditional: 0,
    art: 0,
    ...(t.theme ?? {}),
  },
  companion: {
    family: 0,
    couple: 0,
    solo: 0,
    friends: 0,
    pet: 0,
    ...(t.companion ?? {}),
  },
  mood: t.mood ?? 0,
  time_visual: t.time_visual ?? 0,
  cost: t.cost ?? 0,
  crowded: t.crowded ?? 0,
});

export const sampleFestivals: Festival[] = [
  {
    id: 'fest_001',
    name: 'Busan Night Food Festival',
    description: 'Night food market with local cuisine and live performances.',
    dateISO: '2026-02-10',
    distanceKm: 120,
    isFree: true,
    tags: tag({
      theme: { food: 0.9, music: 0.4 },
      companion: { couple: 0.7, friends: 0.6 },
      mood: 0.7,
      time_visual: 0.8,
      cost: 0.3,
      crowded: 0.7,
    }),
  },
  {
    id: 'fest_002',
    name: 'Mountain Nature Walk',
    description: 'Guided nature trail and scenic viewpoints.',
    dateISO: '2026-02-15',
    distanceKm: 80,
    isFree: false,
    tags: tag({
      theme: { nature: 0.95 },
      companion: { family: 0.4, solo: 0.5 },
      mood: 0.4,
      time_visual: 0.9,
      cost: 0.6,
      crowded: 0.2,
    }),
  },
];
