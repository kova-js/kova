import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { AdminApiController } from './api.controller'

@Module({
  imports: [],
  providers: [AdminService],
  controllers: [AdminController, AdminApiController],
  exports: [AdminService],
})
export class AdminModule {}
