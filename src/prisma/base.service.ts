import { Injectable } from '@nestjs/common'
import { PrismaService } from '.'

@Injectable()
export class BaseService {
  protected readonly prisma: PrismaService
  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }
}
