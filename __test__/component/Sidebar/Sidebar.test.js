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
        type:"figure",
        assetIdFor3PISmartlink:"3rd-party"
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
        },
        slateLockReducer: {
            slateLockInfo: {
                slateLockInfo: {}
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
        expect(sidebar.find('.element-dropdown').length).toBe(4)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').length).toBe(1)
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(2)
        expect(spySetSecondary).toHaveBeenCalled();
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
            },
            slateLockReducer: {
                slateLockInfo: {
                    slateLockInfo: {}
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
            },
            slateLockReducer: {
                slateLockInfo: {
                    slateLockInfo: {}
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
            },
            slateLockReducer: {
                slateLockInfo: {
                    slateLockInfo: {}
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
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
        it("Testing handlePrimaryOptionChange  function - manifestlist block - else", () => {
            const sidebarWithData1 = mockStore({
                appStore: {
                    activeElement: {
                        ...activeElement,
                        elementWipType: "test",
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
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
        it("Testing handleSetDecorativeImagePopup", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleSetDecorativeImagePopup')
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
            sidebarInstance.handleSetDecorativeImagePopup();
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing setUpdatedAssessmentType", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'setUpdatedAssessmentType')
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
            sidebarInstance.setUpdatedAssessmentType(123);
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleUpdateAssessmentTypePopup", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleUpdateAssessmentTypePopup')
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
            sidebarInstance.handleUpdateAssessmentTypePopup(123);
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleSecondaryLanguageChange", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleSecondaryLanguageChange')
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
            sidebarInstance.handleSecondaryLanguageChange({target: 1}, {item: 'abc', labelText: 'def'});
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleDialogueBlur", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleDialogueBlur')
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
            sidebarInstance.handleDialogueBlur();
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleDialogueToggle", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleDialogueToggle')
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
            sidebarInstance.handleDialogueToggle();
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleDialogueNumber", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleDialogueNumber')
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
            sidebarInstance.handleDialogueNumber({target: {value: 'abc'}});
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleNumberedLineToggle", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleNumberedLineToggle')
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
            sidebarInstance.handleNumberedLineToggle();
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing setStartLineNumber", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'setStartLineNumber')
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
            sidebarInstance.setStartLineNumber({target: {value: 'abc'}});
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleAsideNumber", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleAsideNumber')
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
            sidebarInstance.handleAsideNumber(123);
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleBQAttributionBlur", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleBQAttributionBlur')
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
            sidebarInstance.handleBQAttributionBlur();
            expect(spyHandleFontBulletOptionChange).toHaveBeenCalled();
        })
        it("Testing handleDecorativePopup", () => {
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
                },
                slateLockReducer: {
                    slateLockInfo: {
                        slateLockInfo: {}
                    }
                }
            });
            let sidebar = mount(<Provider store={sidebarWithData2}><Sidebar   {...props} /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            const spyHandleFontBulletOptionChange = jest.spyOn(sidebarInstance, 'handleDecorativePopup')
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
            sidebarInstance.handleDecorativePopup();
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
            },
            slateLockReducer: {
                slateLockInfo: {
                    slateLockInfo: {}
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
            },
            slateLockReducer: {
                slateLockInfo: {
                    slateLockInfo: {}
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
            },
            slateLockReducer: {
                slateLockInfo: {
                    slateLockInfo: {}
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
            },
            slateLockReducer: {
                slateLockInfo: {
                    slateLockInfo: {}
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
        it("handleIntendedPlaybackDropdown method ", () => {
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            
            let event = {
                target: {
                    getAttribute: () => {
                        return "inline";
                    }
                }
            }
            sidebarInstance.handleIntendedPlaybackDropdown(event);
            expect(sidebarInstance.state.attrInput).toEqual('');
        })
         
         it("renderIntendedPlaybackDropdownLabel method ", () => {
             let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props} /></Provider>);
             const sidebarInstance = sidebar.find('Sidebar').instance();
             sidebarInstance.renderIntendedPlaybackDropdownLabel("default");
             expect(sidebarInstance.state.attrInput).toEqual('');
         })
        it("playbackMode method ", () => {
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.setState({
                activeElementType: 'element-interactive',
                isPlayBackDropdownOpen: true
            });
            sidebarInstance.playbackMode();
            expect(sidebarInstance.state.attrInput).toEqual('');
        })
        it("toggleIntendedPlaybackDropdown method ", () => {
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.toggleIntendedPlaybackDropdown();
            expect(sidebarInstance.state.attrInput).toEqual('');
        })
        it("playbackMode  method else case", () => {
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props}/></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.setState({
                activeElementType: false,
                isPlayBackDropdownOpen: false
            });
            sidebarInstance.playbackMode();
            expect(sidebarInstance.state.attrInput).toEqual('');
        })
         it('handleOutputTypeValue function', () => {
             let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props} /></Provider>);
             const sidebarInstance = sidebar.find('Sidebar').instance();
             sidebarInstance.handleOutputTypeValue({target: {value: 'all'}});
         })
         it('componentWillUnmount Event', () => {
             let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props} /></Provider>);
             const sidebarInstance = sidebar.find('Sidebar').instance();
             sidebarInstance.componentWillUnmount();
         })
         it('handleClickOutside Event', () => {
             let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props} /></Provider>);
             const sidebarInstance = sidebar.find('Sidebar').instance();
             const event = {
                 target:[]
             }
             sidebarInstance.playbackModeRef = { current: { contains: jest.fn()}} 
             sidebarInstance.playbackModeLabelRef = { current: { contains: jest.fn()} }
             sidebarInstance.handleClickOutside(event);
         })
         it('handleClickOutside Event else case', () => {
             let sidebar = mount(<Provider store={sidebarWithData}><Sidebar   {...props} /></Provider>);
             const sidebarInstance = sidebar.find('Sidebar').instance();
             const event = {
                 target: ["playbackmoderef"]
             }
             sidebarInstance.playbackModeRef = null
             sidebarInstance.handleClickOutside(event);
         })
    })
});
