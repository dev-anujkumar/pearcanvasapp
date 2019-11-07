import React from 'react';
import { mount } from 'enzyme';

import ElmHeader from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/ElmHeader';

describe('Testing ELM Header component', () => {
    let props={
        elmHeaderProps : 'Title',
        closeElmWindow : function(){}
    }
    test('renders without crashing', () => {
        const component = mount(<ElmHeader {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
});