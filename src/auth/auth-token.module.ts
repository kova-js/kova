import config from '@/core/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config('jwt.secret'),
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthTokenModule {}
