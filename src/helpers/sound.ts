import type Phaser from 'phaser';

/**
 * Plays sound.
 */
export function playSound(key: string, scene: Phaser.Scene) {
  try {
    scene.sound.play(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
