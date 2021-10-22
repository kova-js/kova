// const packageInfo = require('../package.json')
import fs from 'fs'
import path from 'path'

export function main(): void {
  const bundleFilePath = path.join(__dirname, '../public/BUNDLE_ID')
  fs.writeFileSync(bundleFilePath, String(Date.now()), 'utf8')
}

main()
