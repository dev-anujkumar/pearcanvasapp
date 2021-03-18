import React from 'react';
import { shallow } from 'enzyme';
import { InputSearch } from '../../../src/component/InputSearch/InputSearch.jsx';

describe('Testing InputSearch component', () => {
    let props = {
        searchClass: "learningToolSearchBar",
        searchId: "learningToolSearchBar",
        maxInputLimit:100,
        placeholderText: "Enter template title to search",
        searchValueHandler: jest.fn()
    }
    let event = {
        target: {
            value: 'Test'
        }
    }
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        wrapper = shallow(<InputSearch {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Render InputSearch', () => {
        wrapper.find('input#learningToolSearchBar').simulate('change', event);
        expect(wrapper.find('input#learningToolSearchBar')).toHaveLength(1);
    });

});