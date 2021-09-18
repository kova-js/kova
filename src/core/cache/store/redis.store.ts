import { CacheStore } from '@nestjs/common'
import fs from 'fs'
import path from 'path'

export class RedisStore implements CacheStore {
  private readonly cachePath = path.join(process.cwd(), './storage/views')

  async get(key: string): Promise<any> {
    const cachePath = this.getCacheFilePath(key)
    let cache = null
    if (fs.existsSync(cachePath)) {
      cache = fs.readFileSync(cachePath)
    }
    return Promise.resolve(cache)
  }

  getCacheFilePath(key: string) {
    return path.join(this.cachePath, key)
  }

  async set(key: string, value: any, options?: any): Promise<any> {
    const cachePath = this.getCacheFilePath(key)
    fs.writeFileSync(cachePath, value)
    return Promise.resolve(true)
  }

  async del(key: string, cb = (err: Error) => {}): Promise<any> {
    const cachePath = this.getCacheFilePath(key)
    fs.rmSync(cachePath)
    return Promise.resolve(null)
  }
}
