import { SsrRender } from '@/core/render'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AuthController {
  @Get('/auth/login')
  @SsrRender({ mode: 'csr' })
  async showLoginPage() {
    return {}
  }

  @Get('/auth/register')
  @SsrRender({ mode: 'csr' })
  async showRegisterPage() {
    return {}
  }
}
