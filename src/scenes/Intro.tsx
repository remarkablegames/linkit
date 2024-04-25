import Phaser from 'phaser';
import { render, Text } from 'phaser-jsx';

import { Button } from '../components';
import { key } from '../constants';

export class Intro extends Phaser.Scene {
  constructor() {
    super(key.scene.intro);
  }

  create() {
    const { width, height } = this.scale;
    const titleY = height / 2 - 100;
    const buttonY = height / 2 + 100;

    render(
      <>
        <Text
          text="Linkit"
          x={width / 2}
          y={titleY}
          style={{
            color: 'black',
            fontSize: '48px',
          }}
          originX={0.5}
          originY={0.5}
        />
        <Button x={width / 2} y={buttonY} onClick={this.startGame.bind(this)}>
          Start
        </Button>
      </>,
      this,
    );
  }

  startGame() {
    this.scene.start(key.scene.main, {
      currentLevel: 0,
    });
  }
}
