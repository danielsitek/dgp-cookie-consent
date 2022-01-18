import { CONSENT_ID_TIMESTAMP_LENGTH } from '../config';

/**
 * Generate random ID in similar format like GMT's ClientID.
 *
 * @example randomClientId() => '5605280720.1642399486'
 * @returns {string} Generated random client ID.
 */
export const randomClientId = (length: number): string => {
  const start = 2;
  const fullLength = start + length;

  const random = Math.random().toFixed(fullLength).slice(start, fullLength);

  const timeString = (new Date()).getTime().toString().slice(0, CONSENT_ID_TIMESTAMP_LENGTH);

  return `${random}.${timeString}`;
};
