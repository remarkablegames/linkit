import Phaser from 'phaser';
import { render } from 'phaser-jsx';

import { Button } from '../components';
import { key } from '../constants';

export class End extends Phaser.Scene {
  constructor() {
    super(key.scene.end);
  }

  create() {
    const { centerX, centerY } = this.cameras.main;

    render(
      <Button x={centerX} y={centerY} onClick={this.restart}>
        Restart
      </Button>,
      this,
    );
  }

  private restart() {
    this.scene.start(key.scene.main, {
      currentLevel: 0,
    });
  }
}
