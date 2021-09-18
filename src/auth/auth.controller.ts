import { Get } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { SsrRender } from '@/core/render'

@Controller()
export class AuthController {

  constructor() {}

  @Get('/login')
  @SsrRender()
  async showLoginPage() {
    return {}
  }

  @Get('/register')
  @SsrRender()
  async showRegisterPage() {
    return {}
  }
}
