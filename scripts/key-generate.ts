import { Command } from 'commander'
import cryptoRandomString from 'crypto-random-string'
import EnvFileWriter from 'env-file-rw'
import fs from 'fs'
import path from 'path'

export const basePath = path.resolve(__dirname, '../')

export function main(): void  {
  const program = new Command()
  program.option('-f, --force', 'force generate key.').parse(process.argv)
  const opts = program.opts()

  const envPath = path.resolve(basePath, '.env')
  if (!fs.existsSync(envPath)) fs.copyFileSync(path.resolve(basePath, '.env.example'), envPath)
  const envFileWriter = new EnvFileWriter(envPath)
  if (opts.force || !envFileWriter.get('APP_KEY')) {
    const key = cryptoRandomString(16)
    envFileWriter.set('APP_KEY', key)
    envFileWriter.saveSync()
    console.log('🔑  Application key set successfully.')
  }
}

main()
