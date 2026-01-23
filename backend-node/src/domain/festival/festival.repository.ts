import type { Festival } from '../types.js';

export interface FestivalRepository {
  listAll(): Promise<Festival[]>;
}

export class InMemoryFestivalRepository implements FestivalRepository {
  private readonly festivals: Festival[];

  constructor(festivals: Festival[]) {
    this.festivals = festivals;
  }

  async listAll(): Promise<Festival[]> {
    return this.festivals;
  }
}
