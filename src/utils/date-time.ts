export function getDateUTCString(days: number): string {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  return date.toUTCString();
}

export function getDateString(dateTime?: string | number | Date): string {
  const date = dateTime ? new Date(dateTime) : new Date();

  return date.toJSON();
}
