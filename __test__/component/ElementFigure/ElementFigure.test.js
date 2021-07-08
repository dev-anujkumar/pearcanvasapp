import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import ElementFigure from '../../../src/component/ElementFigure/ElementFigure';
import { figureImage25TextElementDefault, figureImage25TextElementWithData ,figureImage50TextElementDefault,figureImage50TextElementWithData, figureImageTextWidthElementDefault,figureImageTextWidthElementWithData, figureImageWiderElementDefault,figureImageWiderElementWithData, figureImageFullElementDefault,figureImageFullElementWithData,tableImage50TextElementDefault,tableImage50TextElementWithData,tableImageTextWidthElementDefault,tableImageTextWidthElementWithData,tableImageWiderElementDefault,tableImageWiderElementWithData,tableImageFullElementDefault,tableImageFullElementWithData, mathImage50TextElementDefault,mathImage50TextElementWithData,mathImageTextWidthElementDefault,mathImageTextWidthElementWithData,mathImageWiderElementDefault,mathImageWiderElementWithData,mathImageFullElementDefault,mathImageFullElementWithData, mathmlEditorDefault,mathmlEditorWithData,blockCodeEditorDefault,blockCodeEditorWithData, figureTableEditorTextWidthElementDefault, figureTableEditorTextWidthElementWithData } from '../../../fixtures/ElementFigureTestingData.js'
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
    const initialState = {
        permissions:[
            'add_multimedia_via_alfresco'
        ]
    };
    let store = mockStore(initialState);

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
        const component = mount(<ElementFigure {...props} />)
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
        let elementFigure = mount(<ElementFigure {...props}  />);
        const elementFigureInstance = elementFigure.find('ElementFigure').instance();
        const spyrenderFigureType = jest.spyOn(elementFigureInstance, 'renderFigureType')
        elementFigureInstance.renderFigureType(figureImage50TextElementWithData);
        elementFigureInstance.forceUpdate();
        elementFigure.update();
        expect(spyrenderFigureType).toHaveBeenCalledWith(figureImage50TextElementWithData) 
        spyrenderFigureType.mockClear()
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
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        test('renders properly with default figureImage-50% Text', () => {
            expect(component.find('.divImage50Text .figureImage50Text .image50Text')).toHaveLength(1)
        })
        test('renders  properly with mock data figureImage-50% Text', () => {
            component.setProps({ model: figureImage50TextElementWithData ,index: 2});
            expect(component.find('.divImage50Text .figureImage50Text .image50Text')).toHaveLength(1)
        })
        test('renders  properly with default figureImage-TextWidth', () => {         
            component.setProps({ model: figureImageTextWidthElementDefault ,index: 3});
            expect(component.find('.divImageTextWidth .figureImageTextWidth .imageTextWidth')).toHaveLength(1)
        })
        test('renders  properly with mock data figureImage-TextWidth', () => {          
            component.setProps({ model: figureImageTextWidthElementWithData ,index: 4});
            expect(component.find('.divImageTextWidth .figureImageTextWidth .imageTextWidth')).toHaveLength(1)
        })
        test('renders  properly with default figureImage-Wider than Text', () => {          
            component.setProps({ model: figureImageWiderElementDefault,index: 5 });
            expect(component.find('.divImageWiderThanText .figureImageWiderThanText .imageWiderThanText')).toHaveLength(1)
        })
        test('renders  properly with mock data figureImage-Wider than Text', () => {          
            component.setProps({ model: figureImageWiderElementWithData,index: 6 });
            expect(component.find('.divImageWiderThanText .figureImageWiderThanText .imageWiderThanText')).toHaveLength(1)
        })
        xtest('renders  properly with default figureImage-Fullscreen', () => {           
            component.setProps({ model: figureImageFullElementDefault ,index: 7});
            expect(component.find('.divImageFullscreenImage .figureImageFullscreen .imageFullscreen')).toHaveLength(1)
        })
        xtest('renders  properly with mock data figureImage-Fullscreen', () => {           
            component.setProps({ model: figureImageFullElementWithData,index: 8 });
            expect(component.find('.divImageFullscreenImage .figureImageFullscreen .imageFullscreen')).toHaveLength(1)
        })
        test('renders properly with default figureImage-25% Text', () => {
            component.setProps({ model: figureImage25TextElementDefault ,index: 9});
            expect(component.find('.divImage25Text .figureImage25Text .image25Text')).toHaveLength(1)
        })
        test('renders  properly with mock data figureImage-25% Text', () => {
            component.setProps({ model: figureImage25TextElementWithData ,index: 10});
            expect(component.find('.divImage25Text .figureImage25Text .image25Text')).toHaveLength(1)
        })
    });
    describe('With table editor element', () => {
        let props = {
            model: figureTableEditorTextWidthElementDefault,
            index: 9,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions:['add_multimedia_via_alfresco'],
        };
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        xtest('renders  properly with default TableEditor-TextWidth', () => {
            component.setProps({ model: figureTableEditorTextWidthElementDefault ,index:11});
            expect(component.find('.divImageTextWidth .figureImageTextWidth .imageTextWidth')).toHaveLength(1)
        })
        xtest('renders  properly with mock data TableEditor-TextWidth', () => {
            component.setProps({ model: figureTableEditorTextWidthElementWithData ,index:12});
            expect(component.find('.divImageTextWidth .figureImageTextWidth .imageTextWidth')).toHaveLength(1)
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
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementDefault ,index:9});
            expect(component.find('.divImage50TextTableImage .figureImage50TextTableImage .image50TextTableImage')).toHaveLength(1)
        })
        test('renders  properly with mock data tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementWithData ,index:10});
            expect(component.find('.divImage50TextTableImage .figureImage50TextTableImage .image50TextTableImage')).toHaveLength(1)
        })
        test('renders  properly with default tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementDefault ,index:11});
            expect(component.find('.divImageTextWidthTableImage .figureImageTextWidthTableImage .imageTextWidthTableImage')).toHaveLength(1)
        })
        test('renders  properly with mock data tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementWithData ,index:12});
            expect(component.find('.divImageTextWidthTableImage .figureImageTextWidthTableImage .imageTextWidthTableImage')).toHaveLength(1)
        })
        test('renders  properly with default tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementDefault ,index:13});
            expect(component.find('.divImageWiderThanTextTableImage .figureImageWiderThanTextTableImage .imageWiderThanTextTableImage')).toHaveLength(1)  
        })
        test('renders  properly with mock data tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementWithData,index:14 });
            expect(component.find('.divImageWiderThanTextTableImage .figureImageWiderThanTextTableImage .imageWiderThanTextTableImage')).toHaveLength(1)
        })
        test('renders  properly with default tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementDefault,index:15 });
            expect(component.find('.divImageFullscreenTableImage .figureImageFullscreenTableImage .imageFullscreenTableImage')).toHaveLength(1)
        })
        test('renders  properly with mock data tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementWithData ,index:16});
            expect(component.find('.divImageFullscreenTableImage .figureImageFullscreenTableImage .imageFullscreenTableImage')).toHaveLength(1)
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
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        test('renders properly with default mathImage-50% Text', () => {
            component.setProps({ model: mathImage50TextElementDefault,index:17 });
            expect(component.find('.divImage50TextMathImage .figureImage50TextMathImage .image50TextMathImage')).toHaveLength(1)
        })
        test('renders  properly with mock data mathImage-50% Text', () => {
            component.setProps({ model: mathImage50TextElementWithData,index:18 });
            expect(component.find('.divImage50TextMathImage .figureImage50TextMathImage .image50TextMathImage')).toHaveLength(1)
        })
        test('renders  properly with default mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementDefault ,index:19});
            expect(component.find('.divImageTextWidthMathImage .figureImageTextWidthMathImage .imageTextWidthMathImage')).toHaveLength(1)
        })
        test('renders  properly with mock data mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementWithData,index: 20});
            expect(component.find('.divImageTextWidthMathImage .figureImageTextWidthMathImage .imageTextWidthMathImage')).toHaveLength(1)
        })
        test('renders  properly with default mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementDefault,index:21 });
            expect(component.find('.divImageWiderThanTextMathImage .figureImageWiderThanTextMathImage .imageWiderThanTextMathImage')).toHaveLength(1)
        })
        test('renders  properly with mock data mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementWithData ,index:22});
            expect(component.find('.divImageWiderThanTextMathImage .figureImageWiderThanTextMathImage .imageWiderThanTextMathImage')).toHaveLength(1)
        })
        test('renders  properly with default mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementDefault ,index:23});
            expect(component.find('.divImageFullscreenMathImage .figureImageFullscreenMathImage .imageFullscreenMathImage')).toHaveLength(1) 
        })
        test('renders  properly with mock data mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementWithData, index: 24 });
            expect(component.find('.divImageFullscreenMathImage .figureImageFullscreenMathImage .imageFullscreenMathImage')).toHaveLength(1)
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
        let component = mount(<ElementFigure {...props} />);
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
        let component = mount(<ElementFigure {...props} />);
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
            accessDenied: jest.fn(),
        };
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
        const elementFigure = mount(<ElementFigure type={type} model={figureImage50TextElementDefault} index="30" {...props}/>);
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
            const elementFigure = mount(<ElementFigure type={type} model={figureImage50TextElementDefault} index="30" {...props}/>);
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
        
        describe('Alfresco Data Handling', () => {

            let sampleAltTextDiv = document.createElement('at')
            sampleAltTextDiv.setAttribute('name', 'alt_text' );
            sampleAltTextDiv.innerHTML = "alt_text"
            document.body.appendChild(sampleAltTextDiv)
           
            let sampleLongDescriptionDiv = document.createElement('ld')
            sampleLongDescriptionDiv.setAttribute('name', 'long_description' );
            sampleLongDescriptionDiv.innerHTML = "long_Description"
            document.body.appendChild(sampleLongDescriptionDiv)

            const elementFigure = mount(<ElementFigure {...props} />)
            let elementFigureInstance = elementFigure.find('ElementFigure').instance();
            const spydataFromAlfresco = jest.spyOn(elementFigureInstance, 'dataFromAlfresco')    
            const defaultPath="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";
            it('Test- if case workflow', () =>{
                let data={
                    'assetType': "image",
                    'epsUrl': "",
                    'alt-text': "",
                    'longDescription':"longDescription",
                 }
                elementFigureInstance.dataFromAlfresco(data)
                elementFigureInstance.forceUpdate();
                elementFigure.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementFigureInstance.state.imgSrc).toBe(defaultPath)
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow-  epsURL given', () =>{
                let data={
                    'assetType': "image",
                    'EpsUrl': "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                    'alt-text': "ält-text",
                    'longDescription':"",
                    'width':'20',
                    'height':'33',
                    'uniqueID':'test',
                    'alt-text':'alt-text'
                 }
                
                elementFigureInstance.forceUpdate();
                elementFigureInstance.dataFromAlfresco(data)
                elementFigureInstance.forceUpdate();
                elementFigure.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementFigureInstance.state.imgSrc).toBe(data.EpsUrl)
                spydataFromAlfresco.mockClear()
            }) 
            it('Test- else case workflow', () =>{
                let data={
                    'assetType': "figure",
                    'epsUrl': "",
                    'alt-text': "ält-text",
                    'longDescription':"longDescription",
                 }
 
                elementFigureInstance.dataFromAlfresco(data)
                elementFigureInstance.forceUpdate();
                elementFigure.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementFigureInstance.state.imgSrc).toBe(defaultPath)
                spydataFromAlfresco.mockClear()
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
        const elementFigure = mount(<ElementFigure type={type} index="30" {...props}/>);
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