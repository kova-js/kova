import { JwtGuard } from '@/core/guards/jwt.guard'
import { LoggerService } from '@/core/logger'
import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('/api')
export class AuthApiController {
  @Inject(LoggerService)
  private readonly logger: LoggerService

  @Inject(AuthService)
  private readonly service: AuthService

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.service.validateUser(loginDto.username, loginDto.password)
      const token = await this.service.login(user)
      return { token }
    } catch (error) {
      this.logger.log(error.message)
    }
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.service.register(registerDto)
      return user
    } catch (error) {
      this.logger.log(error.message)
    }
  }

  @UseGuards(JwtGuard)
  @Get('/profile')
  async getProfile(@Req() req: Request) {
    this.logger.log('user', (req as any).user)
    return (req as any).user
  }
}
