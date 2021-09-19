export const ContentApiPrefix = '/api/content'
export const AdminApirPefix = '/api/admin'

export class UserConstants {
  static readonly USERNAME_MIN_LENGTH: number = 4
  static readonly USERNAME_MAX_LENGTH: number = 16
  static readonly PASSWORD_MIN_LENGTH: number = 6
  static readonly PASSWORD_MAX_LENGTH: number = 20
}

export class PeriodConstants {
  static readonly ALL: number = 0
  static readonly DAY: number = 1 // 一天内
  static readonly WEEK: number = 2 // 一周内
  static readonly THREE_MONTHS: number = 3 // 三月内
}
