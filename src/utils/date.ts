export function convertDurationToTimeString(durationInSeconds: number): string {
  const seconds = durationInSeconds % 60;
  const minutesLeft = Math.floor(durationInSeconds / 60);
  const minutes = minutesLeft % 60;
  const hours = Math.floor(minutesLeft / 60);

  const timeComponents = [hours, minutes, seconds];

  const timeString = timeComponents
    .map((unit) => unit.toString().padStart(2, '0'))
    .join(':');

  return timeString;
}
