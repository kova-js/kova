import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import { initialSSRDevProxy, loadConfig } from 'ssr-server-utils'
import { HttpExceptionFilter } from './core/filters/http-exception.filter'
import { LoggingInterceptor } from './core/interceptors/logging.interceptor'
import { LoggerService } from '@kova/core'
import { PrismaService } from './prisma'
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter'
import { isOnlyApi } from './utils'

export async function bootstrap(app: NestExpressApplication, listening = true) {
  const logger = app.get(LoggerService)

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.use(cookieParser())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor(logger))
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const { serverPort } = loadConfig()

  if (!isOnlyApi) await initialSSRDevProxy(app, { express: true })

  app.disable('x-powered-by')

  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  if (listening) {
    await app.listen(serverPort)
  }
  return app
}
