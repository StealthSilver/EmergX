const COLLAPSED_Y = 321.394;

type ReboundBlock = {
  outerTop: number;
  innerY: number;
  buildPath: (outerTop: number, innerY: number) => string;
};

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export const REBOUND_BLOCKS: ReboundBlock[] = [
  {
    outerTop: 152.52,
    innerY: 222.52,
    buildPath: (outerTop, innerY) =>
      `M634.196 ${outerTop}H846.378V535.131H634.196V${innerY}Z`,
  },
  {
    outerTop: 221.6,
    innerY: 277,
    buildPath: (outerTop, innerY) => `M423 ${outerTop}H635V535H423V${innerY}Z`,
  },
  {
    outerTop: 284.416,
    innerY: 330.52,
    buildPath: (outerTop, innerY) =>
      `M211.583 ${outerTop}H423.765V535.131H211.583V${innerY}Z`,
  },
  {
    outerTop: 355.52,
    innerY: 402.52,
    buildPath: (outerTop, innerY) =>
      `M0.275879 ${outerTop}H212.458V535.131H0.275879V${innerY}Z`,
  },
  {
    outerTop: 221.6,
    innerY: 276.52,
    buildPath: (outerTop, innerY) =>
      `M1058.23 ${outerTop}H846.052V535.131H1058.23V${innerY}Z`,
  },
  {
    outerTop: 284.416,
    innerY: 330.52,
    buildPath: (outerTop, innerY) =>
      `M1269.54 ${outerTop}H1057.36V535.131H1269.54V${innerY}Z`,
  },
  {
    outerTop: 355.52,
    innerY: 402.52,
    buildPath: (outerTop, innerY) =>
      `M1480.85 ${outerTop}H1268.67V535.131H1480.85V${innerY}Z`,
  },
];

export const REBOUND_BLOCK_OPACITY = [0.8, 0.8, 0.6, 0.4, 0.8, 0.6, 0.4] as const;

export function getReboundBlockPaths(progress: number) {
  return REBOUND_BLOCKS.map((block) => {
    const outerTop = lerp(COLLAPSED_Y, block.outerTop, progress);
    const innerY = lerp(COLLAPSED_Y, block.innerY, progress);
    return block.buildPath(outerTop, innerY);
  });
}
