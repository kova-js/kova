import { Global, Module } from '@nestjs/common'
import { LoggerService } from './logger.service'
import { HttpModule } from '@nestjs/axios'

@Global()
@Module({
  imports: [HttpModule],
  providers: [LoggerService],
  controllers: [],
  exports: [LoggerService],
})
export class LoggerCoreModule {}
