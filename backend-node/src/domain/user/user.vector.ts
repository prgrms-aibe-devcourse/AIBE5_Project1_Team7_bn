import type { TagCompanion, TagTheme, UserVector } from '../types.js';
import { clamp01, normalizeLikert } from './normalization.js';

export type SurveyInput = {
  mood: number; // 1-5
  cost: number; // 1-5
  timeVisual: number; // 1-5
  crowded: number; // 1-5
  theme: TagTheme[];
  companion: TagCompanion;
};

const ALL_THEMES: TagTheme[] = ['music', 'food', 'nature', 'traditional', 'art'];
const ALL_COMPANIONS: TagCompanion[] = ['family', 'couple', 'solo', 'friends', 'pet'];

export function buildUserVector(input: SurveyInput): UserVector {
  const themeWeights: Record<TagTheme, number> = {
    music: 0,
    food: 0,
    nature: 0,
    traditional: 0,
    art: 0,
  };

  const companionWeights: Record<TagCompanion, number> = {
    family: 0,
    couple: 0,
    solo: 0,
    friends: 0,
    pet: 0,
  };

  const selectedThemes = Array.from(new Set(input.theme));
  const perTheme = selectedThemes.length > 0 ? 1 / selectedThemes.length : 0;
  for (const t of selectedThemes) {
    themeWeights[t] = clamp01(perTheme);
  }

  if (!ALL_COMPANIONS.includes(input.companion)) {
    throw new Error('Invalid companion selection');
  }
  companionWeights[input.companion] = 1;

  // keep deterministic normalization
  return {
    theme: themeWeights,
    companion: companionWeights,
    mood: normalizeLikert(input.mood),
    time_visual: normalizeLikert(input.timeVisual),
    cost: normalizeLikert(input.cost),
    crowded: normalizeLikert(input.crowded),
  };
}

export function emptyUserVector(): UserVector {
  const theme: Record<TagTheme, number> = {
    music: 0,
    food: 0,
    nature: 0,
    traditional: 0,
    art: 0,
  };
  const companion: Record<TagCompanion, number> = {
    family: 0,
    couple: 0,
    solo: 0,
    friends: 0,
    pet: 0,
  };

  // reference ALL_THEMES to prevent drift
  for (const t of ALL_THEMES) theme[t] = 0;

  return { theme, companion, mood: 0, time_visual: 0, cost: 0, crowded: 0 };
}
