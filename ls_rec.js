require('./helper')
const fs = require('fs').promise
const path = require('path')
const _ = require('lodash')
const Promise = require('songbird')

async function rc(currentPath, option) {
  if (!fs.access(currentPath)) {
    return [currentPath]
  }
  let stats = await fs.stat(currentPath)
  if (stats.isFile()) {
    return [currentPath]
  }
  let filenames = await fs.readdir(currentPath)
  if (filenames.length === 0) {
    return [currentPath]
  }
  if (option !== '-R') {
    let fileReturn = []
    filenames.forEach(file => {
      let fullPath = path.join(currentPath, file)
      fileReturn.push(fullPath)
    })
    return fileReturn
  }
  let promises = []
  filenames.forEach(file => {
    let fullPath = path.join(currentPath, file)
    let promise = rc(fullPath, option)
    promises.push(promise)
  })

  return Promise.all(promises)
}

async function ls(dir, option) {
  let data = await rc(dir, option)
  return _.flatten(data)
}

module.exports = ls
