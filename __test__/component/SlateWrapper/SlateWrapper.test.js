import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux';
import { slateData, emptySlateData, slateDataForIntro, slateDataForAssess, slateDataVer } from '../../../fixtures/slateTestingData.js'
import SlateWrapper from '../../../src/component/SlateWrapper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store1 = mockStore({
    slateLockReducer: { slateLockInfo: {} },
    appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
    toolbarReducer: { elemBorderToggle: true },
    metadataReducer: { currentSlateLOData: [] },
    audioReducer: {openRemovePopUp: false},
    searchReducer: {searchTerm: '', parentId: '', deeplink: false},
    commentSearchReducer: {commentSearchTerm: '', parentId: ''},
    assessmentReducer:{showConfirmationPopup:false},
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    }
})
import config from '../../../src/config/config';
import { showTocBlocker } from "../../../src/js/toggleLoader";
//IMPORT TINYMCE 
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/paste";
jest.mock('../../../src/config/config.js', () => ({
    scrolling: true,
    totalPageCount:3,
    page:2
}))
jest.mock('../../../src/component/ListButtonDrop/ListButtonDropPortal.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/ListButtonDrop/ListButtonDrop.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/ElementContainer', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/ElementSaprator', () => {
    return function () {
        return (<div>null</div>)
    }
})

const initialState = {
    slateLockReducer: { slateLockInfo: {
        isLocked: false,
        userId: 'c5Test01'
    }, withinLockPeriod: true },
    appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
    toolbarReducer: { elemBorderToggle: true },
    metadataReducer: { currentSlateLOData: [] },
    audioReducer: {openRemovePopUp: false, openSplitPopUp: true},
    searchReducer: {searchTerm: 'searchTerm-123', parentId: 'parentId-123', deeplink: false, scroll: ""},
    commentSearchReducer: { commentSearchTerm: 'commentSearch-123', parentId: 'commentP-123', scrollTop: "10" },
    assessmentReducer:{showConfirmationPopup:false},
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    }
}
const mockFunction = jest.fn().mockImplementation = () => {
    return { type: 'Fire Action' };
}
jest.mock('../../../src/component/SlateWrapper/SlateWrapper_Actions.js', () => ({
    createElement: mockFunction
}));
jest.mock('../../../src/component/CanvasWrapper/SlateLock_Actions.js', () => ({
    setSlateLock: mockFunction,
    releaseSlateLock: mockFunction,
    getSlateLockStatus: mockFunction,
    releaseSlateLockWithCallback: mockFunction
}));
jest.mock('../../../src/component/ElementContainer/AssessmentEventHandling.js', () => ({
    reloadSlate: jest.fn()
}));
const actionProps = {
    setSlateLock: jest.fn(),
    getSlateLockStatus: jest.fn(),
    createElement: jest.fn(),
    releaseSlateLock: jest.fn(),
    swapElement: jest.fn(),
    setSplittedElementIndex: jest.fn(),
    updatePageNumber: jest.fn(),
    fetchAudioNarrationForContainer: jest.fn(),
    deleteAudioNarrationForContainer: jest.fn(),
    showAudioRemovePopup: jest.fn(),
    showAudioSplitPopup: jest.fn(),
    setLockPeriodFlag: jest.fn(),
    setActiveElement: jest.fn(),
    showWrongAudioPopup: jest.fn(),
    accessDenied: jest.fn(),
    openPopupSlate: jest.fn(),
    showSlateLockPopup: jest.fn(),
    handleTCMData: jest.fn(),
    fetchSlateData: jest.fn(),
    assessmentConfirmationPopup: jest.fn(),
    getCommentElements: jest.fn(),
    pasteElement: jest.fn(),
    wirisAltTextPopup: jest.fn(),
    audioGlossaryPopup: jest.fn(),
    createPowerPasteElements: jest.fn(),
    getMetadataAnchorLORef: jest.fn(),
    toggleLOWarningPopup: jest.fn(),
    showWrongImagePopup: jest.fn(),
    alfrescoPopup: jest.fn(),
    showRemoveImageGlossaryPopup: jest.fn()
}
const slateWrapInstance = (props, initialSt = initialState) => {
    const store = mockStore(initialSt);
    const component = mount(<Provider store={store}><SlateWrapper {...props} /></Provider>);
    return component.find('SlateWrapper').instance();
}

describe("SlateWrapper Component", () => {
    config.ssoToken = "1214";
    let props = {
        slateData: slateData,
        permissions : [],
        toggleTocDelete: true,
        loadMorePages:jest.fn(),
        showSlateLockPopupValue:true,
        showConfirmationPopup:true,
        showBlocker:jest.fn(),
        releaseSlateLock: jest.fn(),
        commentSearchScrollTop: "123",
        ...actionProps
    };
    it("1.2 Test - componentDidMount ", () => {
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute("id", "cypress-0");
        document.body.appendChild(elementDiv);

        const compInstance = slateWrapInstance(props);
		const spy = jest.spyOn(compInstance, 'componentDidMount')
		compInstance.componentDidMount();
		expect(spy).toHaveBeenCalled();
		spy.mockClear()
    })
    describe("1.3 Test - componentDidUpdate ", () => {
        it("1.3.1 Test - componentDidUpdate if cases", () => {
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute("data-id", "searchParent");
            elementDiv.setAttribute("id", "slateWrapper");
            elementDiv.setAttribute("scrollTop", "5");
            document.body.appendChild(elementDiv);

            jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
                return { offsetTop: 10 };
            })

            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'componentDidUpdate')
            compInstance.componentDidUpdate();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it("1.3.2 Test - else cases (searchParent/commentSearchParent !== '')", () => {
            const newInitialState = {
                ...initialState,
                searchReducer: {searchTerm: '', parentId: '', deeplink: false, scroll: ""},
                commentSearchReducer: { commentSearchTerm: '', parentId: '', scrollTop: "10" }
            }

            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'componentDidUpdate')
            compInstance.componentDidUpdate();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it("1.3.3 Test - else cases (commentSearchNode/commentSearchScroll/searchNode !== '')", () => {
            const newInitialState = {
                ...initialState,
                searchReducer: {searchTerm: '', parentId: 'parentId-123', deeplink: false, scroll: ""},
                commentSearchReducer: { commentSearchTerm: '', parentId: 'commentP-123', scrollTop: "", scroll:"10" }
            }

            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'componentDidUpdate')
            compInstance.componentDidUpdate();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.4 Test - handleScroll ", () => {
        it("1.4.1 Test - handleScroll case if(config.totalPageCount <= config.page)", () => {
            config.totalPageCount = 5; config.page = 7;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'handleScroll')
            compInstance.handleScroll();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it("1.4.2 Test - handleScroll case (config.totalPageCount > config.page)", () => {
            config.totalPageCount = 10; config.page = 7;
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const event = {target: { scrollTop: 100, clientHeight: 100, scrollHeight: 100 }};
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'handleScroll');
            compInstance.handleScroll(event);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it("1.4.3 Test - handleScroll Else Cases", () => {
            config.totalPageCount = 10; config.page = 7;
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc96546622ab";
            const event = {target: { scrollTop: 10, clientHeight: 100, scrollHeight: 100 }};
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'handleScroll');
            compInstance.handleScroll(event);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    });
    it("1.4A Test -  setListDropRef ", ()=> {
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute("data-id", "12345");

        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'setListDropRef')
        compInstance.setListDropRef(elementDiv);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    describe("1.5 Test - handleClickOutside ", () => {
        it("1.5.1 Test -  if case - (this.listDropRef) ", () => {
            const elementDiv = document.createElement('div');
            const elementSpan = document.createElement('span');
            elementSpan.setAttribute("class", "fa-list-ol");
            const event = {target: elementSpan};

            const compInstance = slateWrapInstance(props);
            compInstance.setListDropRef(elementDiv);
            const spy = jest.spyOn(compInstance, 'handleClickOutside')
            compInstance.handleClickOutside(event);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it("1.5.2 Test -  else case (event.target.classList.contains('fa-list-ol') ", () => {
            const elementDiv = document.createElement('div');
            const elementSpan = document.createElement('span');
            elementSpan.setAttribute("class", "fr-active");
            const event = {target: elementSpan};

            jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
                return { querySelector: () => { return elementSpan }}
            });
            const compInstance = slateWrapInstance(props);
            compInstance.setListDropRef(elementDiv);
            const spy = jest.spyOn(compInstance, 'handleClickOutside')
            compInstance.handleClickOutside(event);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it("1.5.3 Test -  else case (this.listDropRef) ", () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'handleClickOutside')
            compInstance.handleClickOutside({});
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    it('1.6 Test - prepareSwapData ', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        const event = { oldDraggableIndex: 1, newDraggableIndex: 0 };
        const newProps = {...props, slateData: slateData}
        const compInstance = slateWrapInstance(newProps);
        const spy = jest.spyOn(compInstance, 'prepareSwapData')
        compInstance.prepareSwapData(event);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.7.1 Test - checkOpener if Case', () => {
        config.isCO = "true";
        const event = { newDraggableIndex: 0 };
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'checkOpener')
        compInstance.checkOpener(event);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.7.2 Test - checkOpener else case', () => {
        config.isCO = "";
        const event = { newDraggableIndex: 0 };
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'checkOpener')
        compInstance.checkOpener(event);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.8  Test - releaseSlateLock ', () => {
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'releaseSlateLock')
        compInstance.releaseSlateLock();
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.9  Test - debounceReleaseHandler ', () => {
        const callback = jest.fn();
        const context = { props: {
            withinLockPeriod: true,
            slateData: slateData,
            setLockPeriodFlag: jest.fn()
        }};
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'debounceReleaseHandler')
        compInstance.debounceReleaseHandler(callback, context);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    describe("1.10 Test - handleClickOutside ", () => {
        it('1.10.1  Test - if case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'setSlateLock')
            compInstance.setSlateLock("1234", "4321");
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.10.2  Test - else case ', () => {
            config.projectUrn = "p-123";
            const newInitialState = {...initialState, slateLockReducer: { slateLockInfo: {}, withinLockPeriod: false }}
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'setSlateLock')
            compInstance.setSlateLock("1234", "4321");
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    it('1.11  Test - toggleLockReleasePopup  ', () => {
        const event = {preventDefault: jest.fn(), stopPropagation: jest.fn()}
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'toggleLockReleasePopup')
        compInstance.toggleLockReleasePopup(true, event);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.12  Test - prohibitPropagation  ', () => {
        const event = {preventDefault: jest.fn(), stopPropagation: jest.fn()}
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'prohibitPropagation')
        compInstance.prohibitPropagation(event);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    describe("1.13 Test - checkLockStatus ", () => {
        it('1.13.1  Test - if case ', () => {
            const newInitialState = {...initialState, slateLockReducer: { slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            }, withinLockPeriod: true }}
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'checkLockStatus')
            compInstance.checkLockStatus();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.13.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'checkLockStatus')
            compInstance.checkLockStatus();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.14 Test - checkSlateLockStatus ", () => {
        const event = {preventDefault: jest.fn(), stopPropagation: jest.fn()};
        it('1.14.1  Test - if case ', () => {
            const newInitialState = {...initialState, slateLockReducer: { slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            }, withinLockPeriod: true }};

            const compInstance = slateWrapInstance(props, newInitialState);
            compInstance.checkLockStatus();
            const spy = jest.spyOn(compInstance, 'checkSlateLockStatus')
            compInstance.checkSlateLockStatus(event);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.14.2  Test - else case ', () => {
            config.savingInProgress = true;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'checkSlateLockStatus')
            compInstance.checkSlateLockStatus(event);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    it('1.15  Test - openCustomPopup ', () => {
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'openCustomPopup')
        compInstance.openCustomPopup("msg");
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.16  Test - showCustomPopup ', () => {
        const compInstance = slateWrapInstance(props);
        compInstance.setState({ showCustomPopup: true });
        const spy = jest.spyOn(compInstance, 'showCustomPopup')
        compInstance.showCustomPopup();
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.17  Test - showLockPopup ', () => {
        const compInstance = slateWrapInstance(props);
        compInstance.setState({ showLockPopup: true, lockOwner: "lockOwner" });
        const spy = jest.spyOn(compInstance, 'showLockPopup')
        compInstance.showLockPopup();
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.18  Test - toggleCustomPopup ', () => {
        const event = {preventDefault: jest.fn(), stopPropagation: jest.fn()};
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'toggleCustomPopup')
        compInstance.toggleCustomPopup(true, event);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.19  Test - closeAudioBookDialog ', () => {
        const compInstance = slateWrapInstance({...props, audioGlossaryPopup: jest.fn()});
        const spy = jest.spyOn(compInstance, 'closeAudioBookDialog')
        compInstance.closeAudioBookDialog();
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.20  Test - handleCopyPastePopup', () => {
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'handleCopyPastePopup')
        compInstance.handleCopyPastePopup(true,0);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    describe("1.21 Test - splithandlerfunction ", () => {
        const elementList = ['image-elem', 'audio-elem', 'interactive-elem', 'assessment-elem', 'container-elem',
            'worked-exp-elem', 'opener-elem', 'section-break-elem', 'metadata-anchor', 'citation-elem',
            'citations-group-elem', 'show-hide-elem', 'popup-elem', 'smartlink-elem', 'poetry-elem',
            'stanza-elem', 'figure-mml-elem', 'blockcode-elem', 'table-editor-elem-button', 'multi-column-group',
            'multi-column-group-column-3', 'elm-interactive-elem', 'element-dialogue', 'element-discussion',
            'text-elem'];
        const index = 0, firstOne = true, outerAsideIndex = 1, poetryData = {};
        const parentUrn = {id:"123"};
        const asideData = {id:"123"};

        it.each(elementList)('add %s element ',(input) => {
            config.savingInProgress = false;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'splithandlerfunction')
            compInstance.splithandlerfunction(input,index, firstOne, parentUrn, asideData, outerAsideIndex, poetryData);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.21.2  Test - if case (config.savingInProgress)', () => {
            config.savingInProgress = true;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'splithandlerfunction')
            compInstance.splithandlerfunction("",index, firstOne, parentUrn, asideData, outerAsideIndex, poetryData);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.21.3  Test - if case (config.savingInProgress)', () => {
            config.savingInProgress = false;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'splithandlerfunction')
            compInstance.splithandlerfunction("",index, false, parentUrn, asideData, outerAsideIndex, poetryData);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.21.4  Test - if case (this.checkLockStatus()) ', () => {
            const newInitialState = {...initialState, slateLockReducer: { slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            }, withinLockPeriod: true }};

            const compInstance = slateWrapInstance(props, newInitialState);
            compInstance.checkLockStatus();
            const spy = jest.spyOn(compInstance, 'splithandlerfunction')
            compInstance.splithandlerfunction("",index, false, parentUrn, asideData, outerAsideIndex, poetryData);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.22 Test - showSplitSlatePopup ", () => {
        it('1.22.1  Test - if case ', () => {
            const compInstance = slateWrapInstance(props);
            compInstance.setState({showSplitSlatePopup: true});
            const spy = jest.spyOn(compInstance, 'showSplitSlatePopup')
            compInstance.showSplitSlatePopup();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.22.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            compInstance.setState({showSplitSlatePopup: false});
            const spy = jest.spyOn(compInstance, 'showSplitSlatePopup')
            compInstance.showSplitSlatePopup();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.23 Test - toggleSplitSlatePopup ", () => {
        it('1.23.1  Test - if case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'toggleSplitSlatePopup')
            compInstance.toggleSplitSlatePopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.23.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'toggleSplitSlatePopup')
            compInstance.toggleSplitSlatePopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    it('1.24  Test - handleSplitSlate ', () => {
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'handleSplitSlate')
        compInstance.handleSplitSlate(false, 1);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.25  Test - renderButtonsonCondition ', () => {
        const element = [{type: "openerelement"},{type: "element-generateLOlist"}];
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'renderButtonsonCondition')
        compInstance.renderButtonsonCondition(element);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.26  Test - onPowerPaste ', () => {
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'onPowerPaste')
        compInstance.onPowerPaste("paste",1);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.27  Test - handlePowerPaste ', () => {
        const compInstance = slateWrapInstance(props);
        compInstance.setState({powerPasteData: [{id:"123"}], updatedindex: 1});
        const spy = jest.spyOn(compInstance, 'handlePowerPaste')
        compInstance.handlePowerPaste("paste",1);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    it('1.28  Test - renderBlankSlate ', () => {
        const compInstance = slateWrapInstance(props);
        const spy = jest.spyOn(compInstance, 'renderBlankSlate')
        compInstance.renderBlankSlate(props);
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    })
    describe("1.29 Test - processRemoveConfirmation ", () => {
        it('1.29.1  Test - if case ', () => {
            const newInitialState = {...initialState, audioReducer: {openRemovePopUp: true, openSplitPopUp: false}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'processRemoveConfirmation')
            compInstance.processRemoveConfirmation(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.29.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'processRemoveConfirmation')
            compInstance.processRemoveConfirmation(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.30 Test - renderElement ", () => {
        it('1.30.1  Test - else case (_elements !== null)', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'renderElement')
            compInstance.renderElement(undefined, "", "");
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.30.2  Test - if case (_elements.length === 0 && isPdf_Assess && ', () => {
            config.slateType = "pdfslate";
            config.isDefaultElementInProgress = true;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'renderElement')
            compInstance.renderElement([], "pdfslate", "");
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.30.3  Test - if case (_elements.length === 0 && _slateType != "assessment") ', () => {
            config.slateType = "pdfslate";
            config.isDefaultElementInProgress = false;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'renderElement')
            compInstance.renderElement([], "pdfslate", "");
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.31 Test - toggleAudioPopup ", () => {
        it('1.31.1  Test - if case ', () => {
            const newInitialState = {...initialState, audioReducer: {openRemovePopUp: true, openSplitPopUp: false}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleAudioPopup')
            compInstance.toggleAudioPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.31.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'toggleAudioPopup')
            compInstance.toggleAudioPopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.32 Test - toggleWrongAudioPopup ", () => {
        it('1.32.1  Test - if case ', () => {
            const newInitialState = {...initialState, appStore: {accesDeniedPopup: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleWrongAudioPopup')
            compInstance.toggleWrongAudioPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.32.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'toggleWrongAudioPopup')
            compInstance.toggleWrongAudioPopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.33 Test - toggleAssessmentPopup ", () => {
        it('1.33.1  Test - if case ', () => {
            const newInitialState = {...initialState, assessmentReducer: {showConfirmationPopup: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleAssessmentPopup')
            compInstance.toggleAssessmentPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.33.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'toggleAssessmentPopup')
            compInstance.toggleAssessmentPopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.34 Test - showAudioRemoveConfirmationPopup ", () => {
        it('1.34.1  Test - if case ', () => {
            const newInitialState = {...initialState, audioReducer: {openWrongAudioPopup: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'showAudioRemoveConfirmationPopup')
            compInstance.showAudioRemoveConfirmationPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.35 Test - showImageGlossaryRemoveConfirmationPopup ", () => {
        it('1.35.1  Test - if case (this.props.removeGlossaryImage)', () => {
            const newInitialState = {...initialState, appStore: {removeGlossaryImage: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'showImageGlossaryRemoveConfirmationPopup')
            compInstance.showImageGlossaryRemoveConfirmationPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.35.2  Test - else if case (this.props.openWrongImagePopup)', () => {
            const newInitialState = {...initialState, appStore: {openWrongImagePopup: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'showImageGlossaryRemoveConfirmationPopup')
            compInstance.showImageGlossaryRemoveConfirmationPopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.36 Test - toggleImageGlossaryPopup ", () => {
        it('1.36.1  Test - if case (this.props.removeGlossaryImage)', () => {
            const newInitialState = {...initialState, appStore: {removeGlossaryImage: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleImageGlossaryPopup')
            compInstance.toggleImageGlossaryPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.36.2  Test - else case ', () => {
            const newInitialState = {...initialState, appStore: {removeGlossaryImage: false}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleImageGlossaryPopup')
            compInstance.toggleImageGlossaryPopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.37 Test - toggleWrongImagePopup ", () => {
        it('1.37.1  Test - if case (this.props.removeGlossaryImage)', () => {
            const newInitialState = {...initialState, appStore: {accesDeniedPopup: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleWrongImagePopup')
            compInstance.toggleWrongImagePopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.37.2  Test - else case ', () => {
            const newInitialState = {...initialState, appStore: {accesDeniedPopup: false}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleWrongImagePopup')
            compInstance.toggleWrongImagePopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.38 Test - processRemoveImageGlossaryConfirmation ", () => {
        it('1.38.1  Test - if case (this.props.removeGlossaryImage)', () => {
            const newInitialState = {...initialState, appStore: {removeGlossaryImage: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'processRemoveImageGlossaryConfirmation')
            compInstance.processRemoveImageGlossaryConfirmation(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.38.2  Test - else case ', () => {
            const newInitialState = {...initialState, appStore: {removeGlossaryImage: false}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'processRemoveImageGlossaryConfirmation')
            compInstance.processRemoveImageGlossaryConfirmation(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.39 Test - accessDeniedPopup ", () => {
        xit('1.39.1  Test - if case (this.props.accesDeniedPopup)', () => {
            const newInitialState = {...initialState, appStore: {accesDeniedPopup: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'accessDeniedPopup')
            compInstance.accessDeniedPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.39.2  Test - else case ', () => {
            const newInitialState = {...initialState, appStore: {accesDeniedPopup: false}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'accessDeniedPopup')
            compInstance.accessDeniedPopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
    describe("1.40 Test - closePopup ", () => {
        it('1.40.1  Test - if case (config.isSavingElement)', () => {
            config.isSavingElement = true;
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'closePopup')
            compInstance.closePopup();
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
       
        it('1.40.2  Test - if case ', () => {
            config.cachedActiveElement = {element: {id: "1231", status: "approved",index: 1}};
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            config.tempSlateManifestURN = "s-12345";
            const newProps = {...props};
            newProps.slateData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].status = "wip";
            newProps.slateData["s-12345"] = {status: "approved",id:"id-123"};
            config.tcmStatus = true;
            config.isSavingElement = false;
            const compInstance = slateWrapInstance(newProps);
            const spy = jest.spyOn(compInstance, 'closePopup')
            compInstance.closePopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.40.3  Test - (config.cachedActiveElement.element.status === "approved" ', () => {
            config.cachedActiveElement = {element: {id: "1231", status: "approved",index: 1}};
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            config.tempSlateManifestURN = "s-12345";
            const newProps = {...props};
            newProps.slateData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].status = "wip";
            newProps.slateData["s-12345"] = {status: "approved",id:"id-123"};
            config.tcmStatus = true;
            config.isSavingElement = false;
            jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
                return { offsetTop: 10 };
            })
            const compInstance = slateWrapInstance(newProps);
            const spy = jest.spyOn(compInstance, 'closePopup')
            compInstance.closePopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.40.2  Test - else cases ', () => {
            config.cachedActiveElement = {element: {id: "1231", status: "wip",index: 1}};
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            config.tempSlateManifestURN = "s-12345";
            const newProps = {...props};
            newProps.slateData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].status = "approved";
            newProps.slateData["s-12345"] = {status: "wip",id:"id-123"};
            config.tcmStatus = false;
            config.isSavingElement = false;
            const compInstance = slateWrapInstance(newProps);
            const spy = jest.spyOn(compInstance, 'closePopup')
            compInstance.closePopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
})