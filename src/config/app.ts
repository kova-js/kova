import env from '@/utils/env'
import fs from 'fs'
import path from 'path'

function getBundleId() {
  const bundleFilePath = path.join(process.cwd(), './public/BUNDLE_ID')
  return fs.existsSync(bundleFilePath) ? fs.readFileSync(bundleFilePath, 'utf8') : ''
}

function app(): { name: string; env: any; debug: any; locale: string; key: any; bundleId: any } {
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
