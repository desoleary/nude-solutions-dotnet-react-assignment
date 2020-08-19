/* eslint-disable no-console */

/**
 * Prints given error to console if not in production env.
 *
 * @param error
 */
export const nonProdConsoleError = (error) => {
  const isNotProd = true; // in a real app this would be controlled via config settings
  if (isNotProd) console.log(error);
};
