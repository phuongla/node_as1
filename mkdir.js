#!/usr/bin/env babel-node --
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function mkdir(dir) {
  let pathObj = await path.parse(dir)
  let parentDir = pathObj.dir
  fs.stat(parentDir).then(async (stat) => {
    if (stat.isFile()) {
      process.stdout.write(`mkdir: ${parentDir}: Not a directory\n`)
      return
    }
    fs.mkdir(dir).catch(err => {
      if (err.code === 'EEXIST') {
        process.stdout.write(`mkdir: ${dir}: File exists\n`)
      }
    })
  }).catch(err => {
    console.log(err.code)
    if (err.code === 'EACCES') {
      process.stdout.write(`mkdir: ${parentDir}: Permission denined\n`)
    } else if (err.code === 'ENOTDIR') {
      process.stdout.write(`mkdir: ${parentDir}: Not a directory\n`)
    } else if (err.code === 'ENOENT') {
      process.stdout.write(`mkdir: ${parentDir}: No such file or directory\n`)
    }
  })
}

async function run() {
  let dir = ''
  if (process.argv.length > 2) {
    dir = process.argv[process.argv.length - 1]
    if (!path.isAbsolute(dir)) {
      dir = path.join(__dirname, dir)
    }
  }
  await mkdir(dir)
}

run()
