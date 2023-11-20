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

const mockAutoNumberReducerEmpty = {
    isAutoNumberingEnabled: false,
    autoNumberedElements: {
        imagesList: [],
        tablesList: [],
        equationsList: [],
        audiosList:[],
        videosList:[]
    },
    autoNumberingDetails: {},
    autoNumberElementsIndex: {
        figureImageIndex: {},
        tableIndex: {},
        equationsIndex: {},
        audioIndex: {},
        videoIndex: {}
    },
    slateFigureList:[],
    autoNumberOption: '',
    keyboardReducer : {selectedElement: '' }
}
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
                toLowerCase: jest.fn(),
                replace: jest.fn()
            })
        },
        removeUnoClass: () => {
            return {replace: jest.fn()}
        },
        dropdownValueAtIntialize: () => {
            return jest.fn()
        },
        handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
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
        },assessmentReducer:{
            'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456': {
                'assessmentStatus':'final',
                "showUpdateStatus": true
            }
        },
        appStore: {
            figureDropdownData: [],
            figureDropdownData: {
                tableasmarkup: ["No Label", "Table", "Custom"],
                mathml: ["No Label","Equation", "Custom"],
                preformattedtext: ["No Label", "Exhibit", "Custom"],
                image: ["No Label", "Figure", "Table", "Equation", "Custom"]
            }
        },
        projectMetadata:{},
        autoNumberReducer: mockAutoNumberReducerEmpty,
        keyboardReducer : {selectedElement: '' }
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
                posterimage: { path: "urn:pearson:alfresco:c778faed-76e1-4523-a402-2fbbaf16036c" }
            },
            html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>video</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
        }
    }
    const store = mockStore(initialState);
    const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
    let FigureUserInterfaceInstance = component.find('FigureUserInterface').instance();
    it('Test componnet Did mount',()=>{
        jest.spyOn(FigureUserInterfaceInstance, 'componentDidMount')
        document.addEventListener = () => {
            return true
        }
        FigureUserInterfaceInstance.setState({
            alfrescoSite:"001_C5 Media POC - AWS US"
        })
        FigureUserInterfaceInstance.componentDidMount();
        expect(FigureUserInterfaceInstance.componentDidMount).toHaveBeenCalled();
    })
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
    xit('Test handleFigureDropdown', () => {
        jest.spyOn(FigureUserInterfaceInstance, 'handleFigureDropdown')
        FigureUserInterfaceInstance.handleFigureDropdown();
    })
    it('Test onFigureElementFieldFocus 1st if condition', () => {
        document.getElementById = () => {
            return {
                nextElementSibling: {
                    classList: {
                        contains: jest.fn(() => true),
                        add: jest.fn()
                    }
                },
                classList: {
                    contains: jest.fn(() => true)
                }
            }
        }
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldFocus')
        FigureUserInterfaceInstance.onFigureElementFieldFocus('1-0');
        expect(spyFucntion).toHaveBeenCalledWith('1-0')
        spyFucntion.mockClear();
    })
    it('Test onFigureElementFieldFocus 1st if-elseif condition', () => {
        document.getElementById = () => {
            return {
                innerHTML: 'test text',
                nextElementSibling: {
                    classList: {
                        contains: jest.fn(() => false),
                        add: jest.fn()
                    }
                },
                classList: {
                    contains: jest.fn(() => false)
                }
            }
        }
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldFocus')
        FigureUserInterfaceInstance.onFigureElementFieldFocus('1-0');
        expect(spyFucntion).toHaveBeenCalledWith('1-0')
        spyFucntion.mockClear();
    })
    it('Test onFigureElementFieldFocus 1st if-elseif-else condition', () => {
        document.getElementById = () => {
            return {
                innerHTML: '<br>',
                nextElementSibling: {
                    classList: {
                        contains: jest.fn(() => false),
                        add: jest.fn()
                    }
                },
                classList: {
                    contains: jest.fn(() => false)
                }
            }
        }
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldFocus')
        FigureUserInterfaceInstance.onFigureElementFieldFocus('1-0');
        expect(spyFucntion).toHaveBeenCalledWith('1-0')
        spyFucntion.mockClear();
    })
    it('Test onFigureElementFieldFocus 2nd if-elseif-else condition', () => {
        props = {
            ...props,
            element: {
                ...props.element,
                figuretype: ''
            }
        }
        document.getElementById = () => {
            return {
                classList: {
                    contains: jest.fn(() => false)
                }
            }
        }
        const store = mockStore(initialState);
        const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
        let FigureUserInterfaceInstance = component.find('FigureUserInterface').instance();
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldFocus')
        FigureUserInterfaceInstance.onFigureElementFieldFocus('1-0');
        expect(spyFucntion).toHaveBeenCalledWith('1-0')
        spyFucntion.mockClear();
    })
    
    it('Test onFigureElementFieldBlur 1st if condition', () => {
        document.getElementById = () => {
            return {
                innerHTML: "<br>",
                nextElementSibling: {
                    classList: {
                        contains: jest.fn(() => true),
                        remove: jest.fn()
                    }
                },
                classList: {
                    contains: jest.fn(() => true)
                }
            }
        }
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldBlur')
        FigureUserInterfaceInstance.onFigureElementFieldBlur('1-0');
        expect(spyFucntion).toHaveBeenCalledWith('1-0')
        spyFucntion.mockClear();
    })
    it('Test onFigureElementFieldBlur 1st if-else condition', () => {
        document.getElementById = () => {
            return {
                classList: {
                    contains: jest.fn(() => true)
                }
            }
        }
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldBlur')
        FigureUserInterfaceInstance.onFigureElementFieldBlur('1-0');
        expect(spyFucntion).toHaveBeenCalledWith('1-0')
        spyFucntion.mockClear();
    })
    it('Test onFigureElementFieldBlur 3rd if condition', () => {
        document.getElementById = () => {
            return {
                innerHTML: {
                    toLowerCase: jest.fn(() => 'video')
                },
                classList: {
                    contains: jest.fn(() => true)
                }
            }
        }
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldBlur')
        FigureUserInterfaceInstance.onFigureElementFieldBlur('0-0');
        expect(spyFucntion).toHaveBeenCalledWith('0-0')
        spyFucntion.mockClear();
    })
    it('Test onFigureElementFieldBlur 3rd if-else condition', () => {
        document.getElementById = () => {
            return {
                innerHTML: {
                    toLowerCase: jest.fn(() => 'test')
                },
                classList: {
                    contains: jest.fn(() => false)
                }
            }
        }
        let spyFucntion = jest.spyOn(FigureUserInterfaceInstance, 'onFigureElementFieldBlur')
        FigureUserInterfaceInstance.onFigureElementFieldBlur('0-0');
        expect(spyFucntion).toHaveBeenCalledWith('0-0')
        spyFucntion.mockClear();
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
                    hasOwnProperty: jest.fn(()=> true),
                    videos: [
                        {
                            path: "Test Path"
                        }
                    ],
                    videoid: 'urn:pearson:alfresco:c778faed-76e1-4523-a402-2fbbaf16036c',
                    posterimage: { imageid: "urn:pearson:alfresco:c778faed-76e1-4523-a402-2fbbaf16036c" }
                },
                html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>sdsfdfsdf&nbsp;</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
            }
        }
        const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
        let FigureUserInterfaceInstance = component.find('FigureUserInterface').instance();
        it('renders without crashing', () => {
            expect(component).toHaveLength(1);
            expect(FigureUserInterfaceInstance).toBeDefined();
        });
        it('handle handleCloseDropDrown',()=>{
            let FigureUserInterfaceInstance = component.find('FigureUserInterface').instance();
             const spyFunction = jest.spyOn(FigureUserInterfaceInstance, 'changeFigureLabel');
            const spyFunction2 = jest.spyOn(FigureUserInterfaceInstance, 'handleCloseDropDrown');
            FigureUserInterfaceInstance.changeFigureLabel("Video","Video")
            FigureUserInterfaceInstance.handleCloseDropDrown()
            FigureUserInterfaceInstance.forceUpdate();
            component.update();
            FigureUserInterfaceInstance.setState({
                figureDropDown: false,
                figureLabelValue:"Video"
            })
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction2).toHaveBeenCalled();
            expect(FigureUserInterfaceInstance.state.figureDropDown).toBe(false);
            expect(FigureUserInterfaceInstance.state.figureLabelValue).toBe("Video");
            spyFunction.mockClear();
            spyFunction2.mockClear();
        })
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
                    hasOwnProperty: jest.fn(()=> true),
                    audio: 
                        {
                            path: "Test Path"
                        },
                    audioid: 'urn:pearson:alfresco:a522bb38-8343-405d-b2cb-30dde04ffcbd',
                    posterimage:{imageid:"urn:pearson:alfresco:a522bb38-8343-405d-b2cb-30dde04ffcbd"}
                },
                html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>sdsfdfsdf&nbsp;</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
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
                    hasOwnProperty: jest.fn(()=> true),
                    path:'test path',
                    interactiveid: 'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456',
                    interactivetype:'3rd-party',
                    posterimage:{
                        imageid:"urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456",
                        path:"https://eps.openclass.com/eps/sanvan/api/item/11253a14-a237-43a2-bbd7-91c7359aa520/100/file/CITe_COS_Gold_Book_V27/m/OPS/components/metrodigi/ch05-tabs_accordions_v2-01/index.html"
                     },
                },
                html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>sdsfdfsdf&nbsp;</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
            }
        }
        it('render smartlink element', () => {
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            let FigureUserInterfaceInstance = component.find('FigureUserInterface').instance();
            expect(component).toHaveLength(1);
            FigureUserInterfaceInstance.setState({
                figureLabelValue: "TestLabel"
            })
            expect(FigureUserInterfaceInstance).toBeDefined();
            expect(FigureUserInterfaceInstance.state.figureLabelValue).toBe("TestLabel")
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
                        interactivetitle :'AssetName'
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
        it('Pdf smartLink with Data',()=>{
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
                        hasOwnProperty: jest.fn(()=> true),
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
        xit('changeFigureLabel case else', () => {
            document.getElementById = () => {
                return {
                    innerHTML: 'TEST'
                }
            }
            let props = {
                model: newSmartLinkObjWithData,
                handleBlur:jest.fn(),
                index: 1,
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
                        hasOwnProperty: jest.fn(()=> true),
                        path:'test path',
                        interactiveid: 'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456',
                        interactivetype:'3rd-party',
                        posterimage:{
                            imageid:"urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456",
                            path:"https://eps.openclass.com/eps/sanvan/api/item/11253a14-a237-43a2-bbd7-91c7359aa520/100/file/CITe_COS_Gold_Book_V27/m/OPS/components/metrodigi/ch05-tabs_accordions_v2-01/index.html"
                         },
                    },
                    html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>sdsfdfsdf&nbsp;</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
                }
            }
            const elementFigureUserInterface = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            const FigureUserInterfaceInstance = elementFigureUserInterface.find('FigureUserInterface').instance();
            FigureUserInterfaceInstance.changeFigureLabel('Figure', 'Table');
            let instance = elementFigureUserInterface.instance();
            expect(instance).toBeDefined();
        });
        it('changeFigureLabel case if', () => {
            document.getElementById = () => {
                return {
                    innerHTML: 'test'
                }
            }
            let props = {
                model: newSmartLinkObjWithData,
                index: 1,
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                handleBlur: function () { },
                permissions: ['add_multimedia_via_alfresco'],
                element: {
                    figuretype: ['image','table','mathImage','authoredtext'],
                    figuredata: {
                        hasOwnProperty: jest.fn(()=> true),
                        path:'test path',
                        interactiveid: 'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456',
                        interactivetype:'3rd-party',
                        posterimage:{
                            imageid:"urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456",
                            path:"https://eps.openclass.com/eps/sanvan/api/item/11253a14-a237-43a2-bbd7-91c7359aa520/100/file/CITe_COS_Gold_Book_V27/m/OPS/components/metrodigi/ch05-tabs_accordions_v2-01/index.html"
                         },
                    },
                    html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>sdsfdfsdf&nbsp;</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
                }
            }
            const elementFigureUserInterface = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            const FigureUserInterfaceInstance = elementFigureUserInterface.find('FigureUserInterface').instance();
            FigureUserInterfaceInstance.changeFigureLabel('Table', 'Figure');
            let instance = elementFigureUserInterface.instance();
            expect(instance).toBeDefined();
            elementFigureUserInterface.find('.figure-label').simulate('click')
        });
        it('toggleHyperlinkEditable case if', () => {
            const elementFigureUserInterface = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            const FigureUserInterfaceInstance = elementFigureUserInterface.find('FigureUserInterface').instance();
            FigureUserInterfaceInstance.toggleHyperlinkEditable('show', '1-0');
            let instance = elementFigureUserInterface.instance();
            expect(instance).toBeDefined();
        });
        it('clickNode case if', () => {
            const elementFigureUserInterface = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            const FigureUserInterfaceInstance = elementFigureUserInterface.find('FigureUserInterface').instance();
            const spy = jest.spyOn(FigureUserInterfaceInstance, 'clickNode');
            const ObjEvent = {
                keyCode: 13,
                preventDefault:jest.fn()
            }
            FigureUserInterfaceInstance.clickNode(ObjEvent);
            expect(spy).toBeCalled();
        });
        
        it('without data element for conditional coverage', () => {
            let props = {
                model: newSmartLinkObjWithData,
                index: 1,
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                handleBlur: function () { },
                permissions: ['add_multimedia_via_alfresco'],
                element: {
                    figuretype: 'video',
                    figuredata: {
                        hasOwnProperty: jest.fn(()=> true),
                        path:'test path',
                        videoid: 'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456',
                        videos: [
                            {
                                path: 'test'
                            }
                        ],
                        posterimage:{
                            path:"https://eps.openclass.com/eps/sanvan/api/item/11253a14-a237-43a2-bbd7-91c7359aa520/100/file/CITe_COS_Gold_Book_V27/m/OPS/components/metrodigi/ch05-tabs_accordions_v2-01/index.html"
                         },
                    },
                    html:{footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
                }
            }
            const elementFigureUserInterface = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            let instance = elementFigureUserInterface.instance();
            expect(instance).toBeDefined();
        });
    })
    describe('Testing handleLabelKeyDown', () => {
            const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>);
            const figureImageInstance = component.find('FigureUserInterface').instance();
            const spy = jest.spyOn(figureImageInstance, "handleLabelKeyDown");
            it('Testing handleLabelKeyDown - First IF', () => {
                const labelListRef = {
                    current: {
                        childNodes: {
                            0: {
                                click: jest.fn()
                            }
                        }
                    }
                };
                const labelRef = {
                    current: {
                        focus: jest.fn()
                    }
                };
                figureImageInstance.labelListRef = { ...labelListRef };
                figureImageInstance.labelRef = { ...labelRef };
                const event = {
                    keyCode: 13,
                    stopPropagation: jest.fn(),
                    preventDefault: jest.fn()
                };
                figureImageInstance.setState({showingListIndex: 0});
                figureImageInstance.handleLabelKeyDown(event);
                expect(spy).toBeCalled();
            });
            it('Testing handleLabelKeyDown - Second IF', () => {
                const labelListRef = {
                    current: {
                        childNodes: {
                            3: {
                                click: jest.fn()
                            }
                        }
                    }
                };
                const labelRef = {
                    current: {
                        focus: jest.fn()
                    }
                };
                figureImageInstance.labelListRef = { ...labelListRef };
                figureImageInstance.labelRef = { ...labelRef };
                const event = {
                    button: 0,
                    target: {
                        attributes: {
                            1: {
                                nodeValue: 3
                            }
                        }
                    }
                };
                figureImageInstance.handleLabelKeyDown(event);
                expect(spy).toBeCalled();
            });
            it('Testing handleLabelKeyDown - Third IF', () => {
                const labelListRef = {
                    current: {
                        childNodes: {
                            1: {
                                focus: jest.fn()
                            }
                        }
                    }
                };
                const labelRef = {
                    current: {
                        focus: jest.fn()
                    }
                };
                figureImageInstance.labelListRef = { ...labelListRef };
                figureImageInstance.labelRef = { ...labelRef };
                const event = {
                    keyCode: 40,
                    stopPropagation: jest.fn(),
                    preventDefault: jest.fn()
                };
                figureImageInstance.setState({showingListIndex: 0});
                figureImageInstance.handleLabelKeyDown(event);
                expect(spy).toBeCalled();
            });
            it('Testing handleLabelKeyDown - Fourth IF', () => {
                const labelListRef = {
                    current: {
                        childNodes: {
                            0: {
                                focus: jest.fn()
                            }
                        }
                    }
                };
                const labelRef = {
                    current: {
                        focus: jest.fn()
                    }
                };
                figureImageInstance.labelListRef = { ...labelListRef };
                figureImageInstance.labelRef = { ...labelRef };
                const event = {
                    keyCode: 38,
                    stopPropagation: jest.fn(),
                    preventDefault: jest.fn()
                };
                figureImageInstance.setState({showingListIndex: 1});
                figureImageInstance.handleLabelKeyDown(event);
                expect(spy).toBeCalled();
            });
        });
    describe('Conditional Coverage for FigureUserInterface', () => {
        let props2 = {
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
                    hasOwnProperty: jest.fn(()=> true),
                    path:'test path',
                    interactiveid: 'urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456',
                    interactivetype:'3rd-party',
                    posterimage:{
                        imageid:"urn:pearson:alfresco:cedeb658-3b9b-4aef-a0cf-9eb83b03a456",
                        path:"https://eps.openclass.com/eps/sanvan/api/item/11253a14-a237-43a2-bbd7-91c7359aa520/100/file/CITe_COS_Gold_Book_V27/m/OPS/components/metrodigi/ch05-tabs_accordions_v2-01/index.html"
                     },
                },
                html:{captions:"<p>test caption</p>",credits:"<p>test credit</p>",title:"<p><label>sdsfdfsdf&nbsp;</label><number>1.0&nbsp;</number>dfsdggdg ffse</p>",footnotes:{},glossaryentries:{},postertext:"<p>ssds dsd&nbsp; sasa sas dada</p>",tableasHTML:"",text:""},
            }
        }
        let elementFigureUserInterface = mount(<Provider store={store}><FigureUserInterface {...props2} /></Provider>)
        let FigureUserInterfaceInstance = elementFigureUserInterface.find('FigureUserInterface').instance();

        it('Conditional Coverage for method generateAddAssetJSX() for figureType `mmi-elm` with asset data', () => {
            FigureUserInterfaceInstance.generateAddAssetJSX(null,'assetTitle','addButtonText',null,null,'assetPath',"mmi-elm")
        })

        it('Conditional Coverage for method generateAddAssetJSX() for figureType `mmi` with asset data', () => {
            FigureUserInterfaceInstance.generateAddAssetJSX(null,'assetTitle','addButtonText',null,null,'assetPath',"mmi")
        })

        it('Conditional Coverage for method generateUpdateAssetJSX() for figureType `mmi-elm` with asset data', () => {
            FigureUserInterfaceInstance.generateUpdateAssetJSX(props2.element,null,null,'assetPath:',null,null,null,'assetID:',null,null,null,"mmi-elm")
        })

        it('Conditional Coverage for method generateUpdateAssetJSX() for figureType `mmi-elm` without asset data', () => {
            FigureUserInterfaceInstance.generateUpdateAssetJSX(props2.element,null,null,null,null,null,null,null,null,null,null,"mmi-elm")
        })

        it('Conditional Coverage for method generateUpdateAssetJSX() for figureType `mmi` with asset data', () => {
            FigureUserInterfaceInstance.generateUpdateAssetJSX(props2.element,null,null,'assetPath:',null,null,null,'assetID:',null,null,null,"mmi")
        })

        it('Conditional Coverage for method generateUpdateAssetJSX() for figureType `mmi` without asset data', () => {
            FigureUserInterfaceInstance.generateUpdateAssetJSX(props2.element,null,null,null,null,null,null,null,null,null,null,"mmi")
        })

        it('Conditional Coverage for method generateUpdateAssetJSX() for figureType `other` with asset data', () => {
            FigureUserInterfaceInstance.generateUpdateAssetJSX(props2.element,null,null,'assetPath:',null,null,null,'assetID:',null,null,null,"other")
        })

        it('Conditional Coverage for method generateUpdateAssetJSX() for figureType `other` without asset data', () => {
            FigureUserInterfaceInstance.generateUpdateAssetJSX(props2.element,null,null,null,null,null,null,null,null,null,null,"other")
        })

        it('Conditional Coverage for method generateUpdateAssetJSX() for figureType `other` with asset data and alfresco site url', () => {
            FigureUserInterfaceInstance.generateUpdateAssetJSX(props2.element,null,null,'assetPath:',null,null,null,'assetID:',null,'alfrescositeURL',null,"other")
        })
    })

});