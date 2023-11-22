import React from 'react';
import { mount, shallow } from 'enzyme';
import SlateTagDropdown from '../../../src/component/ElementMetaDataAnchor/SlateTagDropdown';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);
import config from '../../../src/config/config';
import { JSDOM } from 'jsdom'
jest.mock('../../../src/config/config.js', () => ({
    slateType : "section"
}))

const store = mockStore({
    metadataReducer: {
        slateTagEnable: false,
        currentSlateLF:"cypressLF",
        isLOExist:true,
        currentSlateLOData:[{}]
    },
    slateLockReducer:{
        slateLockInfo:{isLocked: false,
            timestamp: "",
            userId: "c5test01"},   
    },
    appStore: {
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "lo_edit_metadata"
        ]
    },
    projectSubscriptionDetails:{
        projectSharingRole:"SUBSCRIBER",
        projectSubscriptionDetails:{
            isSubscribed : true
        }
    },
});
let props = {
    slateLockInfo: {
        isLocked: false,
        timestamp: "",
        userId: "c5test01"
    },
    projectSubscriptionDetails:{
        projectSharingRole:"SUBSCRIBER",
        projectSubscriptionDetails:{
            isSubscribed : true
        }
    },
    permissions: ["lo_edit_metadata"],
    closeLODropdown: function () { },
    showSlateLockPopup: jest.fn(),
    currentSlateLF: "CYPRESS_LF",
    isLOExist:true,
    currentSlateLOData:[{}]
}

describe("lifeCycle handling",()=>{
    let wrapper = mount(<Provider store={store}><SlateTagDropdown {...props} /> </Provider>)
    let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
    it('Test case for ComponentDidMount',()=>{
        let height='84px';
        let height2=slateTagInstance.node1.style.height='84px'
        const spyFunction = jest.spyOn(slateTagInstance, 'componentDidMount')
        slateTagInstance.componentDidMount();
        expect(spyFunction).toHaveBeenCalled();
        expect(height2).toBe(height);
        spyFunction.mockClear()

    })
})
//Rendering component
describe('Test Rendering of metadaanchor on slate', () => {
    let wrapper = mount(<Provider store={store}><SlateTagDropdown {...props} /> </Provider>)
    let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
    it('render component', () => {
        expect(wrapper.find('SlateTagDropdown')).toHaveLength(1);
    })
    config.slateType = 'section'
    it('handleclick', () => {
        wrapper.find('div.learningobjectivedropdown ul li').at(0).simulate('click')
        let event = { target: { innerText: "Align to External Framework" } };
        const spyFunction = jest.spyOn(slateTagInstance, 'launchExternalFrameworkPopup');
        slateTagInstance.launchExternalFrameworkPopup(event);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
});
/** External LO Test Cases */
describe('External LO - Test Rendering of metadaanchor on slate', () => {
    const newStore = mockStore({
        metadataReducer: {
            slateTagEnable: false,
            currentSlateLF: 'externalLF',
            projectLearningFrameworks: {
                externalLF: [{ urn: "urn:ext" }]
            },
            currentSlateLOData: [{ id: 'id:here', label: { en: "labeldata" } }]
        },
        slateLockReducer: {
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: "c5test01"
            },
        },
        appStore: {
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "lo_edit_metadata"
            ]
        }
    });
    let extLOprops = {
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: "c5test01"
        },
        projectLearningFrameworks: {
            externalLF: [{},{}]
        },
        permissions: ['lo_edit_metadata'],
        currentSlateLF:'',
        closeLODropdown: jest.fn(),
        showSlateLockPopup: jest.fn(),
        toggleLOWarningPopup: jest.fn()
    }


    let wrapper = mount(<Provider store={newStore}><SlateTagDropdown {...extLOprops} /> </Provider>)
    let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
    it('render component', () => {
        expect(wrapper.find('SlateTagDropdown')).toHaveLength(1);
    })
    it('handleclick', () => {
        wrapper.find('div.learningobjectivedropdown ul li').at(0).simulate('click')
        let event = { target: { innerText: "Align to External Framework" } };
        const spyFunction = jest.spyOn(slateTagInstance, 'launchExternalFrameworkPopup');
        slateTagInstance.launchExternalFrameworkPopup(event);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('handleclick-warning Popup', () => {
        config.slateType='section'
        wrapper.update()
        slateTagInstance.forceUpdate();
        wrapper.find('div.learningobjectivedropdown2 li').at(0).simulate('click')
        expect(wrapper.find('div.learningobjectivedropdown2 ul')).toHaveLength(1);
    })
    it('openAssessmentExternalPopup',()=>{
        let popUpType="add"
        const spyFunction = jest.spyOn(slateTagInstance, 'openAssessmentExternalPopup');
        slateTagInstance.openAssessmentExternalPopup(popUpType);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('For cite,puf,learnosity and learning type assessments', () => {
        let popUpType="add";
        const spyFunction = jest.spyOn(slateTagInstance, 'openAssessmentExternalPopup');
        config.slateType="assessment"
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        document.getElementsByClassName = () => {
            return [{
                innerText:'urn:pearson:work:74a080f4-cb5a-4bb6-b983-3d0f70cad3d8'
            }]
        }
        document.getElementsByClassName = () => {
            return [{
                innerText:'cite'
            }]
        }
        slateTagInstance.openAssessmentExternalPopup(popUpType);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('For tdx assessment', () => {
        let popUpType="add";
        const spyFunction = jest.spyOn(slateTagInstance, 'openAssessmentExternalPopup');
        config.slateType="assessment"
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        document.getElementsByClassName = () => {
            return [{
                innerText:'urn:pearson:work:74a080f4-cb5a-4bb6-b983-3d0f70cad3d8'
            }]
        }
        document.getElementsByClassName = () => {
            return [{
                innerText:'tdx'
            }]
        }
        slateTagInstance.openAssessmentExternalPopup(popUpType);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('other Popup Type', () => {
        let popUpType="view";
        const spyFunction = jest.spyOn(slateTagInstance, 'openAssessmentExternalPopup');
        config.slateType="assessment"
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        document.getElementsByClassName = () => {
            return [{
                innerText:'urn:pearson:work:74a080f4-cb5a-4bb6-b983-3d0f70cad3d8'
            }]
        }
        document.getElementsByClassName = () => {
            return [{
                innerText:'cite'
            }]
        }
        slateTagInstance.openAssessmentExternalPopup(popUpType);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    describe('ExternalLO true',()=>{
        it('toggleLoOptionsDropdownAS', () => {
            config.slateType="assessment";
            let extLOprops = {
                projectLearningFrameworks: {
                    externalLF: [{},{}]
                },
                permissions: ['lo_edit_metadata'],
            }
            let wrapper=mount(<Provider store={newStore}><SlateTagDropdown {...extLOprops} /> </Provider>)
            let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
            let checkExtFrmWrkAs =slateTagInstance.checkExternalFrameworkAS();
             wrapper.find('div.learningobjectivedropdown ul li').at(0).simulate('click')
            let event = { target: { innerText: "Align to External Framework" } };
             const spyFunction = jest.spyOn(slateTagInstance, 'toggleLoOptionsDropdownAS');
             slateTagInstance.toggleLoOptionsDropdownAS(event);
             expect(checkExtFrmWrkAs).toBe(true);
             expect(spyFunction).toHaveBeenCalled();
             spyFunction.mockClear();
        });
        it('toggleLoOptionsDropdown', () => {
            config.slateType="assessment";
            let extLOprops = {
                projectLearningFrameworks: {
                    externalLF: [{},{}]
                },
                permissions: ['lo_edit_metadata'],
            }
            let wrapper=mount(<Provider store={newStore}><SlateTagDropdown {...extLOprops} /> </Provider>)
            let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
            let checkExtFrmWrkAs =slateTagInstance.checkExternalFrameworkAS();
             wrapper.find('div.learningobjectivedropdown ul li').at(0).simulate('click')
            let event = { target: { innerText: "Align to External Framework" } };
             const spyFunction = jest.spyOn(slateTagInstance, 'toggleLoOptionsDropdownAS');
             slateTagInstance.toggleLoOptionsDropdownAS(event);
             expect(checkExtFrmWrkAs).toBe(true);
             expect(spyFunction).toHaveBeenCalled();
             spyFunction.mockClear();
        })
    })
});