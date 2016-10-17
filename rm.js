#!/usr/bin/env babel-node --
require('./helper')
let fs = require('fs').promise
let path = require('path')
let Promise = require('songbird')

async function rm_file(currentPath, option) {  
  let stats = await fs.stat(currentPath)
  if (stats.isFile()) {    
    await fs.unlink(currentPath)
    return
  }
  let filenames = await fs.readdir(currentPath)
  if (filenames.length === 0) {
    fs.rmdir(currentPath)
    return
  }

  let promises = []
  filenames.forEach(file => {
    let fullPath = path.join(currentPath, file)
    let promise = rm_file(fullPath, option)
    promises.push(promise)
  })
  Promise.all(promises)
}

async function rm_dir(currentPath, option) {  
  let stats = await fs.stat(currentPath)
  if (stats.isFile()) {    
    return
  }
  let filenames = await fs.readdir(currentPath)
  if (filenames.length === 0) {
    // fs.rmdir(currentPath)
    console.log('remove dir' + currentPath)
    return
  }  
  filenames.forEach(async (file) => {
    let fullPath = path.join(currentPath, file)
    await rm_dir(fullPath, option)
  })
  console.log('remove top dir' + currentPath)
  //await fs.rmdir(currentPath)
}

async function rm (dir) {
  await rm_file(dir)  
  //await rm_dir(dir)
}

async function run() {
  let dir = ''
  if (process.argv.length > 2) {
    dir = process.argv[process.argv.length - 1]
    if (!path.isAbsolute(dir)) {
      dir = path.join(__dirname, dir)
    }
  }
  await rm(dir)
}

run()
