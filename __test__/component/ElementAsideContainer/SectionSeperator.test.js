import React from 'react';
import { mount, shallow } from 'enzyme';
import SectionSeperator from '../../../src/component/ElementAsideContainer/SectionSeperator';
import { spy, stub } from 'sinon';
import tinymce from 'tinymce/tinymce';
const setActiveElement = new stub();

jest.mock('../../../src/config/config.js', () => ({
    asideToolbar: ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],   
    toolBarList : ['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag']
    }));

describe('Testing SectionSeperator component with props', () => {
    let props = {
        elemBorderToggle: true,
        borderToggle: 'active',
        permissions: []
    }
    let wrapper = mount(< SectionSeperator setActiveElement = {setActiveElement} {...props} />)

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
            instance.handleSeperator(event)
            const sectionFocus = wrapper.find('SectionSeperator').state().sectionFocus
            expect(sectionFocus).toEqual(true);
        })
    })

})