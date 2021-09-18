import { Inject, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { isEmpty } from 'lodash'
import { ArticleService } from './article.service'

@Injectable()
export class ArticleApiService {
  @Inject(ArticleService) private readonly service: ArticleService

  async articles(q: string) {
    const filter: Prisma.ArticleWhereInput = {}
    if (!isEmpty(q)) {
      filter.title = { contains: q }
    }
    const articles = await this.service.articles({
      where: filter,
      take: 20,
    })
    return articles
  }

  async getArticleBySlug(slug: string) {
    const article = await this.service.getArticle({
      slug,
    })
    return article
  }

  async getFavoritesBySlug(slug: string) {
    return await this.service.getFavoritesByArticle(slug)
  }

  async getTagsBySlug(slug: string) {
    return await this.service.getTagsByArticle(slug)
  }
}
