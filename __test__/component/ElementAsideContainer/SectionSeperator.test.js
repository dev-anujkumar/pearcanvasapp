import React from 'react';
import { mount } from 'enzyme';
import SectionSeperator from '../../../src/component/ElementAsideContainer/SectionSeperator';
import { stub } from 'sinon';
const setActiveElement = new stub();

jest.mock('../../../src/config/config.js', () => ({
    asideToolbar: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    toolBarList: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag']
}));

describe('Testing SectionSeperator component with borderToggle', () => {
    let props = {
        borderToggle: 'active',
        userRole: "admin",
        permissions: ['elements_add_remove'],
        element: { type: "element-authoredtext", subtype: "test", id: "work" },
    }

    let wrapper = mount(< SectionSeperator setActiveElement={setActiveElement} {...props} />)
    const instance = wrapper.instance();

    describe('Testing SectionSeperator component', () => {
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
            instance.setState({
                showCopyPopup: true,
            })
            instance.handleSeperator(event)
            const sectionFocus = wrapper.find('SectionSeperator').state().sectionFocus
            expect(sectionFocus).toEqual(true);
        })
    })

})

describe('Testing SectionSeperator component without borderToggle', () => {
    let props = {
        userRole: "admin",
        permissions: ['elements_add_remove'],
        element: { type: "element-authoredtext", subtype: "test", id: "work" }
    }

    let wrapper = mount(< SectionSeperator setActiveElement={setActiveElement} {...props} />)
    const instance = wrapper.instance();

    describe('Testing SectionSeperator component', () => {
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
            instance.setState({
                showCopyPopup: true,
            })
            instance.handleSeperator(event)
            const sectionFocus = wrapper.find('SectionSeperator').state().sectionFocus
            expect(sectionFocus).toEqual(true);
        })
    })
})