import { CacheService } from '../cache.service'
import { CacheManagerOptions, InternalServerErrorException } from '@nestjs/common'
import 'reflect-metadata'
import { switchMap, tap } from 'rxjs/operators'
import { from, Observable, of } from 'rxjs'

type Cacheable<T> = (...args: any[]) => Observable<T>

export function Cache<T>(options: CacheManagerOptions = {}) {
  return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<Cacheable<T>>) => {
    const originalMethod = descriptor.value
    const className = target.constructor.name

    // @ts-expect-error
    descriptor.value = function (...args: any[]) {
      const cache = (this as any).cacheService
      if (!cache || !(cache instanceof CacheService)) {
        // TODO: Can we do design time check if CacheService injected?
        throw new InternalServerErrorException('Target Class should inject CacheService')
      } else {
        const cacheKey = `${className}:${methodName}:${args.map((a) => JSON.stringify(a)).join()}`

        return from(cache.get<T>(cacheKey)).pipe(
          switchMap((res) => {
            if (res) return of(res)
            if (originalMethod) {
              return originalMethod
                .apply(this, args)
                .pipe(tap(async (methodResult: T) => await cache.put<T>(cacheKey, methodResult, options.ttl)))
            }
            return null
          }),
        )
      }
    }

    return descriptor
  }
}
