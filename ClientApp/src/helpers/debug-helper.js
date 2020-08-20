/* eslint-disable no-console */

import { isNotProd } from './env-helper';

/**
 * Prints given error to console if not in production env.
 *
 * @param error
 */
export const nonProdConsoleError = (error) => {
  if (isNotProd()) console.error(error);
};

/**
 * Prints given error to console if not in production env.
 *
 * @param msg
 */
export const nonProdConsoleLogger = (msg) => {
  if (isNotProd()) console.log(msg);
};
