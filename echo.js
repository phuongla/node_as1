#!/usr/bin/env babel-node --
require('./helper')

async function echo() {
  let str = ''
  for (let i = 2; i < process.argv.length; i++) {
    str += process.argv[i] + ' '
  }
  str = str.trim()
  process.stdout.write(str + '\n')
}

echo()
