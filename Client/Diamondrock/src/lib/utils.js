import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind-merge.
 * @param {...(string | undefined | null | false)} inputs - Class names to merge.
 * @returns {string} - Merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
