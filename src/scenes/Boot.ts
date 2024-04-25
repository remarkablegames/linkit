import Phaser from 'phaser';

import { key } from '../constants';
import { search } from '../helpers';

export class Boot extends Phaser.Scene {
  constructor() {
    super(key.scene.boot);
  }

  preload() {
    this.load.audio(
      key.audio.click,
      new URL('../audio/drop_004.ogg', import.meta.url).href,
    );

    this.load.audio(
      key.audio.drop,
      new URL('../audio/drop_002.ogg', import.meta.url).href,
    );

    this.load.audio(
      key.audio.error,
      new URL('../audio/back_001.ogg', import.meta.url).href,
    );

    this.load.audio(
      key.audio.success,
      new URL('../audio/confirmation_004.ogg', import.meta.url).href,
    );
  }

  create() {
    const currentLevel = Number(search.get('level'));
    if (currentLevel) {
      this.scene.start(key.scene.main, { currentLevel });
    } else {
      this.scene.start(key.scene.intro);
    }
  }
}
