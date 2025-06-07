/**
 * Arena Social Utility Functions
 * 
 * Collection of utility functions for common operations.
 * Includes class name merging, wallet address validation, and formatting.
 * 
 * @file utils.ts
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { isAddress } from "ethers"

/**
 * Class Name Merger
 * 
 * Combines multiple class names with Tailwind CSS support.
 * 
 * @param {ClassValue[]} inputs - Array of class names to merge
 * @returns {string} Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validate Ethereum Wallet Address
 * 
 * Validates if a string is a valid Ethereum wallet address.
 * Uses ethers.js isAddress function with error handling.
 * 
 * @param {string} address - Ethereum address to validate
 * @returns {boolean} True if valid Ethereum address, false otherwise
 */
export function isValidWalletAddress(address: string): boolean {
  try {
    return isAddress(address)
  } catch {
    return false
  }
}

/**
 * Format Wallet Address
 * 
 * Formats a wallet address to show first 6 and last 4 characters.
 * Automatically validates address before formatting.
 * 
 * @param {string} address - Wallet address to format
 * @returns {string} Formatted address or original if invalid
 */
export function formatWalletAddress(address: string): string {
  if (!isValidWalletAddress(address)) return address
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

/**
 * Get Wallet Display Name
 * 
 * Gets a display-friendly version of a wallet address.
 * Validates address and formats it for display.
 * 
 * @param {string} address - Wallet address to format
 * @returns {string} Display-friendly wallet address
 */
export function getWalletDisplayName(address: string): string {
  if (!isValidWalletAddress(address)) return address
  return formatWalletAddress(address)
}
