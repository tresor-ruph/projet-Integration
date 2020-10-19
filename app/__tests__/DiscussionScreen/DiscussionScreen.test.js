/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import 'react-native';
import React from 'react';
// eslint-disable-next-line camelcase
import Discussion_Repo from '../../Messenger/Discussion_Screen';


it('renders correctly', () => {
    // eslint-disable-next-line react/jsx-pascal-case
    const tree = renderer.create(<Discussion_Repo />).toJSON();
    expect(tree).toMatchSnapshot();
});
