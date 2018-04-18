import React from "react";
import renderer from "react-test-renderer";
import FakeComponent from "/Users/mukesh/Documents/projects/create-snapshot-test/fake_component.js";

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
