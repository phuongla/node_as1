#!/usr/bin/env babel-node --
require('./helper')
const path = require('path')
const ls = require('./ls_rec')

async function run() {
  let dir = __dirname
  try {
    let option = ''
    if (process.argv.length > 2) {
      dir = process.argv[2]
      if (!path.isAbsolute(dir)) {
        dir = path.join(__dirname, dir)
      }
    }
    if (process.argv.length > 3) {
      option = process.argv[3]
    }
    let filenames = await ls(dir, option)
    filenames.forEach(file => {
      process.stdout.write(file + '\n')
    })
  } catch (err) {
    if (err.code === 'EACCES') {
      process.stdout.write(`cat: ${dir}: permission denied\n`)
    } else if (err.code === 'ENOENT') {
      process.stdout.write(`cat: ${dir}: is not exist\n`)
    } else {
      process.stdout.write(err.message + '\n')
    }
  }
}

run()

module.exports.ls = ls
