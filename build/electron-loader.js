const REQUIRES = {
  remote: `const remote = window.require("@electron/remote")`,
  fs: `const fs = window.require("fs")`,
  path: `const path = window.require("path")`
}

/**
 * 将 vue 文件中的 node, electron 模块的 import 替换为 window.require()
 */
module.exports = function (source, map) {
  source = source
    .replace(`import remote from "@electron/remote"`, REQUIRES.remote)
    .replace(`import fs from "fs"`, REQUIRES.fs)
    .replace(`import path from "path"`, REQUIRES.path)
  this.callback(null, source, map)
}
