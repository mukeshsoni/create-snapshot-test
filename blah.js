import React from 'react';
import renderer from 'react-test-renderer'
import FakeComponent from "/Users/mukesh/Documents/projects/jest-create-snapshot/fake_component.js"

test('Should render FakeComponent correctly', () => {
  const tree = renderer.create(
      <FakeComponent firstName={"firstName"} person={{"firstName":"person.firstName"}}/> 
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
