#!/usr/bin/env babel-node --
require('./helper')
let fs = require('fs').promise
let path = require('path')
let Promise = require('songbird')

async function grep(search, dest) {  
  fs.stat(dest).then(async (stat) => {
    if(stat.isDirectory()) {
      process.stdout.write(`ln: ${source}: Is a directory\n`)
    } else {
      let content = await fs.readFile(dest)
      let datas = content.toString().split('\n')      
      datas.forEach(line => {
        if(line.indexOf(search) > -1) {
          process.stdout.write(line + '\n')
        }
      })
    }    
  }).catch(err => {
    console.log(err.message + " --- " + err.code)
    if (err.code === 'EACCES') {
      process.stdout.write(`ln: ${source}: Permission denined\n`)
    } else if (err.code === 'ENOENT') {
      process.stdout.write(`ln: ${source}: No such file\n`)
    }
  })
  
}

async function run() { 
  let search = ''
  let dest = '' 
  if (process.argv.length > 3) {
    search = process.argv[2]
    dest = process.argv[3]        
    if (!path.isAbsolute(dest)) {
      dest = path.join(__dirname, dest)
    }
  } else {
    process.stdout.write(`grep: wrong syntax (./grep.js [search] [file path]) \n`)
  }
  await grep(search, dest)
}

run()

