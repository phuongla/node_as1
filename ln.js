#!/usr/bin/env babel-node --
require('./helper')
let fs = require('fs')
let path = require('path')

async function ln (dir) {
  fs.promise.access(dir, fs.constants.R_OK).then(async (err) => {
    if (err) {
      process.stdout.write(`cat: ${dir}: permission denied\n`)
      return
    }
    let stat = await fs.promise.stat(dir)
    if (stat.isDirectory()) {
      process.stdout.write(`cat: ${dir}: Is a directory\n`)
      return
    }
    let data = await fs.promise.readFile(dir, 'utf8')
    process.stdout.write(data)
  }).catch(err => {
    if (err.code === 'EACCES') {
      process.stdout.write(`cat: ${dir}: permission denied\n`)
    } else if (err.code === 'ENOENT') {
      process.stdout.write(`cat: ${dir}: is not exist\n`)
    } else {
      process.stdout.write(err.message + '\n')
    }
  })
}

async function run() {
  let dir = __dirname
  let option = ''
  if (process.argv.length > 2) {
    dir = process.argv[process.argv.length - 1]
    if (!path.isAbsolute(dir)) {
      dir = path.join(__dirname, dir)
    }
  }
  if (process.argv.length > 3) {
    option = process.argv[2]
  }
  await ln(dir)
}

run()

