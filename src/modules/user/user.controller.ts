import { SsrRender } from '@/core/render'
import { Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common'
import { UserApiService } from './api.service'

@Controller()
export class UserController {
  constructor(private readonly apiService: UserApiService) {}
  @Get('/user/:slug')
  @SsrRender()
  async getUser(@Param('slug') slug: string) {
    const pageProps = await this.apiService.getUserBySlug(slug);
    return {
      pageProps,
    }
  }
}
