import Phaser from 'phaser';

import type { Circle } from './Circle';

const LINE_GROUP = 'LINE_GROUP';
const x = 0;
const y = 0;
const x1 = 0;
const y1 = 0;
const x2 = 0;
const y2 = 0;

export class Line extends Phaser.GameObjects.Line {
  start?: Circle;
  end?: Circle;
  position?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };

  constructor(scene: Phaser.Scene, color: number) {
    super(scene, x, y, x1, y1, x2, y2, color);
    scene.add.existing(this);

    this.setLineWidth(2);
    Line.getGroup(scene).add(this);
  }

  /**
   * Adds new line group to scene.
   *
   * @returns - Line group.
   */
  static setGroup(scene: Phaser.Scene) {
    const group = scene.add.group();
    scene.data.set(LINE_GROUP, group);
    return group;
  }

  /**
   * Gets line group from scene.
   *
   * @returns - Line group.
   */
  static getGroup(scene: Phaser.Scene) {
    return scene.data.get(LINE_GROUP) as Phaser.GameObjects.Group;
  }
}
