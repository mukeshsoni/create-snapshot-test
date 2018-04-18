const fs = require("fs")
const path = require("path")
const fakeProps = require("react-fake-props")

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * takes the path to a file
 * and converts it to a camel cased Component name as per the standards followed
 * by the react community
 * e.g. given 'path/to/fake_component.js', it will produce FakeComponent as output
 * @param {string} filePath
 */
function getFileName(filePath) {
  const pathParts = filePath.split("/")
  const fileNameWithExtension = pathParts[pathParts.length - 1]
  const fileName = fileNameWithExtension.split(".")[0]

  return fileName
    .split(/[_-]/g)
    .map(capitalize)
    .join("")
}

function getPropsJsx(props) {
  return Object.entries(props)
    .map(([propName, propVal]) => {
      return `${propName}={${JSON.stringify(propVal)}}`
    })
    .join(" ")
}

function generateSnapshotTests(componentPath) {
  const fp = fakeProps(componentPath)
  console.log(fp)

  const testTemplate = `import React from 'react';
import renderer from 'react-test-renderer'
import ${getFileName(componentPath)} from "${componentPath}"

test('Should render ${getFileName(componentPath)} correctly', () => {
  const tree = renderer
    .create(<${getFileName(componentPath)} ${getPropsJsx(fp)} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
`
  return testTemplate
}

module.exports = function(componentPath) {
  if (!fs.existsSync(componentPath)) {
    return "Could not find file " + componentPath
  }

  return generateSnapshotTests(componentPath)
}
