import { tierStandard } from '@/data/AlgorithmTier';

export const getTierName = (tierLevel: number): string => {
  return tierStandard.find((tier) => tier.level === tierLevel)?.name || 'unrated';
};
