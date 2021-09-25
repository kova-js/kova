import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { PostModule } from './modules/post'
import { CategoryModule } from './modules/category'
import { TagModule } from './modules/tag'
import { UserModule } from './modules/user'
import { CoreModule } from './core.module'
import { AuthModule } from './auth'
import { MediaModule } from './modules/media'
import { LoggerMiddleware } from './core/middlewares/logger.middleware'
import { AdminModule } from './modules/admin'

@Module({
  imports: [CoreModule.forRoot(), UserModule, PostModule, CategoryModule, TagModule, AuthModule, MediaModule, AdminModule],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
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
