/* eslint-disable import/imports-first */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import React from 'react';
import Chat from './../../Messenger/Chat';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Chat />).toJSON();
    expect(tree).toMatchSnapshot();
});
