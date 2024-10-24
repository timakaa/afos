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
export const DEFAULT_ENERGY_LIMIT_BASE_COST = 20000;
