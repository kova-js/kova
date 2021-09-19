import { Module } from '@nestjs/common'

// Controllers
import { PostController } from './post.controller'
import { PostApiController } from './api.controller'

// Services
import { PostService } from './post.service'
import { PostApiService } from './api.service'

@Module({
  imports: [],
  providers: [PostService, PostApiService],
  controllers: [PostController, PostApiController],
  exports: [PostService],
})
export class PostModule {}
