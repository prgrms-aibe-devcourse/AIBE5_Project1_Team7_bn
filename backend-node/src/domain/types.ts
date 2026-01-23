export type TagTheme = 'music' | 'food' | 'nature' | 'traditional' | 'art';
export type TagCompanion = 'family' | 'couple' | 'solo' | 'friends' | 'pet';

export type FestivalTagVector = {
  theme: Record<TagTheme, number>;
  companion: Record<TagCompanion, number>;
  mood: number;
  time_visual: number;
  cost: number;
  crowded: number;
};

export type UserVector = FestivalTagVector;

export type Festival = {
  id: string;
  name: string;
  description: string;
  dateISO: string; // YYYY-MM-DD
  distanceKm?: number;
  isFree?: boolean;
  tags?: FestivalTagVector;
  embedding?: number[];
};
