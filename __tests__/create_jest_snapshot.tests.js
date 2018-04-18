const createJestSnapshot = require("../src/index")
const path = require("path")

it("should pass", () => {
  const fakeComponentPath = path.join(__dirname + "/../fake_component.js")
  expect(createJestSnapshot(fakeComponentPath)).toMatchSnapshot()
})
