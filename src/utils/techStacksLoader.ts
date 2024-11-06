/* eslint-disable */

import techStacksData from '../data/techStacks.json';

export interface TechStack {
  id: string;
  name: string;
}

export function loadTechStacks(): TechStack[] {
  return techStacksData.techStacks;
}
