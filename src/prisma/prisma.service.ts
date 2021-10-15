import env from '@/utils/env'
import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const options: Prisma.PrismaClientOptions = {
      datasources: {
        db: {
          url: env('DATABASE_URL'),
        },
      },
    }
    super(options)

    this.$use(async (params, next) => {
      const before = Date.now()
      const result = await next(params)
      const after = Date.now()
      console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
      return result
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
