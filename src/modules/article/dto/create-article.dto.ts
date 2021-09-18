import { IsInt, IsOptional, IsString } from 'class-validator'
import { Article as PrismaArticle } from '@prisma/client'

export class CreateArticleDto implements Partial<PrismaArticle> {
  //   id: number
  //   title: string
  //   public: boolean
  //   slug: string
  //   image: string
  //   excerpt: string
  //   meta: Prisma.JsonValue
  //   cover: string
  //   status: ArticleStatus
  //   browseCount: number
  //   commentsCount: number
  //   likesCount: number
  //   userId: number
  //   categoryId: number
  //   createdAt: Date
  //   updatedAt: Date
  @IsString({
    message: '标题不能为空',
  })
  title: string

  @IsString({
    message: '内容不能为空',
  })
  content: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsInt({
    message: '请选择分类',
  })
  categoryId: number

  //   public: boolean
  //   slug: string
  //   image: string
  //   excerpt: string
  //   meta: Prisma.JsonValue
  //   cover: string
  //   status: ArticleStatus
  //   browseCount: number
  //   commentsCount: number
  //   likesCount: number
  //   userId: number
  //   categoryId: number
  //   createdAt: Date
  //   updatedAt: Date
}
