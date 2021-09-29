#!/usr/bin/env node

const { version } = require('../package.json')
const { Command } = require('commander')
const program = new Command()
// console.log(program.version)
program.version(version)

const opts = program.opts()
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name(), 
})

program.command('setup').action(() => {
  console.log('111')
  console.log(options)
})

program
  .option('-f, --force')
  .command('build [env]')
  .action((env, options) => {
    console.log('build', env)
    console.log(opts)
    const opts2 = program.opts()
    console.log(opts2)
    console.log(options)
  })

program.parse(process.argv)

// const options = program.opts()
// console.log('you ordered a pizza with:')
// if (options.peppers) console.log('  - peppers')
// const cheese = !options.cheese ? 'no' : options.cheese
// console.log('  - %s cheese', cheese)
