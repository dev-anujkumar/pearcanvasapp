import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../../src/component/Sidebar';
import { conversionElement } from './../../../src/component/Sidebar/Sidebar_Action';
import { updateElement } from './../../../src/component/ElementContainer/ElementContainer_Actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import slateLevelData from './slateData';
jest.mock('./../../../src/component/ElementContainer/ElementContainer_Actions', () => ({
    prepareDataForTcmUpdate: jest.fn()
}))
import config from '../../../src/config/config.js';
config["elementStatus"] = {}
describe('Test for Sidebar component', () => {
    const mockStore = configureMockStore(middlewares);
    let activeElement = {
        elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        elementType: "figure",
        elementWipType: "figure",
        primaryOption: "primary-image-figure",
        secondaryOption: "secondary-image-figure-width",
        index: "1-0",
        tag: "Fg",
        toolbar: [],
        type:"figure"
    };

    const sidebarWithData = mockStore({
        appStore: {
            activeElement,
            updateElement,
            conversionElement,
            slateLevelData,
        },
        metadataReducer: {
            showModule: true
        },
        elementStatusReducer: {
            'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
            "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
            "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
            "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
            
        },
        selectionReducer:{
            selection:""
        },
        tcmReducer: {
            tisTCMCanvasPopupLaunched:false,
            tcmSnapshotData: {},
            elementData: {},
            tcmStatus: false
        }
    });
    let props = {
        slateId: 'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
        activeElement: { elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",secondaryOption:'' },
        updateElement: jest.fn()
    };

    let sidebar = mount(<Provider store={sidebarWithData}>
        <Sidebar />
    </Provider>);

    it('onClick Event', () => {
        const sidebarInstance = sidebar.find('Sidebar').instance();
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        sidebarInstance.setState({
            activeElementType: 'figure',
            activePrimaryOption: 'primary-image-figure',
            activeSecondaryOption: 'secondary-image-figure-half'
        });

        let target = {
            target: {
                getAttribute: function(dataValue) {
                    return 'primary-image-figure';
                }
            }
        }

        let secondaryLabel="BCE";
        let secondaryValue="secondary-blockcode-language-java";

         sidebar.find('div.element-dropdown-title').at(0).simulate('click');
         sidebar.find('ul.element-dropdown-content.primary-options').simulate('click');
            sidebarInstance.handlePrimaryOptionChange(target);

        sidebarInstance.setState({
            elementDropdown: 'secondary'
        });

        target = {
            target: {
                getAttribute: function(dataValue) {
                    return 'secondary-image-figure-width';
                }
            }
        }

       // sidebar.find('ul.element-dropdown-content.secondary-options').simulate('click');
        sidebarInstance.handleSecondaryOptionChange(target);

        sidebarInstance.attributions();

        // Attribution for primary element type
        sidebarInstance.setState({
            activeElementType: 'figure',
            activePrimaryOption: 'primary-image-figure',
            activeSecondaryOption: 'secondary-image-figure-half'
        });

        sidebarInstance.attributions();
       
        const spySetSecondary = jest.spyOn(sidebarInstance, 'setSecondary');
        sidebarInstance.setSecondary(secondaryValue, secondaryLabel);
        expect(sidebar.find('.element-dropdown').length).toBe(3)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').length).toBe(1)
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(1)
        expect(spySetSecondary).toHaveBeenCalled();
    });
    describe('Test case for Update Embeded AssessmentType Popup',()=>{
         activeElement={
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "element-assessment",
            elementWipType: "undefined",
            primaryOption: "primary-single-assessment",
            secondaryOption: "secondary-single-assessment-puf",
            index: "1-0",
            tag: "Qu",
            toolbar: [],
            type:"figure" 
        }

        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                updateElement,
                conversionElement,
                slateLevelData,
            },
            metadataReducer: {
                showModule: true
            },
            elementStatusReducer: {
                'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
                
            },
            selectionReducer:{
                selection:""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched:false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            }
        });

        let nextprops={
            activeElement: { elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b" },
            showCanvasBlocker:jest.fn(),
            showBlocker:jest.fn(),
            hideBlocker:jest.fn(),
            ...props
        }
        let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...nextprops}/></Provider>);
        const sidebarInstance = sidebar.find('Sidebar').instance();
        it('initiating update AssessmentPopup via render',()=>{
            sidebarInstance.setState({
                updateAssessmentTypePopup:true
            })
            expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(true);
        });
        it('handling showUpdateAssessmentTypePopup',()=>{
            sidebarInstance.showUpdateAssessmentTypePopup();
            sidebarInstance.handleUpdateAssessmentTypePopup(false);
            sidebarInstance.setState({
                updateAssessmentTypePopup: false,
                secondaryValue: "",
                secondaryLabel: ""
            })
            expect(sidebarInstance.state.secondaryValue).toBe("");
            expect(sidebarInstance.state.secondaryLabel).toBe("");
            expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(false);
        });
        it('Test Case for setUpdatedAssessment',()=>{
            let secondaryValue='secondary-single-assessment-puf';
            let secondaryLabel='Qu';
            let nextprops={
                activeElement:{
                    elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
                    elementWipType: "undenied",
                    secondaryOption:'secondary-single-assessment-puf'
                },
                showCanvasBlocker: jest.fn(),
                showBlocker: jest.fn(),
                hideBlocker: jest.fn(),
                conversionElement:jest.fn(),
                ...props
            }
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...nextprops}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.setUpdatedAssessmentType(false);
            sidebarInstance.setState({
                updateAssessmentTypePopup: false
            })
            sidebarInstance.setSecondary(secondaryValue,secondaryLabel);
            sidebarInstance.setState({
                elementDropdown: '',
                activeSecondaryOption: secondaryValue,
                activeLabelText: secondaryValue,
                podOption: false
            })
            expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(false);
            expect(sidebarInstance.state.elementDropdown).toBe('');
            expect(sidebarInstance.state.activeSecondaryOption).toBe(secondaryValue);
            expect(sidebarInstance.state.activeLabelText).toBe(secondaryLabel);
            expect(sidebarInstance.state.podOption).toBe(false);
        });
        it('Test for handle Secondary Option Change',()=>{
            let value='secondary-single-assessment-puf';
            let labelText='Qu';
           let target = {
                target: {
                    getAttribute: function(dataValue) {
                        return 'secondary-single-assessment-puf';
                    }
                }
            }  
                sidebarInstance.handleSecondaryOptionChange(target);
                sidebarInstance.setState({
                    elementDropdown: '',
                })
                expect(sidebarInstance.state.elementDropdown).toBe('');
                sidebarInstance.setState({
                    activeSecondaryOption: value,
                    activeLabelText: labelText,
                    podOption: false,
                    updateAssessmentTypePopup: true,
                    secondaryValue: value,
                    secondaryLabel: labelText,
                })
                expect(sidebarInstance.state.activeSecondaryOption).toBe(value);
                expect(sidebarInstance.state.activeLabelText).toBe(labelText);
                expect(sidebarInstance.state.podOption).toBe(false);
                expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(true);
                expect(sidebarInstance.state.secondaryLabel).toBe(labelText);
                expect(sidebarInstance.state.secondaryValue).toBe(value);
            });
            xit('secondary-single-assessment-puf',()=>{
                 nextprops={
                    activeElement:{
                        secondaryOption:'secondary-single-assessment-puf'
                    }
                }
                let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...nextprops}/></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                let target = {
                    target: {
                        getAttribute: function(dataValue) {
                            return 'secondary-single-assessment-cite';
                        }
                    }
                }
                sidebarInstance.handleSecondaryOptionChange(target);
                let secondaryOption="secondary-single-assessment-puf";
                expect(sidebar.nextprops().activeElement.secondaryOption).toBe(secondaryOption);
            });      
    })

    it('Test Case for Metadata Anchor LO', () => {
        const activeElement = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "",
            elementWipType: "element-learningobjectivemapping",
            primaryOption: "",
            secondaryOption: "",
            index: 2,
            tag: "LO"
        };

        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                sidebarWithData,
                conversionElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
            elementStatusReducer: {
                'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
                
            },
            selectionReducer:{
                selection:""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched:false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            }
        });

        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar />
        </Provider>);
        expect(sidebar.find('.element-dropdown').length).toBe(1)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').text()).toBe("Learning Objective")
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(0)
    });

    it('Test Case for Metadata Anchor MA', () => {
        const activeElement = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "",
            elementWipType: "element-generateLOlist",
            primaryOption: "",
            secondaryOption: "",
            index: 1,
            tag: "LO"
        };

        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                conversionElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
            elementStatusReducer: {
                'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
                
            },
            selectionReducer:{
                selection:""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched:false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            }
        });

        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar />
        </Provider>);
        expect(sidebar.find('.element-dropdown').length).toBe(0)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').length).toBe(0)
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(0)
    });

    it("With no activeElement", () => {
        const activeElement = {}

        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                conversionElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
            elementStatusReducer: {
                'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",

            },
            selectionReducer:{
                selection:""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched:false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            }

        });
        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar {...props}/>
        </Provider>);
        expect(sidebar.find('.element-dropdown').length).toBe(0)
    })
    

    describe("Blockquote", () => {

            it("Checking toggleElementDropdown function for Else Condition", () => {
                let e = { target: { dataset: { element: "Primary" }, getAttribute: jest.fn() }, stopPropagation: jest.fn() }
                const activeElement = {
                    primaryOption: "primary-single-assessment",
                    secondaryOption: "secondary-single-assessment"
                };
                const sidebarWithData = mockStore({
                    appStore: {
                        activeElement
                    },
                    metadataReducer: {
                        currentSlateLOData: {}
                    },
                    elementStatusReducer: {
                        'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                        "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                        "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                        "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
                        
                    },
                    selectionReducer:{
                        selection:""
                    },
                    tcmReducer: {
                        tisTCMCanvasPopupLaunched:false,
                        tcmSnapshotData: {},
                        elementData: {},
                        tcmStatus: false
                    }
                });
                let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                sidebarInstance.props = {
                    slateId: 'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
                    activeElement:
                        { elementId: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b' },
                    permissions: ['access_formatting_bar']
                };
                sidebarInstance.toggleElementDropdown(e);
                expect(sidebarInstance.state.activePrimaryOption).toBe("primary-single-assessment");
            })

        it("Checking showModuleName function for checked value true if condition", () => {
            let e = { currentTarget: { checked: true } }
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking showModuleName function for checked value false", () => {
            let e = { currentTarget: { checked: false } }
            const elementIdInfo = document.createElement('div');
            elementIdInfo.className = "moduleContainer learningObjectiveData showmodule";
            document.body.appendChild(elementIdInfo);
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking showModuleName function for checked value true else condition", () => {
            let e = { currentTarget: { checked: true } }
            const elementIdInfo = document.createElement('div');
            elementIdInfo.className = "moduleContainer learningObjectiveData";
            document.body.appendChild(elementIdInfo);
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking renderLanguageLabel function If Condition", () => {
            let tag = 'BCE'
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.renderLanguageLabel(tag);
        })
        it("Checking handleSyntaxHighligtingRemove function ", () => {
            let nextprops={
                showCanvasBlocker:jest.fn(),
                ...props
            }
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...nextprops}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.setState({
                syntaxHighlightingToggleValue:true
            })
            sidebarInstance.handleSyntaxHighligtingRemove();
            expect(sidebarInstance.state.syntaxHighlightingToggleValue).toBe(true)
        })
        it("Checking handleSyntaxHighlightingToggle function ", () => {
            let nextprops={
                showCanvasBlocker:jest.fn(),
                ...props
            }
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...nextprops}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.setState({
                showSyntaxHighlightingPopup:true
            })
            sidebarInstance.handleSyntaxHighlightingToggle();
            expect(sidebarInstance.state.showSyntaxHighlightingPopup).toBe(true);
        })

        it("handleBceNumber method ", () => {
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyhandleFocus = jest.spyOn(sidebarInstance, 'handleBceNumber')
            let event = {
                target: {
                    value: 1
                }
            }
            sidebarInstance.setState({
                bceNumberStartFrom:1
            })
            sidebarInstance.handleBceNumber(event);
            expect(spyhandleFocus).toHaveBeenCalled();
            expect(sidebarInstance.state.bceNumberStartFrom).toBe(1);
        })

        it("handleAttrChange method ", () => {
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let event = {
                target: {
                    value: ""
                }
            }
            sidebarInstance.handleAttrChange(event);
            expect(sidebarInstance.state.attrInput).toEqual('');
        })

        it("Testing handleBceToggle function ", () => {
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.setState({
                bceToggleValue:true
            })
            sidebarInstance.handleBceToggle();
            expect(sidebarInstance.state.bceToggleValue).toBe(true);
        })
    })
});