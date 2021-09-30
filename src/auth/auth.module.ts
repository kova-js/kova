import { UserModule } from '@/modules/user'
import { Module } from '@nestjs/common'
import { AuthApiController } from './api.controller'
import { AuthTokenModule } from './auth-token.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [UserModule, AuthTokenModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController, AuthApiController],
  exports: [AuthService],
})
export class AuthModule {}
