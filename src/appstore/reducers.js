/**
 * Module - Slate Level Reducer
 * Description - all slate related action payloads land here
 * Developer - Abhay Singh
 * Last modified - 21-08-2019
 */

// IMPORT - Action constants //
import {
    FETCH_SLATE_DATA
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of app store
 * update it accordingly
 */
const initialState = {
    slateLevelData: {
        "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
            "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
            "type": "manifest",
            "contents": {
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
                "title": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "test1"
                },
                "frontmatter": [],
                "bodymatter": [
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
                    }
                ]
            }
        }
    }
};

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SLATE_DATA:
            return {
                ...state,
                slateLevelData: action.payload
            };
        default:
            return state;
    }
}