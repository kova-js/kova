import { Module } from '@nestjs/common'
import { TagAdminApiController } from './admin-api.controller'
import { TagApiController } from './api.controller'
import { TagApiService } from './api.service'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'

@Module({
  imports: [],
  providers: [TagService, TagApiService],
  controllers: [TagController, TagApiController, TagAdminApiController],
  exports: [TagService],
})
export class TagModule {}
