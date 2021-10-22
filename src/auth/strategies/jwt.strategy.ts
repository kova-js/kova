import { UserModel } from '@/models/user'
import { UserService } from '@/modules/user'
import env from '@/utils/env'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { plainToClass } from 'class-transformer'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

const tokenCookieName = 'token'

export interface AccessTokenPayload {
  id: string
  slug: string
  cacheId: string
  createdAt: number
}

const fromCookie = () => {
  return function (req: Request) {
    let token = null
    if (req && req.cookies) {
      token = req.cookies[tokenCookieName]
    }
    return token
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        fromCookie(),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: env('JWT_SECRET'),
    })
  }

  async validate(payload: AccessTokenPayload) {
    const user = await this.userService.getUser(
      { id: Number(payload.id) },
      { ignoreDecorators: true },
    )
    if (user && user.updatedPwdAt.getTime() < payload.createdAt) {
      return plainToClass(UserModel, user)
    }
    return null
  }
}
