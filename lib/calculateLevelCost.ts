export function calculateLevelCost({
  level,
  baseCost,
}: {
  level: number;
  baseCost: number;
}): number {
  return Math.floor(baseCost * Math.pow(2, level - 1));
}

export const DEFAULT_MULTITAP_BASE_COST = 15000;
