import { basePath } from '@/utils'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CacheModule } from './core/cache'
import { CleanMediaService } from './core/cron'
import { LoggerModule } from './core/logger'
import { PrismaModule } from './prisma'
import { isOnlyApi } from './utils'

@Module({
  imports: [
    ...(!isOnlyApi
      ? [
          ServeStaticModule.forRoot({
            rootPath: basePath('build'),
            serveRoot: '/',
          }),
        ]
      : []),
    ServeStaticModule.forRoot({
      rootPath: basePath('public'),
      serveRoot: '/',
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      ignoreEnvVars: true,
      ignoreEnvFile: true,
    }),
    CacheModule.forRoot(),
    ScheduleModule.forRoot(),
    PrismaModule,
    LoggerModule,
  ],
  providers: [CleanMediaService],
})
export class CoreModule {}
