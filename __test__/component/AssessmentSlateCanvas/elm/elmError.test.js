import React from 'react';
import { mount } from 'enzyme';

import ElmError from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/ElmError';

describe('Testing ELM Error component', () => {

    it('Test- renders without crashing', () => {
        let props={ }
        const component = mount(<ElmError {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
    it('Test- ELM type assessment', () => {
        let props = {
            errorStatus: true,
            errFlag: true,
            activeAssessmentType: "puf"
        }
        const component = mount(<ElmError {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
    it('Test- Learnosity type assessment', () => {
        let props = {
            errorStatus: true,
            errFlag: true,
            activeAssessmentType: "learnosity"
        }
        const component = mount(<ElmError {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- Learnosity Search Results', () => {
        let props = {
            errorStatus: true,
            errFlag: false,
            filterResults: 'No Results',
            activeAssessmentType: "learnosity"
        }
        const component = mount(<ElmError {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- ELM-Assessment item ', () => {
        let props = {
            errorStatus: true, 
            itemApiStatus: "404"
        }
        const component = mount(<ElmError {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- default case', () => {
        let props = {
                errorStatus: true, 
                errFlag:false,               
                activeAssessmentType: "puf",
                itemApiStatus: "200",
        }
        const component = mount(<ElmError {...props}/>)       
        expect(component).toHaveLength(1);
      
    })
});