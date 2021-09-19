import env from '@/utils/env'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: env('JWT_SECRET'),
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthTokenModule {}
