import { Module } from '@nestjs/common'

// Controllers
import { ArticleController } from './article.controller'
import { ArticleApiController } from './api.controller'

// Services
import { ArticleService } from './article.service'
import { ArticleApiService } from './api.service'

@Module({
  imports: [],
  providers: [ArticleService, ArticleApiService],
  controllers: [ArticleController, ArticleApiController],
  exports: [ArticleService],
})
export class ArticleModule {}
