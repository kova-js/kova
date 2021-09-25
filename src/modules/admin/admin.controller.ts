import { SsrRender } from '@/core/render'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AdminController {

  @Get('/admin')
  @SsrRender()
  async dashboard() {
    return {
      pageProps: {},
    }
  }
}
