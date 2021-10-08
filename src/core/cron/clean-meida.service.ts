import { PrismaService } from '@/prisma'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class CleanMediaService implements OnModuleInit {
  @Inject(PrismaService)
  private readonly prisma: PrismaService

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    // const data = await this.prisma.media.findMany()
  }

  onModuleInit() {
    // this.handleCron()
  }
}
