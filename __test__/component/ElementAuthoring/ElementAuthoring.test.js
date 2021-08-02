import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import ElementAuthoring from '../../../src/component/ElementAuthoring/ElementAuthoring'

xdescribe('Testing Element  component with props', () => {
    const div = document.createElement('div');
    let type = "element-authoredtext";
    let props={
        slateLockInfo:{
            isLocked:false
        }
    }
    const elementAuthoring = mount(<Provider><ElementAuthoring {...props} type={type} /></Provider>);
    let elementAuthoringInstance = elementAuthoring.find('ElementAuthoring').instance();
    it('render Element component ', () => {  
        ReactDOM.render(<ElementAuthoring {...props}/>, div);
    })

})