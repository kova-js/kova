import { Inject, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { MediaService } from './media.service'

@Injectable()
export class MediaApiService {
  @Inject(MediaService) private readonly service: MediaService

  async medias() {
    const filter: Prisma.MediaWhereInput = {}
    const medias = await this.service.medias({
      where: filter,
    })
    return medias
  }

  async getMedia(id: number) {
    const media = await this.service.getMedia({ id })
    return media
  }
}
