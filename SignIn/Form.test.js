import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../Form.js';

it('renders correctly', () => {
  const tree = renderer
    .create(<Form page="http://localhost:8080/">help recover</Form>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});