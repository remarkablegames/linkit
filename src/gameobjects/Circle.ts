import Phaser from 'phaser';

import { _ } from '../constants';
import type { Line } from './Line';

const CIRCLE_CONTAINER = 'CIRCLE_CONTAINER';
const x = 0;
const y = 0;
const radius = 16;
const startAngle = 0;
const endAngle = 360;
const anticlockwise = false;

export class Circle extends Phaser.GameObjects.Arc {
  color: number;
  line?: Line;

  constructor(scene: Phaser.Scene, color: number) {
    super(scene, x, y, radius, startAngle, endAngle, anticlockwise, color);
    scene.add.existing(this);

    this.color = color;
    const hasColor = color !== _;

    this.setOrigin(0.5)
      .setInteractive({
        useHandCursor: true,
      })
      .setActive(hasColor)
      .setVisible(hasColor);

    Circle.getContainer(scene).add(this);
  }

  /**
   * Adds new circle container to scene.
   *
   * @returns - Circle container.
   */
  static setContainer(scene: Phaser.Scene) {
    const container = scene.add.container();
    scene.data.set(CIRCLE_CONTAINER, container);
    return container;
  }

  /**
   * Gets circle container from scene.
   *
   * @returns - Circle container.
   */
  static getContainer(scene: Phaser.Scene) {
    return scene.data.get(CIRCLE_CONTAINER) as Phaser.GameObjects.Container;
  }
}
