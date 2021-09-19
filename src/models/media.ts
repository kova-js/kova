import { Media as PrismaMedia } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'
import dayjs from 'dayjs'

export class MediaModel implements PrismaMedia {
  path: string
  type: string
  
  alt: string

  description: string

  id: number

  filename: string

  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  createdAt: Date

  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  updatedAt: Date

  @Exclude()
  post_count: number
}
