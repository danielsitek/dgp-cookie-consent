export function getDateUTCString(days: number): string {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  const utcString = date.toUTCString();

  return utcString;
}

export function getDateString(datetime?: string | number | Date): string {
  const date = datetime ? new Date(datetime) : new Date();

  return date.toJSON();
}
