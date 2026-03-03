export const formatTimestamp = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const calculateTimeFromClick = (
  clientX: number,
  elementRect: DOMRect,
  duration: number
): number => {
  const x = clientX - elementRect.left;
  const percentage = Math.max(0, Math.min(1, x / elementRect.width));
  return percentage * duration;
};
