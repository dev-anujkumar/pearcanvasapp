import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux';
import { slateData, emptySlateData, slateDataForIntro, slateDataForAssess } from '../../../fixtures/slateTestingData.js'
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
//IMPORT TINYMCE 
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/paste";

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

        };
        let wrapper = mount(<SlateWrapper store={store} {...props} />);

        test('renders properly with default slate', () => {
            expect(wrapper.find('.element-list').length).toBe(1);
            expect(wrapper.find('ElementContainer').length).toBe(0);
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
        })
        test('renders container-introduction slate', () => {
            wrapper.setProps({ slateData: slateDataForIntro });
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
        })
        test('renders assessment slate', () => {
            wrapper.setProps({ slateData: slateDataForAssess });
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
        })
    })
    describe('With default elements', () => {
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
        let wrapper = mount(<SlateWrapper store={store} {...props} />);
        test('renders properly', () => {
            expect(wrapper.find('.element-list').length).toBe(1);
        })
        test('renders slate title', () => {
            expect(wrapper.find('SlateHeader').length).toBe(1);
            expect(wrapper.find('.header-label').length).toBe(1);
            expect(wrapper.find('.header-label').text()).toBe('SLATE:');
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
            modifyState : ()=>{}
        };
        const slateWrapper = mount(<Provider store={store}><SlateWrapper {...props} /> </Provider>)
        it('Simulating checkSlateLockStatus function', () => {
            slateWrapper.find('SlateWrapper').instance().checkSlateLockStatus({ target: { tagName: 'b' } })
        })
        it('Simulating prohibitPropagation function', () => {
            slateWrapper.find('SlateWrapper').instance().prohibitPropagation({ preventDefault: () => { }, stopPropagation: () => { } })
        })
        it('Simulating elementSepratorProps function', () => {
            slateWrapper.find('SlateWrapper').instance().elementSepratorProps('', '', '', '', '')
        })
        it('Simulating renderDefaultElement with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().renderDefaultElement()
        })
        it('Simulating renderDefaultElement with slate data function slateType not assessment', () => {
            config.slateType = "";
            slateWrapper.find('SlateWrapper').instance().renderDefaultElement()
        })
        it('Simulating handleSplitSlate with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().handleSplitSlate()
        })
        it('Simulating deleteRejected with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().deleteRejected()
        })
        it('Simulating deleteAccepted with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().deleteAccepted()
        })
        it('Simulating splithandlerfunction with slate data function for sectionbreak elm', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('section-break-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for text-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('text-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for image-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('image-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for image-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('audio-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for image-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('interactive-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for assessment-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('assessment-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for container-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('container-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for opener-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('opener-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for worked-exp-elem', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('worked-exp-elem', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for metadata-anchor container-introduction', () => {
            config.slateType = "container-introduction";
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('metadata-anchor', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for metadata-anchor', () => {
            config.slateType = "";
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('metadata-anchor', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating splithandlerfunction with slate data function for default', () => {
            slateWrapper.find('SlateWrapper').instance().splithandlerfunction('default', '', '', {}, { contentUrn: '' }, '')
        })
        it('Simulating togglePopup with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().togglePopup('', '')
        })
        it('Simulating customListDropClickAction with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().customListDropClickAction('', '')
        })
        it('Simulating handleClickOutside with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().listDropRef = document.createElement('div');
            slateWrapper.find('SlateWrapper').instance().handleClickOutside({ target: document.createElement('p') })
        })
        it('Simulating showSplitSlatePopup with slate data function', () => {
            slateWrapper.find('SlateWrapper').instance().state = {};
            slateWrapper.find('SlateWrapper').instance().state.showSplitSlatePopup = true;
            slateWrapper.find('SlateWrapper').instance().showSplitSlatePopup()
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