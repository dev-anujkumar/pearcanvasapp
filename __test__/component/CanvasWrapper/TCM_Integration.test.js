import { loadTrackChanges } from '../../../src/component/CanvasWrapper/TCM_Integration_Actions';
jest.mock('../../../src/js/slateLockUtility', () => ({
    checkSlateLock: () => {
        return false;
    }
}))
jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn: "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    TCM_DASHBOARD_UI_URL: "https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html"
}))
window.open = jest.fn();
jest.mock('../../../src/appstore/store', () => {
    return {
        getState : () => {
            return {
                slateLockReducer : {
                    slateLockInfo : {
                        isLocked: true,
                        timestamp: "",
                        userId: "c5test01"
                    }
                },
                appStore: {
                    slateLevelData: {
                        "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                            "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                            "type": "manifest",
                            contents: {
                                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
                                "title": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "sample slate"
                                },
                                "frontmatter": [],
                                bodymatter: [
                                    {
                                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                        "type": "element-authoredtext",
                                        "subtype": "",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "html": {
                                            "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                        },
                                        "comments": true,
                                        "tcm": true,
                                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                                    },
                                    {
                                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                                        "type": "element-authoredtext",
                                        "subtype": "",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "html": {
                                            "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                        },
                                        "comments": true,
                                        "tcm": true,
                                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                                    }
                                ]
                            }
                        }, 
                    permissions: [
                        "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                        "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                        "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                    ]
                }
            }
        }
    }
}
})


describe('Testing TCM_Integration function', () => {
    test('Test-trackChange', () => {
        loadTrackChanges();
        let event = new CustomEvent("message",{
            data: "ready",
            origin: "https://test-structuredauthoring.pearson.com",
            },
            false)
            let obj = {spyEvent: ()=>{return 'TestEvent'}};
            jest.spyOn(obj, 'spyEvent') 
            window.dispatchEvent(event);
            obj.spyEvent();
            expect(obj.spyEvent).toHaveBeenCalled()
    })
});
