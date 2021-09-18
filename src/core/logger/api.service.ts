import { HttpService } from '@nestjs/axios'
import { Inject } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { View } from '@prisma/client'
import { firstValueFrom } from 'rxjs'
import { PrismaService } from '@/prisma'
import { LoggerService } from './logger.service'
// import { logger } from '@leaa/api/src/utils';

@Injectable()
export class LoggerApiService {
  @Inject(PrismaService) private readonly prisma: PrismaService
  @Inject(LoggerService) private readonly logger: LoggerService
  @Inject(HttpService) private readonly http: HttpService

  private ipFilter(ip: string) {
    const ips = ['127.0.0.1', '::ffff:127.0.0.1']
    return ips.includes(ip)
  }

  async log(data: Pick<View, 'ip' | 'url' | 'ua'>) {
    const { ip } = data
    if (!this.ipFilter(ip)) {
      const { data: area } = await firstValueFrom(this.http.get(`http://ip-api.com/json/${ip}?lang=zh-CN`))

      await this.prisma.view.create({
        data: {
          ...data,
          area: ([area.country, area.regionName, area.city] as String[]).join('-'),
          areaInfo: area,
        },
      })
      this.logger.debug(JSON.stringify(data))
    }
  }
}
