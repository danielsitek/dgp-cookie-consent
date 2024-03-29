import { getDateUTCString } from './date-time';

export type CookiesObject = Record<string, string>;

export function getCookies(): CookiesObject {
  const cookies: CookiesObject = {};

  document.cookie.split(';').forEach((pair) => {
    const row = pair.trim();
    const name = row.split('=')[0];
    const data = row.replace(`${name}=`, '');

    cookies[name] = data;
  });

  return cookies;
}

export function getCookieByName(name: string): string | undefined {
  const cookies = getCookies();

  if (!Object.keys(cookies).includes(name)) {
    // console.debug(`No cookie "${name}" found`);
    return undefined;
  }

  return cookies[name];
}

export function setCookie(name: string, data: string, days?: number): string {
  const cookieData = [`${name}=${data}`, 'path=/', 'Secure', 'SameSite=Lax'];

  if (days) {
    const utcString = getDateUTCString(days);
    cookieData.push(`expires=${utcString}`);
  }

  const cookiesString = cookieData.join('; ');

  document.cookie = cookiesString;

  return cookiesString;
}
