import Phaser from 'phaser';

interface ToastOptions {
  duration?: number;
  depth?: number;
}

export class Toast extends Phaser.GameObjects.Container {
  duration: number;
  hideTimer: Phaser.Time.TimerEvent | null = null;
  isShowing = false;

  private background: Phaser.GameObjects.Rectangle;
  private label: Phaser.GameObjects.Text;
  private readonly baseY: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    options: ToastOptions = {},
  ) {
    super(scene, x, y);

    this.baseY = y;
    this.duration = options.duration ?? 1800;

    this.background = scene.add
      .rectangle(0, 0, 280, 48, 0x222222, 0.95)
      .setOrigin(0.5);

    this.label = scene.add
      .text(0, 0, '', {
        fontFamily: 'Arial',
        fontSize: 18,
        color: 'white',
        align: 'center',
        wordWrap: { width: 250 },
      })
      .setOrigin(0.5);

    this.add([this.background, this.label]);
    this.setDepth(options.depth ?? 1000);
    this.setScrollFactor(0);
    this.setVisible(false);
    this.setAlpha(0);

    scene.add.existing(this);
  }

  show(message: string, duration = this.duration): this {
    this.label.setText(message);

    const width = Math.min(Math.max(this.label.width + 30, 120), 300);
    this.background.setSize(width, this.label.height + 24);

    this.hideTimer?.remove();
    this.hideTimer = null;
    this.scene.tweens.killTweensOf(this);

    this.setPosition(this.x, this.baseY + 12);
    this.setVisible(true);
    this.setAlpha(0);
    this.isShowing = true;

    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      y: this.baseY,
      duration: 160,
      ease: 'Cubic.Out',
      onComplete: () => {
        if (!this.active) return;

        this.hideTimer = this.scene.time.delayedCall(duration, () => {
          this.hide();
        });
      },
    });

    return this;
  }

  hide(): this {
    if (!this.isShowing || !this.active) return this;

    this.isShowing = false;
    this.hideTimer?.remove();
    this.hideTimer = null;
    this.scene.tweens.killTweensOf(this);

    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.baseY - 8,
      duration: 140,
      ease: 'Cubic.In',
      onComplete: () => {
        if (this.active) {
          this.setVisible(false);
        }
      },
    });

    return this;
  }

  destroy(fromScene?: boolean): void {
    this.hideTimer?.remove();
    this.hideTimer = null;

    if (this.scene) {
      this.scene.tweens.killTweensOf(this);
    }

    super.destroy(fromScene);
  }
}
