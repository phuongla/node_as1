#!/usr/bin/env babel-node --
require('./helper')
let fs = require('fs').promise
let path = require('path')
let Promise = require('songbird')

async function ln(source, dest) {  
  fs.stat(source).then(async (stat) => {
    if(stat.isDirectory()) {
      process.stdout.write(`ln: ${source}: Is a directory\n`)
    } else {
      let objSource = path.parse(source)      
      let objDest = path.parse(dest)    
      let absDest = dest
      if(objDest.ext === '') {
        absDest = path.join(dest, objSource.base)
      }
      console.log(absDest)
      fs.link(source, absDest).catch(err => {
        if (err.code === 'EEXIST') {
          process.stdout.write(`ln: ${absDest}: File exists\n`)
        }
      })      
    }    
  }).catch(err => {
    console.log(err.message + " --- " + err.code)
    if (err.code === 'EACCES') {
      process.stdout.write(`ln: ${source}: Permission denined\n`)
    } else if (err.code === 'ENOENT') {
      process.stdout.write(`ln: ${source}: No such file or directory\n`)
    }
  })
  
}

async function run() { 
  let source = ''
  let dest = '' 
  if (process.argv.length > 3) {
    source = process.argv[2]
    dest = process.argv[3]
    if (!path.isAbsolute(source)) {
      source = path.join(__dirname, source)
    }
    if (!path.isAbsolute(dest)) {
      dest = path.join(__dirname, dest)
    }
  } else {
    process.stdout.write(`ls: wrong syntax (./ln.js [source] [dest]) \n`)
  }
  await ln(source, dest)
}

run()

