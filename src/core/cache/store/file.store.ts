import type { CacheStore, CacheStoreSetOptions } from '../interfaces/store.interface'
import fs from 'fs'
import path from 'path'

interface FileStoreOptions {
  cachePath?: string
}

export class FileStore implements CacheStore {
  protected readonly options: Required<FileStoreOptions>

  constructor(options?: FileStoreOptions) {
    this.options = {
      cachePath: options?.cachePath || path.join(process.cwd(), './storage/views'),
    }
  }

  async get(key: string): Promise<any> {
    const cachePath = this.getCacheFilePath(key)
    let cache = null
    if (fs.existsSync(cachePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
        if (data && data.expiresAt > Date.now()) {
          cache = data.content
        }
      } catch (e) {}
    }
    return Promise.resolve(cache)
  }

  getCacheFilePath(key: string) {
    return path.join(this.options.cachePath, key)
  }

  async set<T>(key: string, value: any, options?: CacheStoreSetOptions<T>): Promise<any> {
    const cachePath = this.getCacheFilePath(key)
    const data = {
      expiresAt: options.ttl ?? Date.now() + 1000 * 3600,
      content: value,
    }
    fs.writeFileSync(cachePath, JSON.stringify(data))
    return Promise.resolve(true)
  }

  async del(key: string): Promise<void> {
    const cachePath = this.getCacheFilePath(key)
    fs.rmSync(cachePath)
  }
}
