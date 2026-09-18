// Small runtime readers for persisted JSON and the public API boundary.
export function object(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Expected an object.')
  return value as Record<string, unknown>
}
export function text(value: unknown): string {
  if (typeof value !== 'string') throw new Error('Expected text.')
  return value
}
export function integer(value: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max) throw new Error('Invalid number.')
  return value
}
export function boolean(value: unknown): boolean {
  if (typeof value !== 'boolean') throw new Error('Expected a boolean.')
  return value
}
export function array<T>(value: unknown, read: (value: unknown) => T, max = 1000): T[] {
  if (!Array.isArray(value) || value.length > max) throw new Error('Invalid collection.')
  return value.map(read)
}
export function id<P extends string>(value: unknown, prefix: P): `${P}${string}` {
  if (typeof value !== 'string' || !value.startsWith(prefix) || value.length <= prefix.length || value.length > 100 || /\s/.test(value)) throw new Error('Invalid identifier.')
  return value as `${P}${string}`
}
export const cardId = (value: unknown) => id(value, 'card-')
export const playerId = (value: unknown) => id(value, 'player-')
export const conceptId = (value: unknown) => id(value, 'concept-')
export const weekId = (value: unknown) => id(value, 'week-')
export const roundId = (value: unknown) => id(value, 'round-')
export function entries<K, V>(value: unknown, key: (value: unknown) => K, item: (value: unknown) => V): Map<K, V> {
  const pairs = array(value, (pair): [K, V] => {
    if (!Array.isArray(pair) || pair.length !== 2) throw new Error('Invalid entry.')
    return [key(pair[0]), item(pair[1])]
  })
  const result = new Map(pairs)
  if (result.size !== pairs.length) throw new Error('Duplicate entries.')
  return result
}
