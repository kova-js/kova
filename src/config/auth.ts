import env from '@/utils/env'

export default () => ({
  jwt: {
    secret: env('JWT_SECRET'),
  },
})
