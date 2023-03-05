import { mount } from 'enzyme';
import Home from '../../../src/pages/home/Home';
import React from 'react';

const wrapper = mount(<Home />);

describe('Home', () => {
	it('Should exists', () => {
		expect(wrapper).toBe(true);
	});
});

