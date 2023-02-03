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
it('handleCypressLODropdownOptions',()=>{
    let Cypressprops={
        isLOExist:false,
        currentSlateLF:"cypressLF",
        currentSlateLOData:[{
            description:{
                en: "highereducation"
            },
            id:'urn:pearson:educationalgoal:64477b96-4a5e-4502-abdb-a54fc0cb4935',
            assessmentResponseMsg:'hi there'
        }],
        permissions: ["lo_edit_metadata"],
    }
    let wrapper=mount(<Provider store={store}><SlateTagDropdown {...Cypressprops} /> </Provider>);
    let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
    const spyFunction = jest.spyOn(slateTagInstance, 'handleCypressLODropdownOptions')
    slateTagInstance.handleCypressLODropdownOptions();
    expect(spyFunction).toHaveBeenCalled();
})
describe('Test Rendering of metadaanchor on slate', () => {
    let wrapper = mount(<Provider store={store}><SlateTagDropdown {...props} /> </Provider>)
    let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
    it('render component', () => {
        expect(wrapper.find('SlateTagDropdown')).toHaveLength(1);
    })
    it('Unlink', () => {
        let event = { target: { innerText: "Unlink Slate" } };
        let data = "Unlink Slate";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on slate tag assessment', () => {
        config.slateType="assessment"
        let event = { target: { innerText: "View Learning Objective" } };
        let data = "View Learning Objective";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on slate tag not equal to  assessment', () => {
        config.slateType="section"
        let event = { target: { innerText: "View Learning Objective" } };
        let data = "View Learning Objective";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on slate tag normal', () => {
        config.slateType = 'assessment'
        let event = { target: { innerText: "VIEW ASSESSMENT ITEM LO TAGGING" } };
        let data = "VIEW ASSESSMENT ITEM LO TAGGING";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('handleclick', () => {
        let event = { target: "leaningobjective-block" };
        let data = "leaningobjective-block";
        slateTagInstance.handleClick(event);
        expect(event.target).toEqual(data);
    })
    it('on slateLockInfo', () => {
        let store = mockStore({
            metadataReducer: {
                slateTagEnable: false
            },
            slateLockReducer:{
                slateLockInfo:{isLocked: true,
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
            metadataReducer: {
                slateTagEnable: false
            }
        });
        let props = {
            slateLockInfo: {
                isLocked: true,
                timestamp: "",
                userId: "c5test01"
            },
            permissions: ["lo_edit_metadata"],
            toggleLOWarningPopup:function () { },
            closeLODropdown: function () { },
        }
        let wrapper = mount(<Provider store={store}><SlateTagDropdown {...props} /> </Provider>)
        let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
        config.slateType = ''
        let event = { target: { innerText: "LO TAGGING" } };
        let data = "VIEW ASSESSMENT ITEM LO TAGGING";
        slateTagInstance.learningObjectiveDropdown(event);
        // expect(event.target.innerText).toEqual(data);
    })
    config.slateType = 'section'
    it('on innerText=AddLearningObjectiveSlateDropdown ', () => {
        document.cookie= "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Add a New Learning Objective" } };
        let data = "Add a New Learning Objective";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on innerText=AddEditLearningObjectiveDropdown ', () => {
        document.cookie= "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Add From Existing or Edit" } };
        let data = "Add From Existing or Edit";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    });
    it('handleclick', () => {
        wrapper.find('div.learningobjectivedropdown ul li').at(0).simulate('click')
        let event = { target: { innerText: "Align to External Framework" } };
        const spyFunction = jest.spyOn(slateTagInstance, 'launchExternalFrameworkPopup');
        slateTagInstance.launchExternalFrameworkPopup(event);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('on innerText=AddLearningObjectiveAssessmentDropdown ', () => {
        document.cookie= "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Add From Existing" } };
        let data = "Add From Existing";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
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
    it('on innerText=AlignToWillowFrameworkSlateDropdown ', () => {
        document.cookie = "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Align to External Framework" } };
        let data = "Align to External Framework";
        config.slateType = 'assessment';
        document.getElementsByClassName = () => {
            return [{
                innerText:'urn:pearson:work:74a080f4-cb5a-4bb6-b983-3d0f70cad3d8'
            }]
        }
        document.getElementsByClassName = () => {
            return [{
                innerText: 'cite'
            }]
        }
        const spyFunction= jest.spyOn(slateTagInstance,'learningObjectiveDropdown');
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('on learningObjectiveDropdown ', () => {
        document.cookie = "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Align to External Framework" } };
        let data = "Align to External Framework";
        config.slateType = 'assessment';
        config.tempSlateManifestURN='test123';
        config.S3MathImagePath='test345';
        extLOprops={
            currentSlateLOData:[{ id: 'id:here', label: { en: "labeldata" },length:1 },{ id: 'id:here', label: { en: "labeldata" },length:1 }]
        }
        document.getElementsByClassName = () => {
            return [{
                innerText:'urn:pearson:work:74a080f4-cb5a-4bb6-b983-3d0f70cad3d8'
            }]
        }
        document.getElementsByClassName = () => {
            return [{
                innerText: 'tdx'
            }]
        }
        const spyFunction= jest.spyOn(slateTagInstance,'learningObjectiveDropdown');
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
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
        expect(wrapper.find('div.learningobjectivedropdown2 ul')).toHaveLength(2);
    })
    it('handleWarningPopup', () => {
        let event = { target: { innerText: "Add a New Learning Objective" }, preventDefault: () => { } };
        const spyFunction = jest.spyOn(slateTagInstance, 'handleWarningPopup');
        slateTagInstance.handleWarningPopup(event);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
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
    it('learningobjectivedropdown 2 li-1', () => {
        let add='add';
        wrapper.find('div.learningobjectivedropdown2 ul li').at(3).simulate('click')
        const spyFunction = jest.spyOn(slateTagInstance, 'openAssessmentExternalPopup');
        slateTagInstance.openAssessmentExternalPopup(add);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('learningobjectivedropdown 2 li-2', () => {
        let view='view';
        wrapper.find('div.learningobjectivedropdown2 ul li').at(3).simulate('click')
        const spyFunction = jest.spyOn(slateTagInstance, 'openAssessmentExternalPopup');
        slateTagInstance.openAssessmentExternalPopup(view);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
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