import { Module } from '@nestjs/common'
import { PostAdminApiController } from './admin-api.controller'
import { PostApiController } from './api.controller'
import { PostApiService } from './api.service'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  imports: [],
  providers: [PostService, PostApiService],
  controllers: [PostController, PostApiController, PostAdminApiController],
  exports: [PostService],
})
export class PostModule {}
