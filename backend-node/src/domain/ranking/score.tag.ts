import type { FestivalTagVector, UserVector } from '../types.js';

export type TagWeights = {
  theme: number;
  companion: number;
  mood: number;
  time_visual: number;
  cost: number;
  crowded: number;
};

export const defaultTagWeights: TagWeights = {
  theme: 0.35,
  companion: 0.15,
  mood: 0.15,
  time_visual: 0.15,
  cost: 0.1,
  crowded: 0.1,
};

export function scoreTag(user: UserVector, fest: FestivalTagVector, w: TagWeights): number {
  let sTheme = 0;
  for (const key of Object.keys(user.theme) as Array<keyof UserVector['theme']>) {
    sTheme += user.theme[key] * fest.theme[key];
  }

  let sComp = 0;
  for (const key of Object.keys(user.companion) as Array<keyof UserVector['companion']>) {
    sComp += user.companion[key] * fest.companion[key];
  }

  const sScalar =
    w.mood * user.mood * fest.mood +
    w.time_visual * user.time_visual * fest.time_visual +
    w.cost * user.cost * fest.cost +
    w.crowded * user.crowded * fest.crowded;

  return w.theme * sTheme + w.companion * sComp + sScalar;
}
