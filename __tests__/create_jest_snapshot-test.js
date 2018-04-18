const createJestSnapshot = require("../src/index")
const path = require("path")

test("create snapshot test without optional props", () => {
  const fakeComponentPath = path.join(
    __dirname + "/__mocks__/fake_component.js"
  )
  expect(createJestSnapshot(fakeComponentPath)).toMatchSnapshot()
})

test("create snapshot test with optional props", () => {
  const fakeComponentPath = path.join(
    __dirname + "/__mocks__/fake_component.js"
  )
  expect(createJestSnapshot(fakeComponentPath, true)).toMatchSnapshot()
})

test("create snapshot for components without proptypes", () => {
  const fakeComponentPath = path.join(
    __dirname + "/__mocks__/without_proptypes.js"
  )
  expect(createJestSnapshot(fakeComponentPath, true)).toMatchSnapshot()
})

test("create snapshot for components with flow types", () => {
  const fakeComponentPath = path.join(
    __dirname + "/__mocks__/with_flow_types.js"
  )
  expect(createJestSnapshot(fakeComponentPath, true)).toMatchSnapshot()
})
