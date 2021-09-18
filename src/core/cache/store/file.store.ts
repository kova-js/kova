import { CacheStore } from '@nestjs/common'
import fs from 'fs'
import path from 'path'

export class FileStore implements CacheStore {
  private readonly cachePath = path.join(process.cwd(), './storage/views')

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
    console.log('key', key)
    console.log('cachePath', this.cachePath)
    return path.join(this.cachePath, key)
  }

  async set(key: string, value: any, options?: any): Promise<any> {
    const cachePath = this.getCacheFilePath(key)
    const data = {
      expiresAt: Date.now() + 1000 * 3600,
      content: value
    }
    fs.writeFileSync(cachePath, JSON.stringify(data))
    return Promise.resolve(true)
  }

  async del(key: string, cb = (err: Error) => {}): Promise<any> {
    const cachePath = this.getCacheFilePath(key)
    fs.rmSync(cachePath)
    return Promise.resolve(null)
  }
}
