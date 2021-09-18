import { Controller, Get, Param } from '@nestjs/common'
import { ArticleService } from './article.service'
import _ from 'lodash'
import { Body } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { Post } from '@nestjs/common'
import { Delete } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common'
import { Query } from '@nestjs/common'
import { ArticleApiService } from './api.service'
// import { hashSync } from 'bcrypt'

@Controller('/api')
export class ArticleApiController {
  constructor(private readonly service: ArticleService, private readonly apiService: ArticleApiService) {}

  @Get('/articles')
  async articles(@Query('q') q: string) {
    return await this.apiService.articles(q)
  }

  @Get('/articles/:slug')
  async getArticleBySlug(@Param('slug') slug: string) {
    return await this.apiService.getArticleBySlug(slug)
  }

  @Get('/articles/:slug/favorites')
  async getFavoritesBySlug(@Param('slug') slug: string) {
    return await this.apiService.getFavoritesBySlug(slug)
  }

  @Get('/articles/:slug/tags')
  async getTagsBySlug(@Param('slug') slug: string) {
    return await this.apiService.getTagsBySlug(slug)
  }

  @Post('/articles')
  async createArticle(@Body() articleDto: CreateArticleDto) {
    console.log(articleDto)
    const { slug, content, ...articleData } = articleDto
    const article = {
      ...articleData,
      slug: slug ?? `${articleData.title}_${Date.now()}`,
      userId: 1,
      content: {
        create: {
          html: content,
          markdown: content,
        },
      },
    }
    console.log(article)
    const res = await this.service.createArticle(article as any)
    // return await this.service.getTagsByArticle(slug)
    console.log(res)
    return res
  }

  @Delete('/articles/:slug')
  async deleteArticle(@Param('slug') slug: string) {
    const article = await this.service.getArticle({ slug })
    if (article.userId !== 1) {
      throw new NotFoundException()
    }
    return await this.service.deleteArticle({ id: article.id })
  }
}
