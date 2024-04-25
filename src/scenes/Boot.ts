import Phaser from 'phaser';

import { key } from '../constants';
import { search } from '../helpers';
import type { Level } from '../levels';

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
    const data: Pick<Level, 'level'> = {
      level: Number(search.get('level')),
    };

    if (data.level) {
      this.scene.start(key.scene.main, data);
    } else {
      this.scene.start(key.scene.intro);
    }
  }
}
