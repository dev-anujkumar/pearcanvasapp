import React from 'react';
import { mount, shallow } from 'enzyme';
import SectionSeperator from '../../../src/component/ElementAsideContainer/SectionSeperator';



describe('Testing SectionSeperator component with props', () => {
    let props = {
        elemBorderToggle: true,
        borderToggle: 'active'
    }
    let wrapper = mount(< SectionSeperator {...props} />)

    const instance = wrapper.instance();
    describe('Testing SectionSeperator component', () => {
        console.log("wrapper", wrapper)
        it('should render handleSeperatorBlur function', () => {
            const event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            };

            instance.handleSeperatorBlur(event)
            const sectionFocus = wrapper.find('SectionSeperator').state().sectionFocus
            expect(sectionFocus).toEqual(false);
        })

        it('should render handleSeperator function', () => {
            const event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            };
            instance.handleSeperator(event)
            const sectionFocus = wrapper.find('SectionSeperator').state().sectionFocus
            expect(sectionFocus).toEqual(true);
        })


    })

})