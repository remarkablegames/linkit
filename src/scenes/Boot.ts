import Phaser from 'phaser';

import { key } from '../constants';
import { search } from '../helpers';
import type { Level } from '../levels';

export class Boot extends Phaser.Scene {
  constructor() {
    super(key.scene.boot);
  }

  preload() {
    [
      [key.audio.click, 'drop_004'],
      [key.audio.drop, 'drop_002'],
      [key.audio.error, 'back_001'],
      [key.audio.success, 'confirmation_004'],
      [key.audio.tick, 'tick_001'],
    ].forEach(([key, sound]) => {
      this.load.audio(key, [`sounds/${sound}.ogg`, `sounds/${sound}.mp3`]);
    });
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
