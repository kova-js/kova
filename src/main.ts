import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { bootstrap } from './bootstrap'
import { LoggerService } from './core/logger'
// declare const module: any

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
  .catch(() => {
    process.exit(1)
  })
  .finally(() => {
    //
  })
