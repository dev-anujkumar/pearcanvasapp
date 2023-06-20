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
import * as utils from '../../../src/constants/utility';
jest.mock('./../../../src/component/ElementContainer/ElementContainer_Actions', () => ({
    prepareDataForTcmUpdate: jest.fn()
}))
import config from '../../../src/config/config.js';
config["elementStatus"] = {}
describe('Test for Sidebar component', () => {
    jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
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
    let initialStore = {
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
        },
        autoNumberReducer: {
            isAutoNumberingEnabled: false
        },
        alfrescoReducer : {
            alfrescoAltLongDescData: {
                altText: '',
                longDesc: '',
                savedAltLongDesData: 'abc'
            }
        }
    }
    const sidebarWithData = mockStore(initialStore);
    let props = {
        value:['fontValue','bulletValue'],
        slateId: 'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
        activeElement: { elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",secondaryOption:'' },
        activefontStyle:'font-type-1',
        asideData:{
            type:'showhide'
        },
        updateElement: jest.fn(),
        updateBlockListMetadata: jest.fn(),
        updateContainerMetadata: jest.fn(),
        setBCEMetadata: jest.fn(),
        showCanvasBlocker: jest.fn(),
        enableAsideNumbering: jest.fn()
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
                getAttribute: function (dataValue) {
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
    // xdescribe('Test case for Update Embeded AssessmentType Popup',()=>{
    //      activeElement={
    //         elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
    //         elementType: "element-assessment",
    //         elementWipType: "undefined",
    //         primaryOption: "primary-single-assessment",
    //         secondaryOption: "secondary-single-assessment-puf",
    //         index: "1-0",
    //         tag: "Qu",
    //         toolbar: [],
    //         type:"figure" 
    //     }

    //     const sidebarWithData = mockStore({
    //         appStore: {
    //             activeElement,
    //             updateElement,
    //             conversionElement,
    //             slateLevelData,
    //         },
    //         metadataReducer: {
    //             showModule: true
    //         },
    //         elementStatusReducer: {
    //             'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
    //             "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
    //             "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
    //             "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
                
    //         },
    //         selectionReducer:{
    //             selection:""
    //         },
    //         tcmReducer: {
    //             tisTCMCanvasPopupLaunched:false,
    //             tcmSnapshotData: {},
    //             elementData: {},
    //             tcmStatus: false
    //         },
    //         autoNumberReducer: {
    //             isAutoNumberingEnabled: false
    //         }
    //     });

    //     let nextprops={
    //         activeElement: { elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
    //         primaryOption: 'primary-single-assessment',
    //         secondaryOption:'secondary-single-assessment-puf'
    //          },
    //         showCanvasBlocker:jest.fn(),
    //         showBlocker:jest.fn(),
    //         hideBlocker:jest.fn(),
    //         ...props
    //     }
    //     let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...nextprops}/></Provider>);
    //     const sidebarInstance = sidebar.find('Sidebar').instance();
    //     it('initiating update AssessmentPopup via render',()=>{
    //         sidebarInstance.setState({
    //             updateAssessmentTypePopup:true
    //         })
    //         expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(true);
    //     });
    //     it('handling showUpdateAssessmentTypePopup',()=>{
    //         sidebarInstance.showUpdateAssessmentTypePopup();
    //         sidebarInstance.handleUpdateAssessmentTypePopup(false);
    //         sidebarInstance.setState({
    //             updateAssessmentTypePopup: false,
    //             secondaryValue: "",
    //             secondaryLabel: ""
    //         })
    //         expect(sidebarInstance.state.secondaryValue).toBe("");
    //         expect(sidebarInstance.state.secondaryLabel).toBe("");
    //         expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(false);
    //     });
    //     it('Test Case for setUpdatedAssessment',()=>{
    //         let secondaryValue='secondary-single-assessment-puf';
    //         let secondaryLabel='Qu';
    //         let nextprops={
    //             activeElement:{
    //                 elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
    //                 elementWipType: "undenied",
    //                 secondaryOption:'secondary-single-assessment-puf'
    //             },
    //             showCanvasBlocker: jest.fn(),
    //             showBlocker: jest.fn(),
    //             hideBlocker: jest.fn(),
    //             conversionElement:jest.fn(),
    //             ...props
    //         }
    //         let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...nextprops}/></Provider>);
    //         const sidebarInstance = sidebar.find('Sidebar').instance();
    //         sidebarInstance.setUpdatedAssessmentType(false);
    //         sidebarInstance.setState({
    //             updateAssessmentTypePopup: false
    //         })
    //         sidebarInstance.setSecondary(secondaryValue,secondaryLabel);
    //         sidebarInstance.setState({
    //             elementDropdown: '',
    //             activeSecondaryOption: secondaryValue,
    //             activeLabelText: secondaryValue,
    //             podOption: false
    //         })
    //         expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(false);
    //         expect(sidebarInstance.state.elementDropdown).toBe('');
    //         expect(sidebarInstance.state.activeSecondaryOption).toBe(secondaryValue);
    //         expect(sidebarInstance.state.activeLabelText).toBe(secondaryLabel);
    //         expect(sidebarInstance.state.podOption).toBe(false);
    //     });
    //     it('Test for handle Secondary Option Change',()=>{
    //         let value='secondary-single-assessment-puf';
    //         let labelText='Qu';
    //        let target = {
    //             target: {
    //                 getAttribute: function(dataValue) {
    //                     return 'secondary-single-assessment-puf';
    //                 }
    //             }
    //         }     
    //             sidebarInstance.handleSecondaryOptionChange(target);
    //             document.querySelector= ()=>{
    //                 return {
    //                     querySelector: ()=>{
    //                         return {
    //                             getAttribute: () =>{
    //                                 return "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b"
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             sidebarInstance.setState({
    //                 activeSecondaryOption: value,
    //                 activeLabelText: labelText,
    //                 podOption: false,
    //                 updateAssessmentTypePopup: true,
    //                 secondaryValue: value,
    //                 secondaryLabel: labelText,
    //             })
    //             expect(sidebarInstance.state.activeSecondaryOption).toBe(value);
    //             expect(sidebarInstance.state.activeLabelText).toBe(labelText);
    //             expect(sidebarInstance.state.podOption).toBe(false);
    //             expect(sidebarInstance.state.updateAssessmentTypePopup).toBe(true);
    //             expect(sidebarInstance.state.secondaryLabel).toBe(labelText);
    //             expect(sidebarInstance.state.secondaryValue).toBe(value);
    //         });     
    // })
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
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
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
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
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
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
            }

        });
        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar {...props}/>
        </Provider>);
        expect(sidebar.find('.element-dropdown').length).toBe(0)
    })
    describe('Test - Blocklist', () => {
        it("Testing handlePrimaryOptionChange  function - manifestlist block - string index", () => {
            const sidebarWithData1 = mockStore({
                appStore: {
                    activeElement: {
                        ...activeElement,
                        elementWipType: "manifestlist",
                        type: 'manifestlist',
                        elementType: "manifestlist",
                        primaryOption: "primary-column-1",
                        secondaryOption: "secondary-column-1",
                        index: "1-0",
                        tag: "BL",
                        toolbar: []
                    },
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
                },
                autoNumberReducer: {
                    isAutoNumberingEnabled: false
                },
                alfrescoReducer : {
                    alfrescoAltLongDescData: {
                        altText: '',
                        longDesc: '',
                        savedAltLongDesData: 'abc'
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandlePrimaryOptionChange = jest.spyOn(sidebarInstance, 'handlePrimaryOptionChange')
            const target = {
                target: {
                    getAttribute: function (dataValue) {
                        return 'primary-column-1';
                    }
                }
            }
            sidebarInstance.handlePrimaryOptionChange(target);
            expect(spyHandlePrimaryOptionChange).toHaveBeenCalled();
        })
        it("Testing handlePrimaryOptionChange  function - manifestlist block - number index", () => {
            const sidebarWithData1 = mockStore({
                appStore: {
                    activeElement: {
                        ...activeElement,
                        elementWipType: "manifestlist",
                        type: 'manifestlist',
                        elementType: "manifestlist",
                        primaryOption: "primary-column-1",
                        secondaryOption: "secondary-column-1",
                        index: 1,
                        tag: "BL",
                        toolbar: []
                    },
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
                },
                autoNumberReducer: {
                    isAutoNumberingEnabled: false
                },
                alfrescoReducer : {
                    alfrescoAltLongDescData: {
                        altText: '',
                        longDesc: '',
                        savedAltLongDesData: 'abc'
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandlePrimaryOptionChange = jest.spyOn(sidebarInstance, 'handlePrimaryOptionChange')
            const target = {
                target: {
                    getAttribute: function (dataValue) {
                        return 'primary-column-1';
                    }
                }
            }
            sidebarInstance.handlePrimaryOptionChange(target);
            expect(spyHandlePrimaryOptionChange).toHaveBeenCalled();
        })
    })
    describe('Test - Blocklist', () => {
        it("Testing handleFontBulletOptionChange  function - fontStyle- string index", () => {
            const sidebarWithData2 = mockStore({
                appStore: {
                    activeElement: {
                        ...activeElement,
                        elementWipType: "manifestlist",
                        fontStyle: "font-type-1",
                        index: "1-0",
                        tag: "BL",
                        toolbar: ['insertmedia']
                    },
                    activeElementType:"manifestlist",
                    value:[]
                },
                metadataReducer: {
                    showModule: true
                },
                selectionReducer:{
                    selection:""
                },
                tcmReducer: {
                    tisTCMCanvasPopupLaunched:false,
                    tcmSnapshotData: {},
                    elementData: {},
                    tcmStatus: false
                },
                autoNumberReducer: {
                    isAutoNumberingEnabled: false
                },
                alfrescoReducer : {
                    alfrescoAltLongDescData: {
                        altText: '',
                        longDesc: '',
                        savedAltLongDesData: 'abc'
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance1 = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance1, 'handleFontBulletOptionChange')
            const target = {
                target: {
                    getAttribute: function (dataValue) {
                        return 'font-style-1';
                    }
                }
            }
            sidebarInstance1.setState({
                activeElementType:'manifestlist'
            })
            sidebarInstance1.handleFontBulletOptionChange(target);
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleFontBulletOptionChange  function - fontStyle- number index", () => {
            const sidebarWithData2 = mockStore({
                appStore: {
                    activeElement: {
                        ...activeElement,
                        elementWipType: "manifestlist",
                        fontStyle: "font-type-1",
                        index: 1,
                        tag: "BL",
                        toolbar: ['insertmedia']
                    },
                    activeElementType:"manifestlist",
                    value:[]
                },
                metadataReducer: {
                    showModule: true
                },
                selectionReducer:{
                    selection:""
                },
                tcmReducer: {
                    tisTCMCanvasPopupLaunched:false,
                    tcmSnapshotData: {},
                    elementData: {},
                    tcmStatus: false
                },
                autoNumberReducer: {
                    isAutoNumberingEnabled: false
                },
                alfrescoReducer : {
                    alfrescoAltLongDescData: {
                        altText: '',
                        longDesc: '',
                        savedAltLongDesData: 'abc'
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleFontBulletOptionChange')
            const target = {
                target: {
                    getAttribute: function (dataValue) {
                        return 'font-style-1';
                    }
                }
            }
            sidebarInstance.setState({
                activeElementType:'manifestlist',
                activefontStyle:'font-type-1'
            })
            sidebarInstance.handleFontBulletOptionChange(target);
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
    })
    describe('Testing setToggleForAside',() => {
        const sidebarWithData1 = mockStore({
            appStore: {
                activeElement: {
                    "elementType": "element-aside",
                    "primaryOption": "primary-aside-aside",
                    "secondaryOption": "secondary-aside-sb1",
                    "asideNumber": false,
                    "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82",
                    "index": 0,
                    "elementWipType": "element-aside",
                    "toolbar": [],
                    "tag": "As"
                },
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
            selectionReducer: {
                selection: ""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched: false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
            }
        });
        let activeElement = {
            "elementType": "element-aside",
            "primaryOption": "primary-aside-aside",
            "secondaryOption": "secondary-aside-sb1",
            "asideNumber": false,
            "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82",
            "index": 0,
            "elementWipType": "element-aside",
            "toolbar": [],
            "tag": "As"
        };
        let asideTitleData = [
            {
                "isAsideNumber": true,
                "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82"
            }
        ];
        let asideTitleData2 = [
            {
                "isAsideNumber": true,
                "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf81"
            }
        ];
        it('if condition', () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spySetToggleForAside = jest.spyOn(sidebarInstance, 'setToggleForAside')
            const result = sidebarInstance.setToggleForAside(activeElement, asideTitleData);
            expect(spySetToggleForAside).toHaveBeenCalled();
            expect(result).toBe(true);
        });
        it('else condition', () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spySetToggleForAside = jest.spyOn(sidebarInstance, 'setToggleForAside')
            const result = sidebarInstance.setToggleForAside(activeElement, asideTitleData2);
            expect(spySetToggleForAside).toHaveBeenCalled();
            expect(result).toBe(false);
        });
    });
    describe('Testing saveElementAttributes', () => {
        const storeData = {
            appStore: {
                activeElement: {
                    elementId: "urn:pearson:manifest:e6546106-c72c-4e8d-aacf-c185792ee254",
                    elementType: "poetry",
                    elementWipType: "poetry",
                    index: 0,
                    numbered: true,
                    primaryOption: "primary-poetry",
                    secondaryOption: "secondary-poetry",
                    startNumber: "1",
                    tag: "PE"
                },
                updateElement,
                conversionElement,
                slateLevelData
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
            selectionReducer: {
                selection: ""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched: false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
            }
        }
        const sidebarWithData1 = mockStore(storeData);
        it('case poetry - numbered true', () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            document.querySelector = () => {
                return {
                    querySelector: () => {
                        return {
                            getAttribute: (attribute) => {
                                if(attribute === "numbered") {
                                    return "true"
                                } else {
                                    return 2
                                }
                            },
                            setAttribute: () => {
                                return jest.fn()
                            }
                        }
                    }
                }
            }
            const spySaveElementAttributes = jest.spyOn(sidebarInstance, 'saveElementAttributes');
            sidebarInstance.saveElementAttributes();
            expect(spySaveElementAttributes).toHaveBeenCalled();
        });
        it('case poetry - numbered false', () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            document.querySelector = () => {
                return {
                    querySelector: () => {
                        return {
                            getAttribute: (attribute) => {
                                if(attribute === "numbered") {
                                    return "false"
                                } else {
                                    return 2
                                }
                            },
                            setAttribute: () => {
                                return jest.fn()
                            }
                        }
                    }
                }
            }
            const spySaveElementAttributes = jest.spyOn(sidebarInstance, 'saveElementAttributes');
            sidebarInstance.saveElementAttributes();
            expect(spySaveElementAttributes).toHaveBeenCalled();
        });
    });
    describe("Testing handleSecondaryOptionChange", () => {
        const storeData = {
            appStore: {
                activeElement: {
                    "elementType": "element-assessment",
                    "primaryOption": "primary-single-assessment",
                    "secondaryOption": "secondary-single-assessment-puf",
                    "usageType": "",
                    "elementId": "urn:pearson:work:b20e7b38-46fd-4800-a960-7c481bb3ae2b",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": [],
                    "tag": "Qu"
                },
                updateElement,
                conversionElement,
                slateLevelData
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
            selectionReducer: {
                selection: ""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched: false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
            }
        }
        const sidebarWithData1 = mockStore(storeData);
        it('First If Condition', () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let event = {
                target: {
                    getAttribute: () => 'secondary-single-assessment-puf'
                }
            }
            const spyHandleSecondaryOptionChange = jest.spyOn(sidebarInstance, 'handleSecondaryOptionChange');
            sidebarInstance.setState({
                activeElementType: 'element-assessment',
                activePrimaryOption: 'primary-single-assessment',
                activeSecondaryOption: 'secondary-single-assessment-puf'
            });
            sidebarInstance.handleSecondaryOptionChange(event);
            expect(spyHandleSecondaryOptionChange).toHaveBeenCalled();
        });
        it('Second If Condition', () => {
            let mockStoreData = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "element-assessment",
                        "primaryOption": "primary-single-assessment",
                        "secondaryOption": "secondary-single-assessment-cite",
                        "usageType": "",
                        "elementId": "urn:pearson:work:b20e7b38-46fd-4800-a960-7c481bb3ae2b",
                        "index": 0,
                        "elementWipType": "figure",
                        "toolbar": [],
                        "tag": "Qu"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            const sidebarWithMockStoreData = mockStore(mockStoreData);
            let sidebar = mount(<Provider store={sidebarWithMockStoreData}><Sidebar {...props} /></Provider>);
            sidebar.setProps({
                activeElement: {
                    primaryOption: 'primary-single-assessment'
                }
            });
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let event = {
                target: {
                    getAttribute: () => 'secondary-single-assessment-puf'
                }
            }
            document.querySelector = () => {
                return {
                    querySelector: () => {
                        return {
                            getAttribute: jest.fn().mockReturnValue("urn:123"),
                            setAttribute: jest.fn()
                        }
                    }
                }
            }
            const spyHandleSecondaryOptionChange = jest.spyOn(sidebarInstance, 'handleSecondaryOptionChange');
            sidebarInstance.handleSecondaryOptionChange(event);
            expect(spyHandleSecondaryOptionChange).toHaveBeenCalled();
        });
        it('Else of Second If Condition', () => {
            let mockStoreData = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "element-assessment",
                        "primaryOption": "primary-single-assessment",
                        "secondaryOption": "secondary-single-assessment-cite",
                        "usageType": "",
                        "elementId": "urn:pearson:work:b20e7b38-46fd-4800-a960-7c481bb3ae2b",
                        "index": 0,
                        "elementWipType": "figure",
                        "toolbar": [],
                        "tag": "Qu"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                }
            }
            const sidebarWithMockStoreData = mockStore(mockStoreData);
            let sidebar = mount(<Provider store={sidebarWithMockStoreData}><Sidebar {...props} /></Provider>);
            sidebar.setProps({
                activeElement: {
                    primaryOption: 'primary-single-assessment'
                }
            });
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let event = {
                target: {
                    getAttribute: () => 'secondary-single-assessment-puf'
                }
            }
            document.querySelector = () => {
                return {
                    querySelector: () => {
                        return {
                            getAttribute: jest.fn().mockReturnValue(null),
                            setAttribute: jest.fn()
                        }
                    }
                }
            }
            const spyHandleSecondaryOptionChange = jest.spyOn(sidebarInstance, 'handleSecondaryOptionChange');
            sidebarInstance.handleSecondaryOptionChange(event);
            expect(spyHandleSecondaryOptionChange).toHaveBeenCalled();
        });
    });
    describe("Testing podOption", () => {
        jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
        const storeData = {
            appStore: {
                activeElement: {
                    "elementType": "element-interactive",
                    "primaryOption": "primary-smartlink",
                    "altText": "",
                    "longDesc": "",
                    "tag": "SL",
                    "secondaryOption": "secondary-interactive-smartlink-third",
                    "elementId": "urn:pearson:work:60f26a17-87e8-48f6-8570-468fd968bca7",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": []
                },
                updateElement,
                conversionElement,
                slateLevelData
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
            selectionReducer: {
                selection: ""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched: false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
            }
        }
        const storeData2 = {
            ...storeData,
            appStore: {
                activeElement: {
                    "elementType": "element-interactive",
                    "primaryOption": "primary-smartlink",
                    "altText": "",
                    "longDesc": "",
                    "tag": "SL",
                    "secondaryOption": "secondary-interactive-smartlink-tab",
                    "elementId": "urn:pearson:work:60f26a17-87e8-48f6-8570-468fd968bca7",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": [],
                    "podwidth": "print100%"
                },
                updateElement,
                conversionElement,
                slateLevelData
            },
        }
        const sidebarWithData1 = mockStore(storeData);
        const sidebarWithData2 = mockStore(storeData2);
        it("Test for Smartlink", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            document.querySelector = () => {
                return {
                    querySelector: () => {
                        return {
                            getAttribute: () => {
                                return jest.fn()
                            },
                            setAttribute: () => {
                                return jest.fn()
                            }
                        }
                    }
                }
            }
            const spyPodOption = jest.spyOn(sidebarInstance, 'podOption');
            sidebarInstance.setState({
                podOption: true,
                activeElementType: 'element-interactive',
                activePrimaryOption: 'primary-smartlink',
                activeSecondaryOption: 'secondary-interactive-smartlink-third'
            });
            sidebarInstance.podOption();
            expect(spyPodOption).toHaveBeenCalled();
        });
        it("Testing togglePODDropdown for print50 pod option", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let event = {
                target: {
                    getAttribute: () => {
                        return 'print50'
                    }
                }
            }
            const spyTogglePODDropdown = jest.spyOn(sidebarInstance, 'togglePODDropdown');
            sidebarInstance.togglePODDropdown(event);
            expect(spyTogglePODDropdown).toHaveBeenCalled();
        });
        it("Testing togglePODDropdown for null pod option", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let event = {
                target: {
                    getAttribute: () => {
                        return null
                    }
                }
            }
            const spyTogglePODDropdown = jest.spyOn(sidebarInstance, 'togglePODDropdown');
            sidebarInstance.togglePODDropdown(event);
            expect(spyTogglePODDropdown).toHaveBeenCalled();
        });
        it("Testing togglePODDropdown for pod value `print100%`", () => {
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let event = {
                target: {
                    getAttribute: () => {
                        return null
                    }
                }
            }
            const spyTogglePODDropdown = jest.spyOn(sidebarInstance, 'togglePODDropdown');
            sidebarInstance.togglePODDropdown(event);
            expect(spyTogglePODDropdown).toHaveBeenCalled();
        });
    });
    xdescribe("Testing Other Methods", () => {
        const storeData1 = {
            appStore: {
                activeElement: {
                    "elementType": "figure",
                    "primaryOption": "primary-blockcode-equation",
                    "numbered": true,
                    "startNumber": "1",
                    "syntaxhighlighting": true,
                    "secondaryOption": "secondary-blockcode-language-html",
                    "elementId": "urn:pearson:work:0c423606-c2fe-4505-96c3-f04834870bd0",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": [],
                    "tag": "BCE"
                },
                updateElement,
                conversionElement,
                slateLevelData
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
            selectionReducer: {
                selection: ""
            },
            tcmReducer: {
                tisTCMCanvasPopupLaunched: false,
                tcmSnapshotData: {},
                elementData: {},
                tcmStatus: false
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: false
            },
            alfrescoReducer : {
                alfrescoAltLongDescData: {
                    altText: '',
                    longDesc: '',
                    savedAltLongDesData: 'abc'
                }
            }
        }
        const storeData2 = {
            ...storeData1,
            appStore: {
                activeElement: {
                    "elementType": "figure",
                    "primaryOption": "primary-blockcode-equation",
                    "numbered": true,
                    "startNumber": "1",
                    "syntaxhighlighting": true,
                    "secondaryOption": "secondary-blockcode-language-html",
                    "elementId": "urn:pearson:work:0c423606-c2fe-4505-96c3-f04834870bd0",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": [],
                    "tag": "BCE"
                },
                updateElement,
                conversionElement,
                slateLevelData
            }
        }
        const storeData3 = {
            ...storeData1,
            appStore: {
                activeElement: {
                    "elementType": "figure",
                    "asideNumber": true,
                    "primaryOption": "primary-blockcode-equation",
                    "numbered": true,
                    "startNumber": "1",
                    "syntaxhighlighting": true,
                    "secondaryOption": "secondary-blockcode-language-html",
                    "elementId": "urn:pearson:work:0c423606-c2fe-4505-96c3-f04834870bd0",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": [],
                    "tag": "BCE"
                },
                updateElement,
                conversionElement,
                slateLevelData
            }
        }
        const storeData4 = {
            ...storeData1,
            appStore: {
                activeElement: {
                    "elementType": "figure",
                    "asideNumber": true,
                    "primaryOption": "primary-blockcode-equation",
                    "numbered": true,
                    "startNumber": "1",
                    "syntaxhighlighting": true,
                    "secondaryOption": "secondary-blockcode-language-html",
                    "elementId": "urn:pearson:work:0c423606-c2fe-4505-96c3-f04834870bd0",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": [],
                    "tag": "BCE"
                },
                updateElement,
                conversionElement,
                slateLevelData,
                isLearnosityProjectInfo: [{
                    ItemBankName: 'a'
                }]
            }
        }
        const storeData5 = {
            ...storeData1,
            appStore: {
                activeElement: {
                    "elementType": "figure",
                    "asideNumber": false,
                    "primaryOption": "primary-blockcode-equation",
                    "numbered": true,
                    "startNumber": "1",
                    "syntaxhighlighting": false,
                    "secondaryOption": "secondary-blockcode-language-html",
                    "elementId": "urn:pearson:work:0c423606-c2fe-4505-96c3-f04834870bd0",
                    "index": 0,
                    "elementWipType": "figure",
                    "toolbar": [],
                    "tag": "BCE"
                },
                updateElement,
                conversionElement,
                slateLevelData,
                isLearnosityProjectInfo: [{
                    ItemBankName: 'a'
                }]
            }
        }
        const sidebarWithData1 = mockStore(storeData1);
        const sidebarWithData2 = mockStore(storeData2);
        const sidebarWithData3 = mockStore(storeData3);
        const sidebarWithData4 = mockStore(storeData4);
        const sidebarWithData5 = mockStore(storeData5);
        it("Test renderSyntaxHighlighting if consition tag='BCE' ", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let tag = "BCE";
            const spyRenderSyntaxHighlighting = jest.spyOn(sidebarInstance, 'renderSyntaxHighlighting');
            sidebarInstance.renderSyntaxHighlighting(tag);
            expect(spyRenderSyntaxHighlighting).toHaveBeenCalled();
        });
        it("Test renderSyntaxHighlighting if consition tag='BCE' when this.state.syntaxHighlightingToggleValue === false", () => {
            let sidebar = mount(<Provider store={sidebarWithData5}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            let tag = "BCE";
            const spyRenderSyntaxHighlighting = jest.spyOn(sidebarInstance, 'renderSyntaxHighlighting');
            sidebarInstance.renderSyntaxHighlighting(tag);
            expect(spyRenderSyntaxHighlighting).toHaveBeenCalled();
        });
        it("Test handleBQAttributionBlur if condition activeBQNode", () => {
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar {...props} /></Provider>);
            document.querySelector = () => {
                return {
                    focus: () => {
                        return jest.fn()
                    },
                    blur: () => {
                        return jest.fn()
                    },
                    getAttribute: () => {
                        return jest.fn()
                    },
                    setAttribute: () => {
                        return jest.fn()
                    },
                    querySelector: () => {
                        return {
                            getAttribute: () => {
                                return jest.fn()
                            },
                            setAttribute: () => {
                                return jest.fn()
                            }
                        }
                    }
                }
            }
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleBQAttributionBlur = jest.spyOn(sidebarInstance, 'handleBQAttributionBlur');
            sidebarInstance.handleBQAttributionBlur();
            expect(spyHandleBQAttributionBlur).toHaveBeenCalled();
        });
        it("Test handleBceBlur", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            document.querySelector = () => {
                return {
                    querySelector: () => {
                        return {
                            getAttribute: () => {
                                return jest.fn()
                            },
                            setAttribute: () => {
                                return jest.fn()
                            }
                        }
                    },
                    focus: () => {
                        return jest.fn()
                    },
                    blur: () => {
                        return jest.fn()
                    },
                    getAttribute: () => {
                        return jest.fn()
                    },
                    setAttribute: () => {
                        return jest.fn()
                    }
                }
            }
            document.getElementById = () => {
                return {
                    focus: () => {
                        return jest.fn()
                    },
                    blur: () => {
                        return jest.fn()
                    }
                }
            }
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleBceBlur = jest.spyOn(sidebarInstance, 'handleBceBlur');
            sidebarInstance.handleBceBlur();
            expect(spyHandleBceBlur).toHaveBeenCalled();
        });
        it("Test handleAsideNumber", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleAsideNumber  = jest.spyOn(sidebarInstance, 'handleAsideNumber');
            sidebarInstance.handleAsideNumber();
            expect(spyHandleAsideNumber).toHaveBeenCalled();
        });

        it("Test handleAsideNumber - asideNumber - true", () => {
            let sidebar = mount(<Provider store={sidebarWithData3}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleAsideNumber  = jest.spyOn(sidebarInstance, 'handleAsideNumber');
            sidebarInstance.handleAsideNumber();
            expect(spyHandleAsideNumber).toHaveBeenCalled();
        });

        it("Test handleAsideNumber - asideNumber - true", () => {
            jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(false);
            config.savingInProgress = false;
            let sidebar = mount(<Provider store={sidebarWithData5}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleAsideNumber  = jest.spyOn(sidebarInstance, 'handleAsideNumber');
            sidebarInstance.handleAsideNumber();
            expect(spyHandleAsideNumber).toHaveBeenCalled();
        });
        
        it("Test setStartLineNumber", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spySetStartLineNumber   = jest.spyOn(sidebarInstance, 'setStartLineNumber');
            sidebarInstance.setStartLineNumber({target: {value: 1}});
            expect(spySetStartLineNumber).toHaveBeenCalled();
        })

        it("Test handleNumberedLineToggle", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleNumberedLineToggle    = jest.spyOn(sidebarInstance, 'handleNumberedLineToggle');
            sidebarInstance.handleNumberedLineToggle();
            expect(spyHandleNumberedLineToggle).toHaveBeenCalled();
        })
        
        it("Test handleDialogueNumber - number value", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleDialogueNumber    = jest.spyOn(sidebarInstance, 'handleDialogueNumber');
            sidebarInstance.handleDialogueNumber({target: {value: 1}});
            expect(spyHandleDialogueNumber).toHaveBeenCalled();
        })

        it("Test handleDialogueNumber - string value", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleDialogueNumber = jest.spyOn(sidebarInstance, 'handleDialogueNumber');
            sidebarInstance.handleDialogueNumber({target: {value: 'number'}});
            expect(spyHandleDialogueNumber).toHaveBeenCalled();
        })

        it("Test handleDialogueToggle", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleDialogueToggle = jest.spyOn(sidebarInstance, 'handleDialogueToggle');
            sidebarInstance.handleDialogueToggle();
            expect(spyHandleDialogueToggle).toHaveBeenCalled();
        })

        const updatedProps = {...props, showCanvasBlocker: jest.fn()}
        it("Test setUpdatedAssessmentType", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...updatedProps} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spySetUpdatedAssessmentType = jest.spyOn(sidebarInstance, 'setUpdatedAssessmentType');
            sidebarInstance.setUpdatedAssessmentType();
            expect(spySetUpdatedAssessmentType).toHaveBeenCalled();
        })

        it("Test showUpdateAssessmentTypePopup", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...updatedProps} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyShowUpdateAssessmentTypePopup = jest.spyOn(sidebarInstance, 'showUpdateAssessmentTypePopup');
            sidebarInstance.showUpdateAssessmentTypePopup();
            expect(spyShowUpdateAssessmentTypePopup).toHaveBeenCalled();
        })

        it("Test handleUpdateAssessmentTypePopup", () => {
            let sidebar = mount(<Provider store={sidebarWithData4}><Sidebar {...updatedProps} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleUpdateAssessmentTypePopup = jest.spyOn(sidebarInstance, 'handleUpdateAssessmentTypePopup');
            sidebarInstance.handleUpdateAssessmentTypePopup();
            expect(spyHandleUpdateAssessmentTypePopup).toHaveBeenCalled();
        })

        describe("Testing toggleElementDropdown", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...updatedProps} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyToggleElementDropdown = jest.spyOn(sidebarInstance, 'toggleElementDropdown');
            it("hasReviewerRole true", () => {
                jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
                let event = {}
                sidebarInstance.toggleElementDropdown(event);
                expect(spyToggleElementDropdown).toHaveBeenCalled();
            })
            it("Test toggleElementDropdown - First IF Condition", () => {
                let event = {
                    target: {
                        dataset: {
                            element: "primary"
                        }
                    },
                    stopPropagation: jest.fn()
                }
                sidebarInstance.toggleElementDropdown(event);
                expect(spyToggleElementDropdown).toHaveBeenCalled();
            })
            it("Test toggleElementDropdown - Second IF Condition - fontBulletElementDropdown = `font`", () => {
                let event = {
                    target: {
                        getAttribute: jest.fn().mockReturnValue('font')
                    },
                    stopPropagation: jest.fn()
                }
                sidebarInstance.setState({
                    fontBulletElementDropdown: 'font',
                });
                sidebarInstance.toggleElementDropdown(event);
                expect(spyToggleElementDropdown).toHaveBeenCalled();
            })
            it("Test toggleElementDropdown - Else Condition of Second IF Condition - fontBulletElementDropdown = ``", () => {
                let event = {
                    target: {
                        getAttribute: jest.fn().mockReturnValue('font2')
                    },
                    stopPropagation: jest.fn()
                }
                sidebarInstance.setState({
                    fontBulletElementDropdown: 'font2',
                });
                sidebarInstance.toggleElementDropdown(event);
                expect(spyToggleElementDropdown).toHaveBeenCalled();
            })
            it("Test toggleElementDropdown - IF Condition - `this.state.elementDropdown === elementDropdown`", () => {
                let event = {
                    target: {
                        getAttribute: jest.fn().mockReturnValue('font3')
                    },
                    stopPropagation: jest.fn()
                }
                sidebarInstance.setState({
                    elementDropdown: 'font3',
                });
                sidebarInstance.toggleElementDropdown(event);
                expect(spyToggleElementDropdown).toHaveBeenCalled();
            })
        })

        describe("Testing fontBulletOption", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...updatedProps} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyFontBulletOption = jest.spyOn(sidebarInstance, 'fontBulletOption');
            it("Test fontBulletOption - when data = `fontStyle`", () => {
                let data = "fontStyle";
                sidebarInstance.setState({
                    fontBulletElementDropdown: 'font',
                });
                sidebarInstance.fontBulletOption(data);
                expect(spyFontBulletOption).toHaveBeenCalled();
            })
            it("Test fontBulletOption - when data = `bulletIcon`", () => {
                let data = "bulletIcon";
                sidebarInstance.setState({
                    fontBulletElementDropdown: 'bullet',
                });
                sidebarInstance.fontBulletOption(data);
                expect(spyFontBulletOption).toHaveBeenCalled();
            })
            it("Test fontBulletOption - when sidebarDisableCondition = true", () => {
                let mockStoreForFontBulletOption = {
                    ...storeData1,
                    appStore: {
                        activeElement: {
                            "elementType": "element-aside",
                            "primaryOption": "primary-aside-aside",
                            "secondaryOption": "secondary-aside-sb1",
                            "asideNumber": false,
                            "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82",
                            "index": 0,
                            "elementWipType": "element-aside",
                            "toolbar": [],
                            "tag": "As"
                        },
                        updateElement,
                        conversionElement,
                        slateLevelData,
                    },
                    selectionReducer: {
                        selection: {
                            operationType: "cut",
                            element: {
                                id: "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82"
                            }
                        }
                    }
                };
                const mockStoreDataForFontBulletOption = mockStore(mockStoreForFontBulletOption);
                let sidebar = mount(<Provider store={mockStoreDataForFontBulletOption}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyFontBulletOption = jest.spyOn(sidebarInstance, 'fontBulletOption');
                sidebarInstance.fontBulletOption(null);
                expect(spyFontBulletOption).toHaveBeenCalled();
            })
            it("Test fontBulletOption - when returns null", () => {
                let mockStoreForFontBulletOption = {
                    ...storeData1,
                    appStore: {
                        activeElement: {
                            "elementType": "element-dialogue",
                            "primaryOption": "primary-element-dialogue",
                            "secondaryOption": 'secondary-element-dialogue',
                            "asideNumber": false,
                            "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82",
                            "index": 0,
                            "elementWipType": "element-dialogue",
                            "toolbar": [],
                            "tag": ""
                        },
                        updateElement,
                        conversionElement,
                        slateLevelData,
                    },
                    selectionReducer: {
                        selection: {
                            operationType: "cut",
                            element: {
                                id: "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82"
                            }
                        }
                    }
                };
                const mockStoreDataForFontBulletOption = mockStore(mockStoreForFontBulletOption);
                let sidebar = mount(<Provider store={mockStoreDataForFontBulletOption}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyFontBulletOption = jest.spyOn(sidebarInstance, 'fontBulletOption');
                sidebarInstance.fontBulletOption(null);
                expect(spyFontBulletOption).toHaveBeenCalled();
            })
        })

        it("Testing handleSyntaxHighlightingPopup - IF Condition", () => {
            let sidebar = mount(<Provider store={sidebarWithData1}><Sidebar {...updatedProps} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleSyntaxHighlightingPopup = jest.spyOn(sidebarInstance, 'handleSyntaxHighlightingPopup');
            sidebarInstance.handleSyntaxHighlightingPopup(true);
            expect(spyHandleSyntaxHighlightingPopup).toHaveBeenCalled();
        })

        describe("Testing handleSyntaxHighlightingToggle", () => {
            it("Test handleSyntaxHighlightingToggle - when `this.state.syntaxHighlightingToggleValue == false`", () => {
                let mockDataForHandleSyntaxHighlightingToggle = {
                    ...storeData1,
                    appStore: {
                        activeElement: {
                            "elementType": "element-dialogue",
                            "primaryOption": "primary-element-dialogue",
                            "secondaryOption": 'secondary-element-dialogue',
                            "asideNumber": false,
                            "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82",
                            "index": 0,
                            "elementWipType": "element-dialogue",
                            "toolbar": [],
                            "tag": "DE",
                            "syntaxhighlighting": false
                        },
                        updateElement,
                        conversionElement,
                        slateLevelData,
                    }
                };
                const mockStoreForHandleSyntaxHighlightingToggle = mockStore(mockDataForHandleSyntaxHighlightingToggle);
                let sidebar = mount(<Provider store={mockStoreForHandleSyntaxHighlightingToggle}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyHandleSyntaxHighlightingToggle = jest.spyOn(sidebarInstance, 'handleSyntaxHighlightingToggle');
                sidebarInstance.handleSyntaxHighlightingToggle();
                expect(spyHandleSyntaxHighlightingToggle).toHaveBeenCalled();
            })
            it("Test handleSyntaxHighlightingToggle - when `this.state.syntaxHighlightingToggleValue == null`", () => {
                let mockDataForHandleSyntaxHighlightingToggle = {
                    ...storeData1,
                    appStore: {
                        activeElement: {
                            "elementType": "element-dialogue",
                            "primaryOption": "primary-element-dialogue",
                            "secondaryOption": 'secondary-element-dialogue',
                            "asideNumber": false,
                            "elementId": "urn:pearson:manifest:a4b48624-2ae1-46aa-bf21-ddb88a5dcf82",
                            "index": 0,
                            "elementWipType": "element-dialogue",
                            "toolbar": [],
                            "tag": "DE",
                            "syntaxhighlighting": null
                        },
                        updateElement,
                        conversionElement,
                        slateLevelData,
                    }
                };
                const mockStoreForHandleSyntaxHighlightingToggle = mockStore(mockDataForHandleSyntaxHighlightingToggle);
                let sidebar = mount(<Provider store={mockStoreForHandleSyntaxHighlightingToggle}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyHandleSyntaxHighlightingToggle = jest.spyOn(sidebarInstance, 'handleSyntaxHighlightingToggle');
                sidebarInstance.handleSyntaxHighlightingToggle();
                expect(spyHandleSyntaxHighlightingToggle).toHaveBeenCalled();
            })
        })

        describe("Testing secondaryOption", () => {
            let storeData = {
                ...storeData1,
                appStore: {
                    activeElement: {
                        "elementType": "groupedcontent",
                        "primaryOption": "primary-multicolumn-3c",
                        "secondaryOption": "secondary-multicolumn-3c-wider",
                        "elementId": "urn:pearson:manifest:4eeac843-68a0-4e67-bc85-f118343fda9f",
                        "index": 0,
                        "elementWipType": "groupedcontent",
                        "toolbar": [],
                        "tag": "3C"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            const mockStoreData = mockStore(storeData);
            it('Testing secondaryOption - this.state.activePrimaryOption === MULTI_COLUMN_3C.ELEMENT_NAME', () => {
                let sidebar = mount(<Provider store={mockStoreData}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spySecondaryOption = jest.spyOn(sidebarInstance, 'secondaryOption');
                sidebarInstance.secondaryOption();
                expect(spySecondaryOption).toHaveBeenCalled();
            })
        })

        describe("Testing attributions", () => {
            let storeData = {
                ...storeData1,
                appStore: {
                    activeElement: {
                        "elementType": "element-interactive",
                        "primaryOption": "primary-mmi",
                        "altText": "Sample alt-text",
                        "longDesc": "",
                        "tag": "QUAD",
                        "secondaryOption": "secondary-interactive-mmi",
                        "elementId": "urn:pearson:work:62ce3163-68bd-4f4a-9bb4-e80dfde799bc",
                        "index": 1,
                        "elementWipType": "figure",
                        "toolbar": ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment', 'calloutIcon', 'IndexEntry']
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
                autoNumberReducer: {
                    isAutoNumberingEnabled: true
                },
                alfrescoReducer : {
                    alfrescoAltLongDescData: {
                        altText: '',
                        longDesc: '',
                        savedAltLongDesData: 'abc'
                    }
                }
            }
            let storeData2 = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "element-interactive",
                        "primaryOption": "primary-elm-interactive",
                        "altText": "",
                        "longDesc": "",
                        "tag": "QUAD",
                        "secondaryOption": "secondary-elm-interactive",
                        "elementId": "urn:pearson:work:62ce3163-68bd-4f4a-9bb4-e80dfde799bc",
                        "index": 1,
                        "elementWipType": "figure",
                        "toolbar": ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment', 'calloutIcon', 'IndexEntry']
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            let storeData3 = {
                ...storeData,
                appStore: {
                    activeElement: {
                        elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
                        elementType: "figure",
                        elementWipType: "figure",
                        primaryOption: "primary-image-figure",
                        secondaryOption: "secondary-image-figure-width",
                        index: 0,
                        tag: "Fg",
                        toolbar: [],
                        type:"figure",
                        longDesc: "This Image is of Rainbow"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            let storeData4 = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "figure",
                        "primaryOption": "primary-blockcode-equation",
                        "numbered": null,
                        "startNumber": null,
                        "syntaxhighlighting": null,
                        "secondaryOption": "secondary-blockcode-language-default",
                        "elementId": "urn:pearson:work:4d0eb1fc-7fb7-4f23-a4b2-11d61880330f",
                        "index": 0,
                        "elementWipType": "figure",
                        "toolbar": [],
                        "tag": "BCE",
                        querySelector: () => {
                            return {
                                setAttribute: jest.fn()
                            }
                        }
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            let storeData5 = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "element-dialogue",
                        "primaryOption": "primary-element-dialogue",
                        "secondaryOption": "secondary-element-dialogue",
                        "numbered": false,
                        "startNumber": "1",
                        "elementId": "urn:pearson:work:86510e9b-8b16-4679-aac4-03d47e4b4c02",
                        "index": 0,
                        "elementWipType": "element-dialogue",
                        "toolbar": [],
                        "tag": "PS"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            let storeData6 = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "poetry",
                        "primaryOption": "primary-poetry",
                        "secondaryOption": "secondary-poetry",
                        "numbered": false,
                        "startNumber": "1",
                        "elementId": "urn:pearson:manifest:4fb50881-64c2-4124-a4a9-152beb308091",
                        "index": 0,
                        "elementWipType": "poetry",
                        "toolbar": [],
                        "tag": "PE"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            let storeData7 = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "poetry",
                        "primaryOption": "primary-poetry",
                        "secondaryOption": "secondary-poetry",
                        "numbered": null,
                        "startNumber": null,
                        "elementId": "urn:pearson:manifest:4fb50881-64c2-4124-a4a9-152beb308091",
                        "index": 0,
                        "elementWipType": "poetry",
                        "toolbar": [],
                        "tag": "PE"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            let storeData8 = {
                ...storeData,
                appStore: {
                    activeElement: {
                        "elementType": "element-aside",
                        "primaryOption": "primary-aside-aside",
                        "secondaryOption": "secondary-aside-sb1",
                        "asideNumber": true,
                        "elementId": "urn:pearson:manifest:f6cda7dc-8b11-4ccb-b429-7578804456ee",
                        "index": 0,
                        "elementWipType": "element-aside",
                        "toolbar": [],
                        "tag": "As"
                    },
                    updateElement,
                    conversionElement,
                    slateLevelData
                },
            }
            const mockStoreData = mockStore(storeData);
            const mockStoreData2 = mockStore(storeData2);
            const mockStoreData3 = mockStore(storeData3);
            const mockStoreData4 = mockStore(storeData4);
            const mockStoreData5 = mockStore(storeData5);
            const mockStoreData6 = mockStore(storeData6);
            const mockStoreData7 = mockStore(storeData7);
            const mockStoreData8 = mockStore(storeData8);
            it("Testing `primaryOptionList.text && primaryOptionList.text === 'Quad Interactive'`", () => {
                let sidebar = mount(<Provider store={mockStoreData}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
            it("Testing `primaryOptionList.text && (primaryOptionList.text === 'Quad Interactive' || primaryOptionList.text === 'Elm Interactive')`", () => {
                let sidebar = mount(<Provider store={mockStoreData2}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
            it("Cover branch - this.props.activeElement.longDesc", () => {
                let sidebar = mount(<Provider store={mockStoreData3}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
            it("Cover branches in condition - this.state.activePrimaryOption === 'primary-blockcode-equation' && this.props.activeElement.elementId", () => {
                let sidebar = mount(<Provider store={mockStoreData4}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
            it("Cover branches in condition - this.state.activePrimaryOption && this.state.activePrimaryOption === 'primary-element-dialogue' && this.props.activeElement.elementId", () => {
                let sidebar = mount(<Provider store={mockStoreData5}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
            it("Cover branches in condition - this.state.activePrimaryOption === 'primary-poetry' && this.props.activeElement.elementId", () => {
                let sidebar = mount(<Provider store={mockStoreData6}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
            it("Cover branches in condition - this.state.activePrimaryOption === 'primary-poetry' && this.props.activeElement.elementId - when bceToggleValue is null", () => {
                let sidebar = mount(<Provider store={mockStoreData7}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
            it("Cover branches in condition - this.props.activeElement.elementType === 'element-aside' || this.props.activeElement.elementType === 'element-workedexample'", () => {
                let sidebar = mount(<Provider store={mockStoreData8}><Sidebar {...updatedProps} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                const spyAttributions = jest.spyOn(sidebarInstance, 'attributions');
                sidebarInstance.attributions();
                expect(spyAttributions).toHaveBeenCalled();
            })
        })
    });
     describe("Blockquote", () => {
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
            document.getElementsByClassName = () => {
                let els = []
                let children =  {
                    classList: {
                        add: jest.fn(),
                        remove: jest.fn()
                    },
                    querySelectorAll: () => {
                        return {
                            length: 2
                        }
                    }
                }
                els.push(children)
                return els
            }
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking showModuleName function for checked value true else condition", () => {
            let e = { currentTarget: { checked: true } }
            const elementIdInfo = document.createElement('div');
            elementIdInfo.className = "moduleContainer learningObjectiveData";
            document.body.appendChild(elementIdInfo);
            document.getElementsByClassName = () => {
                let els = []
                let children =  {
                    classList: {
                        add: jest.fn(),
                        remove: jest.fn()
                    },
                    querySelectorAll: () => {
                        return {
                            length: 1
                        }
                    }
                }
                els.push(children)
                return els
            }
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking showModuleName function for slateType = partintro", () => {
            let slateLevelData2 = { ...slateLevelData }
            slateLevelData2["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"]["type"] = "partintro";
            let initalStore2 = { ...initialStore }
            initalStore2["appStore"] = {
                activeElement,
                updateElement,
                conversionElement,
                slateLevelData: slateLevelData2
            }
            const sidebarWithDataTemp = mockStore(initalStore2);
            let e = { currentTarget: { checked: true } }
            const elementIdInfo = document.createElement('div');
            elementIdInfo.className = "moduleContainer learningObjectiveData";
            document.body.appendChild(elementIdInfo);
            document.getElementsByClassName = () => {
                let els = []
                let children =  {
                    classList: {
                        add: jest.fn(),
                        remove: jest.fn()
                    },
                    querySelectorAll: () => {
                        return {
                            length: 1
                        }
                    }
                }
                els.push(children)
                return els
            }
            config.elementStatus = {
                "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b": "approved"
            }
            let sidebar = mount(<Provider store={sidebarWithDataTemp}><Sidebar {...props}/></Provider>);
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
