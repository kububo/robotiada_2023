import type { Values } from './types';

type Speeds = [number, number];

export const getSpeeds = (values: Values): Speeds => {
  const turnAmount = Math.abs(values.turn);
  const smallerSpeed = values.speed - values.speed * turnAmount;

  if (values.turnInPlace && values.turn < 0)
    return [-values.speed, values.speed];

  if (values.turnInPlace && values.turn > 0)
    return [values.speed, -values.speed];

  if (values.turn < 0) return [smallerSpeed, values.speed];
  if (values.turn > 0) return [values.speed, smallerSpeed];

  return [values.speed, values.speed];
};
