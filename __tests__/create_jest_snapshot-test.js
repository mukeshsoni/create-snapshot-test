const createJestSnapshot = require("../src/index")
const path = require("path")

test("create snapshot test without optional props", () => {
  const fakeComponentPath = path.join(
    __dirname + "./__mocks__/fake_component.js"
  )
  expect(createJestSnapshot(fakeComponentPath)).toMatchSnapshot()
})

test("create snapshot test with optional props", () => {
  const fakeComponentPath = path.join(__dirname + "/../fake_component.js")
  expect(createJestSnapshot(fakeComponentPath, true)).toMatchSnapshot()
})
