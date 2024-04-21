import Phaser from 'phaser';

import { key } from '../constants';
import { search } from '../helpers';

export class Boot extends Phaser.Scene {
  constructor() {
    super(key.scene.boot);
  }

  preload() {
    this.load.audio(key.audio.click, '/audio/drop_004.ogg');
    this.load.audio(key.audio.drop, '/audio/drop_002.ogg');
    this.load.audio(key.audio.error, '/audio/back_001.ogg');
    this.load.audio(key.audio.success, '/audio/confirmation_004.ogg');
  }

  create() {
    this.scene.start(key.scene.main, {
      levelNumber: Number(search.get('level')) || 0,
    });
  }
}
