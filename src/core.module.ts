import { basePath } from '@/utils'
import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CacheModule } from './core/cache'
import { CleanMediaService } from './core/cron'
import { LoggerModule } from './core/logger'
import { PrismaModule } from './prisma'
import { isOnlyApi } from './utils'

@Module({})
export class CoreModule {
  static forRoot(): DynamicModule {
    const imports: ModuleMetadata['imports'] = [
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
    ]

    if (!isOnlyApi) {
      imports.push(ServeStaticModule.forRoot({ rootPath: basePath('build'), serveRoot: '/' }))
    }

    return {
      module: CoreModule,
      imports,

      providers: [CleanMediaService],
    }
  }
}
