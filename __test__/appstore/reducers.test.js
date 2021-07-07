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
    ACCESS_DENIED_POPUP,
    STORE_OLD_ASSET_FOR_TCM,
    LEARNOSITY_PROJECT_INFO,
    PAGE_NUMBER_LOADER,
    CREATE_SHOW_HIDE_ELEMENT,
    OPEN_POPUP_SLATE,
    CLOSE_POPUP_SLATE,
    SET_PARENT_ASIDE_DATA,
    SET_PARENT_SHOW_DATA,
    GET_ALL_SLATES_DATA,
    SET_CURRENT_SLATE_DATA,
    GET_USAGE_TYPE,
    SET_SLATE_LENGTH,
    SET_TOAST_MESSAGE,
    SHOW_TOAST_MESSAGE,
    WIRIS_ALT_TEXT_POPUP,
    UPDATE_THREE_COLUMN_INFO,
    WRONG_IMAGE_POPUP,
    SHOW_REMOVE_GLOSSARY_IMAGE,
    ADD_FIGURE_GLOSSARY_POPUP,
    SET_FIGURE_GLOSSARY

} from '../../src/constants/Action_Constants';
import mockData from '../../src/appstore/mockdata';
import { createstoreWithFigure, newslateData, figureDataTCM, learnosityData, popupSlateData } from '../../fixtures/slateTestingData';
import { slateLevelData } from '../../fixtures/containerActionsTestingData';
import { threeMultiColumnContainer } from '../../fixtures/multiColumnContainer';

const threeColumnData = [
    {
        containerId: "urn:pearson:manifest:0beacb79-ee4c-4c26-abcc-dd973c6893c9",
        columnIndex: "C3",
        columnId: "urn:pearson:manifest:73c11fa8-acec-4b8e-b435-0ec6cb3e5912"
    }
]

const initialState = {
    slateLevelData: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: [],
    permissions: [],
    allElemPageData: [],
    threeColumnData: threeColumnData,
    openWrongImagePopup:false,
    removeGlossaryImage:false,
    addfigureGlossarypopup:false,
    figureGlossaryData:{}
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

const currentSlateAncestorData = {
    ancestor: {
        ancestor: {
            containerUrn: "urn:pearson:distributable:0a823f79-68fd-4c10-ac4a-4018b6c6a96c",
            entityUrn: "urn:pearson:entity:73b79fc3-ab89-464e-ade4-2a306a054a8a",
            label: "project",
            title: "Children API Test Purpose"
        },
        containerUrn: "urn:pearson:manifest:90141a17-7c11-495e-a5b2-520c8c6e21dd",
        entityUrn: "urn:pearson:entity:708a552c-4030-4378-932b-b7a58f564999",
        label: "module",
        title: "M12"
    },
    containerUrn: "urn:pearson:manifest:975a3f20-bba1-4c7f-919a-9731ef4a426b",
    entityUrn: "urn:pearson:entity:30a8db2c-1b91-43e7-aabb-58133456f396",
    label: "section",
    matterType: "FrontMatter",
    title: "3c create api testing"
}

const usageTypeListData = {
    apiStatus: 200,
    entityType: "assessment",
    usageTypeList: ["Concept Check", "Diagnostic", "Homework", "Journal", "Non-Scored", "Poll", "Practice", "Quiz", "Remediation", "Shared Writing", "Study Tools", "Test"]
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
const INITIAL_ACTION = {
    type: '',
    payload: {}
}

describe('testing SLATE LEVEL REDUCER cases -->', () => {

    xit('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
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
                slateLevelData: createstoreWithFigure.slateLevelData
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
            allElemPageData: []

        };
        expect(reducer(initialState, {
            type: GET_PAGE_NUMBER,
            payload: {
                pageNumberData: [],
                allElemPageData: []
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
            roleId: 10
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
    it('case 22- STORE_OLD_ASSET_FOR_TCM', () => {
        let output = {
            ...initialState,
            oldFiguredata: figureDataTCM
        };
        expect(reducer(initialState, {
            type: STORE_OLD_ASSET_FOR_TCM,
            payload: {
                oldFiguredata: figureDataTCM
            }
        })).toEqual(output)
    });
    it('case 23- LEARNOSITY_PROJECT_INFO', () => {
        let output = {
            ...initialState,
            isLearnosityProjectInfo: learnosityData
        };
        expect(reducer(initialState, {
            type: LEARNOSITY_PROJECT_INFO,
            payload: learnosityData
        })).toEqual(output)
    });
    it('case 24- PAGE_NUMBER_LOADER', () => {
        let output = {
            ...initialState,
            pageNumberLoading: newslateData
        };
        expect(reducer(initialState, {
            type: PAGE_NUMBER_LOADER,
            payload: {
                pageNumberLoading: newslateData
            }
        })).toEqual(output)
    });
    it('case 25- CREATE_SHOW_HIDE_ELEMENT', () => {
        let output = {
            ...initialState,
            slateLevelData: newslateData,
            showHideId: 'urn:pearson:manifest:abed0bd0-371a-4d03-872c-c40670dd73ce'
        };
        expect(reducer(initialState, {
            type: CREATE_SHOW_HIDE_ELEMENT,
            payload: {
                slateLevelData: newslateData,
                showHideId: 'urn:pearson:manifest:abed0bd0-371a-4d03-872c-c40670dd73ce'
            }
        })).toEqual(output)
    });
    it('case 26- OPEN_POPUP_SLATE', () => {
        let output = {
            ...initialState,
            slateLevelData: {
                ...initialState.slateLevelData,
                [Object.keys(popupSlateData)[0]]: popupSlateData[Object.keys(popupSlateData)[0]]
            }
        };
        expect(reducer(initialState, {
            type: OPEN_POPUP_SLATE,
            payload: {
                [Object.keys(popupSlateData)[0]]: popupSlateData[Object.keys(popupSlateData)[0]]
            }
        })).toEqual(output)
    });
    it('case 27- CLOSE_POPUP_SLATE', () => {
        let output = {
            ...initialState,
            slateLevelData: {
                ...initialState.slateLevelData,
            }
        };
        expect(reducer(initialState, {
            type: CLOSE_POPUP_SLATE,
            payload: {}
        })).toEqual(output)
    });
    it('case 28- SET_PARENT_ASIDE_DATA', () => {
        let output = {
            ...initialState,
            parentUrn: {},
            asideData: {}
        };
        expect(reducer(initialState, {
            type: SET_PARENT_ASIDE_DATA,
            payload: {
                parentUrn: {},
                asideData: {}
            }
        })).toEqual(output)
    });
    it('case 29- SET_PARENT_SHOW_DATA', () => {
        let output = {
            ...initialState,
            showHideObj: {}
        };
        expect(reducer(initialState, {
            type: SET_PARENT_SHOW_DATA,
            payload: {
                showHideObj: {}
            }
        })).toEqual(output)
    });
    it('case 30- GET_ALL_SLATES_DATA', () => {
        let output = {
            ...initialState,
            allSlateData: {}
        };
        expect(reducer(initialState, {
            type: GET_ALL_SLATES_DATA,
            payload: {
                allSlateData: {}
            }
        })).toEqual(output)
    });
    it('case 31- SET_CURRENT_SLATE_DATA', () => {
        let output = {
            ...initialState,
            currentSlateAncestorData: currentSlateAncestorData
        };
        expect(reducer(initialState, {
            type: SET_CURRENT_SLATE_DATA,
            payload: {
                currentSlateAncestorData: currentSlateAncestorData
            }
        })).toEqual(output)
    });
    it('case 32- GET_USAGE_TYPE', () => {
        let output = {
            ...initialState,
            usageTypeListData: usageTypeListData
        };
        expect(reducer(initialState, {
            type: GET_USAGE_TYPE,
            payload: usageTypeListData
        })).toEqual(output)
    });
    it('case 33- SET_SLATE_LENGTH', () => {
        let output = {
            ...initialState,
            slateLength: "25"
        };
        expect(reducer(initialState, {
            type: SET_SLATE_LENGTH,
            payload: "25"
        })).toEqual(output)
    });
    it('case 34- SET_TOAST_MESSAGE', () => {
        let output = {
            ...initialState,
            toastMessage: "TESTING MESSAGE"
        };
        expect(reducer(initialState, {
            type: SET_TOAST_MESSAGE,
            payload: "TESTING MESSAGE"
        })).toEqual(output)
    });
    it('case 35- SHOW_TOAST_MESSAGE', () => {
        let output = {
            ...initialState,
            showToast: true
        };
        expect(reducer(initialState, {
            type: SHOW_TOAST_MESSAGE,
            payload: true
        })).toEqual(output)
    });
    it('case 36- WIRIS_ALT_TEXT_POPUP', () => {
        let output = {
            ...initialState,
            wirisAltText: {}
        };
        expect(reducer(initialState, {
            type: WIRIS_ALT_TEXT_POPUP,
            payload: {}
        })).toEqual(output)
    });
    it('case 37- UPDATE_THREE_COLUMN_INFO IF CONDITION', () => {
        let output = {
            ...initialState,
            threeColumnData: threeColumnData
        };
        expect(reducer(initialState, {
            type: UPDATE_THREE_COLUMN_INFO,
            key: 'urn:pearson:manifest:0beacb79-ee4c-4c26-abcc-dd973c6893c9',
            payload: {
                containerId: "urn:pearson:manifest:0beacb79-ee4c-4c26-abcc-dd973c6893c9",
                columnIndex: "C3",
                columnId: "urn:pearson:manifest:73c11fa8-acec-4b8e-b435-0ec6cb3e5912"
            }
        })).toEqual(output)
    });
    it('case 38- UPDATE_THREE_COLUMN_INFO ELSE CONDITION', () => {
        let output = {
            ...initialState,
            threeColumnData: []
        };
        expect(reducer(initialState, {
            type: UPDATE_THREE_COLUMN_INFO,
        })).toEqual(output)
    });
    it('case 39- WRONG_IMAGE_POPUP ', () => {
        let output ={
            ...initialState,
            openWrongImagePopup:true
        }
        expect(reducer(initialState, {
            type: WRONG_IMAGE_POPUP,
            payload:true
        })).toEqual(output);
    })
    it('case 40- SHOW_REMOVE_GLOSSARY_IMAGE ', () => {
        let output ={
            ...initialState,
            removeGlossaryImage:true
        }
        expect(reducer(initialState, {
            type: SHOW_REMOVE_GLOSSARY_IMAGE,
            payload:true
        })).toEqual(output);
    })
    it('case 41- ADD_FIGURE_GLOSSARY_POPUP ', () => {
        let output ={
            ...initialState,
            addfigureGlossarypopup:true
        }
        expect(reducer(initialState, {
            type: ADD_FIGURE_GLOSSARY_POPUP,
            payload:true
        })).toEqual(output);
    })
    it('case 42- SET_FIGURE_GLOSSARY ', () => {
        let output ={
            ...initialState,
            figureGlossaryData:{
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "urn:pearson: alfresco: e2b1710e - a000 - 4625 - b582 - 367261a2cd0e",
                "path": "https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
                "height": "450",
                "width": "350",
                "alttext": "Alt Text for Snow white change alt text update kdvb",
                "longdescription": "Snow White Description change long desc test",
                "type": "image"
            }
        }
        expect(reducer(initialState, {
            type: SET_FIGURE_GLOSSARY,
            payload:{
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "urn:pearson: alfresco: e2b1710e - a000 - 4625 - b582 - 367261a2cd0e",
                "path": "https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
                "height": "450",
                "width": "350",
                "alttext": "Alt Text for Snow white change alt text update kdvb",
                "longdescription": "Snow White Description change long desc test",
                "type": "image"
                }
        })).toEqual(output);
    })
    it('case 43- INITIAL_ACTION DEFAULT CASE', () => {
        let output = {
            ...initialState,
        };
        expect(reducer(initialState, {
            type: INITIAL_ACTION,
        })).toEqual(output)
    });
});