import reducer from '../../src/appstore/reducers';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    AUTHORING_ELEMENT_CREATED,
    AUTHORING_ELEMENT_UPDATE,
    ADD_COMMENT,
    DELETE_ELEMENT,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX,
    GET_PAGE_NUMBER,
    SET_UPDATED_SLATE_TITLE,
    GET_PROJECT_PERMISSIONS
} from '../../src/constants/Action_Constants';
import mockData from '../../src/appstore/mockdata';
import { createstoreWithFigure, newslateData } from '../../fixtures/slateTestingData';

const initialState = {
    slateLevelData: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: {},
    permissions: []
};

const splittedElementIndexValue = "5";

const newActiveElement = {
    elementId: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b',
    elementType: "element-authoredtext",
    elementWipType: "element-list",
    primaryOption: "primary-list",
    secondaryOption: "secondary-list-3",
    tag: "OL"
}

const slateTitle = "1918";

const permissionsData = ["login",
    "logout",
    "bookshelf_access",
    "generate_epub_output",
    "demand_on_print",
    "toggle_tcm",
    "content_preview",
    "add_instructor_resource_url",
    "grid_crud_access",
    "alfresco_crud_access",
    "set_favorite_project",
    "sort_projects",
    "search_projects",
    "project_edit",
    "edit_project_title_author",
    "promote_review",
    "promote_live",
    "create_new_version",
    "project_add_delete_users",
    "create_custom_user",
    "toc_add_pages",
    "toc_delete_entry",
    "toc_rearrange_entry",
    "toc_edit_title",
    "elements_add_remove",
    "split_slate",
    "full_project_slate_preview",
    "access_formatting_bar",
    "authoring_mathml",
    "slate_traversal",
    "trackchanges_edit",
    "trackchanges_approve_reject",
    "tcm_feedback",
    "notes_access_manager",
    "quad_create_edit_ia",
    "quad_linking_assessment",
    "add_multimedia_via_alfresco",
    "toggle_element_page_no",
    "toggle_element_borders",
    "global_search",
    "global_replace",
    "edit_print_page_no",
    "notes_adding",
    "notes_deleting",
    "notes_delete_others_comment",
    "note_viewer",
    "notes_assigning",
    "notes_resolving_closing",
    "notes_relpying",
    "note_search_comment",
    "note_viewer",
    "lo_edit_metadata",]

describe('testing SLATE LEVEL REDUCER cases -->', () => {

    xit('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('case 1- FETCH_SLATE_DATA', () => {
        reducer(initialState, {
            type: FETCH_SLATE_DATA,
            payload: {
                slateLevelData: mockData
            }
        })
    });
    it('case 2- SET ACTIVE ELEMENT', () => {
        reducer(initialState, {
            type: SET_ACTIVE_ELEMENT,
            payload: {
                activeElement: newActiveElement
            }
        })
    });
    it('case 3- CREATE ELEMENT', () => {
        reducer(initialState, {
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: createstoreWithFigure.slateLevelData,
            }
        })
    });
    it('case 4- ADD COMMENT', () => {
        reducer(initialState, {
            type: ADD_COMMENT,
            payload: {
                slateLevelData: newslateData
            }
        })
    });
    it('case 5- DELETE ELEMENT', () => {
        reducer(initialState, {
            type: DELETE_ELEMENT,
            payload: {
                slateLevelData: newslateData
            }
        })
    });
    it('case 6- SWAP ELEMENT', () => {
        reducer(initialState, {
            type: SWAP_ELEMENT,
            payload: {
                slateLevelData: newslateData
            }
        })
    });
    it('case 7- SET SPLIT INDEX', () => {
        reducer(initialState, {
            type: SET_SPLIT_INDEX,
            payload: {
                splittedElementIndex: splittedElementIndexValue
            }
        })
    });
    it('case 8- GET PAGE NUMBER', () => {
        reducer(initialState, {
            type: GET_PAGE_NUMBER,
            payload: {
                pageNumberData: {}
            }
        })
    });
    it('case 9- SET_UPDATED_SLATE_TITLE', () => {
        reducer(initialState, {
            type: SET_UPDATED_SLATE_TITLE,
            payload: {
                slateTitleUpdated: slateTitle
            }
        })
    });
    it('case 10- get GET PROJECT PERMISSIONS', () => {
        reducer(initialState, {
            type: GET_PROJECT_PERMISSIONS,
            payload: {
                permissions: permissionsData
            }
        })
    });
    it('case 11- AUTHORING ELEMENT UPDATE', () => {
        reducer(initialState, {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
    });


});
