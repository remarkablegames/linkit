import Phaser from 'phaser';

import { key } from '../constants';
import { Circle, Line } from '../gameobjects';
import { getBackgroundColor, getPairs } from '../helpers';
import { getLevel, type Level } from '../levels';

export class Main extends Phaser.Scene {
  levelNumber = 0;
  level!: Level;

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

    let start: Circle | null = null;

    this.input.on(
      'pointerdown',
      (_pointer: Phaser.Input.Pointer, currentlyOver: Circle[]) => {
        const circle = currentlyOver[0];

        if (circle) {
          // end line when clicked on circle
          if (start) {
            const line = this.getLine(start);

            // remove line when clicked on wrong color or circle with existing line
            if (start.color !== circle.color || circle.getData('line')) {
              start.setScale(1);
              start = null;
              this.removeLine(line);
              this.playSound(key.audio.drop);
              return;
            }

            line.end = circle;
            line.setTo(
              this.getCirclePosition('x', start),
              this.getCirclePosition('y', start),
              this.getCirclePosition('x', circle),
              this.getCirclePosition('y', circle),
            );

            line.setData('position', {
              x1: this.getCirclePosition('x', start),
              y1: this.getCirclePosition('y', start),
              x2: this.getCirclePosition('x', circle),
              y2: this.getCirclePosition('y', circle),
            });

            circle.setData('line', line);
            this.playSound(key.audio.click);

            if (this.checkSolution()) {
              this.playSound(key.audio.success);
              this.scene.restart({ levelNumber: this.levelNumber + 1 });
              return;
            }

            start.setScale(1);
            start = null;
            // no starting line
          } else {
            // recreate line if exists on circle
            let line = this.getLine(circle);
            if (line) {
              this.removeLine(line);
            }

            // start line when clicked on circle
            line = new Line(this, circle.color);
            line.start = circle;

            start = circle;
            start.setScale(1.5);
            start.setData('line', line);

            this.playSound(key.audio.click);
          }
        } else if (start) {
          // remove line when clicked outside
          const line = this.getLine(start);
          this.removeLine(line);
          this.playSound(key.audio.drop);

          start.setScale(1);
          start = null;
        }
      },
    );

    if (this.game.device.os.desktop) {
      this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
        if (start) {
          const line = this.getLine(start);
          line.setTo(
            this.getCirclePosition('x', start),
            this.getCirclePosition('y', start),
            pointer.x,
            pointer.y,
          );
        }
      });
    }
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
   * Gets circle X or Y position.
   *
   * @param circle - The circle.
   * @returns - The circle X or Y position.
   */
  private getCirclePosition(position: 'x' | 'y', circle: Circle) {
    return circle.parentContainer[position] + circle[position];
  }

  /**
   * Gets line associated with circle.
   *
   * @param circle - The circle.
   * @returns - The line.
   */
  private getLine(circle: Circle): Line {
    return circle.getData('line');
  }

  /**
   * Deletes line and removes it from group.
   *
   * @param line - The line.
   */
  private removeLine(line: Line) {
    Line.getGroup(this).remove(line);

    (['start', 'end'] as const).forEach((key) => {
      const circle = line[key];
      if (circle) {
        circle.setData('line');
      }
      line[key] = undefined;
    });

    line.destroy();
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
      .some((circle: Circle) => !circle.getData('line'));

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

      const position1 = lines[0].getData('position');
      const position2 = lines[1].getData('position');

      const line1 = new Phaser.Geom.Line(
        position1.x1,
        position1.y1,
        position1.x2,
        position1.y2,
      );

      const line2 = new Phaser.Geom.Line(
        position2.x1,
        position2.y1,
        position2.x2,
        position2.y2,
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
