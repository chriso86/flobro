/* Copyright (c) 2021 Tom Chen (tomchen.org) */

// source: https://jestjs.io/docs/code-transformation#examples

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
  },
}
