import fs from 'fs'
import { isFunction, get } from 'lodash'
import path from 'path'
const configPath = path.resolve(process.cwd(), 'dist/config')

class CacheProvider {
  private readonly config = {}

  constructor() {
    this.config = this.loadConfig()
  }

  loadModule(filePath: string) {
    try {
      const obj = require(filePath)
      if (!obj) return obj
      let config = obj.__esModule ? ('default' in obj ? obj.default : obj) : {}
      if (isFunction(config)) {
        config = config()
      }
      return config
    } catch (error) {
      return {}
    }
  }

  loadConfig() {
    const allConfig = {}
    const configFiles = fs.readdirSync(configPath).filter((f) => path.extname(f) === '.js')
    for (const file of configFiles) {
      const extname = path.extname(file)
      const filePath = path.join(configPath, file)
      let config: any = this.loadModule(filePath)
      if (isFunction(config)) config = config()
      const fileName = path.basename(file, extname)
      allConfig[fileName] = config
    }
    return allConfig
  }

  get(key: string) {
    return get(this.config, key)
  }
}

interface IConfig {
  provider?: CacheProvider
  (name: string): any
}

const Config: IConfig = function (key: string) {
  let provider = Config.provider
  if (!provider) {
    Config.provider = provider = new CacheProvider()
  }
  return provider.get(key)
}

export default Config
