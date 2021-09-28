import { isFunction, get } from 'lodash-es'
import path from 'path'
import { sync as globSync } from 'glob'

const configPath = path.resolve(process.cwd(), 'dist/config/**/!(*.d).{ts,js}')
console.log(configPath)

export class ConfigCacheProvider {
  private static config = {}

  // constructor() {
  //   this.config = CacheProvider.loadConfig()
  // }

  get config() {
    return ConfigCacheProvider.config
  }

  /**
   * Get config module from a file path
   * @param {string} file
   * @returns {any}
   */
  protected static loadModule(file: string): any {
    try {
      const module = require(file)
      if (module) {
        const config = module.default || module
        return isFunction(config) ? config() : config
      }
    } catch (error) {
      console.error(error)
    }
    return null
  }

  /**
   * Get config name from a file path
   * @param {string} file
   * @returns {string}
   */
  protected static getConfigName(file: string): string {
    const ext = path.extname(file)
    return path.basename(file, ext)
  }

  public static loadConfig(rootPath = '') {
    const allConfig = {}
    const configFiles = globSync(rootPath || configPath)
    for (const file of configFiles) {
      const config: unknown = this.loadModule(file)
      if (!config) continue
      const fileName = this.getConfigName(file)
      allConfig[fileName] = config
    }
    this.config = allConfig
  }

  get(key: string) {
    return get(this.config, key)
  }
}

interface IConfig {
  provider?: ConfigCacheProvider
  (name: string): any
}

export const config: IConfig = function (key: string) {
  let provider = config.provider
  if (!provider) {
    config.provider = provider = new ConfigCacheProvider()
  }
  return provider.get(key)
}

export default config
