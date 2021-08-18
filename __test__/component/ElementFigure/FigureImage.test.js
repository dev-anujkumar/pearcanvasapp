import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import FigureImage from '../../../src/component/ElementFigure/FigureImage';
import { figureImage50TextElementDefault,figureImage50TextElementWithData,mathImage50TextElementDefault, tableImage50TextElementDefault,tableImage50TextElementWithData,mathImage50TextElementWithData,testDataFromNewAlfresco } from '../../../fixtures/ElementFigureTestingData.js'
import config from '../../../src/config/config';
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
        projectMetadata:{},
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
                    figuretype:'image'
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
        it('handleC2MediaClick-if else case  alfresco_crud_access ', () => {
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
            accessDenied: jest.fn()
        };
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
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
        xit('Test- if case workflow when scaleMarkerData present', () => {
            elementFigureInstance.dataFromNewAlfresco(testDatascaleMarker)
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear();
        })
        it('Test- else case workflow when epsURL is not given', () => {
            let data = testDataFromNewAlfresco;
            data["epsUrl"] = ''
            data['id'] = ''
            data.properties["exif:pixelXDimension"] = ''
            data.properties["exif:pixelYDimension"] = ''
            data.properties["cplg:altText"] = ''
            data.properties['cplg:longDescription'] = ''
            let defaultImageSrc = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
            elementFigureInstance.dataFromNewAlfresco(data)
            expect(elementFigureInstance.state.imgSrc).toBe(defaultImageSrc)
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
            elementFigureInstance.handleFigureDropdown();
        })
        it('Test onFigureImageFieldFocus', () => {
            jest.spyOn(elementFigureInstance, 'onFigureImageFieldFocus')
            elementFigureInstance.onFigureImageFieldFocus('test');
        })
        it('Test onFigureImageFieldBlur', () => {
            jest.spyOn(elementFigureInstance, 'onFigureImageFieldBlur')
            elementFigureInstance.onFigureImageFieldBlur("test");
        })
    })

});