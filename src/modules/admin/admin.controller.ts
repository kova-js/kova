import { SsrRender } from '@/core/render'
import { Controller, Get } from '@nestjs/common'

@Controller('/admin')
export class AdminController {
  @Get()
  @SsrRender({ mode: 'csr' })
  async dashboard() {
    return {
      pageProps: {},
    }
  }
  
  @Get('*')
  @SsrRender({ mode: 'csr' })
  async admin() {
    return {
      pageProps: {},
    }
  }

  @Get('/tags')
  @SsrRender({ mode: 'csr' })
  async tags() {
    return {
      pageProps: {},
    }
  }

  @Get('/tags/:slug')
  @SsrRender({ mode: 'csr' })
  async tag() {
    return {
      pageProps: {},
    }
  }

  @Get('/posts')
  @SsrRender({ mode: 'csr' })
  async posts() {
    return {
      pageProps: {},
    }
  }

  @Get('/system/options')
  @SsrRender({ mode: 'csr' })
  async systemOptions() {
    return {
      pageProps: {},
    }
  }

  @Get('/setup')
  @SsrRender({ mode: 'csr' })
  async setup() {
    return {
      pageProps: {},
    }
  }

  @Get('/posts/:slug')
  @SsrRender({ mode: 'csr' })
  async post() {
    return {
      pageProps: {},
    }
  }

  @Get('/users')
  @SsrRender({ mode: 'csr' })
  async users() {
    return {
      pageProps: {},
    }
  }

  @Get('/users/:slug')
  @SsrRender({ mode: 'csr' })
  async user() {
    return {
      pageProps: {},
    }
  }

  @Get('/site')
  @SsrRender({ mode: 'csr' })
  async viewSite() {
    return {
      pageProps: {},
    }
  }
}
