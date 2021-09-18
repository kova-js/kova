import { resolve } from 'path'

export function appPath(...path: string[]) {
  return basePath('./dist', ...path)
}

export function configPath() {
  return appPath('config')
}

export function basePath(...path: string[]) {
  return resolve(process.cwd(), ...path)
}
