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

  @Get('/admin/tags')
  @SsrRender({ mode: 'csr' })
  async tags() {
    return {
      pageProps: {},
    }
  }

  @Get('/admin/tag/:slug')
  @SsrRender({ mode: 'csr' })
  async tag() {
    return {
      pageProps: {},
    }
  }

  @Get('/admin/posts')
  @SsrRender({ mode: 'csr' })
  async posts() {
    return {
      pageProps: {},
    }
  }

  @Get('/admin/post/:slug')
  @SsrRender({ mode: 'csr' })
  async post() {
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
