#!/usr/bin/env node

const createJestSnapshot = require("../dist/index.js")
const fs = require("fs")
const path = require("path")
const recursive = require("recursive-readdir")

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

function printTests(fileName, snapshotTests) {
  console.log("Snapshot test for ", fileName)
  console.log("---------------------------------------------------------\n")
  console.log(snapshotTests + "\n")
}

function writeTestsToFile(fileName, content) {
  fs.writeFileSync(fileName, content)
  console.log("Snapshot tests written to file ", fileName)
}

function stripExtension(fileName) {
  return fileName.split(".")[0]
}

function getFileName(filePath) {
  const pathParts = filePath.split("/")
  const fileName = pathParts[pathParts.length - 1]

  return stripExtension(fileName)
}

if (paths.length > 0) {
  const componentPath = path.join(process.cwd(), paths[0])

  if (!fs.existsSync(componentPath)) {
    console.error("The file: ", componentPath, " does not exist")
  } else {
    if (fs.lstatSync(componentPath).isDirectory()) {
      recursive(paths[0]).then(files => {
        const snapshotTests = files.map(file => ({
          fileName: file,
          test: createJestSnapshot(file, optional, pretty)
        }))

        if (outputFile) {
          if (
            fs.existsSync(outputFile) &&
            !fs.lstatSync(outputFile).isDirectory()
          ) {
            console.log(
              "While specify a folder/directory for input, need to specify a folder/directory for output"
            )
            snapshotTests.map(snapshotTest =>
              printTests(snapshotTest.fileName, snapshotTest.test)
            )
          } else {
            if (!fs.existsSync(outputFile)) {
              fs.mkdirSync(outputFile)
            }

            snapshotTests.map(snapshotTest => {
              writeTestsToFile(
                outputFile +
                  "/" +
                  getFileName(snapshotTest.fileName) +
                  "-test.js",
                snapshotTest.test
              )
            })
          }
        } else {
          snapshotTests.map(snapshotTest =>
            printTests(snapshotTest.fileName, snapshotTest.test)
          )
        }
      })
    } else {
      const snapshotTests = createJestSnapshot(componentPath, optional, pretty)

      if (outputFile) {
        writeTestsToFile(outputFile, snapshotTests)
      } else {
        printTests(componentPath, snapshotTests)
      }
    }
  }
} else {
  console.log("Need a path to a component file")
}
