import React from 'react';
import { mount, shallow } from 'enzyme';
import ElementAsideContainer from '../../../src/component/ElementAsideContainer/ElementAsideContainer';
import { elementAsideWorkExample,element ,section} from '../../../fixtures/elementAsideData'
import { spy, stub } from 'sinon';

describe('Testing ElementAside component with props', () => {
    let props = {
        element: elementAsideWorkExample
    }
    let wrapper = mount(< ElementAsideContainer {...props} />)

    const instance = wrapper.instance();
    describe('Testing ElementAside component', () => {

        it('should have element Aside', () => {
            expect(wrapper.find(".aside-container")).toHaveLength(1)
        })
        it('should have comment-wrapper', () => {
            expect(wrapper.find(".aside-horizotal-break")).toHaveLength(1)
        })
        it('should have comment-wrapper', () => {
            expect(wrapper.find(".aside-break-bottom")).toHaveLength(1)
        })

    })
    describe('Testing functions with props', () => {
        it('should render section function', () => {
            instance.renderContainer({ ...props })
            expect(wrapper.find(".container-aside")).toHaveLength(1)
        })
        it('should render  section function correctly', () => {
            console.log("element",instance.section(section))
           let sectiondata =  instance.section(section)
            expect(sectiondata.props.className).toEqual('section');
        })

      it('should render  sectionBreak function correctly', () => {
            console.log("element",section)
            let sectionBreak  = instance.sectionBreak(section)
            expect(sectionBreak.props.className).toEqual('section-break');
        }) 
    
        it('should render  renderElement function correctly', () => {
        console.log("element",section)
        let parentEntityUrn = "urn:pearson:entity:b4cbda8f-7a22-4df5-965a-18623a581ec1"
         instance.renderElement(element,parentEntityUrn)
       // expect(sectionBreak.props.className).toEqual('section-break');
     })  
    })


})