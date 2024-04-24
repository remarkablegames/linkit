import { type Level, levels } from './levels';

export type { Level };

export function getLevel(level: number): Level {
  return levels[level];
}
