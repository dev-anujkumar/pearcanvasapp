import React from 'react';
import { mount } from 'enzyme';

import ElmError from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/ElmError';

describe('Testing ELM Header component', () => {

    it('Test- renders without crashing', () => {
        let props={ }
        const component = mount(<ElmError {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
    it('Test- ELM type assessment', () => {
        let props = {
            elmErrorProps: {
                errorStatus: "404",
                itemErrorStatus: "200",
                activeAssessmentType: "puf"
            }
        }
        const component = mount(<ElmError {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
    it('Test- Learnosity type assessment', () => {
        let props = {
            elmErrorProps: {
                errorStatus: "404",
                activeAssessmentType: "learnosity"
            }
        }
        const component = mount(<ElmError {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
    it('Test- ELM-Assesment item ', () => {
        let props = {
            elmErrorProps: {
                errorStatus: "200",
                itemErrorStatus: "404",
                activeAssessmentType: "puf"
            }
        }
        const component = mount(<ElmError {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
});