import { Module } from '@nestjs/common'

// Services
import { LikeService } from './like.service'

@Module({
  imports: [],
  providers: [LikeService],
  controllers: [],
  exports: [LikeService],
})
export class LikeModule {}
