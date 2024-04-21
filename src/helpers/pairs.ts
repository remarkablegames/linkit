export function getPairs<T>(array: T[]): T[][] {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  if (array.length < 3) {
    return [array];
  }

  return array.reduce(
    (previousValue: T[][], currentValue, index) =>
      previousValue.concat(
        array.slice(index + 1).map((value) => [currentValue, value]),
      ),
    [],
  );
}
