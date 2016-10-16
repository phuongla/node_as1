#!/usr/bin/env babel-node --
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function touch(dir) {
  fs.open(dir, 'a+').then(async (fd) => {
    let fstat = await fs.fstat(fd)
    await fs.fultimes(fd, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000))
    await fs.close(fd)
  }).catch(err => {
    // console.log(err.code)
    if (err.code === 'EACCES') {
      process.stdout.write(`touch: ${dir}: Permission denined\n`)
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
  await touch(dir)
}

run()
