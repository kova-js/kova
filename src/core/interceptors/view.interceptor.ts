import { PrismaService } from '@/prisma'
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable({ scope: Scope.REQUEST })
export class ViewInterceptor implements NestInterceptor {
  @Inject(PrismaService) private readonly prisma: PrismaService

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest()
    if (this.prisma) {
      await this.prisma.view.create({
        data: {
          ip: request.ip,
          url: request.url,
        },
      })
    }

    return next.handle().pipe()
  }
}
