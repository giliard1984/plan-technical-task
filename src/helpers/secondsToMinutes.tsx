export const secondsToMinutes = (seconds: number): Record<string, number> => {
  const min = Math.floor(seconds / 60);
  const secondsRemaining = Math.floor(seconds % 60);

  return {
    min: min,
    sec: secondsRemaining,
  };
};
