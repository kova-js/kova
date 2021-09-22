import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import path from 'path'
import { AppModule } from './app.module'
import { bootstrap } from './bootstrap'
import { ConfigCacheProvider } from './core/config'
import { LoggerService } from './core/logger'

ConfigCacheProvider.loadConfig(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'))

async function main(): Promise<void> {
  const logger = new LoggerService()
  const express = new ExpressAdapter()
  logger.log('App Launcher...', ' 🚀 ')
  const app = await NestFactory.create<NestExpressApplication>(AppModule, express, {
    logger,
  })
  await bootstrap(app, true)
}

main()
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
  .finally(() => {
    //
  })
