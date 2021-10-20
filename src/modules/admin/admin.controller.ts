import { SsrRender } from '@/core/render'
import { Controller, Get } from '@nestjs/common'

@Controller('/admin')
export class AdminController {
  @Get(['/', '*'])
  @SsrRender({ mode: 'csr' })
  async dashboard() {
    return {
      pageProps: {},
    }
  }
}
