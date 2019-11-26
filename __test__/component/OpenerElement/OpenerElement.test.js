import React from 'react';
import { mount } from 'enzyme';
import OpenerElement from '../../../src/component/OpenerElement';
import { openerElementData } from '../../../fixtures/OpenerElementData'
import config from '../../../src/config/config';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    appStore: {
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    },

});

describe('Testing Opener component with props', () => {
    const props = {
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        element : openerElementData,
        onClick : ()=>{},
        permissions: [],
        updateElement: ()=>{},
        accessDenied: jest.fn(),
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    }
    it('Simulating click event to open label dropdown', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        const OpenerInstance = openerComponent.find('OpenerElement').instance()
        openerComponent.find('div.element-dropdown-title.label-content').simulate('click');
        expect(OpenerInstance.state.showLabelDropdown).toBe(true)
        openerComponent.find('ul.element-dropdown-content>li:first-child').simulate('click');
        expect(OpenerInstance.state.showLabelDropdown).toBe(false)
    })
    it('Changing input number', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        let openerElementInstance = openerComponent.find('OpenerElement').instance()
        let event={ target: { value: '1234567890!!!' } }
        openerComponent.find('input.element-dropdown-title.opener-number').simulate('change',event);
        expect(openerElementInstance.handleOpenerNumberChange(event))
        expect(openerElementInstance.state.number).toBe('1234567890!!!')
    })
    describe('Simulating keyPress event on input number', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )        
        it('Simulating keyPress event on input number - alphanumeric input', () => {
            const event = {
                which:48,
                stopPropagation() { },
                preventDefault() { }
            }
            openerComponent.find('input.element-dropdown-title.opener-number').simulate('keypress', { which: 48 });
            let openerElementInstance = openerComponent.find('OpenerElement').instance()
            expect(openerElementInstance.numberValidatorHandler(event)).toBe(true)
        })
        it('Simulating keyPress event on input number - special character input', () => {
            const event = {
                which:91,
                stopPropagation() { },
                preventDefault() { }
            }
            openerComponent.find('input.element-dropdown-title.opener-number').simulate('keypress', { which: 91 });
            let openerElementInstance = openerComponent.find('OpenerElement').instance()
            expect(openerElementInstance.numberValidatorHandler(event)).toBe(false)
        })
    })
    it('Changing input title', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        let openerElementInstance = openerComponent.find('OpenerElement').instance()
        let event={ target: { value: '1234567890!!!' } }
        openerComponent.find('input.element-dropdown-title.opener-title').simulate('change', event);
        expect(openerElementInstance.handleOpenerTitleChange(event))
        expect(openerElementInstance.state.title).toBe('1234567890!!!')
        
    })
    describe('Test-HandleC2MediaClick function',()=>{
        const props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            element : openerElementData,
            onClick : ()=>{},
            permissions: [],
            updateElement: ()=>{},
            accessDenied: jest.fn(),
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ]
        }
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        let openerElementInstance =   openerComponent.find('OpenerElement').instance()
        it('onClick-default case', () => {
            const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick') 
            openerElementInstance.handleC2MediaClick(e);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('onClick-if case', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                element : openerElementData,
                onClick : ()=>{},
                permissions: [],
                updateElement: ()=>{},
                accessDenied: jest.fn(),
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            };
            const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
            let openerElementInstance =   openerComponent.find('OpenerElement').instance()
            const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick') 
            openerElementInstance.handleC2MediaClick({target : {tagName : 'g'}});
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({target : {tagName : 'g'}});
            spyhandleC2MediaClick.mockClear()
        }) 
    })
    it('Simulating alfresco click with alfresco location', () => {
        config.alfrescoMetaData = { nodeRef: {} }
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        let openerElementInstance = openerComponent.find('OpenerElement').instance()
        const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick')
        openerElementInstance.handleC2MediaClick({ target: { tagName: 'b' } });
        openerElementInstance.forceUpdate();
        openerComponent.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'b' } });
        spyhandleC2MediaClick.mockClear()

    })
    describe('Test- Alfresco Data Handling', () => {

        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        let openerElementInstance = openerComponent.find('OpenerElement').instance()
        const spydataFromAlfresco = jest.spyOn(openerElementInstance, 'dataFromAlfresco')
        const defaultPath = "https://d12m40tknrppbi.cloudfront.net/cite/images/ch11_chapter_header.jpg";
        it('Test- if case workflow', () => {
            let data = {
                'assetType': "image",
                'EpsUrl': "",
                'alt-text': "ält-text",
                'longDescription': "longDescription"               
            }
            openerElementInstance.dataFromAlfresco(data)
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(openerElementInstance.state.imgSrc).toBe('')

            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-  epsURL given', () => {
            let data = {
                'assetType': "image",
                'EpsUrl': "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                'alt-text': "ält-text",
                'longDescription': "longDescription",
                'workURN' : "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                'width' :  "440px"
            }
            openerElementInstance.forceUpdate();
            openerElementInstance.dataFromAlfresco(data)
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(openerElementInstance.state.imageId).toBe("urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464")
            expect(openerElementInstance.state.width).toBe("440px")
            spydataFromAlfresco.mockClear()
        })
        it('Test- else case workflow', () => {
            let data = {
                'assetType': "figure",
                'epsUrl': "",
                'alt-text': "ält-text",
                'longDescription': "longDescription",
            }
            openerElementInstance.dataFromAlfresco(data)
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })

    })
    it("Clicking on opener element with locked slate", () => {
        const props = {
            slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            },
            element : openerElementData,
            onClick : ()=>{},
            permissions: []
        }
        const e = {
            stopPropagation() { },
            preventDefault() { }
        }
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        const OpenerInstance = openerComponent.find('OpenerElement').instance()
        expect(OpenerInstance.handleOpenerClick(props.slateLockInfo,e)).toEqual(false)
    })
    it("Clicking on image with locked slate", () => {
        const props = {
            slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            },
            element : openerElementData,
            onClick : ()=>{},
            permissions: []
        }
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        const OpenerInstance = openerComponent.find('OpenerElement').instance()
        expect(OpenerInstance.handleC2MediaClick()).toEqual(false)
    })
})
