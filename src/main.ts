import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import path from 'path'
import { AppModule } from './app.module'
import { bootstrap } from './bootstrap'
import { ConfigCacheProvider } from './core/config'
import { LoggerService } from './core/logger'
import yaml from 'js-yaml'
import fs from 'fs'

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

const da = yaml.load(fs.readFileSync(path.resolve(process.cwd(), 'config.yml'), 'utf8'))
fs.writeFileSync(
  path.resolve(process.cwd(), 'config2.yml'),
  yaml.dump(da),
  'utf8',
)

main()
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
  .finally(() => {
    //
  })
