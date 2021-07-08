import React from 'react';
import { mount } from 'enzyme';
import OpenerElement from '../../../src/component/OpenerElement';
import { openerElementData } from '../../../fixtures/OpenerElementData'
import config from '../../../src/config/config';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { hasReviewerRole } from '../../../src/constants/utility';
jest.mock('../../../src/config/config.js', () => {
    return {
        alfrescoMetaData:{   alfresco:{
            nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
        repositoryFolder: "001_C5 Media POC - AWS US ",
        repositoryName: "AWS US",
        repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
        visibility: "MODERATED",
        },}
    }
});
jest.mock('../../../src/js/c2_media_module.js',()=>{
    return {
        c2MediaModule:{

                onLaunchAddAnAsset:()=>{},
                productLinkOnsaveCallBack: ()=>{},
                AddanAssetCallBack: ()=>{}
        }
    }
})
jest.mock('../../../src/js/toggleLoader', () => ({
    hideTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    showTocBlocker: jest.fn()
}))
jest.mock('../../../src/constants/utility.js', () => {
    return { sendDataToIframe: jest.fn(),
     hasReviewerRole: ()=>{
         return false
     },
     guid: jest.fn()}
 })
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
   
    describe('testing background image is already selected',()=>{
        it('Simulating click event to open dropdown when background image is already selected', () => {
            const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
            const OpenerInstance = openerComponent.find('OpenerElement').instance()
            openerComponent.find('div.update-image-label').simulate('click');
            expect(OpenerInstance.state.updateImageOptions).toBe(true)
            // openerComponent.find('ul.image-global-button>li:first-child').simulate('click');
            //   expect(OpenerInstance.state.updateImageOptions).toBe(false)
        })
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
            'x-prsn-user-id': " ",
        }
        const openerComponent = mount(<OpenerElement {...props} />)
        let openerElementInstance =   openerComponent.find('OpenerElement').instance()
        it('HandleC2MediaClick-default case', () => {
            const event = {
                target:{
                    tagName: "p"
                },
                stopPropagation() { }
            }
            const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick') 
            openerElementInstance.handleC2MediaClick(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('HandleC2MediaClick-if(1)-if(2) case', () => {
            const event = {
                target:{
                    tagName: "g"
                },
                stopPropagation() { }
            }
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
            const openerComponent = mount(<OpenerElement {...props} />)
            let openerElementInstance =   openerComponent.find('OpenerElement').instance()
            config.alfrescoMetaData = alfrescoPath;
            openerElementInstance.setState({
                projectMetadata: alfrescoPath
            })
            openerElementInstance.forceUpdate();
            openerComponent.update();
            config.alfrescoMetaData = alfrescoPath
            const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick') 
            openerElementInstance.handleC2MediaClick(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event);
            spyhandleC2MediaClick.mockClear()
        }) 
        it('HandleC2MediaClick-if(1)-else(2) case', () => {
            const event = {
                target:{
                    tagName: "g"
                },
                stopPropagation() { }
            }
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
                permissions: []
            }
            const openerComponent = mount(<OpenerElement {...props} />)
            let openerElementInstance =   openerComponent.find('OpenerElement').instance()
            config.alfrescoMetaData = alfrescoPath
            const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick') 
            openerElementInstance.handleC2MediaClick(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event);
            spyhandleC2MediaClick.mockClear()
        })
        it('HandleC2MediaClick-else(1)-if(2) case', () => {
            const event = {
                target:{
                    tagName: "g"
                },
                stopPropagation() { }
            }
            const props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                element : openerElementData,
                onClick : ()=>{},
                updateElement: ()=>{},
                accessDenied: jest.fn(),
                permissions: ["alfresco_crud_access"]
            }

            const openerComponent = mount(<OpenerElement {...props} />)
            let openerElementInstance =   openerComponent.find('OpenerElement').instance()
            openerElementInstance.setState({
                projectMetadata: {}
            })
            openerElementInstance.forceUpdate();
            openerComponent.update();
            config.alfrescoMetaData = {}
            const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick') 
            openerElementInstance.handleC2MediaClick(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event);
            spyhandleC2MediaClick.mockClear()
        })
        it('HandleC2MediaClick-else(1)-else(2) case', () => {
            const event = {
                target:{
                    tagName: "g"
                },
                stopPropagation() { }
            }
            const props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                element : openerElementData,
                onClick : ()=>{},
                updateElement: ()=>{},
                accessDenied: jest.fn(),
                permissions: []
            }

            const openerComponent = mount(<OpenerElement {...props} />)
            let openerElementInstance =   openerComponent.find('OpenerElement').instance()
            openerElementInstance.setState({
                projectMetadata: {}
            })
            openerElementInstance.forceUpdate();
            openerComponent.update();
            config.alfrescoMetaData = {}
            const spyhandleC2MediaClick = jest.spyOn(openerElementInstance, 'handleC2MediaClick') 
            openerElementInstance.handleC2MediaClick(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event);
            spyhandleC2MediaClick.mockClear()
        })  
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
        const event = {
            stopPropagation() { },
            preventDefault() { }
        }
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        const OpenerInstance = openerComponent.find('OpenerElement').instance()
        expect(OpenerInstance.handleOpenerClick(props.slateLockInfo,event)).toEqual(false)
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
    it("Test-HandleBlur", () => {
        const props = {
            slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            },
            element : openerElementData,
            onClick : ()=>{},
            permissions: []
        }
        const event = {
            stopPropagation() { },
            preventDefault() { }
        }
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        const OpenerInstance = openerComponent.find('OpenerElement').instance()
        const spyhandleBlur = jest.spyOn(OpenerInstance, 'handleBlur')
        OpenerInstance.handleBlur(event)
        expect(OpenerInstance.handleOpenerClick(props.slateLockInfo,event)).toEqual(false)
        spyhandleBlur.mockClear()
    })
    it("Test-handleToolbarOpener ", () => {
        const props = {
            slateLockInfo: {
                isLocked: true,
                userId: 'c5Test01'
            },
            element : openerElementData,
            onClick : ()=>{},
            permissions: []
        }
        const event = {
            stopPropagation() { },
            preventDefault() { }
        }
        document.getElementById["tinymceToolbar"] = true
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        const OpenerInstance = openerComponent.find('OpenerElement').instance()
        const spyhandleBlur = jest.spyOn(OpenerInstance, 'handleToolbarOpener')
        OpenerInstance.handleToolbarOpener(event)
    })
    describe('testing componentWillUnmount',()=>{
      it('Test-componentWillUnmount Function', () => {
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
        const OpenerInstance = openerComponent.find('OpenerElement').instance()
        const spycomponentWillUnmount  = jest.spyOn(OpenerInstance, 'componentWillUnmount')
        OpenerInstance.componentWillUnmount();
        expect(spycomponentWillUnmount).toHaveBeenCalled()
        spycomponentWillUnmount.mockClear()
      })
    })
    describe('testing componentDidMount',()=>{
        it('Test-componentDidMount Function', () => {
          const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
          const OpenerInstance = openerComponent.find('OpenerElement').instance()
          const componentDidMount  = jest.spyOn(OpenerInstance, 'componentDidMount')
          OpenerInstance.componentDidMount();
          expect(componentDidMount).toHaveBeenCalled()
        })
      })
    describe('testing handleClickOutside',()=>{
        it('Test-handleClickOutside Function', () => {
          const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>)
          const OpenerInstance = openerComponent.find('OpenerElement').instance()
          const handleClickOutside  = jest.spyOn(OpenerInstance, 'handleClickOutside')
          OpenerInstance.handleClickOutside();
          expect(handleClickOutside).toHaveBeenCalled()
        })
    })
    describe('Test-handleC2GlobalCO function',()=>{
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
        let globalAlfrescoPath = {
            nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
            "repoInstance": "https://staging.api.pearson.com/content/cmis/uswip-aws",
            "repoName": "AWS US"
        }
        const openerComponent = mount(<OpenerElement {...props} />)
        let openerElementInstance =   openerComponent.find('OpenerElement').instance()
        it('handleC2GlobalCO-default case', () => {
            const event = {
                target:{
                    tagName: "p"
                },
                stopPropagation() { }
            }
            const spyhandleC2GlobalCO = jest.spyOn(openerElementInstance, 'handleC2GlobalCO') 
            openerElementInstance.handleC2GlobalCO(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2GlobalCO).toHaveBeenCalledWith(event)
            spyhandleC2GlobalCO.mockClear()
        }) 

        it('handleC2GlobalCO-if case', () => {
            const event = {
                target:{
                    tagName: "g"
                },
                stopPropagation() { }
            }
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
            const openerComponent = mount(<OpenerElement {...props} />)
            let openerElementInstance =   openerComponent.find('OpenerElement').instance()
            openerElementInstance.forceUpdate();
            openerComponent.update();
            const spyhandleC2GlobalCO = jest.spyOn(openerElementInstance, 'handleC2GlobalCO') 
            openerElementInstance.handleC2GlobalCO(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2GlobalCO).toHaveBeenCalledWith(event);
            spyhandleC2GlobalCO.mockClear()
        }) 

        it('handleC2GlobalCO-if(1)-if(2) case', () => {
            const event = {
                target:{
                    tagName: "g"
                },
                stopPropagation() { }
            }
            const props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                element : openerElementData,
                onClick : ()=>{},
                updateElement: ()=>{},
                accessDenied: jest.fn(),
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            }
            const openerComponent = mount(<OpenerElement {...props} />)
            let openerElementInstance =   openerComponent.find('OpenerElement').instance()
            config.GLOBAL_CO = globalAlfrescoPath
            const spyhandleC2GlobalCO = jest.spyOn(openerElementInstance, 'handleC2GlobalCO') 
            openerElementInstance.handleC2GlobalCO(event);
            openerElementInstance.forceUpdate();
            openerComponent.update();
            expect(spyhandleC2GlobalCO).toHaveBeenCalledWith(event);
            spyhandleC2GlobalCO.mockClear()
        })
    })

})
