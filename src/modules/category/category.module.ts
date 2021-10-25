import { Module } from '@nestjs/common'
import { CategoryAdminApiController } from './admin-api.controller'
import { CategoryApiController } from './api.controller'
import { CategoryApiService } from './api.service'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [],
  providers: [CategoryService, CategoryApiService],
  controllers: [CategoryController, CategoryApiController, CategoryAdminApiController],
  exports: [CategoryService],
})
export class CategoryModule {}
