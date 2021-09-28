import _ from 'lodash-es'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

class EnvConfigService {
  private readonly allEnv = {}
  constructor() {
    const envFilePath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envFilePath)) {
      this.allEnv = dotenv.parse(fs.readFileSync(envFilePath))
    }
  }

  get(name: string, def: any = null): any {
    return _.get(this.allEnv, name, def)
  }
}

interface IEnv {
  service?: EnvConfigService
  (name: string, def?: any): any
}

const env: IEnv = function (name: string, def: any = null): any {
  let service = env.service
  if (!service) {
    env.service = service = new EnvConfigService()
  }
  return service.get(name, def)
}

export default env
