const fs = require("fs")
const path = require("path")
const fakeProps = require("react-fake-props")
const prettier = require("prettier")

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

function camelCase(str) {
  return str
    .split(/[_-]/g)
    .map(capitalize)
    .join("")
}

function getFileNameFromPath(path) {
  const pathParts = path.split("/")
  const fileNameWithExtension = pathParts[pathParts.length - 1]
  const fileName = fileNameWithExtension.split(".")[0]
  return fileName
}

/**
 * takes the path to a file
 * and converts it to a camel cased Component name as per the standards followed
 * by the react community
 * e.g. given 'path/to/fake_component.js', it will produce FakeComponent as output
 * @param {string} filePath
 */
function componentName(filePath) {
  return camelCase(getFileNameFromPath(filePath))
}

function serialize(propVal) {
  if (typeof propVal === "function") {
    return propVal.toString()
  } else {
    return JSON.stringify(propVal)
  }
}

function getPropsJsx(props) {
  return Object.entries(props)
    .map(([propName, propVal]) => {
      return `${propName}={${serialize(propVal)}}`
    })
    .join(" ")
}

function generateSnapshotTests(componentPath, optional = false) {
  const fp = fakeProps(componentPath, { optional })

  const testTemplate = `import React from 'react';
import renderer from 'react-test-renderer'
import ${componentName(componentPath)} from "${componentPath}"

test('Should render ${componentName(componentPath)} correctly', () => {
  const tree = renderer
    .create(<${componentName(componentPath)} ${getPropsJsx(fp)} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
`
  return testTemplate
}

module.exports = function(componentPath, optional = false, pretty = true) {
  if (!fs.existsSync(componentPath)) {
    return "Could not find file " + componentPath
  }

  if (pretty) {
    return prettier.format(generateSnapshotTests(componentPath, optional))
  } else {
    return generateSnapshotTests(componentPath, optional)
  }
}
