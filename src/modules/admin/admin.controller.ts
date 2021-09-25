import { SsrRender } from '@/core/render'
import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class CategoryController {

  @Get('/admin')
  @SsrRender()
  async categories() {
    return {
      pageProps: {},
    }
  }
}
