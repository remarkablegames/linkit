import Phaser from 'phaser';
import { render, Text } from 'phaser-jsx';

import { Button } from '../components';
import { key } from '../constants';

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
        <Button x={centerX} y={centerY} onClick={this.startGame}>
          Start
        </Button>
      </>,
      this,
    );
  }

  private startGame() {
    this.scene.start(key.scene.main, {
      currentLevel: 0,
    });
  }
}
