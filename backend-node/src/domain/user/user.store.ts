import type { UserVector } from '../types.js';

export interface UserVectorStore {
  put(userId: string, vector: UserVector): Promise<void>;
  get(userId: string): Promise<UserVector | null>;
}

export class InMemoryUserVectorStore implements UserVectorStore {
  private readonly map = new Map<string, UserVector>();

  async put(userId: string, vector: UserVector): Promise<void> {
    this.map.set(userId, vector);
  }

  async get(userId: string): Promise<UserVector | null> {
    return this.map.get(userId) ?? null;
  }
}
