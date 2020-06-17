import React from 'react';
import { mount } from 'enzyme';

import ElmHeader from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/ElmHeader';

describe('Testing ELM Header component', () => {
    it('ELM Header-learnosity', () => {
        let props={
            activeAssessmentType : 'learnosity',
            closeElmWindow : function(){}
        }
        const component = mount(<ElmHeader {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
    it('ELM Header-Elm', () => {
        let props={
            activeAssessmentType : 'puf',
            closeElmWindow : function(){}
        }
        const component = mount(<ElmHeader {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
});