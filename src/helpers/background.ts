const backgroundColors = [
  '#FFFAFA',
  '#F0FFF0',
  '#F5FFFA',
  '#F0FFFF',
  '#F0F8FF',
  '#F8F8FF',
  '#F5F5F5',
  '#FFF5EE',
  '#F5F5DC',
  '#FDF5E6',
  '#FFFAF0',
  '#FFFFF0',
  '#FAEBD7',
  '#FAF0E6',
  '#FFF0F5',
  '#FFE4E1',
];

export function getBackgroundColor() {
  return Phaser.Utils.Array.GetRandom(backgroundColors);
}
