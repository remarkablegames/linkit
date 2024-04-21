import Phaser from 'phaser';

import { search } from '../helpers';

export class Boot extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.audio('click', '/audio/drop_004.ogg');
    this.load.audio('drop', '/audio/drop_002.ogg');
    this.load.audio('error', '/audio/back_001.ogg');
    this.load.audio('success', '/audio/confirmation_004.ogg');
  }

  create() {
    this.scene.start('main', {
      levelNumber: Number(search.get('level')) || 0,
    });
  }
}
