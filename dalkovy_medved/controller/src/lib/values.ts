import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export type Values = {
  speed: number;
  turn: number;
  turnInPlace: boolean;
  toggleArms: boolean;
  autoHome: boolean;
};

export const values: Writable<Values> = writable({
  speed: 0,
  turn: 0,
  turnInPlace: false,
  toggleArms: false,
  autoHome: false,
});
