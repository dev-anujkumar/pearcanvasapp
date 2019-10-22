import React from 'react';
import { mount } from 'enzyme';
import ElementAuthoring from '../../../src/component/ElementAuthoring/ElementAuthoring'

xdescribe('Testing Element  component with props', () => {
    let type = "element-authoredtext";
    let props={
        slateLockInfo:{
            isLocked:false
        }
    }
    const elementAuthoring = mount(<ElementAuthoring {...props} type={type} />);
    let elementAuthoringInstance = elementAuthoring.find('ElementAuthoring').instance();
    it('render Element component ', () => {  
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