import { UserModel } from '@/models/user'
import { UserService } from '@/modules/user'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync, hashSync } from 'bcrypt'
import { plainToClass } from 'class-transformer'
import { RegisterDto } from './dto/register.dto'
import { AccessTokenPayload } from './strategies/jwt.strategy'

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService

  constructor(readonly jwtService: JwtService) {}

  verifyPassword(password: string, oldPwd: string) {
    if (!password || !oldPwd) {
      return false
    }
    try {
      const hashPwd = hashSync(password, 10)
      console.log(hashPwd)
    } catch (error) {
      console.log(error)
    }
    return compareSync(password, oldPwd)
  }

  async validateUser(slug: string, pass: string) {
    const user = await this.userService.getUser({ slug }, { ignoreDecorators: true })
    if (!(user && this.verifyPassword(pass, user.password))) {
      throw new HttpException('账号或密码不正确', 400)
    }
    return plainToClass(UserModel, user)
  }

  async login(user: UserModel) {
    const cacheId = `${user.name}_${new Date().getTime() % 1000000}`
    // const cacheKey = `login_id_${user.id}`
    // const cacheIds: string[] = ((await this.cacheService.get(cacheKey)) || "")
    //   .split(",")
    //   .filter((k) => k)
    // cacheIds.push(cacheId)
    // await this.cacheService.set(cacheKey, cacheIds.join(","), 3600 * 24 * 30)
    const payload: AccessTokenPayload = {
      slug: user.slug,
      id: String(user.id),
      createdAt: Date.now(),
      cacheId,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(registerDto: RegisterDto) {
    const data = await this.userService.createUser({
      name: registerDto.name,
      slug: registerDto.name,
      email: registerDto.email,
      password: hashSync(registerDto.password, 10),
    })

    return data
  }
}
