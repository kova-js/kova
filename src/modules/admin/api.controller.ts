import { Controller, Get, Inject, Param } from '@nestjs/common'
import _ from 'lodash'
import { User } from '@prisma/client'
import { AdminApiPrefix } from '@/constants/constants'

@Controller(AdminApiPrefix)
export class AdminApiController {
  @Get('/statistics')
  async statistics() {
    return {
      postCount: 1,
      commentCount: 0,
      categoryCount: 1,
      tagCount: 0,
      journalCount: 0,
      birthday: 1634966740580,
      establishDays: 0,
      linkCount: 0,
      visitCount: 0,
      likeCount: 0,
    }
  }
}
