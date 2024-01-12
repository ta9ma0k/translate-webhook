export default {
  type: "object",
  properties: {
    service: { type: 'string' },
    api: { type: 'string' },
    id: { type: 'string' }
  },
  required: ['service', 'api', 'id']
} as const;
