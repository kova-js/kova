import path from 'path'
import fs from 'fs'

function getBundleId() {
  const bundleFilePath = path.join(process.cwd(), './public/BUNDLE_ID')
  return fs.existsSync(bundleFilePath) ? fs.readFileSync(bundleFilePath, 'utf8') : ''
}

function app() {
  return {
    name: 'kova',

    bundleId: getBundleId(),
  }
}

export default app
