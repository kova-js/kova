import { DynamicModule, Global, Inject, Module, OnModuleDestroy } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CacheModuleAsyncOptions, RedisModuleOptions } from './redis.interface'
import { createAsyncClientOptions, createClient, RedisClient } from './redis-client.provider'
import { ConfigModule } from '@nestjs/config'
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './cache.constants'
import { RedisService } from './redis.service'
import { isArray } from 'lodash'

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
  imports: [ConfigModule],
})
export class CacheCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_MODULE_OPTIONS)
    private readonly options: RedisModuleOptions | RedisModuleOptions[],
    private readonly moduleRef: ModuleRef,
  ) {}

  static register(options: RedisModuleOptions | RedisModuleOptions[]): DynamicModule {
    return {
      module: CacheCoreModule,
      providers: [
        createClient(),
        {
          provide: REDIS_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [RedisService],
    }
  }

  static forRootAsync(options: CacheModuleAsyncOptions): DynamicModule {
    return {
      module: CacheCoreModule,
      imports: options.imports,
      providers: [createClient(), createAsyncClientOptions(options)],
      exports: [RedisService],
    }
  }

  onModuleDestroy() {
    const closeConnection =
      ({ clients, defaultKey }) =>
      (options) => {
        const name = options.name || defaultKey
        const client = clients.get(name)

        if (client && !options.keepAlive) {
          client.disconnect()
        }
      }

    const redisClient = this.moduleRef.get<RedisClient>(REDIS_CLIENT)
    const closeClientConnection = closeConnection(redisClient)

    if (isArray(this.options)) {
      this.options.forEach(closeClientConnection)
    } else {
      closeClientConnection(this.options)
    }
  }
}
