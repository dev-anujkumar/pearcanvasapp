import React from 'react';
import { mount, shallow } from 'enzyme';
import ErrorComp from '../../../src/component/AssetPopover/ErrorComp';

let ErrorCompProps = {
    errorMsg : 'this is error'
}

let wrapper;

beforeEach(() => {
    wrapper = mount(<ErrorComp {...ErrorCompProps}/>)
})

//Rendering test cases
describe('Test Rendering of ErrorComp', () => {
    it('Have 1 ErrorComp class ', () => {
        // const instance = wrapper.find('ErrorComp').instance();

        expect(wrapper.find('.ErrorComp')).toHaveLength(1);
    })
});