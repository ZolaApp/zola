#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

program.version('0.1.1')

const handleDefault = () => {
  console.log(
    chalk.bgYellow.black(
      'Sorry! This command is not yet available but we’re working hard and we expect to ship it very soon!\n'
    )
  )
}

const handleExtract = () => {
  const parsing = ora('Parsing project…')
  const uploading = ora('Uploading…')

  parsing.start()

  wait(3000).then(() => {
    parsing.text = '13 new keys found…'
    parsing.succeed()
    uploading.start()

    wait(1000).then(() => {
      uploading.text = '13 keys uploaded. 🚀'
      uploading.succeed()
    })
  })
}

program
  .command('login')
  .description('Log in to your Zola account.')
  .action(handleDefault)

program
  .command('link <projectName>')
  .description('Link the current directory to your corresponding Zola project.')
  .action(handleDefault)

program
  .command('extract')
  .description(
    'Automatically extract all the keys from your code and upload them to your project.'
  )
  .alias('e')
  .action(handleExtract)

program
  .command('add <keyName> [defaultValue]')
  .description(
    'Allows you to add a key manually to your project. You can add a value for the default locale if you wish, as second argument.'
  )
  .alias('a')
  .action(handleDefault)

program
  .command('remove <keyName>')
  .description('Allows you to remove a key manually from your project.')
  .alias('r')
  .action(handleDefault)

program
  .command('prune')
  .description('Automatically prune your unused keys.')
  .alias('p')
  .action(handleDefault)

program.parse(process.argv)
