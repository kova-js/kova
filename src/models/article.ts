import { Prisma, Article as PrismaArticle, ArticleStatus } from '@prisma/client'
import { Transform } from 'class-transformer'
import dayjs from 'dayjs'

export class ArticleModel implements PrismaArticle {
  id: number
  title: string
  public: boolean
  slug: string
  image: string
  excerpt: string
  meta: Prisma.JsonValue
  cover: string
  status: ArticleStatus
  browseCount: number
  commentsCount: number
  likesCount: number
  userId: number
  categoryId: number

  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  createdAt: Date

  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  updatedAt: Date
}
