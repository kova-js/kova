import { Module } from '@nestjs/common'

// Controllers
import { AdminController } from './admin.controller'

// Services
import { AdminService } from './admin.service'

@Module({
  imports: [],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
