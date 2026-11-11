import { CONSENT_ID_TIMESTAMP_LENGTH } from '@/config';

// Random decimal digits from a cryptographically secure source.
// Bytes 250–255 are skipped so that every digit is equally likely.
const randomDigits = (length: number): string => {
  let digits = '';

  while (digits.length < length) {
    for (const byte of crypto.getRandomValues(new Uint8Array(length))) {
      if (byte < 250 && digits.length < length) {
        digits += byte % 10;
      }
    }
  }

  return digits;
};

/**
 * Generate random ID in similar format like GMT's ClientID.
 *
 * @example randomClientId() => '5605280720.1642399486'
 * @returns {string} Generated random client ID.
 */
export const randomClientId = (length: number): string => {
  const timeString = new Date().getTime().toString().slice(0, CONSENT_ID_TIMESTAMP_LENGTH);

  return `${randomDigits(length)}.${timeString}`;
};
