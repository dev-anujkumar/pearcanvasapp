import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import FigureUserInterface from '../../../src/component/ElementFigure/FigureUserInterface';
import { newVideoObjWithData,newAudioObjWithData,newSmartLinkObjWithData,newVideoObjWithoutData,newAudioObjWithoutData,newSmartLinkObjWithoutData,smartLinkPdfWithoutData,smartLinkPdfWithData} from '../../../fixtures/ElementFigureTestingData.js'


const dummyData = [
    {title: 'some-tilte-1', body: 'some-1'},
    {title: 'some-tilte-2', body: 'some-2'},
    {title: 'some-tilte-3', body: 'some-3'}
];
global.fetch = jest.fn(() => Promise.resolve(dummyData));


jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})

jest.mock('../../../src/constants/utility.js',()=>{
    return {
        getLabelNumberTitleHTML: () => {
            return jest.fn()
        },
        hasReviewerRole: () => {
            return false
        },
        checkHTMLdataInsideString: () => {
            return ({
                toLowerCase: jest.fn()
            })
        },
        removeUnoClass: () => {
            return jest.fn()
        },
        dropdownValueAtIntialize: () => {
            return jest.fn()
        }
    }
})



describe('Testing FigureUserInterface component', () => {
    let initialState = {
        alfrescoReducer: {
            alfrescoAssetData: {},
            elementId: "urn",
            alfrescoListOption: [],
            launchAlfrescoPopup: true,
            editor: true,
            Permission: false
        },
        appStore: {
            figureDropdownData: [],
            figureDropdownData: {
                audio: ["No Label", "Custom"],
                image: ["No Label", "Custom"],
                smartlinks: ["No Label", "Custom"],
                video: ["No Label", "Custom"]
            }
        },
        projectMetadata:{},
    }
    let props = {
        model: newVideoObjWithData,
        index: "",
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        onClick: () => { },
        handleFocus: function () { },
        deleteElementAsset: function (){},
        permissions: ['add_multimedia_via_alfresco'],
        element: {
            figuretype: 'video',
            figuredata: {
                hasOwnProperty: jest.fn(),
                videos: [
                    {
                        path: "Test Path"
                    }
                ],
                videoid: 'urn:pearson:alfresco:c778faed-76e1-4523-a402-2fbbaf16036c',
                posterimage: { imageid: "urn:pearson:alfresco:c778faed-76e1-4523-a402-2fbbaf16036c" }
            }
        }
    }
    const store = mockStore(initialState);
    const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
    let FigureUserInterfaceInstance = component.find('FigureUserInterface').instance();
    it('Test componentWillUnmount', () => {
        
        jest.spyOn(FigureUserInterfaceInstance, 'componentWillUnmount')
        document.removeEventListener = () => {
            return true
        }
        FigureUserInterfaceInstance.componentWillUnmount();
        expect(FigureUserInterfaceInstance.componentWillUnmount).toHaveBeenCalled();
    })
    it('Test handleClickOutside', () => {
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
        jest.spyOn(FigureUserInterfaceInstance, 'handleClickOutside')
        FigureUserInterfaceInstance.handleClickOutside(e);
    })
    xit('Test deleteElementAsset', () => {
        jest.spyOn(FigureUserInterfaceInstance, 'deleteElementAsset')
        FigureUserInterfaceInstance.deleteElementAsset();
    })
    it('Test handleFigureDropdown', () => {
        jest.spyOn(FigureUserInterfaceInstance, 'handleFigureDropdown')
        FigureUserInterfaceInstance.handleFigureDropdown();
    })
    xit('Test onFigureImageFieldFocus', () => {
        jest.spyOn(FigureUserInterfaceInstance, 'onFigureImageFieldFocus')
        FigureUserInterfaceInstance.onFigureImageFieldFocus('test');
    })
    xit('Test onFigureImageFieldBlur', () => {
        jest.spyOn(FigureUserInterfaceInstance, 'onFigureImageFieldBlur')
        FigureUserInterfaceInstance.onFigureImageFieldBlur("test");
    })

    describe('video element', () => {
        let props = {
            model: newVideoObjWithData,
            index: "",
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            handleFocus: function () { },
            permissions: ['add_multimedia_via_alfresco'],
            element: {
                figuretype: 'video',
                figuredata: {
                    hasOwnProperty: jest.fn(),
                    videos: [
                        {
                            path: "Test Path"
                        }
                    ],
                    videoid: 'urn:pearson:alfresco:c778faed-76e1-4523-a402-2fbbaf16036c',
                    posterimage: { imageid: "urn:pearson:alfresco:c778faed-76e1-4523-a402-2fbbaf16036c" }
                }
            }
        }
        const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
        let FigureUserInterfaceInstance = component.find('FigureUserInterface').instance();
        it('renders without crashing', () => {
            expect(component).toHaveLength(1);
            expect(FigureUserInterfaceInstance).toBeDefined();
        });
        it('video element without alfresco data',()=>{
            let props = {
                model: newVideoObjWithoutData,
                index: "",
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: ['add_multimedia_via_alfresco'],
                element: {
                    figuretype: 'video',
                    figuredata: {
                        hasOwnProperty: jest.fn(),
                        videos: [
                            {
                                path: ""
                            }
                        ],
                        videoid: '',
                        posterimage: { imageid: "" }
                    }
                }
            }  
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            expect(component).toHaveLength(1);
            let instance = component.instance();
            expect(instance).toBeDefined();
        })
    })
    describe('audio element',()=>{
        let props = {
            model: newAudioObjWithData,
            index: "",
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            handleFocus: function () { },
            permissions: ['add_multimedia_via_alfresco'],
            element: {
                figuretype: 'audio',
                figuredata: {
                    hasOwnProperty: jest.fn(),
                    audio: 
                        {
                            path: "Test Path"
                        },
                    audioid: 'urn:pearson:alfresco:a522bb38-8343-405d-b2cb-30dde04ffcbd',
                    posterimage:{imageid:"urn:pearson:alfresco:a522bb38-8343-405d-b2cb-30dde04ffcbd"}
                }
            }
        }
        it('render audio element',()=>{
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            expect(component).toHaveLength(1);
            let instance = component.instance();
            expect(instance).toBeDefined();
        })
        it('render audio element without alfresco data',()=>{
            let props = {
                model: newAudioObjWithoutData,
                index: "",
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: ['add_multimedia_via_alfresco'],
                element: {
                    figuretype: 'audio',
                    figuredata: {
                        hasOwnProperty: jest.fn(),
                        audio: 
                            {
                                path: ""
                            },
                        audioid: '',
                        posterimage:{imageid:""}
                    }
                }
            }
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            expect(component).toHaveLength(1);
            let instance = component.instance();
            expect(instance).toBeDefined();
        })
    })
    describe('render smartLink element',()=>{
        let props = {
            model: newSmartLinkObjWithData,
            index: "",
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            handleFocus: function () { },
            permissions: ['add_multimedia_via_alfresco'],
            element: {
                figuretype: 'interactive',
                figuredata: {
                    hasOwnProperty: jest.fn(),
                    path:'test path',
                    interactiveid: 'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456',
                    interactivetype:'3rd-party',
                    posterimage:{
                        imageid:"urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456",
                        path:"https://eps.openclass.com/eps/sanvan/api/item/11253a14-a237-43a2-bbd7-91c7359aa520/100/file/CITe_COS_Gold_Book_V27/m/OPS/components/metrodigi/ch05-tabs_accordions_v2-01/index.html"
                     },
                }
            }
        }
        it('render smartlink element',()=>{
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            expect(component).toHaveLength(1);
            let instance = component.instance();
            expect(instance).toBeDefined();
        })
        it('render smartLink element without alfresco data',()=>{
            let props = {
                model: newSmartLinkObjWithoutData,
                index: "",
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: ['add_multimedia_via_alfresco'],
                element: {
                    figuretype: 'interactive',
                    figuredata: {
                        hasOwnProperty: jest.fn(),
                        interactiveid: '',
                        interactivetype:'3rd-party',
                    }
                }
            }
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            expect(component).toHaveLength(1);
            let instance = component.instance();
            expect(instance).toBeDefined();
        })
        it('Pdf smartLink withoutData',()=>{
            let props = {
                model: smartLinkPdfWithoutData,
                index: "",
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: ['add_multimedia_via_alfresco'],
                element: {
                    figuretype: 'interactive',
                    figuredata: {
                        hasOwnProperty: jest.fn(),
                        interactiveid: '',
                        interactivetype:'pdf',
                    },
                    html:{title:"<p class=\"paragraphNumeroUno\"><br></p>",postertext:"",captions:"<p class=\"paragraphNumeroUno\"><br></p>",credits:"<p class=\"paragraphNumeroUno\"><br></p>",footnotes:{},assetsPopover:{},glossaryentries:{}}
                }
            }
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            expect(component).toHaveLength(1);
            let instance = component.instance();
            expect(instance).toBeDefined();
        });
        xit('Pdf smartLink with Data',()=>{
            let props = {
                model: smartLinkPdfWithData,
                index: "",
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: ['add_multimedia_via_alfresco'],
                element: {
                    figuretype: 'interactive',
                    figuredata: {
                        hasOwnProperty: jest.fn(),
                        path:'test path',
                        interactiveid: 'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456',
                        interactivetype:'pdf',
                        posterimage:{
                            imageid:"urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456",
                            path:"https://eps.openclass.com/eps/sanvan/api/item/11253a14-a237-43a2-bbd7-91c7359aa520/100/file/CITe_COS_Gold_Book_V27/m/OPS/components/metrodigi/ch05-tabs_accordions_v2-01/index.html"
                         },
                    },
                    html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>sdsfdfsdf&nbsp;</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
                }
            }
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            expect(component).toHaveLength(1);
            let instance = component.instance();
            expect(instance).toBeDefined();
        })
    })

});