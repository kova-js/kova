import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LoggerService } from '@kova/core'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const { url, method, params = {}, query = {} } = request
    this.logger.verbose(
      `Before: ${method} ${url} with : params: ${JSON.stringify(
        params,
      )}, with query: ${JSON.stringify(query)}`,
    )

    const now = Date.now()
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`After: ${method} ${url} took ${Date.now() - now}ms`)))
  }
}
