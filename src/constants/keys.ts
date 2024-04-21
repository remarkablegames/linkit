const audio = {
  click: 'click',
  drop: 'drop',
  error: 'error',
  success: 'success',
};

const scene = {
  boot: 'boot',
  main: 'main',
} as const;

export const key = {
  audio,
  scene,
} as const;
