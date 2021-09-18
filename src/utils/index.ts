export * from './string'
export * from './helper'
export const isOnlyApi = process.env.ONLY_API === 'true'
export const isDev = process.env.NODE_ENV !== 'production'
