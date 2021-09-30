import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { LoggerService } from './logger.service'

@Global()
@Module({
  imports: [HttpModule],
  providers: [LoggerService],
  controllers: [],
  exports: [LoggerService],
})
export class LoggerCoreModule {}
