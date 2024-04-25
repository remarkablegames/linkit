import { confetti } from '@tsparticles/confetti';
import Phaser from 'phaser';
import { render, Text } from 'phaser-jsx';

import { Button } from '../components';
import { key } from '../constants';

export class End extends Phaser.Scene {
  constructor() {
    super(key.scene.end);
  }

  create() {
    const { centerX, centerY } = this.cameras.main;

    render(
      <>
        <Text
          text="You Win!"
          x={centerX}
          y={centerY - 100}
          style={{
            color: 'black',
            fontSize: '36px',
          }}
          originX={0.5}
          originY={0.5}
        />

        <Button x={centerX} y={centerY + 100} onClick={this.restart}>
          Restart
        </Button>
      </>,
      this,
    );

    confetti('confetti');
  }

  private restart() {
    this.scene.start(key.scene.main, {
      currentLevel: 0,
    });
  }
}
