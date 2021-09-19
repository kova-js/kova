import { ContentApiPrefix } from '@/constants/constants'
import { Controller, Get, Inject, Param } from '@nestjs/common'
import { UserApiService } from './api.service'

@Controller(ContentApiPrefix)
export class UserApiController {
  @Inject(UserApiService) private readonly apiService: UserApiService

  @Get('/users')
  async getUsers() {
    return await this.apiService.getUsers()
  }

  @Get('/users/:slug')
  async getUserBySlug(@Param('slug') slug: string) {
    return await this.apiService.getUserBySlug(slug)
  }

  @Get('/users/:slug/followers')
  async getUserFollowers(@Param('slug') slug: string) {
    return await this.apiService.getUserFollowers(slug)
  }

  @Get('/users/:slug/followings')
  async getUserFollowings(@Param('slug') slug: string) {
    return await this.apiService.getUserFollowings(slug)
  }

  @Get('/users/:slug/likes')
  async getUserLikes(@Param('slug') slug: string) {
    return await this.apiService.getUserLikes(slug)
  }

  @Get('/users/:slug/favorites')
  async getUserFavorites(@Param('slug') slug: string) {
    return await this.apiService.getUserFavorites(slug)
  }
}
