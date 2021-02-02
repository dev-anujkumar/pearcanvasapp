import React from 'react';
import { mount } from 'enzyme';
import ElmFooter from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/ElmFooter';

describe('Testing ELM Footer component', () => {
     const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
    }
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
    it('Test- ELM type slate assessment', () => {
        let props = {
            elmFooterProps: {
                closeElmWindow: jest.fn(),
                sendPufAssessment: jest.fn(),
                openAssessmentSearchBar:jest.fn(),
                addPufFunction: jest.fn(),
                activeAssessmentType: "puf",
                containerUrn: "urn:pearson:distributable:5d29ca95-fcea-4920-a9d7-5555771e68fc",
                activeUsageType: "Practice",
                buttonText: "ADD"
            },
            openItemTable: false,
            assessmentWUrn: "urn:pearson:work:4737f0d9-fb9d-4673-9f0f-1b5dcaed59c7",
            openedFrom: "slateAssessment",
            error: false,
            activeRadioIndex: null
        }
        const component = mount(<ElmFooter {...props} />)
        expect(component).toHaveLength(1);

    })
    describe('Testing create new Assessment/Item button in ELM Footer component', () => {
        let props = {
                elmFooterProps: {
                    closeElmWindow: jest.fn(),
                    sendPufAssessment: jest.fn(),
                    openAssessmentSearchBar:jest.fn(),
                    addPufFunction: jest.fn(),
                    activeAssessmentType: "puf",
                    containerUrn: "urn:pearson:distributable:5d29ca95-fcea-4920-a9d7-5555771e68fc",
                    activeUsageType: "Practice",
                    buttonText: "ADD"
                },
                openItemTable: false,
                assessmentWUrn: "urn:pearson:work:4737f0d9-fb9d-4673-9f0f-1b5dcaed59c7",
                openedFrom: "singleAssessment",
                error: false,
                activeRadioIndex: null
            }

        const wrapper = (propObj)=>{
            return mount(<ElmFooter {...propObj} />)
        }

        it('Test- ELM, mounting of elmFooter component', () => {     
            const component = wrapper(props);     
            expect(component).toHaveLength(1);
        })
        it('Test- ELM, show new button and Click event', () => {
            const component = wrapper(props);  
            const button =  component.find('button.create-button');  
            button.simulate('click', event);
            expect(button).toHaveLength(1);
        })
        it('Test- ELM, hide new button', () => {
            props.elmFooterProps.activeAssessmentType = "";
            const component = wrapper(props);  
            const button =  component.find('button.create-button');
            expect(button).toHaveLength(0);  
        })

        describe('Testing- Hide Add, Search buttons in ELM Footer component when no no elm data', () => {
            props.error = true;
            const component = wrapper(props); 

            it('Test- ELM, hide Add button', () => {
                const button =  component.find('button.add-button');
                expect(button).toHaveLength(0);  
            })
            it('Test- ELM, hide Search button', () => {
                const button =  component.find('button.search-button');
                expect(button).toHaveLength(0);  
            })
        })
        
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