import { DynamicModule, Module } from '@nestjs/common'

import { CacheCoreModule } from './cache-core.module'
import { CacheService } from '../cache'
import config from '@/core/config'
import { FileCacheService } from './file-cache.service'
import { RedisModuleOptions } from './redis.interface'

@Module({})
export class CacheModule {
  static getDefaultDriver() {
    return config('cache.default')
  }

  static getConfig(name?: string): RedisModuleOptions {
    const driverName = name ?? this.getDefaultDriver()
    const stores = config('cache.stores')
    return stores[driverName] ?? null
  }

  static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      global: true,
      providers: [CacheService, FileCacheService],
      exports: [CacheService, FileCacheService],
      imports: [
        CacheCoreModule.forRootAsync({
          useFactory: () => this.getConfig(),
          inject: [],
        }),
      ],
    }
  }
}
