import React from 'react'
import { mount } from 'enzyme';
import { SmalllLoader, LargeLoader } from '../../../src/component/SlateWrapper/ContentLoader'
import { SlateFooter } from '../../../src/component/SlateWrapper/SlateFooter.jsx';

jest.mock('../../../src/config/config.js', () => {
    return {
        page: 4,
        totalPageCount: 3,
        pageLimit: 10
    }
});

import config from '../../../src/config/config.js';

describe('', () => {
    let props = {
        elements: [{
            id: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74"
        }, {
            id: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa64"
        }]
    }
    it('renders SlateFooter---> OR case-1 true', () => {
        let wrapper = mount(<SlateFooter {...props} />);
        expect(wrapper.find('div.slate-footer')).toHaveLength(1)
    })
    it('renders SlateFooter---> OR case-2 true', () => {
        config.page = 1;
        config.totalPageCount = 3;
        config.pageLimit = 3;
        let wrapper = mount(<SlateFooter {...props} />);
        expect(wrapper.find('div.slate-footer')).toHaveLength(1)
    })
    it('renders SlateFooter---> OR both case false', () => {
        props = {
            elements: [{
                id: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74"
            }]
        }
        config.page = 1;
        config.totalPageCount = 3;
        config.pageLimit = 0;
        let wrapper = mount(<SlateFooter {...props} />);
        expect(wrapper.find('div.loaderContainer')).toHaveLength(1)
    })
    it('renders SmalllLoader without crashing', () => {
        let wrapper = mount(<SmalllLoader />);
        expect(wrapper.find('div.sm')).toHaveLength(1)
    })
    it('renders LargeLoader without crashing', () => {
        const div = document.createElement('div');
        let wrapper = mount(<LargeLoader />);
        expect(wrapper.find('div.lg')).toHaveLength(1)
    })
})