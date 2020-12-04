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
import { JestEnvironment } from '@jest/environment';
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
    });
    let props = {
        slateId: 'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
        activeElement: { elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b" },
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
       expect(sidebar.find('.element-dropdown').length).toBe(3)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').length).toBe(1)
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(1)
    });

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