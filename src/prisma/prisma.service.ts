import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const options: Prisma.PrismaClientOptions = {
      // datasources: {
      //   db: {
      //     url: 'mysql://kova:iHMeK6Od8bLiEm9h@bj-cynosdbmysql-grp-9wh97p7c.sql.tencentcdb.com:23553/kova2',
      //   },
      // },
    }
    super(options)
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
