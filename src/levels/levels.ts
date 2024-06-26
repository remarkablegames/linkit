import { _, B, G, K, L, M, N, O, P, R, S, V } from '../constants';
import type { Level } from './index';

export const levels: Omit<Level, 'level'>[] = [
  // 0
  {
    cellWidth: 200,
    cellHeight: 200,
    puzzle: [[R, R]],
  },

  // 1
  {
    cellWidth: 200,
    cellHeight: 200,
    puzzle: [
      [R, K],
      [R, K],
    ],
  },

  // 2
  {
    cellWidth: 100,
    cellHeight: 100,
    puzzle: [
      [_, K, _],
      [R, _, R],
      [R, _, R],
      [_, K, _],
    ],
  },

  // 3
  {
    cellWidth: 75,
    cellHeight: 75,
    puzzle: [
      [O, _, _, _, _],
      [_, _, B, _, _],
      [_, B, _, B, _],
      [_, _, B, _, _],
      [_, _, _, _, O],
    ],
  },

  // 4
  {
    cellWidth: 75,
    cellHeight: 75,
    puzzle: [
      [B, B, B, R],
      [R, B, B, R],
      [R, R, R, B],
      [B, B, R, R],
    ],
  },

  // 5
  {
    cellWidth: 75,
    cellHeight: 75,
    puzzle: [
      [B, _, _, _, _, _],
      [_, _, R, _, B, _],
      [_, _, _, R, R, _],
      [_, B, R, _, _, _],
      [_, R, _, B, _, _],
      [_, _, _, _, R, _],
    ],
  },

  // 6
  {
    cellWidth: 75,
    cellHeight: 75,
    puzzle: [
      [G, _, _, _, _, G],
      [_, _, R, G, _, _],
      [G, _, _, _, _, R],
      [_, _, G, R, _, _],
      [R, _, _, _, _, G],
    ],
  },

  // 7
  {
    cellWidth: 65,
    cellHeight: 65,
    puzzle: [
      [R, _, _, _, _, _, _, _, _],
      [_, _, R, _, _, _, _, _, R],
      [_, G, _, _, _, _, R, _, _],
      [_, _, _, _, B, G, _, _, _],
      [R, _, B, _, _, _, B, _, _],
      [_, _, _, _, G, _, _, _, _],
      [_, _, G, _, R, _, _, _, B],
    ],
  },

  // 8
  {
    cellWidth: 75,
    cellHeight: 70,
    puzzle: [
      [K, _, K, _, _, K, N],
      [R, B, G, K, _, _, _],
      [_, K, _, G, _, _, _],
      [_, N, _, R, K, _, N],
      [_, _, _, B, _, _, _],
      [_, _, _, B, _, _, R],
      [R, N, G, _, B, _, _],
      [_, _, _, _, _, _, G],
    ],
  },

  // 9
  {
    cellWidth: 75,
    cellHeight: 70,
    puzzle: [
      [R, _, _, R, R, _, B],
      [G, _, B, K, _, R, _],
      [_, _, G, B, _, _, B],
      [B, R, _, _, _, K, _],
      [_, _, B, _, R, _, R],
      [G, _, _, G, _, _, _],
      [_, _, K, _, R, _, K],
      [K, _, _, _, _, K, _],
    ],
  },

  // 10
  {
    cellWidth: 50,
    cellHeight: 50,
    puzzle: [
      [B, _, _, _, V, _, _, _, V, _, _, V],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, B, _, _, G, _, _, _, G, _, _],
      [_, _, V, _, _, P, _, _, _, _, _, _],
      [_, _, _, _, _, _, L, _, O, _, _, _],
      [B, _, _, _, _, _, B, _, _, _, O, _],
      [_, O, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, P, B, L, R, _, _, L],
      [S, _, O, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, R],
      [_, _, B, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, S, _, _, M, _, M, _],
      [_, _, L, _, _, _, _, _, _, _, _, _],
      [S, _, _, K, _, _, _, K, _, S, _, _],
    ],
  },

  // 11
  {
    cellWidth: 50,
    cellHeight: 50,
    puzzle: [
      [_, _, _, _, V, _, _, _, V, _, _, V],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, B, _, _, G, _, _, _, G, _, _],
      [_, _, V, _, _, K, _, _, _, _, _, _],
      [_, _, _, _, _, _, L, _, O, _, _, _],
      [B, _, _, _, B, _, B, _, _, _, O, _],
      [_, O, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, K, B, L, R, _, _, L],
      [S, _, O, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, M, R],
      [_, _, B, _, _, _, M, _, _, _, _, _],
      [_, _, _, _, _, S, _, _, M, _, M, _],
      [_, _, L, _, _, _, _, _, _, _, _, _],
      [S, _, _, K, _, _, _, K, _, S, _, _],
    ],
  },

  // 12
  {
    cellWidth: 50,
    cellHeight: 50,
    puzzle: [
      [K, _, G, _, _, _, _, _, _, K, _, _],
      [_, _, _, K, _, _, P, _, _, _, _, _],
      [K, _, _, _, _, _, _, _, G, _, _, _],
      [_, _, _, O, _, _, _, _, B, _, G, _],
      [_, _, _, _, _, S, _, _, _, _, _, _],
      [_, G, _, _, _, _, P, _, _, _, _, O],
      [R, _, _, _, O, _, _, _, _, _, _, _],
      [_, B, _, _, _, B, R, O, _, _, _, G],
      [R, _, _, _, S, _, _, _, _, _, _, _],
      [_, _, _, B, _, _, _, _, _, S, _, K],
      [_, _, R, O, _, B, G, _, _, _, _, _],
      [_, _, K, G, _, _, _, S, _, _, _, _],
      [K, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, O, _, _, G, _, _, B, _, _, K],
    ],
  },
];
