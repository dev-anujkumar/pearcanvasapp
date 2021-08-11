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
//const axios = require('axios');
//jest.mock('axios');
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

describe('Testing <SlateWrapper> Component', () => {
    let props = {
        slateData: emptySlateData,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        permissions : [],
        toggleTocDelete: true,
        openRemovePopUp : true,
        loadMorePages:jest.fn(),
        showSlateLockPopupValue:true,
        showConfirmationPopup:true,
        showBlocker:jest.fn()
    };
    xtest('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}>
            <SlateWrapper {...props} slateData={{}} />
        </Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    xdescribe('With no element', () => {
        let props = {
            slateData: emptySlateData,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            audioReducer : {
                openRemovePopUp : true,
                openSplitPopUp : false
            },
            permissions : [],
            openRemovePopUp : true,
            showSlateLockPopupValue:true,
            showBlocker : jest.fn()
        };
        let wrapper = mount(<Provider store={store}><SlateWrapper {...props} /></Provider>);
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        
        test('renders properly with default slate', () => {
            expect(wrapper.find('.element-list').length).toBe(0);
            expect(wrapper.find('ElementContainer').length).toBe(0);
            expect(wrapper.find('SlateHeader').length).toBe(0);
        })
    })
    xdescribe('With loading elements', () => {
        let props = {
            slateData: {},
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            audioReducer : {
                openRemovePopUp : true,
                openSplitPopUp : false
            },
            permissions : [],
            openRemovePopUp : true,
            showBlocker : jest.fn()
        };
        let wrapper = mount(<Provider store={store}><SlateWrapper {...props} /> </Provider>);
        test('renders properly', () => {
            expect(wrapper.find('.element-list').length).toBe(0);
            expect(wrapper.find('LargeLoader').length).toBe(7);
            expect(wrapper.find('SmalllLoader').length).toBe(1);
        })
    })

    xdescribe('With elements', () => {
        let props = {
            slateData: slateData,
            slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            },
            audioReducer : {
                openRemovePopUp : true,
                openSplitPopUp : false
            },
            permissions : [],
            openRemovePopUp : true,
            setSlateLock : ()=>{},
            showBlocker : ()=>{},
            modifyState : ()=>{},
            loadMorePages:jest.fn(),
            updateTimer :jest.fn(),
            showSlateLockPopupValue:true,
            withinLockPeriod:jest.fn(),
            getSlateLockStatus:jest.fn(),
        };
        
        const slateWrapper = mount(<Provider store={store}><SlateWrapper {...props} /> </Provider>)
        let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        it('CheckOpener - if block', ()=> {
            let event = {
                newDraggableIndex : 0
            }
            config.isCO = true
            let value = slateWrapperInstance.checkOpener(event)
            expect(value).toBe(true)
        })
        it('CheckOpener - else block', ()=> {
            let event = {
                newDraggableIndex : 1
            }
            config.isCO = false
            let value = slateWrapperInstance.checkOpener(event)
            expect(value).toBe(false)
        })
        it('checkLockStatus function - if block', () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            config.userId = "test"
            let returnValue = slateWrapperInstance.checkLockStatus()
            expect(returnValue).toBe(true)
        })
        it('checkSlateLockStatus function', () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            config.userId = "test"
             slateWrapperInstance.checkSlateLockStatus()
        })

        it('checkSlateLockStatus false function', () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: false,
                        userId: 'c5Test01'
                    } 
                },
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
            //config.savingInProgress=true
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            config.userId = "test"
             slateWrapperInstance.checkSlateLockStatus()
        })
        it('Simulating prohibitPropagation function', () => {
            slateWrapperInstance.prohibitPropagation({ preventDefault: () => { }, stopPropagation: () => { } })
        })
        it('Simulating elementSepratorProps function', () => {
            slateWrapperInstance.elementSepratorProps('', '', '', '', '')
        })
        xit('Simulating renderDefaultElement with slate data function', () => {
            slateWrapperInstance.renderDefaultElement()
        })
        xit('Simulating renderDefaultElement with slate data function slateType not assessment', () => {
            config.slateType = "";
            slateWrapperInstance.renderDefaultElement()
        })
        it('Simulating handleSplitSlate with slate data function', () => {
            slateWrapperInstance.handleSplitSlate()
        })
        xit('releaseSlateLock data', () => {
            const spyReleaseSlate = jest.spyOn(slateWrapperInstance, 'releaseSlateLock')
            slateWrapperInstance.releaseSlateLock()
            expect(spyReleaseSlate).toHaveBeenCalled();
        })
        xit('setSlateLock data', () => {
            const spySetSlate = jest.spyOn(slateWrapperInstance, 'setSlateLock')
            slateWrapperInstance.setSlateLock()
            expect(spySetSlate).toHaveBeenCalled();
        })
        it('open custom popup', () => {
            const spyOpenPopup= jest.spyOn(slateWrapperInstance, 'openCustomPopup')
            slateWrapperInstance.openCustomPopup()
            expect(spyOpenPopup).toHaveBeenCalled();
        })
        it('show custom popup', () => {
            slateWrapperInstance.state.showCustomPopup = true;
            const spyShowPopup= jest.spyOn(slateWrapperInstance, 'showCustomPopup')
            slateWrapperInstance.showCustomPopup()
            expect(spyShowPopup).toHaveBeenCalled();
        })
        
        it('Simulating togglePopup with slate data function', () => {
            slateWrapperInstance.togglePopup('', '')
        })
        it('Simulating handleClickOutside with slate data function', () => {
            slateWrapperInstance.listDropRef = document.createElement('div');
            slateWrapperInstance.handleClickOutside({ target: document.createElement('p') })
        })
       
        it("toggleCustomPopup method", () => {
            slateWrapperInstance.state.showCustomPopup = false;
            slateWrapperInstance.toggleCustomPopup(true, {
                preventDefault : () => { return true },
                stopPropagation: () => { return true }
            })
            expect(slateWrapperInstance.state.showCustomPopup).toBe(true)
        })

        it("handleScroll method else ", () => {
            
            let event = {
                target : {
                    scrollTop : 0,
                    clientHeight : 0 ,
                    scrollHeight:20
                }
            }
            const spyhandleScroll = jest.spyOn(slateWrapperInstance, 'handleScroll')
            slateWrapperInstance.handleScroll(event)
            expect(spyhandleScroll).toHaveBeenCalledWith(event);
        })
        it("processRemoveConfirmation method - openRemovePopUp", () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openRemovePopUp: true},
                openRemovePopUp : true,
                showAudioRemovePopup : jest.fn(),
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props } /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spyProcessRemoveConfirmation = jest.spyOn(slateWrapperInstance, 'processRemoveConfirmation')
            slateWrapperInstance.processRemoveConfirmation()
            expect(spyProcessRemoveConfirmation).toHaveBeenCalled();
        })
        it("processRemoveConfirmation method - openSplitPopUp", () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openSplitPopUp: true},
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props } /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spyProcessRemoveConfirmation = jest.spyOn(slateWrapperInstance, 'processRemoveConfirmation')
            slateWrapperInstance.processRemoveConfirmation()
            expect(spyProcessRemoveConfirmation).toHaveBeenCalled();
        })
        it("toggleLockReleasePopup", () => {
            slateWrapperInstance.state.showReleasePopup = false;
            slateWrapperInstance.toggleLockReleasePopup(true, {
                preventDefault : () => { return true },
                stopPropagation: () => { return true }
            })
            expect(slateWrapperInstance.state.showReleasePopup).toBe(true)
        })
        it("debounceReleaseHandler", () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openRemovePopUp: false},
                withinLockPeriod: true,
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props } /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            let cb = jest.fn()
            const spyDebounceReleaseHandler = jest.spyOn(slateWrapperInstance, 'debounceReleaseHandler')
            slateWrapperInstance.debounceReleaseHandler(cb, slateWrapperInstance)
            expect(spyDebounceReleaseHandler).toHaveBeenCalled()
        })
        it("closePopup", ()=> {
            config.cachedActiveElement = {
                element : {},
                index : 0
            }
            config.tempSlateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            const spyclosePopup = jest.spyOn(slateWrapperInstance, 'closePopup')
            slateWrapperInstance.closePopup()
            expect(spyclosePopup).toHaveBeenCalled()
        })
        it("accessDeniedPopup ", () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openRemovePopUp: false},
                withinLockPeriod: true,
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props } accesDeniedPopup = {true} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            slateWrapperInstance.accessDeniedPopup()
            expect(slateWrapper.find('PopUp').length).toBe(0);
        })
        it('toggleAudioPopup - if block', () => {
            let props = {
                slateData: emptySlateData,
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                audioReducer : {
                    openRemovePopUp : true,
                    openSplitPopUp : false
                },
                permissions : [],
                openRemovePopUp : true,
                showBlocker : jest.fn(),
                showAudioRemovePopup : jest.fn()
            };
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openRemovePopUp: true},
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spyToggleAudioPopup = jest.spyOn(slateWrapperInstance, 'toggleAudioPopup')
            slateWrapperInstance.toggleAudioPopup()
            expect(spyToggleAudioPopup).toHaveBeenCalled()
        })
        it('toggleAudioPopup - else if block', () => {
            let props = {
                slateData: emptySlateData,
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                audioReducer : {
                    openRemovePopUp : true,
                    openSplitPopUp : false
                },
                permissions : [],
                openRemovePopUp : true,
                showBlocker : jest.fn(),
                showAudioRemovePopup : jest.fn()
            };
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openRemovePopUp: false, openSplitPopUp: true},
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spyToggleAudioPopup = jest.spyOn(slateWrapperInstance, 'toggleAudioPopup')
            slateWrapperInstance.toggleAudioPopup()
            expect(spyToggleAudioPopup).toHaveBeenCalled()
        })
        it("toggleWrongAudioPopup - accesDeniedPopup ", () => {
            let props = {
                slateData: emptySlateData,
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                audioReducer : {
                    openRemovePopUp : true,
                    openSplitPopUp : false
                },
                permissions : [],
                openRemovePopUp : true,
                showBlocker : jest.fn(),
                showAudioRemovePopup : jest.fn()
            };
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {}, accesDeniedPopup: true },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openRemovePopUp: false, openSplitPopUp: true},
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spyToggleWrongAudioPopup = jest.spyOn(slateWrapperInstance, 'toggleWrongAudioPopup')
            slateWrapperInstance.toggleWrongAudioPopup()
            expect(spyToggleWrongAudioPopup).toHaveBeenCalled()
        })
        it("toggleWrongAudioPopup - else ", () => {
            let props = {
                slateData: emptySlateData,
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                audioReducer : {
                    openRemovePopUp : true,
                    openSplitPopUp : false
                },
                permissions : [],
                openRemovePopUp : true,
                showBlocker : jest.fn(),
                showAudioRemovePopup : jest.fn()
            };
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {}, accesDeniedPopup: false },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: [] },
                audioReducer: {openRemovePopUp: false, openSplitPopUp: true},
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
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spyToggleWrongAudioPopup = jest.spyOn(slateWrapperInstance, 'toggleWrongAudioPopup')
            slateWrapperInstance.toggleWrongAudioPopup()
            expect(spyToggleWrongAudioPopup).toHaveBeenCalled()
        })
    })
    xdescribe('With elements and lock status true', () => {
        let props = {
            slateData: slateData,
            slateLockInfo: {
                isLocked: true,
                userId: 'c5Test02'
            },
            audioReducer : {
                openRemovePopUp : true,
                openSplitPopUp : false
            },
            permissions : [],
            openRemovePopUp : true,
            setSlateLock : ()=>{},
            showBlocker : ()=>{},
            modifyState : ()=>{}
        };
        const slateWrapper = mount(<Provider store={store}><SlateWrapper {...props} /> </Provider>)
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        it('Simulating splithandlerfunction with slate data function for sectionbreak elm', () => {
            slateWrapper.find('SlateWrapper').instance().state.showLockPopup = true;
            slateWrapper.find('SlateWrapper').instance().checkLockStatus = () => { return true };
            slateWrapper.find('SlateWrapper').instance().showLockPopup();
            slateWrapper.find('SlateWrapper').instance().checkLockStatus();
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('', '', '', {}, { contentUrn: '' }, '');
            slateWrapper.find('SlateWrapper').instance().checkSlateLockStatus();
        })
        it("Simulating setListDropRef", ()=> {
            let slateWrapperInstance = slateWrapper.find('SlateWrapper').instance()
            slateWrapperInstance.setListDropRef({})
        })
    })
    
})
xdescribe('splihandler function', () => {
    let props = {
        slateData,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        audioReducer : {
            openRemovePopUp : true,
            openSplitPopUp : false
        },
        permissions : [],
        openRemovePopUp : true,
        showBlocker:jest.fn()
    };
    const localStore = mockStore({
        slateLockReducer: { 
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            } 
        },
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
    //config.savingInProgress=true
    const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
    let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
    config.userId = "test"
    it('Simulating splithandlerfunction with slate data function for sectionbreak elm', () => {
     slateWrapperInstance.splithandlerfunction('section-break-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for text-elem', () => {
        slateWrapperInstance.splithandlerfunction('text-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for image-elem', () => {
        slateWrapperInstance.splithandlerfunction('image-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for image-elem', () => {
        slateWrapperInstance.splithandlerfunction('audio-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for image-elem', () => {
        slateWrapperInstance.splithandlerfunction('interactive-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for assessment-elem', () => {
        slateWrapperInstance.splithandlerfunction('assessment-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for container-elem', () => {
        slateWrapperInstance.splithandlerfunction('container-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for opener-elem', () => {
        slateWrapperInstance.splithandlerfunction('opener-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for worked-exp-elem', () => {
        slateWrapperInstance.splithandlerfunction('worked-exp-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for metadata-anchor container-introduction', () => {
        config.slateType = "container-introduction";
        slateWrapperInstance.splithandlerfunction('metadata-anchor', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for metadata-anchor', () => {
        config.slateType = "";
        slateWrapperInstance.splithandlerfunction('metadata-anchor', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for poetry element', () => {
        config.slateType = "";
        slateWrapperInstance.splithandlerfunction('poetry-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for default', () => {
        slateWrapperInstance.splithandlerfunction('default', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for citation-elem', () => {
        slateWrapperInstance.splithandlerfunction('citation-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for citations-group-elem', () => {
        slateWrapperInstance.splithandlerfunction('citations-group-elem', '', '', {}, { contentUrn: '' }, '')
    })
    it('Simulating splithandlerfunction with slate data function for multi-column-group-column-3', () => {
        slateWrapperInstance.splithandlerfunction('multi-column-group-column-3', '', '', {}, { contentUrn: '' }, '')
    })
    it('openWrongAudioPopup', () => {
        let props = {
            slateData,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            audioReducer : {
                openRemovePopUp : false,
                openWrongAudioPopup : true
            },
            permissions : [],
            openRemovePopUp : false,
            openWrongAudioPopup : true,
            openSplitPopUp:false,
            showBlocker:jest.fn()
        };
        const localStore = mockStore({
            slateLockReducer: { 
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                } 
            },
            appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
            toolbarReducer: { elemBorderToggle: true },
            metadataReducer: { currentSlateLOData: [] },
            audioReducer: {openRemovePopUp: false, openWrongAudioPopup : true, openSplitPopUp:false},
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
        //config.savingInProgress=true
        const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
        let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
        config.userId = "test"
        slateWrapperInstance.showAudioRemoveConfirmationPopup()
    })
    it('showLockReleasePopup', () => {
        let props = {
            slateData,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            audioReducer : {
                openRemovePopUp : false,
                openWrongAudioPopup : true
            },
            permissions : [],
            openRemovePopUp : false,
            openWrongAudioPopup : true,
            openSplitPopUp:false,
            showBlocker:jest.fn()
        };
        const localStore = mockStore({
            slateLockReducer: { 
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                } 
            },
            appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
            toolbarReducer: { elemBorderToggle: true },
            metadataReducer: { currentSlateLOData: [] },
            audioReducer: {openRemovePopUp: false, openWrongAudioPopup : true, openSplitPopUp:false},
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
        
        //config.savingInProgress=true
        const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
        let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
        config.userId = "test"
        slateWrapperInstance.state.showReleasePopup = true;
        slateWrapperInstance.showLockReleasePopup()
        slateWrapperInstance.showAudioRemoveConfirmationPopup()
    })
    it('showLockReleasePopup', () => {
        slateWrapperInstance.showAssessmentConfirmationPopup()
        slateWrapperInstance.toggleAssessmentPopup()

    })

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
    },
    ...actionProps
}
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
    const store = mockStore(initialSt, actionProps);
    const component = mount(<Provider store={store}><SlateWrapper {...props} /></Provider>);
    return component.find('SlateWrapper').instance();
}

describe("SlateWrapper Component", () => {
    //axios.post.mockImplementation(() => Promise.resolve({res:{data:{}}}))
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

        xit.each(elementList)('add %s element ',(input) => {
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
    describe("1.31 Test - toggleAssessmentPopup ", () => {
        it('1.31.1  Test - if case ', () => {
            const newInitialState = {...initialState, assessmentReducer: {showConfirmationPopup: true}};
            const compInstance = slateWrapInstance(props, newInitialState);
            const spy = jest.spyOn(compInstance, 'toggleAssessmentPopup')
            compInstance.toggleAssessmentPopup(true, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
        it('1.31.2  Test - else case ', () => {
            const compInstance = slateWrapInstance(props);
            const spy = jest.spyOn(compInstance, 'toggleAssessmentPopup')
            compInstance.toggleAssessmentPopup(false, 1);
            expect(spy).toHaveBeenCalled();
            spy.mockClear()
        })
    })
})