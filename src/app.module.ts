import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AuthModule } from './auth'
import { CoreModule } from './core.module'
import { LoggerMiddleware } from '@kova/core'
import { AdminModule } from './modules/admin'
import { CategoryModule } from './modules/category'
import { MediaModule } from './modules/media'
import { PostModule } from './modules/post'
import { TagModule } from './modules/tag'
import { UserModule } from './modules/user'

@Module({
  imports: [
    CoreModule.forRoot(),
    UserModule,
    PostModule,
    CategoryModule,
    TagModule,
    AuthModule,
    MediaModule,
    AdminModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void  {
    const middlewares = [
      // IpMiddleware,
      // CookieParserMiddleware,
      // RateLimitMiddleware,
      // CorsMiddleware,
      // CSRFMiddleware,
      // SessionMiddleware,
      // UserMiddleware,
      LoggerMiddleware,
    ]
    consumer.apply(...middlewares).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
