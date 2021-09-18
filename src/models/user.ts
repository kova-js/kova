import { Prisma, User as PrismaUser } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'
import dayjs from 'dayjs'

export type { PrismaUser as User }

const TransformDate = Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })

export class UserModel implements PrismaUser {
  avatar: string
  id: number
  email: string
  name: string
  slug: string
  url: string
  meta: Prisma.JsonValue
  cover: string
  bio: string
  description: string
  mobile: string
  openid: string

  @TransformDate
  @Exclude()
  updatedPwdAt: Date

  @Exclude()
  password: string

  @TransformDate
  loggedAt: Date

  @TransformDate
  createdAt: Date

  @TransformDate
  updatedAt: Date

  @Exclude()
  deleteAt: Date
}
