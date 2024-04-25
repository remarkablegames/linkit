import { levels } from './levels';

export interface Level {
  level: number;
  cellWidth: number;
  cellHeight: number;
  puzzle: number[][];
}

export function getLevel(level: number): Level | undefined {
  const currentLevel = levels[level];

  if (!currentLevel) {
    return undefined;
  }

  return {
    ...currentLevel,
    level,
  };
}
