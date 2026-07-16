export function milisecondsToFormat(totalMilis: number) {
  const totalSeconds = totalMilis / 1000;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
