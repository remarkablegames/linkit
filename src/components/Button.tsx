import type Phaser from 'phaser';
import { Text, useScene } from 'phaser-jsx';

import { key } from '../constants';
import { playSound } from '../helpers';

interface Props {
  children: string;
  onClick?: () => void;
  x?: number;
  y?: number;
}

enum Color {
  darkslategray = '#2f4f4f',
  ivory = '#fffff0',
}

export function Button(props: Props) {
  const scene = useScene();
  const { children, onClick, ...textProps } = props;

  function onMouseOver(_pointer: unknown, button: Phaser.GameObjects.Text) {
    playSound(key.audio.tick, scene);
    button.setScale(1.1);
  }

  function onMouseOut(_pointer: unknown, button: Phaser.GameObjects.Text) {
    button.setScale(1);
  }

  return (
    <Text
      {...textProps}
      input={{ cursor: 'pointer' }}
      onPointerDown={onClick}
      onPointerOver={onMouseOver}
      onPointerOut={onMouseOut}
      originX={0.5}
      originY={0.5}
      style={{
        color: Color.ivory,
        fontFamily: 'monospace',
        fontSize: '20px',
        backgroundColor: Color.darkslategray,
        padding: { x: 20, y: 10 },
      }}
      text={children}
    />
  );
}
