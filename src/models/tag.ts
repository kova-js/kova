import { Prisma, Tag as PrismaTag } from '~/prisma/client'
import { Transform } from 'class-transformer'
import dayjs from 'dayjs'

export class TagModel implements PrismaTag {
  meta: Prisma.JsonValue
  id: number
  slug: string

  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  createdAt: Date

  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  updatedAt: Date
}
