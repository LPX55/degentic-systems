/**
 * Validation utilities
 */

/**
 * Checks if a string is a valid email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if a string is empty or only whitespace
 */
export function isEmpty(str: string): boolean {
  return str.trim().length === 0;
}

/**
 * Checks if a value is a valid number
 */
export function isNumber(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}