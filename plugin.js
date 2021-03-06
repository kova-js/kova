'use strict'
const { nestjsPlugin } = require('ssr-plugin-nestjs')
const { vuePlugin } = require('ssr-plugin-vue3')

module.exports = {
  serverPlugin: nestjsPlugin(),
  clientPlugin: vuePlugin(),
}
