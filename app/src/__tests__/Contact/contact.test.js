import 'react-native';
import React from 'react';
import Contact from './../../Messenger/contact';
import renderer from 'react-test-renderer';

beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
});

it('renders correctly', () => {
  const tree = renderer.create(<Contact />).toJSON();
  expect(tree).toMatchSnapshot();
});
