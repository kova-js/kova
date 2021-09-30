const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { getCwd } = require('ssr-server-utils')

const config = () => {
  return yaml.load(fs.readFileSync(path.resolve(getCwd(), 'config.yml'), 'utf8'))
}

module.exports = { config }
