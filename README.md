### jest-create-snapshot

Automatically generate snapshot tests for your react components with random values for the props.

Usage -

```
$ npm i -g create-snapshot-test
$ create-snapshot-test path/to/component.js
OR
$ create-snapshot-test path/to/component.js -o __tests__/path/to/test_file.js
```

### API

```
const createSnapshotTest = require('create-snapshot-test')

const snapshotTest = createSnapshotTest('path/to/your/component.js')
```
