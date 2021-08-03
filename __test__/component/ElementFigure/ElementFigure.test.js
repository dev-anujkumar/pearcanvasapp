import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import ElementFigure from '../../../src/component/ElementFigure/ElementFigure';
import { figureImage50TextElementDefault,figureImage50TextElementWithData, mathmlEditorDefault, mathmlEditorWithData,mathImage50TextElementDefault, blockCodeEditorDefault,blockCodeEditorWithData, tableImage50TextElementDefault,tableImage50TextElementWithData,mathImage50TextElementWithData,figureTableEditorTextWidthElementDefault,testDataFromNewAlfresco } from '../../../fixtures/ElementFigureTestingData.js'
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
describe('Testing Figure element component', () => {
    let initialState = {
        alfrescoReducer: {
            alfrescoAssetData: {},
            elementId: "urn",
            alfrescoListOption: [],
            launchAlfrescoPopup: true,
            editor: true,
            Permission: false
        }
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
        }
        const component = mount(<Provider store={store}><ElementFigure {...props} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })
    test('Testing renderFigureType function', () => {
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
        let elementFigure = mount(<Provider store={store}><ElementFigure {...props} /></Provider>)
        const elementFigureInstance = elementFigure.find('ElementFigure').instance();
        const spyrenderFigureType = jest.spyOn(elementFigureInstance, 'renderFigureType')
        elementFigureInstance.renderFigureType(figureImage50TextElementWithData);
        elementFigureInstance.forceUpdate();
        elementFigure.update();
        expect(spyrenderFigureType).toHaveBeenCalledWith(figureImage50TextElementWithData) 
        spyrenderFigureType.mockClear()
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
            let elementFigure = mount(<Provider store={store}><ElementFigure {...props} /></Provider>)
            const elementFigureInstance = elementFigure.find('ElementFigure').instance();
            elementFigureInstance.setState({ alfrescoSiteData: {
                title: 'test'
            }});
            elementFigureInstance.updateAlfrescoSiteUrl();
            expect(elementFigureInstance.state.alfrescoSite).toBe('test')
        })
        test('Testing updateAlfrescoSiteUrl else condition', () => {
            let elementFigure = mount(<Provider store={store}><ElementFigure {...props} /></Provider>)
            const elementFigureInstance = elementFigure.find('ElementFigure').instance();
            elementFigureInstance.setState({ alfrescoSiteData: {
                title: null
            }});
            elementFigureInstance.updateAlfrescoSiteUrl();
            let defaultSite = config.alfrescoMetaData?.alfresco?.repositoryFolder || config.alfrescoMetaData?.alfresco?.title
            expect(elementFigureInstance.state.alfrescoSite).toBe(defaultSite)
        })
    })
    describe('With figure image element', () => {
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
        let component = mount(<Provider store={store}><ElementFigure {...props} /></Provider>)
        const instance1 = component.find('ElementFigure').instance()
        const div = document.createElement('div');
        it('renders properly with default figureImage-50% Text', () => {
            expect(component.find('.divImage50Text .figureImage50Text .image50Text')).toHaveLength(1)
        })
        it('renders  properly with mock data figureImage-50% Text', () => {
            component.setProps({ model: figureImage50TextElementWithData ,index: 2});
            expect(component.find('.divImage50Text .figureImage50Text .image50Text')).toHaveLength(1)
        })
    });
    describe('With table image element', () => {
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
        let component = mount(<Provider store={store}><ElementFigure {...props} /></Provider>);
        it('renders properly with default tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementDefault ,index:9});
            expect(component.find('.divImage50TextTableImage .figureImage50TextTableImage .image50TextTableImage')).toHaveLength(1)
        })
        it('renders  properly with mock data tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementWithData ,index:10});
            expect(component.find('.divImage50TextTableImage .figureImage50TextTableImage .image50TextTableImage')).toHaveLength(1)
        })
    });
    describe('With math image element', () => {
        let props = {
            model: mathImage50TextElementDefault,
            index:17,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            permissions: ['add_multimedia_via_alfresco'],
        };
        let component = mount(<Provider store={store}><ElementFigure {...props} /></Provider>);
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
    describe('With mathML element', () => {
        let props = {
            model: mathmlEditorDefault,
            index:25,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            permissions: ['add_multimedia_via_alfresco'],
        };
        let component = mount(<Provider store={store}><ElementFigure {...props} /></Provider>);
        test('renders properly with default mathML', () => {
            component.setProps({ model: mathmlEditorDefault, index: 25 });
            expect(component.find('.paragraphNumeroUno.mathml.figureData.mathmlDiv')).toHaveLength(1)
        })
        test('renders  properly with mock data mathML', () => {
            component.setProps({ model: mathmlEditorWithData ,index:26});
            expect(component.find('.paragraphNumeroUno.mathml.figureData.mathmlDiv')).toHaveLength(1)

        })
    });
    describe('With block code editor element', () => {
        let props = {
            model: blockCodeEditorDefault,
            index:27,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            permissions: ['add_multimedia_via_alfresco'],
        };
        let component = mount(<Provider store={store}><ElementFigure {...props} /></Provider>);
        test('renders properly with default blockCodeEditor', () => {
            component.setProps({ model: blockCodeEditorDefault,index: 27});
            expect(component.find('.divCodeSnippetFigure.blockCodeFigure')).toHaveLength(1)
        })
        test('renders  properly with mock data blockCodeEditor', () => {
            component.setProps({ model: blockCodeEditorWithData,index: 28});
            expect(component.find('.divCodeSnippetFigure.blockCodeFigure')).toHaveLength(1)
        })
    });
    describe('Testing Element figure - C2 Media Handling Functions', () => {
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
        const elementFigure = mount(<Provider store={store}><ElementFigure type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
        let elementFigureInstance = elementFigure.find('ElementFigure').instance();
        it('onClick-default case', () => {
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            elementFigureInstance.handleC2MediaClick(e);
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
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
        it('onClick-if case', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            };
            const elementFigure = mount(<Provider store={store}><ElementFigure type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
            let elementFigureInstance = elementFigure.find('ElementFigure').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            elementFigureInstance.handleC2MediaClick({target : {tagName : 'g'}});
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({target : {tagName : 'g'}});
            spyhandleC2MediaClick.mockClear()
        }) 
        it('Simulating alfresco click with alfresco location', () =>{
            const elementFigure = mount(<Provider store={store}><ElementFigure {...props} /></Provider> )
            let elementFigureInstance = elementFigure.find('ElementFigure').instance();
            config.alfrescoMetaData = {
                alfresco:{
                    'path':'test',
                    'nodeRef' : {},
                }
            }
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            elementFigureInstance.handleC2MediaClick({target : {tagName : 'b'}})           
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({target : {tagName : 'b'}})
            spyhandleC2MediaClick.mockClear()
        })
        it('Simulating alfresco click without alfresco location', () =>{
            const elementFigure = mount(<Provider store={store}><ElementFigure {...props} /></Provider> )
            let elementFigureInstance = elementFigure.find('ElementFigure').instance();
            config.alfrescoMetaData = {
                alfresco:{
                    'path':'test',
                }
            }
            props.permissions = [];
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            elementFigureInstance.handleC2MediaClick({target : {tagName : 'b'}}) 
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({target : {tagName : 'b'}})
            spyhandleC2MediaClick.mockClear()
        })

        describe('New Alfresco Data Handling', () => {
            let data = testDataFromNewAlfresco;
            it('Test- if case workflow when epsURL given', () => {
                elementFigureInstance.dataFromNewAlfresco(data)
                expect(elementFigureInstance.state.imgSrc).toBe(data.epsUrl)
            })
            it('Test- else case workflow when epsURL is not given', () => {
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
        })
    })
    describe('TEST-----Table Editor',()=>{
        let type = "figure";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            model:{
                figuretype:"tableasmarkup",
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: ['add_multimedia_via_alfresco'],
            elementId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
        };
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
        const elementFigure = mount(<Provider store={store}><ElementFigure type={type} index="30" {...props}/></Provider>);
        let elementFigureInstance = elementFigure.find('ElementFigure').instance();
        it('TEST- Call AddResource function',()=>{
            const spyaddFigureResource = jest.spyOn(elementFigureInstance, 'addFigureResource') 
            elementFigureInstance.addFigureResource(e);
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spyaddFigureResource).toHaveBeenCalledWith(e)
            spyaddFigureResource.mockClear()
        })
        it('TEST- Call launchSPA function',()=>{
            const spylaunchSPA = jest.spyOn(elementFigureInstance, 'launchSPA') 
            elementFigureInstance.launchSPA();
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spylaunchSPA).toHaveBeenCalled()
            spylaunchSPA.mockClear()
        })
    })
});