#!/usr/bin/env babel-node --
require('./helper')
let fs = require('fs').promise
let path = require('path')
let Promise = require('songbird')

async function rm(currentPath) {
  let stats = await fs.stat(currentPath)
  if (stats.isFile()) {
    return currentPath
  }
  let fileArray = [currentPath]
  let filenames = await fs.readdir(currentPath)
  filenames.forEach(async (file) => {
    let files = await rm(path.join(currentPath, file))
    fileArray.push(files)
  })
  return fileArray
}

async function rm1 (dir) {
  let data = await rm(dir)
  console.log(data)
    /*
    if (err.code === 'EACCES') {
      process.stdout.write(`rm: ${dir}: Permission denined\n`)
    } else if (err.code === 'ENOENT') {
      process.stdout.write(`rm: ${dir}: No such file or directory\n`)
    } else if (err.code === 'EPERM') {
      process.stdout.write(`rm: ${dir}: Operation not permitted\n`)
    }*/
}

async function run() {
  let dir = ''
  if (process.argv.length > 2) {
    dir = process.argv[process.argv.length - 1]
    if (!path.isAbsolute(dir)) {
      dir = path.join(__dirname, dir)
    }
  }
  await rm1(dir)
}

run()
