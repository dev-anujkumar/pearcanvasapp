import React from 'react';
import { mount } from 'enzyme';
import ElementAuthoring from '../../../src/component/ElementAuthoring/ElementAuthoring'

describe('Testing Element  component with props', () => {
    let type = "element-authoredtext";
    const elementAuthoring = mount(<ElementAuthoring type={type} />);
    let elementAuthoringInstance = elementAuthoring.find('ElementAuthoring').instance();
    it('render Element component ', () => {  
        console.log(elementAuthoring.debug());
        expect(elementAuthoring).toMatchSnapshot();
    })

    it('onClick', () => {
        elementAuthoringInstance.onClick();
    })
    it('onBlur', () => {
        elementAuthoringInstance.onBlur();
    })
    it('onKeyup', () => {
        elementAuthoringInstance.onKeyup();
    })

    it('onFocus', () => {
        elementAuthoringInstance.onFocus();
    })
})