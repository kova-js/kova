import { PrismaService } from '@/prisma'
import { OnModuleInit } from '@nestjs/common'
import { Inject, Injectable } from '@nestjs/common'
// import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class CleanMediaService implements OnModuleInit {
  @Inject(PrismaService) private readonly prisma: PrismaService

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const data = await this.prisma.media.findMany()
    console.log(data)
    console.log('1')
  }

  onModuleInit() {
    // this.handleCron()
  }
}
