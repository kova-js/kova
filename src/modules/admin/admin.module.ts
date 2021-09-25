import { Module } from '@nestjs/common'

// Controllers
import { CategoryController } from './admin.controller'

// Services
import { AdminService } from './admin.service'

@Module({
  imports: [],
  providers: [AdminService],
  controllers: [CategoryController],
  exports: [AdminService],
})
export class AdminModule {}
