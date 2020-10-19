/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import 'react-native';
import React from 'react';
import DiscussionMain from '../../Messenger/Dicussion_Main';


it('renders correctly', () => {
    // eslint-disable-next-line react/jsx-pascal-case
    const tree = renderer.create(<DiscussionMain />).toJSON();
    expect(tree).toMatchSnapshot();
});
