import React from 'react'
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import config from '../../../src/config/config';
import Toolbar from '../../../src/component/Toolbar';
import * as utils from '../../../src/constants/utility';

jest.mock('../../../src/constants/utility', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn(),
    isSlateLocked: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' ),
    isSubscriberRole: jest.fn().mockImplementationOnce( () => { return true })
}))

jest.mock('../../../src/js/slateLockUtility', () => ({
    checkSlateLock: jest.fn()
}))

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    toolbarReducer: {
        elemBorderToggle: true
    },
    metadataReducer: {
        currentSlateLOData: {},
        isLOExist: true,
        slateTagEnable: true
    },
    appStore: {
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        slateLevelData: {
            "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                "id": "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                "numberedandlabel": true,
                "pageCount": 1,
                "pageLimit": 25,
                "pageNo": 0,
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                "status": "approved",
                "type": "manifest",
                "versionUrn": "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8"
            },
            "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                "id": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                "numberedandlabel": true,
                "pageCount": 1,
                "pageLimit": 25,
                "pageNo": 0,
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                "status": "approved",
                "type": "manifest",
                "versionUrn": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8"
            },
            "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8": {
                "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                "id": "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8",
                "numberedandlabel": true,
                "pageCount": 1,
                "pageLimit": 25,
                "pageNo": 0,
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                "status": "approved",
                "type": "popup",
                "versionUrn": "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8"
            }
        }
    },
    audioReducer:{
        addAudio: true,
        openAudio: true
    },
    slateLockReducer: {
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }
    },
    searchReducer: {
        searchTerm: ""
    },
    projectInfo: {
        slateTocLabel: "Slate"
    }
});

const props = {
    isToolBarBlocked : true,
    slateLockInfo : "test",
    projectSubscriptionDetails: {
        projectSharingRole : "SUBSCRIBER",
        projectSubscriptionDetails : {
            isSubscribed: true
        }
    }
}

config.isPopupSlate = true
config.isCypressPlusEnabled = true

let wrapper = mount(<Provider store={store}><Toolbar {...props}/></Provider>);

beforeEach(() => {
    wrapper = mount(<Provider store={store}><Toolbar {...props}/></Provider>);
})

describe('Toolbar testing', () => {

    it('Simulate audio icon click', () => {
        wrapper.find('.audio.audioicon').at(0).simulate('click')
        wrapper.find('.audio.audioicon').at(1).simulate('click')
    })

    it('Handle slate tag icon click', () => {
        wrapper.find('.learningobjectiveicon.slate-tag-icon').simulate('click')
    })

    it('Handle slate tag icon click', () => {
        jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
        wrapper = mount(<Provider store={store}><Toolbar {...props}/></Provider>);
        wrapper.find('.learningobjectiveicon.slate-tag-icon').simulate('click')
    })

    it('Handle slate tag icon click', () => {
        wrapper.find('.learningobjectiveicon.slate-tag-icon').simulate('click')
    })
    it('collapse header', () => {
       wrapper.find('.collapse-header').simulate('click')
    })
    it('search urn', () => {
        wrapper.find('.search-urn').simulate('click')
    })
    it('has slatestatus as approved and type is manifest', () => {
        config.slateManifestURN = "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8"
        config.tempSlateManifestURN = "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8"
        config.isCypressPlusEnabled = false
        wrapper.find('.audio.audioicon').at(0).simulate('click')
    })
    it('has slatestatus as approved and type is popup slate', () => {
        config.slateManifestURN = "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8"
        wrapper.find('.audio.audioicon').at(0).simulate('click')
    })
})

describe('Toolbar testing - coverage', () => {
    const store2 = mockStore({
        toolbarReducer: {
            elemBorderToggle: true
        },
        metadataReducer: {
            currentSlateLOData: {},
            slateTagEnable: false
        },
        appStore: {
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            slateLevelData: {
                "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                    "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                    "id": "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                    "numberedandlabel": true,
                    "pageCount": 1,
                    "pageLimit": 25,
                    "pageNo": 0,
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                    "status": "approved",
                    "type": "manifest",
                    "versionUrn": "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8"
                },
                "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                    "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                    "id": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                    "numberedandlabel": true,
                    "pageCount": 1,
                    "pageLimit": 25,
                    "pageNo": 0,
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                    "status": "approved",
                    "type": "manifest",
                    "versionUrn": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8"
                },
                "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8": {
                    "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                    "id": "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8",
                    "numberedandlabel": true,
                    "pageCount": 1,
                    "pageLimit": 25,
                    "pageNo": 0,
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                    "status": "approved",
                    "type": "popup",
                    "versionUrn": "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8"
                }
            }
        },
        audioReducer:{
            addAudio: true,
            openAudio: true
        },
        slateLockReducer: {
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        },
        searchReducer: {
            searchTerm: ""
        },
        projectInfo: {
            slateTocLabel: "Slate"
        }
    });
    const props2 = {
        isToolBarBlocked : false,
        slateLockInfo : "test",
        projectSubscriptionDetails: {
            projectSharingRole : "SUBSCRIBER",
            projectSubscriptionDetails : {
                isSubscribed: true
            }
        }
    }
    let wrapper2 = mount(<Provider store={store2}><Toolbar {...props2}/></Provider>);
    it('Handle slate tag icon click', () => {
        jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
        wrapper2 = mount(<Provider store={store}><Toolbar {...props}/></Provider>);
        wrapper2.find('.learningobjectiveicon.slate-tag-icon').simulate('click')
    })
})

describe('Toolbar testing - coverage importInProgress', () => {
    const store2 = mockStore({
        toolbarReducer: {
            elemBorderToggle: true
        },
        metadataReducer: {
            currentSlateLOData: {},
            slateTagEnable: false
        },
        appStore: {
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            slateLevelData: {
                "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                    "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                    "id": "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                    "numberedandlabel": true,
                    "pageCount": 1,
                    "pageLimit": 25,
                    "pageNo": 0,
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                    "status": "approved",
                    "type": "manifest",
                    "versionUrn": "urn:pearson:work:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                    "importData": {
                        "importStatus": "in-progress",
                        "user": "cypress"
                    }
                },
                "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                    "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                    "id": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                    "numberedandlabel": true,
                    "pageCount": 1,
                    "pageLimit": 25,
                    "pageNo": 0,
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                    "status": "approved",
                    "type": "manifest",
                    "versionUrn": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                    "importData": {
                        "importStatus": "in-progress",
                        "user": "cypress"
                    }
                },
                "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8": {
                    "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                    "id": "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8",
                    "numberedandlabel": true,
                    "pageCount": 1,
                    "pageLimit": 25,
                    "pageNo": 0,
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                    "status": "approved",
                    "type": "popup",
                    "versionUrn": "urn:pearson:manifest:4fa7a513-0102-4d16-1994-aba4de226eb8",
                    "importData": {
                        "importStatus": "in-progress",
                        "user": "cypress"
                    }
                }
            }
        },
        audioReducer:{
            addAudio: true,
            openAudio: true
        },
        slateLockReducer: {
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        },
        searchReducer: {
            searchTerm: ""
        },
        projectInfo: {
            slateTocLabel: "Slate"
        }
    });
    const props2 = {
        isToolBarBlocked : false,
        slateLockInfo : "test",
        projectSubscriptionDetails: {
            projectSubscriptionDetails : {
                isSubscribed: false
            }
        }
    }
    it('Render import banner', () => {
        // jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
        const wrapper2 = mount(<Provider store={store2}><Toolbar {...props2}/></Provider>);
    })
})