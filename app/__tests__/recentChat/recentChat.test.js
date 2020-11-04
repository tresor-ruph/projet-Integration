/* eslint-disable import/imports-first */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import React from 'react';
import RecentChat from './../../Messenger/recentChats';
import renderer from 'react-test-renderer';

beforeAll(() => { 
    jest.mock('@react-native-community/async-storage');
  });

it('renders correctly', () => {
    const tree = renderer.create(<RecentChat />).toJSON();
    expect(tree).toMatchSnapshot();
});
