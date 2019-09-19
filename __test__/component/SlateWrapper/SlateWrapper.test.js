import React from 'react';
import ReactDOM from 'react-dom';
import { stub } from 'sinon';
import { slateData, emptySlateData, slateDataForIntro, slateDataForAssess } from '../../../fixtures/slateTestingData.js'
import SlateWrapper from '../../../src/component/SlateWrapper';
import { exportAllDeclaration } from '@babel/types';

xdescribe('Testing <SlateWrapper> Component', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SlateWrapper slateData={{}} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    describe('With no element', () => {
        let props = {
            slateData: emptySlateData
        };
        let wrapper = mount(<SlateWrapper {...props} />);
        test('renders properly with default slate', () => {
            expect(wrapper.find('.element-list').length).toBe(1);
            expect(wrapper.find('ElementContainer').length).toBe(0);
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
            expect(wrapper.find('.header-label').text()).toBe('SLATE:');
        })
        test('renders container-introduction slate', () => {
            wrapper.setProps({ slateData: slateDataForIntro });
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
            expect(wrapper.find('.header-label').text()).toBe('INTRODUCTORY SLATE:');
        })
        test('renders assessment slate', () => {
            wrapper.setProps({ slateData: slateDataForAssess });
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
            expect(wrapper.find('.header-label').text()).toBe('ASSESSMENT SLATE:');
        })
    })
    describe('With default elements', () => {
        let props = {
            slateData
        };
        let wrapper = mount(<SlateWrapper {...props} />);
        test('renders properly', () => {
            expect(wrapper.find('.element-list').length).toBe(1);
            expect(wrapper.find('ElementContainer').length).toBe(2);
        })
        test('renders slate title', () => {
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
            expect(wrapper.find('.header-label').text()).toBe('SLATE:');
            expect(wrapper.find('SlateHeader').instance().props.slateTitle.text).toBe('sample slate');
        })
    })
    describe('With loading elements', () => {
        let props = {
            slateData: {}
        };
        let wrapper = mount(<SlateWrapper {...props} />);
        test('renders properly', () => {
            expect(wrapper.find('.element-list').length).toBe(0);
            expect(wrapper.find('LargeLoader').length).toBe(4);
            expect(wrapper.find('SmalllLoader').length).toBe(1);
        })
    })
})