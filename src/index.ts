import Phaser from 'phaser';

import { Boot, Main } from './scenes';

new Phaser.Game({
  width: 600,
  height: 800,
  scene: [Boot, Main],
  transparent: true,
  scale: {
    mode: window.innerWidth < 600 ? Phaser.Scale.FIT : Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});
