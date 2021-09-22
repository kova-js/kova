import path from 'path'
import fs from 'fs'
import env from '@/utils/env'

function getBundleId() {
  const bundleFilePath = path.join(process.cwd(), './public/BUNDLE_ID')
  return fs.existsSync(bundleFilePath) ? fs.readFileSync(bundleFilePath, 'utf8') : ''
}

function app() {
  return {
    name: 'kova',
    env: process.env.NODE_ENV || 'development',
    debug: env('APP_DEBUG', false),
    locale: 'en',
    key: env('APP_KEY'),
    bundleId: getBundleId(),
  }
}

export default app
