/* eslint-disable import/imports-first */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import React from 'react';
import Profil from './../../Profil/Profil';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Profil />).toJSON();
    expect(tree).toMatchSnapshot();

});
