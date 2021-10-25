import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
// import dayjs from 'dayjs'
import { memoryStorage } from 'multer'
import { MediaAdminApiController } from './admin-api.controller'
import { MediaApiService } from './api.service'
// Controllers
import { MediaController } from './media.controller'
// Services
import { MediaService } from './media.service'

// import fs from 'fs'
// import path from 'path'
// import crypto from 'crypto'

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  providers: [MediaService, MediaApiService],
  controllers: [MediaController, MediaAdminApiController],
  exports: [MediaService],
})
export class MediaModule {}
