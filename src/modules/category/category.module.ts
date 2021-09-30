import { Module } from '@nestjs/common'
import { CategoryApiController } from './api.controller'
import { CategoryApiService } from './api.service'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [],
  providers: [CategoryService, CategoryApiService],
  controllers: [CategoryController, CategoryApiController],
  exports: [CategoryService],
})
export class CategoryModule {}
