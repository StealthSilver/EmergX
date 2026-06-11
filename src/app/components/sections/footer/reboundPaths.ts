/** Progress at which sui.io reaches full bar height (ScrollTrigger scrub range). */
export const REBOUND_PROGRESS_PEAK = 0.96;

type ReboundBlock = {
  collapsedY: number;
  finalY: number;
  buildPath: (y: number) => string;
};

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Sui.io rebound_blocks — flat bars (outerTop === innerY) that rise/fall
 * from a shared collapsed baseline into a stepped pyramid.
 */
export const REBOUND_BLOCKS: ReboundBlock[] = [
  {
    collapsedY: 321.3945428571428,
    finalY: 197.31177214285714,
    buildPath: (y) => `M634.196 ${y}H846.378V535.131H634.196V${y}Z`,
  },
  {
    collapsedY: 321.26354285714285,
    finalY: 256.3561771428571,
    buildPath: (y) => `M423 ${y}H635V535H423V${y}Z`,
  },
  {
    collapsedY: 321.3945428571428,
    finalY: 310.0828521428572,
    buildPath: (y) => `M211.583 ${y}H423.765V535.131H211.583V${y}Z`,
  },
  {
    collapsedY: 321.3945428571428,
    finalY: 370.87677214285713,
    buildPath: (y) => `M0.275879 ${y}H212.458V535.131H0.275879V${y}Z`,
  },
  {
    collapsedY: 321.3945428571428,
    finalY: 256.37517214285714,
    buildPath: (y) => `M1058.23 ${y}H846.052V535.131H1058.23V${y}Z`,
  },
  {
    collapsedY: 321.3945428571428,
    finalY: 310.0828521428572,
    buildPath: (y) => `M1269.54 ${y}H1057.36V535.131H1269.54V${y}Z`,
  },
  {
    collapsedY: 321.3945428571428,
    finalY: 370.87677214285713,
    buildPath: (y) => `M1480.85 ${y}H1268.67V535.131H1480.85V${y}Z`,
  },
];

export const REBOUND_BLOCK_OPACITY = [0.8, 0.8, 0.6, 0.4, 0.8, 0.6, 0.4] as const;

export function getReboundBlockPaths(progress: number) {
  const t = clamp(progress / REBOUND_PROGRESS_PEAK, 0, 1);

  return REBOUND_BLOCKS.map((block) => {
    const y = lerp(block.collapsedY, block.finalY, t);
    return block.buildPath(y);
  });
}
