### jest-create-snapshot

Automatically generate snapshot tests for your react components with random values for the props.

Usage -

```
$ npm i -g create-snapshot-test
$ create-shapshot-test --help

  Usage: create-snapshot-test [path] [options]

  Generate snapshot tests for your React component.
    If a directory is passed, it is recursively traversed.

  Options:

    -o, --out <file>  Write the snapshot test in FILE
    optional          If you want to generate values for optional props too
    -h, --help        output usage information

$ create-snapshot-test path/to/component.js
Output -
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
