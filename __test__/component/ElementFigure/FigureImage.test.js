import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import FigureImage from '../../../src/component/ElementFigure/FigureImage';
import { figureImage50TextElementDefault,figureImage50TextElementWithData,mathImage50TextElementDefault, tableImage50TextElementDefault,tableImage50TextElementWithData,mathImage50TextElementWithData,testDataFromNewAlfresco,tableasmarkupWithoutData,tableasmarkupWithData,codelistingWithoutData,codelistingWithData,blockmathWithData,blockmathWithoutData } from '../../../fixtures/ElementFigureTestingData.js'
import config from '../../../src/config/config';
import { mockNumberedElements, mockIndexedElements, mockSlateFiguresList} from '../FigureHeader/AutoNumberApiTestData';
import * as utils from '../../../src/constants/utility';
jest.mock('../../../src/component/tinyMceEditor.js',()=>{
    return function () {
        return (<div>null</div>)
    }
})
global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({json:jest.fn(),id:'urn:pearson134'});
   });
 });
const permissionsArray = [
    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview",'alfresco_crud_access', "add_instructor_resource_url", "grid_crud_access", , "set_favorite_project", "sort_projects",
    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
]
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
    autoNumberOption: ''
}
describe('Testing Figure image component', () => {
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
            figureDropdownData: {
                audio: ["No Label", "Custom"],
                image: ["Figure", "Table", "Equation"],
                smartlinks: ["No Label", "Custom"],
                video: ["No Label", "Custom"]
            }
        },
        projectMetadata:{},
        autoNumberReducer: mockAutoNumberReducerEmpty,
        keyboardReducer : {selectedElement: '' }
    }
    const store = mockStore(initialState);

    test('renders without crashing', () => {
        let props = {
            model:figureImage50TextElementWithData,
            index:"" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: ['add_multimedia_via_alfresco'],
            figureData:{
                model:{
                    figuretype:['image','table','mathImage','authoredtext']
                }
            }
        }
        const component = mount(<Provider store={store}><FigureImage {...props} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })
    describe('Testing alfrescoSiteUrl', () => {
        let props = {
            model:figureImage50TextElementWithData,
            index:"" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: ['add_multimedia_via_alfresco'],
        }
        test('Testing updateAlfrescoSiteUrl if condition', () => {
            let elementFigure = mount(<Provider store={store}><FigureImage {...props} /></Provider>)
            const elementFigureInstance = elementFigure.find('FigureImage').instance();
            elementFigureInstance.setState({ alfrescoSiteData: {
                title: 'test'
            }});
            elementFigureInstance.updateAlfrescoSiteUrl();
            expect(elementFigureInstance.state.alfrescoSite).toBe('test')
        })
        test('Testing updateAlfrescoSiteUrl else condition', () => {
            let elementFigure = mount(<Provider store={store}><FigureImage {...props} /></Provider>)
            const elementFigureInstance = elementFigure.find('FigureImage').instance();
            elementFigureInstance.setState({ alfrescoSiteData: {
                title: null
            }});
            elementFigureInstance.updateAlfrescoSiteUrl();
            let defaultSite = config.alfrescoMetaData?.alfresco?.repositoryFolder || config.alfrescoMetaData?.alfresco?.title
            expect(elementFigureInstance.state.alfrescoSite).toBe(defaultSite)
        })
    })
    describe('Testing figure image element right sidebar options', () => {
        let props = {
            model: figureImage50TextElementDefault,
            index: 1,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions:['add_multimedia_via_alfresco'],
        };
        let component = mount(<Provider store={store}><FigureImage {...props} /></Provider>)
        const instance1 = component.find('FigureImage').instance()
        const div = document.createElement('div');
        it('renders properly with default figureImage-50% Text', () => {
            expect(component.find('.divImage50Text .figureImage50Text .image50Text')).toHaveLength(1)
        })
        it('renders  properly with mock data figureImage-50% Text', () => {
            component.setProps({ model: figureImage50TextElementWithData ,index: 2});
            expect(component.find('.divImage50Text .figureImage50Text .image50Text')).toHaveLength(1)
        })
    });
    describe('Test table image element', () => {
        let props = {
            model: tableImage50TextElementDefault,
            index: 9,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: ['add_multimedia_via_alfresco'],
        };
        let component = mount(<Provider store={store}><FigureImage {...props} /></Provider>);
        it('renders properly with default tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementDefault ,index:9});
            expect(component.find('.divImage50TextTableImage .figureImage50TextTableImage .image50TextTableImage')).toHaveLength(1)
        })
        it('renders  properly with mock data tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementWithData ,index:10});
            expect(component.find('.divImage50TextTableImage .figureImage50TextTableImage .image50TextTableImage')).toHaveLength(1)
        })
    });
    describe('Test math image element', () => {
        let props = {
            model: mathImage50TextElementDefault,
            index:17,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            permissions: ['add_multimedia_via_alfresco'],
        };
        let component = mount(<Provider store={store}><FigureImage {...props} /></Provider>);
        const div = document.createElement('div');
        it('renders properly with default mathImage-50% Text', () => {
            component.setProps({ model: mathImage50TextElementDefault,index:17 });
            expect(component.find('.divImage50TextMathImage .figureImage50TextMathImage .image50TextMathImage')).toHaveLength(1)
        })
        it('renders  properly with mock data mathImage-50% Text', () => {
            component.setProps({ model: mathImage50TextElementWithData,index:18 });
            expect(component.find('.divImage50TextMathImage .figureImage50TextMathImage .image50TextMathImage')).toHaveLength(1)
        })
    });
    it('changeFigureLabel case if', () => {
        document.getElementById = () => {
            return {
                innerHTML: 'test'
            }
        }
        let props = {
            model:figureImage50TextElementWithData,
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
                figuretype:['image','table','mathImage','authoredtext'],
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
        const component1 = mount(<Provider store={store}><FigureImage {...props} /></Provider>)
        const FigureImage1 = component1.find('FigureImage').instance();
        FigureImage1.changeFigureLabel('Table', 'Figure');
        let instance1 = component1.instance();
        expect(instance1).toBeDefined();
        component1.find('.figure-label').simulate('click');
    });
    it('changeFigureLabel case else', () => {
        document.getElementById = () => {
            return {
                innerHTML: ''
            }
        }
        let props = {
            model:figureImage50TextElementWithData,
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
                figuretype:['image','table','mathImage','authoredtext'],
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
        const component = mount(<Provider store={store}><FigureImage {...props} /></Provider>)
        const FigureImage1 = component.find('FigureImage').instance();
        FigureImage1.changeFigureLabel('');
        let instance = component.instance();
        expect(instance).toBeDefined();
    });
    describe('Testing Element figure - handleC2MediaClick Functions', () => {
        let type = "figure";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            permissions: ['add_multimedia_via_alfresco'],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn()
        };
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
        let alfrescoPath = {
            alfresco: {
                nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                repositoryFolder: "001_C5 Media POC - AWS US ",
                repositoryName: "AWS US",
                repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
                visibility: "MODERATED",
            },
            associatedArt: "https://cite-media-stg.pearson.com/legacy_paths/634a3489-083f-4539-8d47-0a8827246857/cover_thumbnail.jpg",
            authorName: "Krajewski",
            citeUrn: "urn:pearson:manifestation:191e7b6c-53a3-420f-badd-a90786613ae5",
            containerUrn: "urn:pearson:manifest:fd254701-5063-43aa-bd24-a2c2175be2b2",
            currentOrigin: "local",
            dateApproved: null,
            dateCreated: "2019-02-28T19:14:32.948Z",
            eTag: "Vy8xNTc0Mjc4NDkxMDYz",
            entityUrn: "urn:pearson:entity:f2f656da-c167-4a5f-ab8c-e3dbbd349095",
            gridId: [],
            hasVersions: false,
            id: "urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f",
            name: "ELMTEST_StgEnv_Krajewski Test",
            roleId: "admin",
            ssoToken: "qcOerhRD_CT-ocYsh-y2fujsZ0o.*AAJTSQACMDIAAlNLABxnalBuS2VJQi9RUTFMdHVBZDZBMUxyakpUTGM9AAJTMQACMDE.*",
            status: "wip",
            tcm: { timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true },
            url: null,
            userApprover: null,
            userApproverFullName: null,
            userCount: 0,
            'x-prsn-user-id': " "
        }
        const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
        let elementFigureInstance = elementFigure.find('FigureImage').instance();
        it('handleC2MediaClick-default case', () => {
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: alfrescoPath
            })
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            config.alfrescoMetaData = alfrescoPath
            elementFigureInstance.handleC2MediaClick(event);
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('handleC2MediaClick else case ', () => {
            let alfrescoPath1 = {
                alfresco: {
                    visibility: "MODERATED",
                    name:'test',
                    title:'test',
                    guid:'test'
                }
            }
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: alfrescoPath1
            })
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            config.alfrescoMetaData = alfrescoPath
            elementFigureInstance.handleC2MediaClick(event);
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('handleC2MediaClick-if with alfresco_crud_access permissions ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview",'alfresco_crud_access', "add_instructor_resource_url", "grid_crud_access", , "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            };
            const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
            let elementFigureInstance = elementFigure.find('FigureImage').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: {}
            })
            elementFigure.update();
            config.alfrescoMetaData = {}
            elementFigureInstance.handleC2MediaClick(event);
            elementFigureInstance.forceUpdate();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        xit('handleC2MediaClick-if else case  alfresco_crud_access ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", , "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            };
            const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
            let elementFigureInstance = elementFigure.find('FigureImage').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: {}
            })
            elementFigure.update();
            config.alfrescoMetaData = {}
            elementFigureInstance.handleC2MediaClick(event);
            elementFigureInstance.forceUpdate();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('TEST- Call AddResource function for C2Mdeia',()=>{
            const spyaddFigureResource = jest.spyOn(elementFigureInstance, 'addFigureResource') 
            elementFigureInstance.addFigureResource(e);
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spyaddFigureResource).toHaveBeenCalledWith(e)
            spyaddFigureResource.mockClear()
        })
    })
    describe('New Alfresco Data Handling', () => {
        let type = "figure";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            permissions: ['add_multimedia_via_alfresco'],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            showBlocker: jest.fn()
        };
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
        jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
        const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
        let elementFigureInstance = elementFigure.find('FigureImage').instance();
        const spydataFromAlfresco = jest.spyOn(elementFigureInstance, 'dataFromNewAlfresco')

        it('Test- if case workflow when epsURL given', () => {
            elementFigureInstance.dataFromNewAlfresco(testDataFromNewAlfresco)
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementFigureInstance.state.imgSrc).toBe(testDataFromNewAlfresco.epsUrl)
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow when scaleMarkerData present', () => {
            let testDatascaleMarker = { ...testDataFromNewAlfresco }
            testDatascaleMarker["scalemarker"] = {
                id: "c332dee9-f62a-4d6b-9fe6-4148ab5603a6",
                name: "urry0679_03_c02-30_prf.png",
                epsUrl: "www.xyz.com",
                properties: {
                    "exif:pixelYDimension": 600,
                    "exif:pixelXDimension": 700
                }
            }
            elementFigureInstance.dataFromNewAlfresco(testDatascaleMarker)
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear();
        })
        it('Test- if case workflow when some scaleMarkerData present', () => {
            let testDatascaleMarker = { ...testDataFromNewAlfresco }
            testDatascaleMarker["scalemarker"] = {
                "institution-urls": {
                    0: {
                        publicationUrl: "www.xyz.com"
                    }
                }
            }
            elementFigureInstance.dataFromNewAlfresco(testDatascaleMarker)
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear();
        })
        it('Test- if case workflow when scaleMarkerData not present', () => {
            let testDatascaleMarker = { ...testDataFromNewAlfresco }
            testDatascaleMarker["id"] = null;
            testDatascaleMarker["scalemarker"] = { }
            elementFigureInstance.dataFromNewAlfresco(testDatascaleMarker)
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear();
        })
        it('Test- else case workflow when epsURL is not given', () => {
            let data = testDataFromNewAlfresco;
            data["epsUrl"] = "";
            data['id'] = "";
            data.properties["exif:pixelXDimension"] = "";
            data.properties["exif:pixelYDimension"] = "";
            data.properties["cplg:altText"] = "";
            data.properties['cplg:longDescription'] = "";
            let DEFAULT_IMAGE_SOURCE = "https://cite-media-stg.pearson.com/legacy_paths/9b39bfd7-b73c-4b0f-b2c5-60e77ed17ce7/Page097a.jpg"
            elementFigureInstance.dataFromNewAlfresco(data)
            expect(elementFigureInstance.state.imgSrc).toBe(DEFAULT_IMAGE_SOURCE)
        })
        it('Test- else case workflow when epsURL becomes ``', () => {
            let data = testDataFromNewAlfresco;
            data["institution-urls"] = { };
            data["epsUrl"] = "";
            data['id'] = "";
            data.properties["exif:pixelXDimension"] = "";
            data.properties["exif:pixelYDimension"] = "";
            data.properties["cplg:altText"] = "";
            data.properties['cplg:longDescription'] = "";
            let DEFAULT_IMAGE_SOURCE = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
            elementFigureInstance.dataFromNewAlfresco(data)
            expect(elementFigureInstance.state.imgSrc).toBe(DEFAULT_IMAGE_SOURCE)
        })
        it('Test componentWillUnmount', () => {
            jest.spyOn(elementFigureInstance, 'componentWillUnmount')
            document.removeEventListener = () => {
                return true
            }
            elementFigureInstance.componentWillUnmount();
            expect(elementFigureInstance.componentWillUnmount).toHaveBeenCalled();
        })
        it('Test handleClickOutside', () => {
            jest.spyOn(elementFigureInstance, 'handleClickOutside')
            elementFigureInstance.handleClickOutside(e);
        })
        it('Test deleteFigureResource', () => {
            jest.spyOn(elementFigureInstance, 'deleteFigureResource')
            elementFigureInstance.deleteFigureResource();
        })
        it('Test handleFigureDropdown', () => {
            jest.spyOn(elementFigureInstance, 'handleFigureDropdown')
            elementFigureInstance.handleFigureDropdown('active');
        })
        it('Test onFigureImageFieldFocus', () => {
            jest.spyOn(elementFigureInstance, 'onFigureImageFieldFocus')
            elementFigureInstance.onFigureImageFieldFocus('test');
        })
        it('Test onFigureImageFieldBlur', () => {
            jest.spyOn(elementFigureInstance, 'onFigureImageFieldBlur')
            elementFigureInstance.onFigureImageFieldBlur("test");
        })
        describe("Test isCiteChanged", () => {
            it("Test isCiteChanged - IF Condition", () => {
                let initialState2 = { ...initialState }
                initialState2["alfrescoReducer"]["isCiteChanged"] = true;
                initialState2["alfrescoReducer"]["changedSiteData"] = {
                    guid: "78338-88-9990",
                    title: "Image_Title",
                    id: "urn:4766647-746646-98484884",
                    visibility: ""
                };
                const store2 = mockStore(initialState2);
                const elementFigure2 = mount(<Provider store={store2}><FigureImage type={type} model={figureImage50TextElementDefault} index="30" { ...props }/></Provider>);
                const elementFigureInstance2 = elementFigure2.find('FigureImage').instance();
                const spydataFromAlfresco2 = jest.spyOn(elementFigureInstance2, 'dataFromNewAlfresco');
                elementFigureInstance2.dataFromNewAlfresco(testDataFromNewAlfresco);
                expect(spydataFromAlfresco2).toHaveBeenCalled();
            })
            it("Test isCiteChanged - ELSE Condition", () => {
                let initialState2 = { ...initialState }
                initialState2["alfrescoReducer"]["isCiteChanged"] = false;
                const store2 = mockStore(initialState2);
                const elementFigure2 = mount(<Provider store={store2}><FigureImage type={type} model={figureImage50TextElementDefault} index="30" { ...props }/></Provider>);
                const elementFigureInstance2 = elementFigure2.find('FigureImage').instance();
                elementFigureInstance2.setState({alfrescoSiteData: {
                    nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a"
                }});
                const spydataFromAlfresco2 = jest.spyOn(elementFigureInstance2, 'dataFromNewAlfresco');
                elementFigureInstance2.dataFromNewAlfresco(testDataFromNewAlfresco);
                expect(spydataFromAlfresco2).toHaveBeenCalled();
            })
        })
        describe("Branch coverage for dataFromAlfresco", () => {
            it('when figureType=table', () => {
                let modelForTable = {
                    ...figureImage50TextElementDefault
                }
                modelForTable["figuretype"] = "table";
                let tableDataFromNewAlfresco = {
                    ...testDataFromNewAlfresco
                }
                tableDataFromNewAlfresco["content"]["mimeType"] = "table";
                const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={modelForTable} index="30" {...props}/></Provider>);
                let elementFigureInstance = elementFigure.find('FigureImage').instance();
                const spydataFromAlfresco = jest.spyOn(elementFigureInstance, 'dataFromNewAlfresco');
                elementFigureInstance.dataFromNewAlfresco(tableDataFromNewAlfresco);
                elementFigureInstance.forceUpdate();
                elementFigure.update();
                expect(spydataFromAlfresco).toHaveBeenCalled();
            })
            it('when figureType=mathImage', () => {
                let modelForMathImage = {
                    ...figureImage50TextElementDefault
                }
                modelForMathImage["figuretype"] = "mathImage";
                let mathImageDataFromNewAlfresco = {
                    ...testDataFromNewAlfresco
                }
                mathImageDataFromNewAlfresco["content"]["mimeType"] = "mathImage";
                const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={modelForMathImage} index="30" {...props}/></Provider>);
                let elementFigureInstance = elementFigure.find('FigureImage').instance();
                const spydataFromAlfresco = jest.spyOn(elementFigureInstance, 'dataFromNewAlfresco');
                elementFigureInstance.dataFromNewAlfresco(mathImageDataFromNewAlfresco);
                elementFigureInstance.forceUpdate();
                elementFigure.update();
                expect(spydataFromAlfresco).toHaveBeenCalled();
            })
            it('when figureType=authoredtext', () => {
                let authoredtextDataFromNewAlfresco = {
                    ...testDataFromNewAlfresco
                }
                authoredtextDataFromNewAlfresco["content"]["mimeType"] = "authoredtext";
                const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
                let elementFigureInstance = elementFigure.find('FigureImage').instance();
                const spydataFromAlfresco = jest.spyOn(elementFigureInstance, 'dataFromNewAlfresco');
                elementFigureInstance.dataFromNewAlfresco(authoredtextDataFromNewAlfresco);
                elementFigureInstance.forceUpdate();
                elementFigure.update();
                expect(spydataFromAlfresco).toHaveBeenCalled();
            })
            it('when figureType=codelisting', () => {
                let modelForCodelisting = {
                    ...figureImage50TextElementDefault
                }
                modelForCodelisting["figuretype"] = "codelisting";
                let codelistingDataFromNewAlfresco = {
                    ...testDataFromNewAlfresco
                }
                codelistingDataFromNewAlfresco["content"]["mimeType"] = "codelisting";
                const elementFigure = mount(<Provider store={store}><FigureImage type={type} model={modelForCodelisting} index="30" {...props}/></Provider>);
                let elementFigureInstance = elementFigure.find('FigureImage').instance();
                const spydataFromAlfresco = jest.spyOn(elementFigureInstance, 'dataFromNewAlfresco');
                elementFigureInstance.dataFromNewAlfresco(codelistingDataFromNewAlfresco);
                elementFigureInstance.forceUpdate();
                elementFigure.update();
                expect(spydataFromAlfresco).toHaveBeenCalled();
            })
        })
    })
    describe("Testing changeFigureLabel()", () => {
        let props = {
            model: tableasmarkupWithoutData,
            index: 0,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: jest.fn(),
            handleFocus: jest.fn(),
            permissions: ['add_multimedia_via_alfresco'],
            figureData: {
                model: {
                    figuretype:['image','table','mathImage','authoredtext','tableasmarkup']
                }
            },
            asideData: {},
            updateFigureData: jest.fn(),
            parentEntityUrn: "",
            handleBlur: jest.fn()
        };
        const BLANK_LABEL_OPTIONS = ['No Label', 'Custom'];
        let component = mount(<Provider store={store}><FigureImage {...props} /></Provider>);
        let figureImageInstance = component.find('FigureImage').instance();
        document.body.innerHTML ='<div id="cypress-0-0" class="label">No Label</div>';
        it('If figureLabelValue !== data', () => {
            figureImageInstance.setState({ figureLabelValue: 'No Label' });
            const spy = jest.spyOn(figureImageInstance, 'changeFigureLabel');
            figureImageInstance.changeFigureLabel(figureImageInstance.state.figureLabelValue,"Image")
            expect(spy).toHaveBeenCalled();
        })
        it('If dropdownOptions.includes(data)', () => {
            figureImageInstance.setState({ figureLabelValue: 'No Label',
            figureLabelData: ['Image','Table']
            });
            const spy = jest.spyOn(figureImageInstance, 'changeFigureLabel');
            figureImageInstance.changeFigureLabel(figureImageInstance.state.figureLabelValue,"Table")
            expect(spy).toHaveBeenCalled();
        })
    })
    /**Test Cases for FigureImage when it renders Table Element */
    describe("Testing FigureImage Component for Table Editor Element", () => {
        let props = {
            model: tableasmarkupWithoutData,
            index: "" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: jest.fn(),
            handleFocus: jest.fn(),
            permissions: ['add_multimedia_via_alfresco'],
            figureData: {
                model: {
                    figuretype:['image','table','mathImage','authoredtext','tableasmarkup']
                }
            },
            asideData: {},
            updateFigureData: jest.fn(),
            parentEntityUrn: ""
        };
        let props2 = {
            ...props,
            model: tableasmarkupWithData
        }
        let component = mount(<Provider store={store}><FigureImage {...props} /></Provider>);
        let figureImageInstance = component.find('FigureImage').instance();
        describe("Table Element renders without crashing", () => {
            it('Table Element without Asset renders without crashing', () => {
                expect(component).toHaveLength(1);
                expect(component.instance()).toBeDefined();
            })
            it('Table Element with Asset renders without crashing', () => {
                component = mount(<Provider store={store}><FigureImage {...props2} /></Provider>)
                expect(component).toHaveLength(1);
                expect(component.instance()).toBeDefined();
            })
        })
        describe("Table SPA is launched or not", () => {
            it("When Clicked on 'Add a Table' button method launchSPA() is called", () => {
                component = mount(<Provider store={store}><FigureImage {...props} /></Provider>);
                figureImageInstance = component.find('FigureImage').instance();
                const spy = jest.spyOn(figureImageInstance, 'launchSPA');
                expect(component.find('button.table-asset-button')).toHaveLength(1);
                component.find('button.table-asset-button').simulate('click');
                expect(spy).toHaveBeenCalled();
            })
            it("When Clicked on Table Asset method launchSPA() is called", () => {
                component = mount(<Provider store={store}><FigureImage {...props2} /></Provider>);
                figureImageInstance = component.find('FigureImage').instance();
                const spy = jest.spyOn(figureImageInstance, 'launchSPA');
                expect(component.find('div.table-asset-wrapper-with-asset')).toHaveLength(1);
                component.find('div.table-asset-wrapper-with-asset').simulate('click');
                expect(spy).toHaveBeenCalled();
            })
        })
    })
    /**Test Cases for Block Code Element */
    describe("Testing FigureImage Component for Block Code Element", () => {
        let props = {
            model: codelistingWithoutData,
            index: "" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: jest.fn(),
            handleFocus: jest.fn(),
            permissions: ['add_multimedia_via_alfresco'],
            figureData: {
                model: {
                    figuretype:['image','table','mathImage','authoredtext','tableasmarkup','codelisting']
                }
            },
            asideData: {},
            updateFigureData: jest.fn(),
            parentEntityUrn: ""
        };
        let props2 = {
            ...props,
            model: codelistingWithData
        }
        let component = mount(<Provider store={store}><FigureImage {...props} /></Provider>);
        let figureImageInstance = component.find('FigureImage').instance();
        describe("block code renders without crashing", () => {
            it('Block code without data renders without crashing', () => {
                expect(component).toHaveLength(1);
                expect(component.instance()).toBeDefined();
            })
            it('Block code with data renders without crashing', () => {
                component = mount(<Provider store={store}><FigureImage {...props2} /></Provider>)
                expect(component).toHaveLength(1);
                expect(component.instance()).toBeDefined();
            })
        })
        
    })
    /**Test Cases for Block math Element */
    describe("Testing FigureImage Component for Block math Element", () => {
        let props = {
            model: blockmathWithoutData,
            index: "" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: jest.fn(),
            handleFocus: jest.fn(),
            permissions: ['add_multimedia_via_alfresco'],
            figureData: {
                model: {
                    figuretype:['image','table','mathImage','authoredtext','tableasmarkup','codelisting']
                }
            },
            asideData: {},
            updateFigureData: jest.fn(),
            parentEntityUrn: ""
        };
        let props2 = {
            ...props,
            model: blockmathWithData
        }
        let component = mount(<Provider store={store}><FigureImage {...props} /></Provider>);
        let figureImageInstance = component.find('FigureImage').instance();
        describe("block math  renders without crashing", () => {
            it('Block math without data renders without crashing', () => {
                expect(component).toHaveLength(1);
                expect(component.instance()).toBeDefined();
            })
            it('Block math with data renders without crashing', () => {
                component = mount(<Provider store={store}><FigureImage {...props2} /></Provider>)
                expect(component).toHaveLength(1);
                expect(component.instance()).toBeDefined();
            })
        })   
    })
});
const mockAutoNumberReducerWithData = {
    isAutoNumberingEnabled: true,
    autoNumberedElements: mockNumberedElements,
    autoNumberingDetails: {
        chapterOrderList: { 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb': 1, 'urn:pearson:entity:288806e5-9c0e-4373-b2af-426acf010220': 2 },
        partOrderList: { 'urn:pearson:entity:b459b0a8-a6ec-419e-8b5b-e815d1f7f067': 1 }
    },
    autoNumberElementsIndex: mockIndexedElements,
    slateFigureList:mockSlateFiguresList,
    autoNumberOption: ''
}
describe('Testing Figure image component', () => {
    let initialState2 = {
        alfrescoReducer: {
            alfrescoAssetData: {},
            elementId: "urn",
            alfrescoListOption: [],
            launchAlfrescoPopup: true,
            editor: true,
            Permission: false
        },
        appStore: {
            figureDropdownData: {
                audio: ["Audio"],
                image: ["Figure", "Table", "Equation"],
                smartlinks: ["No Label", "Custom"],
                video: ["Video"]
            },
            activeElement: {
                altText: "",
                elementId: "urn:pearson:work:c76ca6f7-af8c-4b46-8de4-6b136fa3bd93",
                elementType: "figure",
                elementWipType: "figure",
                index: 0,
                longDesc: "",
                podwidth: "",
                primaryOption: "primary-image-figure",
                secondaryOption: "secondary-image-figure-width",
                tag: "Fg"
            },
            currentSlateAncestorData: {
                "containerUrn": "urn:pearson:manifest:dd2504ac-ef6f-4cdc-8d24-de6b6170baee",
                "entityUrn": "urn:pearson:entity:2a741486-681c-4536-ae46-5ea974db041b",
                "title": "",
                "label": "appendixslate",
                "matterType": "BackMatter",
                "ancestor": {
                    "containerUrn": "urn:pearson:manifest:34e2807d-fd3f-4938-aa38-4b81e612eb0f",
                    "entityUrn": "urn:pearson:entity:275d98d9-afb7-409f-8021-8aad2bd06656",
                    "title": "",
                    "label": "appendix",
                    "ancestor": {
                        "containerUrn": "urn:pearson:distributable:2c5fbcf9-81c4-4831-b5ca-adfbf644cfe7",
                        "entityUrn": "urn:pearson:entity:fc1224f4-09b2-452f-aa74-f66f6344b64d",
                        "title": "dev_test_39",
                        "label": "project"
                    }
                }
            }
        },
        projectMetadata: {},
        autoNumberReducer: mockAutoNumberReducerWithData,
        keyboardReducer : {selectedElement: '' }
    }
    const store2 = mockStore(initialState2);
    let props = {
        model: figureImage50TextElementWithData,
        index: "",
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        onClick: () => { },
        handleFocus: function () { },
        updateFigureData: function () { },
        permissions: ['add_multimedia_via_alfresco'],
        figureData: {
            model: {
                figuretype: ['image', 'table', 'mathImage', 'authoredtext']
            }
        },
        showBlocker: jest.fn()
    }

    it('renders without crashing', () => {
        const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();
    });

    describe('Testing rendering of Other Figure Image type', () => {
        it('Testing rendering of mathImage without alignment', () => {
            let mathImage = {...props}
            mathImage['model'] = mathImage50TextElementDefault;
            mathImage['model']['alignment'] = null;
            const component = mount(<Provider store={store2}><FigureImage {...mathImage} /></Provider>)
            expect(component).toHaveLength(1);
            const instance = component.instance();
            expect(instance).toBeDefined();
        });
        it('Testing rendering of image without alignment', () => {
            let imageProps = {...props}
            imageProps['model']['alignment'] = null;
            const component = mount(<Provider store={store2}><FigureImage {...imageProps} /></Provider>)
            expect(component).toHaveLength(1);
            const instance = component.instance();
            expect(instance).toBeDefined();
        });
        it('Testing rendering of image with alignment=`actual-size` having width & height', () => {
            let imageProps = {...props}
            imageProps['model']['alignment'] = 'actual-size';
            imageProps['model']['figuredata'] = {
                width: 50,
                height: 50
            }
            const component = mount(<Provider store={store2}><FigureImage {...imageProps} /></Provider>)
            expect(component).toHaveLength(1);
            const instance = component.instance();
            expect(instance).toBeDefined();
        });
        it('Testing rendering of image with alignment=`actual-size` not having width & height', () => {
            let imageProps = {...props}
            imageProps['model']['alignment'] = 'actual-size';
            imageProps['model']['figuredata'] = { }
            const component = mount(<Provider store={store2}><FigureImage {...imageProps} /></Provider>)
            expect(component).toHaveLength(1);
            const instance = component.instance();
            expect(instance).toBeDefined();
        });
        it('Testing rendering of image with width > 600', () => {
            let imageProps = {...props}
            imageProps['model']['figuredata'] = { width: 700 }
            const component = mount(<Provider store={store2}><FigureImage {...imageProps} /></Provider>)
            expect(component).toHaveLength(1);
            const instance = component.instance();
            expect(instance).toBeDefined();
        });
        it('Testing rendering of tableasmarkup with alignment', () => {
            let tableasmarupProps = {...props}
            tableasmarupProps['model'] = tableasmarkupWithData;
            tableasmarupProps['model']['alignment'] = 'table-editor';
            const component = mount(<Provider store={store2}><FigureImage {...tableasmarupProps} /></Provider>)
            expect(component).toHaveLength(1);
            const instance = component.instance();
            expect(instance).toBeDefined();
        });
        it('Testing rendering of mathml with alignment', () => {
            let mathmlProps = {...props}
            mathmlProps['model'] = blockmathWithData;
            mathmlProps['model']['alignment'] = 'mathml';
            const component = mount(<Provider store={store2}><FigureImage {...mathmlProps} /></Provider>)
            expect(component).toHaveLength(1);
            const instance = component.instance();
            expect(instance).toBeDefined();
        });
    });

    describe('Testing other functions of Figure Image', () => {

        describe("Testing showDeleteAssetPopup", () => {
            const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
            const figureImageInstance = component.find('FigureImage').instance();
            const spy = jest.spyOn(figureImageInstance, 'showDeleteAssetPopup');
            it('Testing showDeleteAssetPopup - IF Condition', () => {
                figureImageInstance.setState({ deleteAssetPopup: true });
                figureImageInstance.showDeleteAssetPopup();
                expect(spy).toBeCalled();
            });
            it('Testing showDeleteAssetPopup - else IF Condition', () => {
                jest.mock('../../../src/constants/utility.js', () => ({
                    getCookieByName: jest.fn().mockImplementationOnce = () => {
                        return true
                    },
                }))
                document.cookie = "DISABLE_DELETE_WARNINGS=true"
                figureImageInstance.showDeleteAssetPopup();
                expect(spy).toBeCalled();
            });
            it('Testing showDeleteAssetPopup - ELSE Condition', () => {
                document.cookie = "DISABLE_DELETE_WARNINGS=false"
                figureImageInstance.showDeleteAssetPopup();
                expect(spy).toBeCalled();
            });
        });

        describe('Testing onFigureImageFieldFocus', () => {
            it('Testing onFigureImageFieldFocus - IF Condition', () => {
                const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
                document.getElementById = () => {
                    return {
                        nextElementSibling: {
                            classList: {
                                contains: () => true,
                                add: jest.fn()
                            }
                        }
                    }
                }
                const figureImageInstance = component.find('FigureImage').instance();
                const spy = jest.spyOn(figureImageInstance, 'onFigureImageFieldFocus');
                figureImageInstance.onFigureImageFieldFocus("urn:");
                expect(spy).toBeCalled();
            });
            it('Testing onFigureImageFieldFocus - ELSE Condition', () => {
                const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
                document.getElementById = () => {
                    return {
                        nextElementSibling: {
                            classList: {
                                contains: () => false,
                                add: jest.fn()
                            }
                        }
                    }
                }
                const figureImageInstance = component.find('FigureImage').instance();
                const spy = jest.spyOn(figureImageInstance, 'onFigureImageFieldFocus');
                figureImageInstance.onFigureImageFieldFocus("urn:");
                expect(spy).toBeCalled();
            });
        });

        describe('Testing onFigureImageFieldBlur', () => {
            it('Testing onFigureImageFieldBlur - First IF', () => {
                const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
                document.getElementById = () => {
                    return {
                        nextElementSibling: {
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                }
                const figureImageInstance = component.find('FigureImage').instance();
                const spy = jest.spyOn(figureImageInstance, 'onFigureImageFieldBlur');
                figureImageInstance.onFigureImageFieldBlur("urn:");
                expect(spy).toBeCalled();
            });
            it('Testing onFigureImageFieldBlur - Second IF', () => {
                const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
                document.getElementById = () => {
                    return {
                        nextElementSibling: {
                            classList: {
                                contains: () => true,
                                remove: jest.fn()
                            }
                        },
                        innerHTML: '<p><br></p>'
                    }
                }
                const figureImageInstance = component.find('FigureImage').instance();
                const spy = jest.spyOn(figureImageInstance, 'onFigureImageFieldBlur');
                figureImageInstance.onFigureImageFieldBlur("urn:");
                expect(spy).toBeCalled();
            });
            it('Testing onFigureImageFieldBlur - Third IF', () => {
                const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
                document.getElementById = () => {
                    return {
                        nextElementSibling: {
                            classList: {
                                contains: () => true,
                                remove: jest.fn()
                            }
                        },
                        innerHTML: '<p><br></p>'
                    }
                }
                const figureImageInstance = component.find('FigureImage').instance();
                const spy = jest.spyOn(figureImageInstance, 'onFigureImageFieldBlur');
                figureImageInstance.setState({figureLabelData: ['<p><br></p>']})
                figureImageInstance.onFigureImageFieldBlur('0-0');
                expect(spy).toBeCalled();
            });
        });

        describe('Testing handleLabelKeyDown', () => {
            const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
            const figureImageInstance = component.find('FigureImage').instance();
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

        it("Testing isEnableKeyboard", () => {
            let props2 = { ...props };
            props2["model"]["figuredata"]["programlanguage"] = "Select";
            const component = mount(<Provider store={store2}><FigureImage {...props2} /></Provider>);
            const figureImageInstance = component.find('FigureImage').instance();
            const spy = jest.spyOn(figureImageInstance, "isEnableKeyboard");
            const result = figureImageInstance.isEnableKeyboard();
            expect(spy).toBeCalled();
            expect(result).toBe(false);
        });

        it("Testing toggleDeletePopup", () => {
            const component = mount(<Provider store={store2}><FigureImage {...props} /></Provider>);
            const figureImageInstance = component.find('FigureImage').instance();
            const spy = jest.spyOn(figureImageInstance, "toggleDeletePopup");
            const event = {
                preventDefault: jest.fn()
            };
            figureImageInstance.toggleDeletePopup(null, event);
            expect(spy).toBeCalled();
        });
    });
});
