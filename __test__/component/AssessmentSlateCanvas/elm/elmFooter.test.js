import React from 'react';
import { mount } from 'enzyme';
import ElmFooter from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/ElmFooter';

describe('Testing ELM Footer component', () => {

    it('Test- renders without crashing', () => {
        let props = {
            elmFooterProps: {
                buttonText: "ADD"
            },
            addFlag:true,
            hideSearch:true
        }
        const component = mount(<ElmFooter {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- ELM type assessment', () => {
        let props = {
            elmFooterProps: {
                closeElmWindow: jest.fn(),
                sendPufAssessment: jest.fn(),
                openAssessmentSearchBar:jest.fn(),
                buttonText: "ADD"
            }
        }
        const component = mount(<ElmFooter {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- Learnosity type assessment', () => {
        let props = {
            elmFooterProps: {
                closeElmWindow: jest.fn(),
                sendPufAssessment: jest.fn(),
                openAssessmentSearchBar:jest.fn(),
                buttonText: "OK"
            }
        }
        const component = mount(<ElmFooter {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- Learnosity type assessment', () => {
        let props = {
            elmFooterProps: {
                closeElmWindow: jest.fn(),
                sendPufAssessment: jest.fn(),
                openAssessmentSearchBar:jest.fn(),
                buttonText: "OK"
            },
            hideSearch:false
        }
        const component = mount(<ElmFooter {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- Learnosity type assessment', () => {
        let props = {
            elmFooterProps: {
                closeElmWindow: jest.fn(),
                sendPufAssessment: jest.fn(),
                openAssessmentSearchBar:jest.fn(),
                buttonText: "OK"
            },
            hideSearch:false
        }
        const component = mount(<ElmFooter {...props} />)
        component.find('.puf-button.search-button').simulate('click');
    })
});