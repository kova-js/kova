import type { CacheStore as NestCacheStore, CacheStoreSetOptions } from '@nestjs/common'

export type { CacheStoreSetOptions }

export interface CacheStore extends NestCacheStore {
  /**
   * Retrieve a key/value pair from the cache.
   *
   * @param key cache key
   */
  pull?<T>(key: string): Promise<T | undefined> | T | undefined
}
