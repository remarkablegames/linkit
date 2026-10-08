const audio = {
  click: 'click',
  drop: 'drop',
  error: 'error',
  success: 'success',
  tick: 'tick',
};

const scene = {
  boot: 'boot',
  end: 'end',
  main: 'main',
  intro: 'intro',
} as const;

export const key = {
  audio,
  scene,
} as const;
