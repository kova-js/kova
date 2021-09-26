import { Injectable } from '@nestjs/common'
import { isEmpty, isFunction, isNull } from 'lodash'
import { DefCallback } from './cache.interface'
import { FileStore } from './store/file.store'
import path from 'path'

@Injectable()
export class CacheService {
  static readonly foreverTtl = 0
  // public store: Redis
  private readonly ttl = 600
  protected readonly store: FileStore

  constructor() {
    this.store = new FileStore({
      cachePath: path.join(process.cwd(), './storage/caches'),
    })
  }

  async get<T = any>(key: string, def: DefCallback<T> = null): Promise<T | null> {
    const cached = await this.store.get(key)
    let data: T | null = null
    if (cached) {
      try {
        data = JSON.parse(cached) as T
      } catch (_error) {}
    }

    if (isNull(data) && def) {
      data = await this._value(def)
    }
    return data
  }

  async pull<T = any>(key: string, def: DefCallback<T> = null): Promise<T | null> {
    const cached: T | null = await this.get(key)
    !isNull(cached) && (await this.forget(key))
    if (def) {
      return await this._value(def)
    }
    return cached
  }

  async forget(key: string): Promise<boolean> {
    await this.store.del(key)
    return true
  }

  async put<T>(key: string, value: T, ttl = this.ttl): Promise<boolean> {
    let res: 'OK' | null
    if (ttl === 0) {
      res = await this.store.set(key, JSON.stringify(value))
    } else {
      res = await this.store.set(key, JSON.stringify(value), { ttl })
    }
    return res !== null
  }

  async has(key: string): Promise<boolean> {
    return !isEmpty(await this.get(key))
  }

  async missing(key: string): Promise<boolean> {
    return !(await this.has(key))
  }

  async add<T>(key: string, value: T, ttl = this.ttl): Promise<T | boolean> {
    const exists = await this.has(key)
    if (!exists) {
      return await this.put(key, value, ttl)
    }
    return false
  }

  async remember<T>(key: string, callback: DefCallback<T>, ttl = this.ttl) {
    let value: T | null = await this.get(key)
    if (!value || isEmpty(value)) {
      value = await this._value(callback)
      await this.put(key, value, ttl)
    }
    return value
  }

  async forever<T>(key: string, value: T) {
    return await this.put(key, value, CacheService.foreverTtl)
  }

  /**
   * Get an item from the cache, or execute the given Closure and store the result forever.
   *
   * @param key
   * @param callback
   */
  async sear<T>(key: string, callback: DefCallback<T>) {
    return await this.rememberForever(key, callback)
  }

  async set<T>(key: string, value: T, ttl = this.ttl) {
    return await this.put(key, value, ttl)
  }

  async increment(key: string, value = 1, ttl = this.ttl) {
    const raw = await this.get(key, 0)
    return await this.put(key, raw + value, ttl)
  }

  async rememberForever<T>(key: string, callback: DefCallback<T>) {
    return await this.remember(key, callback, CacheService.foreverTtl)
  }

  private _value<T>(callback: DefCallback<T>): Promise<T | null>
  private async _value(callback: unknown) {
    return isFunction(callback) ? callback() : callback
  }
}
