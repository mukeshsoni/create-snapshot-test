#!/usr/bin/env node

const createJestSnapshot = require("../dist/index.js")
const fs = require("fs")
const path = require("path")

var argv = require("minimist")(process.argv.slice(2))
console.log("arguments", argv)

if (argv._.length === 0) {
  console.error("Need the path of the component file")
} else {
  const componentPath = path.join(process.cwd(), argv._[0])

  if (!fs.existsSync(componentPath)) {
    console.error("The file: ", componentPath, " does not exist")
  } else {
    const snapshotTests = createJestSnapshot(componentPath)

    if (argv.o) {
      fs.writeFileSync(argv.o, snapshotTests)
      console.log("Snapshot tests written to file ", argv.o)
    } else {
      console.log("Generated snapshot test")
      console.log("---------------------------------------------------------\n")
      console.log(snapshotTests)
    }
  }
}
