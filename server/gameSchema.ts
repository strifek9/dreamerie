const identifier = (prefix: string) => ({ type: 'string', pattern: `^${prefix}[^\\s]{1,90}$` })
const card = identifier('card-'), player = identifier('player-'), concept = identifier('concept-')
const missing = { type: 'array', maxItems: 6, uniqueItems: true, items: player }
function action(type: string, properties: Record<string, unknown> = {}, required: string[] = []) {
  return { type: 'object', additionalProperties: false, required: ['type', ...required], properties: { type: { const: type }, ...properties } }
}
export const gameCommandSchema = {
  type: 'object', additionalProperties: false, required: ['requestId', 'expectedRevision', 'weekId', 'roundId', 'action'],
  properties: {
    requestId: { type: 'string', pattern: '^[0-9a-fA-F-]{36}$' }, expectedRevision: { type: 'integer', minimum: 1 },
    weekId: { anyOf: [identifier('week-'), { type: 'null' }] }, roundId: { anyOf: [identifier('round-'), { type: 'null' }] },
    action: { oneOf: [action('start'), action('save', { conceptId: concept, cardId: card, clue: { type: 'string', minLength: 1, maxLength: 80 } }, ['conceptId', 'cardId', 'clue']),
      action('lock', { playerId: player, cardId: card }, ['playerId', 'cardId']), action('unlock', { cardId: card }, ['cardId']),
      ...['open-day', 'reveal', 'advance'].map((type) => action(type, { confirmMissing: missing }))] },
  },
}
