// Super simple, dev-only
export const codes = new Map<string, { code: string; expiresAt: number }>();

export function setCode(email: string, code: string, ttlSeconds = 600) {
  codes.set(email.toLowerCase(), { code, expiresAt: Date.now() + ttlSeconds * 1000 });
}

export function getCode(email: string) {
  return codes.get(email.toLowerCase()) ?? null;
}

export function clearCode(email: string) {
  codes.delete(email.toLowerCase());
}