import env from '@/utils/env'

export default () => {
  return {
    default: 'file',
    stores: {
      database: {
        driver: 'database',
        table: 'cache',
      },
      file: {
        driver: 'file',
        // 'path': storage_path('framework/cache/data'),
      },
      redis: {
        host: env('REDIS_HOST', '127.0.0.1'),
        password: env('REDIS_PASSWORD', null),
        port: env('REDIS_PORT', 6379),
        db: env('REDIS_DB', 0),
      },
    },
  }
}
