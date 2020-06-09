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
const store = mockStore({
    slateLockReducer: { slateLockInfo: {} },
    appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
    toolbarReducer: { elemBorderToggle: true },
    metadataReducer: { currentSlateLOData: {} },
    audioReducer: {openRemovePopUp: false}
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
        showSlateLockPopupValue:true
    };
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}>
            <SlateWrapper {...props} slateData={{}} />
        </Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    describe('With no element', () => {
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
            showSlateLockPopupValue:true

        };
        let wrapper = mount(<SlateWrapper store={store} {...props} />);
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        
        test('renders properly with default slate', () => {
            expect(wrapper.find('.element-list').length).toBe(0);
            expect(wrapper.find('ElementContainer').length).toBe(0);
            expect(wrapper.find('SlateHeader').length).toBe(0);
            expect(wrapper.find('.header-label').length).toBe(0);
        })
    })
    describe('With loading elements', () => {
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
        };
        let wrapper = mount(<Provider store={store}><SlateWrapper {...props} /> </Provider>);
        test('renders properly', () => {
            expect(wrapper.find('.element-list').length).toBe(0);
            expect(wrapper.find('LargeLoader').length).toBe(7);
            expect(wrapper.find('SmalllLoader').length).toBe(1);
        })
    })

    describe('With elements', () => {
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false}
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false}
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false}
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
        it('Simulating renderDefaultElement with slate data function', () => {
            slateWrapperInstance.renderDefaultElement()
        })
        it('Simulating renderDefaultElement with slate data function slateType not assessment', () => {
            config.slateType = "";
            slateWrapperInstance.renderDefaultElement()
        })
        it('Simulating handleSplitSlate with slate data function', () => {
            slateWrapperInstance.handleSplitSlate()
        })
        it('Simulating deleteRejected with slate data function', () => {
            slateWrapperInstance.deleteRejected()
        })
        it('Simulating deleteAccepted with slate data function', () => {
            const localStore = mockStore({
                slateLockReducer: { 
                    slateLockInfo: {
                        isLocked: true,
                        userId: 'c5Test01'
                    } 
                },
                appStore: { slateTitleUpdated: {}, slateLevelData : {}, activeElement: {} },
                toolbarReducer: { elemBorderToggle: true },
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false}
            })
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props } tocDeleteMessage = {{ messageType : 'test' }} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spydeleteAccepted = jest.spyOn(slateWrapperInstance, 'deleteAccepted')
            slateWrapperInstance.deleteAccepted()
            expect(spydeleteAccepted).toHaveBeenCalled();
        })
        it('swap data', () => {
            let event={oldDraggableIndex:"",
            newDraggableIndex:""}
            const spySwapData = jest.spyOn(slateWrapperInstance, 'prepareSwapData')
            slateWrapperInstance.prepareSwapData(event)
            expect(spySwapData).toHaveBeenCalled();
        })
        it('releaseSlateLock data', () => {
            const spyReleaseSlate = jest.spyOn(slateWrapperInstance, 'releaseSlateLock')
            slateWrapperInstance.releaseSlateLock()
            expect(spyReleaseSlate).toHaveBeenCalled();
        })
        it('setSlateLock data', () => {
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
        it('Simulating showSplitSlatePopup with slate data function', () => {
            slateWrapperInstance.state = {};
            slateWrapperInstance.state.showSplitSlatePopup = true;
            slateWrapperInstance.showSplitSlatePopup()
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
        }),
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: true},
                openRemovePopUp : true,
                showAudioRemovePopup : jest.fn()
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openSplitPopUp: true}
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false},
                withinLockPeriod: true
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false},
                withinLockPeriod: true
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: true}
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false, openSplitPopUp: true}
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false, openSplitPopUp: true}
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
                metadataReducer: { currentSlateLOData: {} },
                audioReducer: {openRemovePopUp: false, openSplitPopUp: true}
            })
            const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
            let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
            const spyToggleWrongAudioPopup = jest.spyOn(slateWrapperInstance, 'toggleWrongAudioPopup')
            slateWrapperInstance.toggleWrongAudioPopup()
            expect(spyToggleWrongAudioPopup).toHaveBeenCalled()
        })
    })
    describe('With elements and lock status true', () => {
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
describe('splihandler function', () => {
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
        metadataReducer: { currentSlateLOData: {} },
        audioReducer: {openRemovePopUp: false}
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
            metadataReducer: { currentSlateLOData: {} },
            audioReducer: {openRemovePopUp: false,openWrongAudioPopup : true,
                openSplitPopUp:false}
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
            metadataReducer: { currentSlateLOData: {} },
            audioReducer: {openRemovePopUp: false,openWrongAudioPopup : true,
                openSplitPopUp:false}
        })
        
        //config.savingInProgress=true
        const slateWrapper = mount(<Provider store={localStore}><SlateWrapper {...props} /> </Provider>)
        let slateWrapperInstance = slateWrapper.find("SlateWrapper").instance()
        config.userId = "test"
        slateWrapperInstance.state.showReleasePopup = true;
        slateWrapperInstance.showLockReleasePopup()
        slateWrapperInstance.showAudioRemoveConfirmationPopup()
    })

})