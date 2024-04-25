import Phaser from 'phaser';
import { render, Text } from 'phaser-jsx';

import { Button } from '../components';
import { key } from '../constants';
import { playSound } from '../helpers';
import type { Level } from '../levels';

export class Intro extends Phaser.Scene {
  constructor() {
    super(key.scene.intro);
  }

  create() {
    const { centerX, centerY } = this.cameras.main;

    render(
      <>
        <Text
          text="Linkit"
          x={centerX}
          y={centerY - 100}
          style={{
            color: 'black',
            fontSize: '48px',
          }}
          originX={0.5}
          originY={0.5}
        />

        <Button x={centerX} y={centerY + 100} onClick={this.startGame}>
          Start
        </Button>
      </>,
      this,
    );
  }

  private startGame() {
    playSound(key.audio.success, this);
    const data: Pick<Level, 'level'> = { level: 0 };
    this.scene.start(key.scene.main, data);
  }
}
