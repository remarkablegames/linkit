import Phaser from 'phaser';

import * as scenes from './scenes';

new Phaser.Game({
  width: 600,
  height: 800,
  title: 'Linkit',
  url: import.meta.env.VITE_APP_HOMEPAGE,
  version: import.meta.env.VITE_APP_VERSION,
  scene: [
    scenes.Boot,
    ...Object.values(scenes).filter((scene) => scene !== scenes.Boot),
  ],
  transparent: true,
  scale: {
    mode: window.innerWidth < 600 ? Phaser.Scale.FIT : Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});
