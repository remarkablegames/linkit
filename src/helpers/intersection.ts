import type { Line } from '../gameobjects';
import { getPairs } from './pairs';

/**
 * Checks if lines are intersecting.
 *
 * @param lines - The lines.
 * @returns - Whether lines are intersecting.
 */
export function areLinesIntersecting(lines: Line[]): boolean {
  const lineIntersects = getPairs(lines).some((lines) => {
    if (lines.length < 2) {
      return false;
    }

    const position1 = lines[0].position;
    const position2 = lines[1].position;

    const line1 = new Phaser.Geom.Line(
      position1?.x1,
      position1?.y1,
      position1?.x2,
      position1?.y2,
    );

    const line2 = new Phaser.Geom.Line(
      position2?.x1,
      position2?.y1,
      position2?.x2,
      position2?.y2,
    );

    return Phaser.Geom.Intersects.LineToLine(line1, line2);
  });

  return lineIntersects;
}
