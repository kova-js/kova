import { Get } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { SsrRender } from '@/core/render'

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
