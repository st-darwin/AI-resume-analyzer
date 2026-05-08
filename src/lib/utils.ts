import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely using clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric byte value into a human-readable string (e.g., 1.2 MB).
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generates a secure, random UUID.
 */
export const generateUUID = () => crypto.randomUUID();

/**
 * Cleans AI-generated strings that may contain markdown blocks 
 * and parses them into a valid JavaScript object.
 * Useful for Nexa CV and Nexa Travel AI integrations.
 */
export const parseMarkdownToJson = (text: string) => {
  try {
    // 1. Try to extract content between ```json and ``` or just ``` and ```
 // Add a backslash before the forward slashes to "escape" them
const extractRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
    const match = extractRegex.exec(text);
    
    // 2. Use the captured group if found, otherwise use the raw text
    const jsonString = match ? match[1].trim() : text.trim();

    // 3. Attempt to parse the resulting string
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON from AI response:", error);
    
    // Final fallback: try to find the first '{' and last '}' 
    // in case the AI added conversational text before or after the JSON.
    try {
      const firstBracket = text.indexOf('{');
      const lastBracket = text.lastIndexOf('}');
      if (firstBracket !== -1 && lastBracket !== -1) {
        const potentialJson = text.substring(firstBracket, lastBracket + 1);
        return JSON.parse(potentialJson);
      }
    } catch (fallbackError) {
      console.error("Deep parse fallback failed:", fallbackError);
    }
    
    return null;
  }
};
