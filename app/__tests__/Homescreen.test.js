import React from 'react';
import {create} from 'react-test-renderer';


import HomeScreen  from './../Homescreen/HomeScreen'

const tree = create(<HomeScreen />)
test('HomeScreen', () => {
   expect(tree).toMatchSnapshot();
})