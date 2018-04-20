### jest-create-snapshot

Automatically generate snapshot tests for your react components with random values for the props.

If you specify the path to a folder or directory, it creates snapshot tests for all the components inside that directory. Even for components inside a sub directory inside that directory.

It works best if you have defined types for your props using either [`prop-types`](https://www.npmjs.com/package/prop-types) or using [`flow`](http://flowtype.org/).

It will not work with styled components for now.

Usage -

```
$ npm i -g create-snapshot-test
; All the usage
$ create-shapshot-test --help

  Usage: create-snapshot-test [path] [options]

  Generate snapshot tests for your React component.
    If a directory is passed, it is recursively traversed.

  Options:

    -o, --out <file>  Write the snapshot test in FILE
    --no-pretty       Don't pass output through prettier. Default - false
    optional          If you want to generate values for optional props too
    -h, --help        output usage information

$ create-snapshot-test path/to/component.js
Generated snapshot test
---------------------------------------------------------

import React from "react";
import renderer from "react-test-renderer";
import FakeComponent from "/Users/mukesh/Documents/projects/create-snapshot-test/__tests__/__mocks__/fake_component.js";

test("Should render FakeComponent correctly", () => {
  const tree = renderer
    .create(
      <FakeComponent
        firstName={"firstName"}
        person={{ firstName: "person.firstName", age: 1 }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

OR
$ create-snapshot-test path/to/component.js -o __tests__/path/to/test_file.js
```

### API

```
const createSnapshotTest = require('create-snapshot-test')

const snapshotTest = createSnapshotTest('path/to/your/component.js', true /* if you want values to be generated for optional props too */)
```
