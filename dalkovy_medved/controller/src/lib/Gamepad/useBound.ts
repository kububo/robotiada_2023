export const useBound = (bound: number) => {
  return (value: number) => {
    const absolute = Math.abs(value);

    if (absolute < bound) return 0;

    return value;
  };
};
