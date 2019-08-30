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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">It definitely went through an evolution, but regardless of its phase, all parsers had a similar output — which is an AST. Once we have an AST representation of the JSX code, interpretation is extremely easy.<br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e2a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">Today we’re gonna understand how a JSX parser thinks by implementing one of our own. Unlike Babel, rather than compiling, we’re gonna evaluate the nodes in the AST according to their types, which means that we will be able to use JSX during runtime.<br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e3a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">A basic Visual Studio Code plugin that converts html text to JSX string. You can select your html text and use the shortcut ctrl+alt+x.There are many things to do<br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e4a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": '<p class=\"paragraphNumeroUno\"><p style="color: rgb(51, 51, 51); font-family: &quot;Segoe UI Web (West European)&quot;, &quot;Segoe UI&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; background-color: rgb(255, 255, 255);">A basic Visual Studio Code plugin that converts html text to JSX string</p><p style="color: rgb(51, 51, 51); font-family: &quot;Segoe UI Web (West European)&quot;, &quot;Segoe UI&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; background-color: rgb(255, 255, 255);">You can select your html text and use the shortcut ctrl+alt+x</p><p style="color: rgb(51, 51, 51); font-family: &quot;Segoe UI Web (West European)&quot;, &quot;Segoe UI&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; background-color: rgb(255, 255, 255);"><strong>There are many things to do</strong></p><br></p>'
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e5a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\"><ul> <li>Add functionality to validate html code</li> <li>Add support to format the resulting string</li><li>Add support to convert javascript strings to html code</li></ul><br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e6a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">There could be 1000s of good reasons to learn Javascript Programming. But one thing for sure, to learn any programming language, not only Javascript, you just need to code, and code and finally code until you become expert.<br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e7a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e8a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e9a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e10a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e11a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e12a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e13a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e14a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e15a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e16a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e17a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e17a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e18a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e19a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e20a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e21a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e22a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d123",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e24a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e25a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e31a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e32a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">It definitely went through an evolution, but regardless of its phase, all parsers had a similar output — which is an AST. Once we have an AST representation of the JSX code, interpretation is extremely easy.<br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e33a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">Today we’re gonna understand how a JSX parser thinks by implementing one of our own. Unlike Babel, rather than compiling, we’re gonna evaluate the nodes in the AST according to their types, which means that we will be able to use JSX during runtime.<br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e34a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">A basic Visual Studio Code plugin that converts html text to JSX string. You can select your html text and use the shortcut ctrl+alt+x.There are many things to do<br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e35a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": '<p class=\"paragraphNumeroUno\"><p style="color: rgb(51, 51, 51); font-family: &quot;Segoe UI Web (West European)&quot;, &quot;Segoe UI&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; background-color: rgb(255, 255, 255);">A basic Visual Studio Code plugin that converts html text to JSX string</p><p style="color: rgb(51, 51, 51); font-family: &quot;Segoe UI Web (West European)&quot;, &quot;Segoe UI&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; background-color: rgb(255, 255, 255);">You can select your html text and use the shortcut ctrl+alt+x</p><p style="color: rgb(51, 51, 51); font-family: &quot;Segoe UI Web (West European)&quot;, &quot;Segoe UI&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; background-color: rgb(255, 255, 255);"><strong>There are many things to do</strong></p><br></p>'
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e36a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\"><ul> <li>Add functionality to validate html code</li> <li>Add support to format the resulting string</li><li>Add support to convert javascript strings to html code</li></ul><br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    },
                    {
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e37a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e38a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e39a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e40a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e410a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e42a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e43a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e443a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e145a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e146a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e147a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e148a",
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
                        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e49a",
                        "type": "element-authoredtext",
                        "subtype": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        },
                        "html": {
                            "text": "<p class=\"paragraphNumeroUno\">jkfsjfkd fjdhf djhf djh <br></p>"
                        },
                        "comments": true,
                        "tcm": true,
                        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
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