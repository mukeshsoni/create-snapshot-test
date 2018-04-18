#!/usr/bin/env node

const createJestSnapshot = require("../dist/index.js")
const fs = require("fs")
const path = require("path")

var argv = require("commander")

argv
  .usage("[path] [options]")
  .description(
    `Generate snapshot tests for your React component.
    If a directory is passed, it is recursively traversed.`
  )
  .option("-o, --out <file>", "Write the snapshot test in FILE")
  .option("--no-pretty", "Don't pass output through prettier. Default - false")
  .option("optional", "If you want to generate values for optional props too")

argv.parse(process.argv)
const paths = argv.args || []
const outputFile = argv.out
const optional = !!argv.optional
const pretty = argv.pretty

if (paths.length > 0) {
  const componentPath = path.join(process.cwd(), paths[0])

  if (!fs.existsSync(componentPath)) {
    console.error("The file: ", componentPath, " does not exist")
  } else {
    const snapshotTests = createJestSnapshot(componentPath, optional, pretty)

    if (outputFile) {
      fs.writeFileSync(outputFile, snapshotTests)
      console.log("Snapshot tests written to file ", outputFile)
    } else {
      console.log("Generated snapshot test")
      console.log("---------------------------------------------------------\n")
      console.log(snapshotTests)
    }
  }
} else {
  console.log("Need a path to a component file")
}
