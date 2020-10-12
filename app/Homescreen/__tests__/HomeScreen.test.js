import 'react-native';
import React from 'react';
import HomeScreen from '../HomeScreen'
import renderer from 'react-test-renderer';

test('Home snapShot',  () => {
    const snap = renderer.create(
        <HomeScreen />
    ).toJSON
expect(snap).toMatchSnapshot();
})