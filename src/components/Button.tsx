import type Phaser from 'phaser';
import { createRef, Text } from 'phaser-jsx';

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
  const { children, onClick, ...textProps } = props;
  const ref = createRef<Phaser.GameObjects.Text>();

  function onMouseOver() {
    const button = ref.current!;
    button.setColor(Color.darkslategray);
    button.setBackgroundColor(Color.ivory);
  }

  function onMouseOut() {
    const button = ref.current!;
    button.setColor(Color.ivory);
    button.setBackgroundColor(Color.darkslategray);
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
      ref={ref}
      style={{
        color: Color.ivory,
        fontFamily: 'monospace',
        fontSize: '20px',
        backgroundColor: Color.darkslategray,
        // @ts-expect-error padding
        padding: { x: 20, y: 10 },
      }}
      text={children}
    />
  );
}
