import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { PostService } from './post.service'
import { Body } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { Post } from '@nestjs/common'
import { Delete } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common'
import { Query } from '@nestjs/common'
import { PostApiService } from './api.service'
import { AdminApiPrefix } from '@/constants/constants'

@Controller(AdminApiPrefix)
export class PostAdminApiController {
  constructor(private readonly service: PostService, private readonly apiService: PostApiService) {}

  @Get('/posts')
  async posts(@Query('q') q: string, @Query('page') page: number, @Query('size') pageSize: number) {
    const data = await this.apiService.posts(q, { page, pageSize })
    return { data }
  }

  @Get('/posts/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.apiService.getPostById(id)
    return { data }
  }

  @Get('/posts/:slug/favorites')
  async getFavoritesBySlug(@Param('slug') slug: string) {
    return await this.apiService.getFavoritesBySlug(slug)
  }

  @Get('/posts/:slug/tags')
  async getTagsBySlug(@Param('slug') slug: string) {
    return await this.apiService.getTagsBySlug(slug)
  }

  @Post('/posts')
  async createPost(@Body() postDto: CreatePostDto) {
    const { slug, content, ...postData } = postDto
    const post = {
      ...postData,
      slug: slug ?? `${postData.title}_${Date.now()}`,
      userId: 1,
      content: {
        create: {
          html: content,
          markdown: content,
        },
      },
    }
    const res = await this.service.createPost(post as any)
    // return await this.service.getTagsByPost(slug)
    return res
  }

  @Delete('/posts/:slug')
  async deletePost(@Param('slug') slug: string) {
    const post = await this.service.getPost({ slug })
    if (post.userId !== 1) {
      throw new NotFoundException()
    }
    return await this.service.deletePost({ id: post.id })
  }
}
