import Phaser from 'phaser';

import { key } from '../constants';
import { Circle, Line } from '../gameobjects';
import { getBackgroundColor, getPairs } from '../helpers';
import { getLevel, type Level } from '../levels';

export class Main extends Phaser.Scene {
  private levelNumber = 0;
  private level!: Level;
  private start?: Circle;

  constructor() {
    super(key.scene.main);
  }

  init(data: { levelNumber: number }) {
    const level = getLevel(data.levelNumber);
    if (level) {
      this.levelNumber = data.levelNumber;
      this.level = level;
    } else {
      this.levelNumber = 0;
      this.level = getLevel(0);
    }
  }

  create() {
    this.setBackgroundColor();
    this.renderLevelTitle();
    this.renderCircles();
    Line.setGroup(this);

    this.input.on('pointerdown', this.pointerdown, this);
    if (this.game.device.os.desktop) {
      this.input.on('pointermove', this.pointermove, this);
    }
  }

  /**
   * Handles mouse pointerdown event.
   */
  private pointerdown(_pointer: Phaser.Input.Pointer, currentlyOver: Circle[]) {
    const circle = currentlyOver[0];

    if (circle) {
      // end line when clicked on circle
      if (this.start?.line) {
        // remove line when clicked on wrong color or circle with existing line
        if (this.start.color !== circle.color || circle.line) {
          this.start.setScale(1);
          this.start.line.remove();
          this.playSound(key.audio.drop);
          delete this.start;
          return;
        }

        this.start.line.end = circle;
        this.start.line.setTo(
          this.start.absoluteX,
          this.start.absoluteY,
          circle.absoluteX,
          circle.absoluteY,
        );

        this.start.line.position = {
          x1: this.start.absoluteX,
          y1: this.start.absoluteY,
          x2: circle.absoluteX,
          y2: circle.absoluteY,
        };

        circle.line = this.start.line;
        this.playSound(key.audio.click);

        if (this.checkSolution()) {
          this.playSound(key.audio.success);
          delete this.start;
          this.scene.restart({ levelNumber: this.levelNumber + 1 });
          return;
        }

        this.start.setScale(1);
        delete this.start;
        // no starting line
      } else {
        // recreate line if exists on circle
        let line = circle.line;
        if (line) {
          line.remove();
        }

        // start line when clicked on circle
        line = new Line(this, circle.color);
        line.start = circle;

        this.start = circle;
        this.start.setScale(1.5);
        this.start.line = line;

        this.playSound(key.audio.click);
      }
    } else if (this.start) {
      // remove line when clicked outside
      this.start.line?.remove();
      this.playSound(key.audio.drop);

      this.start.setScale(1);
      delete this.start;
    }
  }

  /**
   * Handles mouse pointermove event.
   */
  private pointermove(pointer: Phaser.Input.Pointer) {
    if (!this.start?.line) {
      return;
    }

    this.start.line.setTo(
      this.start.absoluteX,
      this.start.absoluteY,
      pointer.x,
      pointer.y,
    );
  }

  /**
   * Plays sound.
   */
  private playSound(key: string) {
    try {
      this.sound.play(key);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  /**
   * Sets background color on game and body.
   */
  private setBackgroundColor() {
    const backgroundColor = getBackgroundColor();
    this.cameras.main.setBackgroundColor(backgroundColor);
    document.body.style.backgroundColor = backgroundColor;
  }

  /**
   * Displays level title.
   */
  private renderLevelTitle() {
    this.add
      .text(
        this.cameras.main.centerX,
        32,
        this.levelNumber === 0 ? 'Linkit' : String(this.levelNumber),
        {
          color: '#000000',
          fontSize: '36px',
        },
      )
      .setOrigin(0.5);
  }

  /**
   * Adds circles.
   */
  private renderCircles() {
    Circle.setContainer(this);

    this.level.puzzle.forEach((rows) => {
      rows.forEach((color) => new Circle(this, color));
    });

    const container = Circle.getContainer(this);
    Phaser.Actions.GridAlign(container.getAll(), this.getGridOptions());

    const { centerX, centerY } = this.cameras.main;
    const { height, width } = container.getBounds();

    container.setX(centerX - width / 2);
    container.setY(centerY - height / 2);
  }

  /**
   * Gets grid config.
   *
   * @returns - Grid options.
   */
  private getGridOptions() {
    const { cellWidth, cellHeight, puzzle } = this.level;
    const columns = puzzle[0].length;
    const rows = puzzle.length;

    return {
      width: columns,
      height: rows,
      cellWidth,
      cellHeight,
    };
  }

  /**
   * Checks if every circle has a line.
   *
   * @returns - If puzzle is solved.
   */
  private checkSolution(): boolean {
    if (this.areLinesIntersecting()) {
      return false;
    }

    const circleMissingLine = Circle.getContainer(this)
      .getAll<Circle>()
      .filter((circle: Circle) => circle.active)
      .some((circle: Circle) => !circle.line);

    if (circleMissingLine) {
      return false;
    }

    return true;
  }

  /**
   * Checks if lines are intersecting.
   *
   * @returns - If lines are intersecting.
   */
  private areLinesIntersecting(): boolean {
    const lineIntersects = getPairs(
      Line.getGroup(this).getChildren() as Line[],
    ).some((lines) => {
      if (lines.length < 2) {
        return false;
      }

      const position1 = lines[0].position;
      const position2 = lines[1].position;

      const line1 = new Phaser.Geom.Line(
        position1?.x1,
        position1?.y1,
        position1?.x2,
        position1?.y2,
      );

      const line2 = new Phaser.Geom.Line(
        position2?.x1,
        position2?.y1,
        position2?.x2,
        position2?.y2,
      );

      return Phaser.Geom.Intersects.LineToLine(line1, line2);
    });

    if (lineIntersects) {
      this.playSound(key.audio.error);
      alert('Lines must not intersect.');
    }

    return lineIntersects;
  }
}
