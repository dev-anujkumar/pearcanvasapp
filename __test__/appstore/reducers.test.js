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
    GET_PROJECT_PERMISSIONS,
    FETCH_DATA_ON_SLATE_REFRESH,
    UPDATE_FOOTNOTEGLOSSARY,
    SET_SLATE_TYPE,
    SET_SLATE_ENTITY,
    SET_PARENT_NODE,
    SET_OLD_IMAGE_PATH,
    UPDATE_PAGENUMBER_SUCCESS,
    UPDATE_PAGENUMBER,
    UPDATE_PAGENUMBER_FAIL,
    ACCESS_DENIED_POPUP

} from '../../src/constants/Action_Constants';
import mockData from '../../src/appstore/mockdata';
import { createstoreWithFigure, newslateData } from '../../fixtures/slateTestingData';

const initialState = {
    slateLevelData: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: [],
    permissions: [],
    allElemPageData:[]
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

    it('should return the initial state', () => {
        expect(reducer(initialState, {

        })).toEqual(initialState);
    });
    it('case 1- FETCH_SLATE_DATA', () => {
        let output = {
            ...initialState,
            slateLevelData: mockData
        };
        expect(reducer(initialState, {
            type: FETCH_SLATE_DATA,
            payload: mockData
        })).toEqual(output);
    });
    it('case 2- SET ACTIVE ELEMENT', () => {
        let output = {
            ...initialState,
            activeElement: newActiveElement
        };
        expect(reducer(initialState, {
            type: SET_ACTIVE_ELEMENT,
            payload: newActiveElement
        })).toEqual(output)
    });
    it('case 3- CREATE ELEMENT', () => {
        let output = {
            ...initialState,
            slateLevelData: createstoreWithFigure.slateLevelData
        };
        expect(reducer(initialState, {
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData:createstoreWithFigure.slateLevelData
            }
        })).toEqual(output)
    });
    xit('case 4- ADD COMMENT', () => {
        let output = {
            ...initialState,
            slateLevelData: newslateData
        };
        expect(reducer(initialState, {
            type: ADD_COMMENT,
            payload: newslateData
        })).toEqual(output)
    });
    it('case 5- DELETE ELEMENT', () => {
        let output = {
            ...initialState,
            slateLevelData: newslateData
        };
        expect(reducer(initialState, {
            type: DELETE_ELEMENT,
            payload: {
                slateLevelData: newslateData
            }
        })).toEqual(output)
    });
    it('case 6- SWAP ELEMENT', () => {
        let output = {
            ...initialState,
            slateLevelData: newslateData
        };
        expect(reducer(initialState, {
            type: SWAP_ELEMENT,
            payload: {
                slateLevelData: newslateData
            }
        })).toEqual(output)
    });
    it('case 7- SET SPLIT INDEX', () => {
        let output = {
            ...initialState,
            splittedElementIndex: splittedElementIndexValue
        };
        expect(reducer(initialState, {
            type: SET_SPLIT_INDEX,
            payload: splittedElementIndexValue
        })).toEqual(output)
    });
    it('case 8- GET PAGE NUMBER', () => {
        let output = {
            ...initialState,
            pageNumberData: [],
            allElemPageData:[]
            
        };
        expect(reducer(initialState, {
            type: GET_PAGE_NUMBER,
            payload: {
                pageNumberData: [],
                allElemPageData:[]
            }
        })).toEqual(output)
    });
    it('case 9- SET_UPDATED_SLATE_TITLE', () => {
        let output = {
            ...initialState,
            slateTitleUpdated: slateTitle
        };
        expect(reducer(initialState, {
            type: SET_UPDATED_SLATE_TITLE,
            payload: {
                title: slateTitle
            }
        })).toEqual(output)
    });
    it('case 10- get GET PROJECT PERMISSIONS', () => {
        let output = {
            ...initialState,
            permissions: permissionsData,
            roleId : 10
        };
        expect(reducer(initialState, {
            type: GET_PROJECT_PERMISSIONS,
            payload: {
                permissions: permissionsData,
                roleId: 10
            }
        })).toEqual(output)
    });
    it('case 11- AUTHORING ELEMENT UPDATE', () => {
        let output = {
            ...initialState,
            slateLevelData: newslateData
        };
        expect(reducer(initialState, {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })).toEqual(output)
    });
    it('case 12- FETCHING DATA ON SLATE REFRESH', () => {
        let output = {
            ...initialState,
            slateLevelData: newslateData
        };
        expect(reducer(initialState, {
            type: FETCH_DATA_ON_SLATE_REFRESH,
            payload: {
                slateLevelData: newslateData
            }
        })).toEqual(output)
    });
    it('case 13- UPDATE GLOSSARY AND FOOTNOTE', () => {
        let output = {
            ...initialState,
            slateLevelData: newslateData
        };
        expect(reducer(initialState, {
            type: UPDATE_FOOTNOTEGLOSSARY,
            payload: {
                slateLevelData: newslateData
            }
        })).toEqual(output)
    });
    it('case 14- SET SLATE TYPE', () => {
        let output = {
            ...initialState,
            slateType: 'chapter-opener'
        };
        expect(reducer(initialState, {
            type: SET_SLATE_TYPE,
            payload: 'chapter-opener'
        })).toEqual(output)
    });
    it('case 15- SET SLATE ENTITY', () => {
        let output = {
            ...initialState,
            setSlateEntity: 'urn:test:entity:1234'
        };
        expect(reducer(initialState, {
            type: SET_SLATE_ENTITY,
            payload: 'urn:test:entity:1234'
        })).toEqual(output)
    });
    it('case 16- SET PARENT NODE', () => {
        let output = {
            ...initialState,
            setSlateParent: 'urn:test:entity:1234'
        };
        expect(reducer(initialState, {
            type: SET_PARENT_NODE,
            payload: 'urn:test:entity:1234'
        })).toEqual(output)
    });
    it('case 17- SET OLD IMAGE PATH', () => {
        let output = {
            ...initialState,
            oldImage: newslateData
        };
        expect(reducer(initialState, {
            type: SET_OLD_IMAGE_PATH,
            payload: {
                oldImage: newslateData
            }
        })).toEqual(output)
    });
    it('case 18- UPDATE PAGE NUMBER', () => {
        let output = {
            ...initialState,
            pageLoading: newslateData
        };
        expect(reducer(initialState, {
            type: UPDATE_PAGENUMBER,
            payload: {
                pageLoading: newslateData
            }
        })).toEqual(output)
    });
    it('case 19- UPDATE PAGE NUMBER SUCCESS', () => {
        let output = {
            ...initialState,
            pageLoading: newslateData
        };
        expect(reducer(initialState, {
            type: UPDATE_PAGENUMBER_SUCCESS,
            payload: {
                pageLoading: newslateData
            }
        })).toEqual(output)
    });
    it('case 20- UPDATE PAGE NUMBER FAIL', () => {
        let output = {
            ...initialState,
            pageLoading: newslateData
        };
        expect(reducer(initialState, {
            type: UPDATE_PAGENUMBER_FAIL,
            payload: {
                pageLoading: newslateData
            }
        })).toEqual(output)
    });
    it('case 21- ACCESS DENIED POPUP', () => {
        let output = {
            ...initialState,
            accesDeniedPopup: true
        };
        expect(reducer(initialState, {
            type: ACCESS_DENIED_POPUP,
            payload: true
        })).toEqual(output)
    });
});