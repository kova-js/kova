import type { NestExpressApplication } from '@nestjs/platform-express'
import { initialSSRDevProxy, loadConfig } from 'ssr-server-utils'
import cookieParser from 'cookie-parser'
import { PrismaService } from './prisma'
import { LoggingInterceptor } from './core/interceptors/logging.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './core/filters/http-exception.filter'
import { isOnlyApi } from './utils'
import { LoggerService } from './core/logger'
import { SsrRenderInterceptor } from './core/render'

export async function bootstrap(app: NestExpressApplication, listening = true) {
  const logger = app.get(LoggerService)
  app.use(cookieParser())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor(logger))

  const { serverPort } = loadConfig()

  if (!isOnlyApi) {
    await initialSSRDevProxy(app, { express: true })
  }

  app.disable('x-powered-by')

  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  if (listening) {
    await app.listen(serverPort)
  }
  await SsrRenderInterceptor.parseRoutes()
  return app
}
