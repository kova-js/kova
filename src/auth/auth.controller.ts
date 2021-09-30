import { SsrRender } from '@/core/render'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AuthController {
  @Get('/auth/login')
  @SsrRender()
  async showLoginPage() {
    return {}
  }

  @Get('/auth/register')
  @SsrRender()
  async showRegisterPage() {
    return {}
  }
}
