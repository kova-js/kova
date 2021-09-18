import { Module } from '@nestjs/common'

// Controllers
import { UserController } from './user.controller'
import { UserApiController } from './api.controller'

// Services
import { UserService } from './user.service'
import { FollowService } from './follow.service'
import { LikeModule } from '@/modules/like'
import { UserApiService } from './api.service'

@Module({
  imports: [LikeModule],
  providers: [UserService, FollowService, UserApiService],
  controllers: [UserController, UserApiController],
  exports: [UserService],
})
export class UserModule {}
