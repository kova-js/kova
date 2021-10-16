import { SsrRender } from '@/core/render'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AdminController {
  @Get('/admin')
  @SsrRender({ mode: 'csr' })
  async dashboard() {
    return {
      pageProps: {},
    }
  }

  @Get('/admin/site')
  @SsrRender({ mode: 'csr' })
  async viewSite() {
    return {
      pageProps: {},
    }
  }
}
