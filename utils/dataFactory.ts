export function getUniqueCode(prefix: string): string {
  return `${prefix}${Date.now()}`;
}
