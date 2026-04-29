/**
 * Validation schemas using Zod
 * Add project-specific schemas here
 */

import { z } from 'zod';

// Example: Email validation
export const emailSchema = z.string().email('Invalid email address');

// Example: Password validation
export const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

// Example: Create custom validators
export const urlSchema = z.string().url('Invalid URL');

export const phoneSchema = z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits');
