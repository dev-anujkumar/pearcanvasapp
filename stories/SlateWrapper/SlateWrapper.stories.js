import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../../src/styles/CanvasWrapper/style.css';
import SlateWrapper from '../../src/component/SlateWrapper';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

export const slateData = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "manifest",
        "contents": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "title": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "Test Slate 1"
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
                    "comments": false,
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
                    "comments": false,
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
                    "comments": false,
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
                    "comments": false,
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
                    "comments": false,
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
                    "comments": false,
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
                    "comments": false,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                },
                {
                    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                    "type": "figure",
                    "figuretype": "image",
                    "subtype": "imageTextWidth",
                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                    "alignment": "text-width",
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
                        "path": "https://cite-media-stg.pearson.com/legacy_paths/2ed117e6-1306-496b-9386-b2394debd50e/Lighthouse.jpg",
                        "height": "1225",
                        "width": "1440",
                        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                        "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
                    },
                    "html": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "title": "Label for Figure Image-TextWidth",
                        "subtitle": "Title for Figure Image-TextWidth",
                        "caption": "Caption for Figure Image-TextWidth",
                        "credit": "Credit for Figure Image-TextWidth",
                        "postertext": "",
                        "tableasHTML": ""
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
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
                        "path": "https://cite-media-stg.pearson.com/legacy_paths/2ed117e6-1306-496b-9386-b2394debd50e/Lighthouse.jpg",
                        "height": "1225",
                        "width": "1440",
                        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                        "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
                    },
                    "html": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "title": "Label for Figure Image-50% Text",
                        "subtitle": "Title for Figure Image-50% Text",
                        "caption": "Caption for Figure Image-50% Text",
                        "credit": "Credit for Figure Image-50% Text",
                        "postertext": "",
                        "tableasHTML": ""
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
                },
                {
                    "id": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
                    "type": "figure",
                    "figuretype": "audio",
                    "subtype": "figureAudioSL",
                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                    "alignment": "full",
                    "title": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "sfd",
                        "textsemantics": [],
                        "mathml": []
                    },
                    "subtitle": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "gfh",
                        "textsemantics": [],
                        "mathml": [],
                        "footnotes": []
                    },
                    "captions": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "sdsd",
                        "textsemantics": [],
                        "mathml": [],
                        "footnotes": []
                    },
                    "credits": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "sdsd",
                        "textsemantics": [],
                        "mathml": [],
                        "footnotes": []
                    },
                    "figuredata": {
                        "height": "399",
                        "width": "600",
                        "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                        "audioid": "urn:pearson:alfresco:5e7f87f1-4662-4093-bb10-f3e1ef66e658",
                        "posterimage": {
                            "imageid": "urn:pearson:alfresco:5e7f87f1-4662-4093-bb10-f3e1ef66e658",
                            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
                        },

                        "audio": {
                            "format": "video/mp4",
                            "path": "https://cite-media-stg.pearson.com/legacy_paths/5e7f87f1-4662-4093-bb10-f3e1ef66e658/smart_figure_3_6_mc_war_part_b_1025689155684_mp4_video_320x240_168000_primary_audio_1.mp4"
                        },
                        "srctype": "externallink"
                    },
                    "html": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "title": "12345",
                        "subtitle": "eresrwqe",
                        "caption": "sdafsad",
                        "credit": "asdfasdfasdf",
                        "postertext": "",
                        "tableasHTML": ""
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
                    "contentUrn": "urn:pearson:entity:b8c31acf-2c66-4a05-92ac-e0d910ec2720"
                },
                {

                    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                    "type": "figure",
                    "figuretype": "video",
                    "subtype": "figureVideo",
                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                    "alignment": "full",
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
                        "height": "399",
                        "width": "600",
                        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                        "videoid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
                        "posterimage": {
                            "imageid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
                            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
                        },
                        "videos": [
                            {
                                "format": "audio/mpeg",
                                "path": "https://cite-media-stg.pearson.com/legacy_paths/42333091-7625-4317-b095-1f450207961f/dipe.mp4"
                            }
                        ],
                        "tracks": [],
                        "srctype": "externallink",
                        "clipinfo": {
                            "clipid": "",
                            "starttime": "",
                            "endtime": "",
                            "description": "",
                            "duration": ""
                        }
                    },
                    "html": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "title": "12345",
                        "subtitle": "eresrwqe",
                        "caption": "sdafsad",
                        "credit": "asdfasdfasdf",
                        "postertext": "",
                        "tableasHTML": ""
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
                }
            ]
        }
    }
}
export const elementsTag = {
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a": "P",
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a": "P",
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e2a": "P",
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e3a": "P",
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e4a": "P",
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e5a": "P",
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e6a": "P",
    "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e7a": "P",
    "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564": "AUD",
    "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464": "VID"
}
export const emptySlateData = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "manifest",
        "contents": {}
    }
}
export const slateDataForIntro = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "container-introduction",
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
                        "text": "<p class=\"paragraphNumeroUno\">introductory slate</p>"
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
export const slateDataForAssess = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "assessment",
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
                        "text": "<p class=\"paragraphNumeroUno\">Assessment slate</p>"
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
const mockStore = configureMockStore(middlewares);

const slateRenderData = mockStore({
    appStore: { slateLevelData: {},activeElement:{elementId:""} },
    toolbarReducer: { elemBorderToggle: true },
    commentsPanelReducer: {},
    slateLockReducer:{slateLockInfo:false}   
});

storiesOf('Composites|Slate Wrapper', module)
    .add('Default', () => {
        return (
            <Provider store={slateRenderData}>
                <SlateWrapper slateData={emptySlateData} tags={elementsTag} />
            </Provider>
        )
    },
        {
            info: 'This is slate wrapper which combines slate header, element container, element separator component, It is a default view with no data present',
        })
    .add('With Elements', () => {
        return (
            <Provider store={slateRenderData}>
                <SlateWrapper slateData={slateData} tags={elementsTag} />
            </Provider>
        )
    },
        {
            info: 'It is a view with some element present',
        })
    .add('Introductory Slate', () => {
        return (
            <Provider store={slateRenderData}>
                <SlateWrapper slateData={slateDataForIntro} tags={elementsTag} />
            </Provider>
        )
    },
        {
            info: 'It is a view with some element present',
        })
    .add('Assessment Slate', () => {
        return (
            <Provider store={slateRenderData}>
                <SlateWrapper slateData={slateDataForAssess} tags={elementsTag} />
            </Provider>
        )
    },
        {
            info: 'It is a view with some element present',
        })
    .add('Loading', () => {
        return (
            <Provider store={slateRenderData}>
                <SlateWrapper slateData={{}} tags={elementsTag} />
            </Provider>
        )
    },
        {
            info: 'It is a view with element being loaded',
        })