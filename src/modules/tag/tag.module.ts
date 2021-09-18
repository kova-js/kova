import { Module } from '@nestjs/common'

// Controllers
import { TagController } from './tag.controller'
import { TagApiController } from './api.controller'

// Services
import { TagService } from './tag.service'
import { TagApiService } from './api.service'

@Module({
  imports: [],
  providers: [
    TagService,
    TagApiService
  ],
  controllers: [TagController, TagApiController],
  exports: [
    TagService,
  ],
})
export class TagModule {}
