import { cookies, headers } from 'next/headers';

/**
 * Get authentication token from cookies
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  return token?.value || null;
}

/**
 * Set authentication token in cookies
 */
export async function setAuthToken(
  token: string,
  maxAge: number = 7 * 24 * 60 * 60
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

/**
 * Clear authentication token from cookies
 */
export async function clearAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

/**
 * Verify authentication exists
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}
