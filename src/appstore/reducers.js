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
                            "text": "<p class=\"paragraphNumeroUno\">`\" \\\/JSX< abc >?kk<lk> lk l is one of the most commonly used syntax extensions out there. Originally JSX was parsed via a Facebook fork of Esprima — a JavaScript syntax parser developed by jQuery. As it gained momentum, Acorn took things to their hands and decided to make their own version of the parser which ended up being 1.5–2x faster than Esprima-fb, and is now being used by officially Babel. <br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                        "type": "figure",
                        "figuretype": "image",
                        "subtype": "image50Text",
                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                        "alignment": "half-text",
                        "title": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "12345",
                            "textsemantics": [],
                            "mathml": []
                        },
                        "subtitle": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "eresrwqe",
                            "textsemantics": [],
                            "mathml": [],
                            "footnotes": []
                        },
                        "captions": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "sdafsad",
                            "textsemantics": [],
                            "mathml": [],
                            "footnotes": []
                        },
                        "credits": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "asdfasdfasdf",
                            "textsemantics": [],
                            "mathml": [],
                            "footnotes": []
                        },
                        "figuredata": {
                            "path": "https://cite-media-stg.pearson.com/legacy_paths/600efdb1-a28c-4ec3-8b54-9aad364c8c2c/MAP_06-03_nash-stage-2_1440.png",
                            "height": "1225",
                            "width": "1440",
                            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
                        },
                        "html": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "title": "",
                            "subtitle": "",
                            "caption": "",
                            "credit": "",
                            "postertext": "",
                            "tableasHTML": ""
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
                    
                    },
                    {
    
                        "id": "urn:pearson:work:591e0376-8bde-42cf-bea1-70dc846fca1c",
                        "type": "figure",
                        "figuretype": "table",
                        "subtype": "imageTextWidthTableImage  ",
                        "alignment": "text-width",
                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                    
                        "title": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "12345",
                            "textsemantics": [],
                            "mathml": []
                        },
                        "subtitle": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "eresrwqe",
                            "textsemantics": [],
                            "mathml": [],
                            "footnotes": []
                        },
                        "captions": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "sdafsad",
                            "textsemantics": [],
                            "mathml": [],
                            "footnotes": []
                        },
                        "credits": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "asdfasdfasdf",
                            "textsemantics": [],
                            "mathml": [],
                            "footnotes": []
                        },
                        "figuredata": {
                            "path": "https://cite-media-stg.pearson.com/legacy_paths/600efdb1-a28c-4ec3-8b54-9aad364c8c2c/MAP_06-03_nash-stage-2_1440.png",
                            "height": "1225",
                            "width": "1440",
                            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
                        },
                        "html": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "title": "12345",
                            "subtitle": "eresrwqe",
                            "caption": "sdafsad",
                            "credit": "asdfasdfasdf",
                            "postertext": "abcdefgh",
                            "tableasHTML": ""
                        },
                        "comments" : true,
                        "tcm" : true,
                        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
                    
                    },
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