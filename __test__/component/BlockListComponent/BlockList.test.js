import React from 'react';
import { shallow } from 'enzyme';
import BlockList from '../../../src/component/BlockListComponent/BlockList';

describe('Testing BlockList component', () => {
    let props = {
        indexTemp: '1-0-1',
        index: 0,
        element: {
            listtype: 'ordered',
            startNumber: 2,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        parentElement:{
            type: 'showhide'
        },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: [{
                    "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "This is a test"
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                    "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "html": {
                        "text": "imageAssetContent"
                    }
                },
                {
                    "type": "manifestlist",
                    "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt",
                    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                    "listtype": "ordered",
                    "subtype": "lower-alpha",
                    "listdata": {
                        "bodymatter": [
                            {
                                "type": "manifestlistitem",
                                "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nf63f",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                "listitemdata": {
                                    "bodymatter": [
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "More"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nf375",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>More</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "second line of content"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mbd4w",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>second line of content</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "third line of #1"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334knh4e",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>third line of #1</p>"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }]
    }
    let props1 = {
        indexTemp: '1-0-1',
        index:1,
        element: {
            listtype: 'ordered',
            startNumber: 1,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: [{
                    "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "This is a test"
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                    "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "html": {
                        "text": "<p class='paragraphNumeroUno'>This is a test</p>"
                    }
                },
                {
                    "type": "manifestlist",
                    "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt",
                    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                    "listtype": "ordered",
                    "subtype": "lower-alpha",
                    "listdata": {
                        "bodymatter": [
                            {
                                "type": "manifestlistitem",
                                "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nf63f",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                "listitemdata": {
                                    "bodymatter": [
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "More"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nf375",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>More</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "second line of content"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mbd4w",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>second line of content</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "third line of #1"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334knh4e",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>third line of #1</p>"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }]
    }
    let props2 = {
        indexTemp: '1-0-1',
        index:'0-0-0-0',
        parentElement:{
            type: 'manifestlist'
        },
        element: {
            listtype: 'test',
            startNumber: 1,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: []
            }
        }]
    }
    let props3 = {
        indexTemp: '0-0',
        index: "0-0-0-0-0",
        element: {
            listtype: 'ordered',
            startNumber: 2,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        parentElement:{
            "id":"urn:pearson:manifest:3cc4f02d-57d5-447a-911b-a51844a1e09e",
            "type":"element-aside",
            "subtype":"workedexample",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "designtype":"workedexample1",
            "elementdata":{
               "bodymatter":[
                  {
                     "id":"urn:pearson:manifest:7cf6ccdc-fc48-48af-8215-ef16440aad98",
                     "type":"manifest",
                     "schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
                     "versionUrn":"urn:pearson:manifest:7cf6ccdc-fc48-48af-8215-ef16440aad98",
                     "contentUrn":"urn:pearson:entity:1a8b9d4e-cd78-467e-bf8f-90c401e803b1",
                     "contents":{
                        "bodymatter":[
                           {
                              "id":"urn:pearson:manifest:6db13381-cc14-4500-959c-20e7cfbc35b5",
                              "type":"manifestlist",
                              "subtype":"decimal",
                              "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                              "versionUrn":"urn:pearson:manifest:6db13381-cc14-4500-959c-20e7cfbc35b5",
                              "contentUrn":"urn:pearson:entity:ebbc0e0d-0914-486b-9faa-d8c50868c659",
                              "status":"wip",
                              "listdata":{
                                 "bodymatter":[
                                    {
                                       "id":"urn:pearson:manifest:b7afb386-bc44-439b-8e48-639f784ac528",
                                       "type":"manifestlistitem",
                                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                       "versionUrn":"urn:pearson:manifest:b7afb386-bc44-439b-8e48-639f784ac528",
                                       "contentUrn":"urn:pearson:entity:6b64dcad-a172-410f-abbe-464469ca8198",
                                       "status":"wip",
                                       "listitemdata":{
                                          "bodymatter":[
                                             {
                                                "id":"urn:pearson:work:112237ec-4c13-4bc8-9613-9b5c9cd89331",
                                                "type":"element-authoredtext",
                                                "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                "elementdata":{
                                                   "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                   "text":"qwerty test qazxsw"
                                                },
                                                "html":{
                                                   "text":"<p class=\"paragraphNumeroUno\">qwerty test qazxsw</p>",
                                                   "footnotes":{
                                                      
                                                   },
                                                   "assetsPopover":{
                                                      
                                                   },
                                                   "glossaryentries":{
                                                      
                                                   },
                                                   "indexEntries":{
                                                      
                                                   }
                                                },
                                                "versionUrn":"urn:pearson:work:112237ec-4c13-4bc8-9613-9b5c9cd89331",
                                                "contentUrn":"urn:pearson:entity:f3bd826f-c2af-4f8a-a3e8-dfc735941d00"
                                             }
                                          ]
                                       }
                                    }
                                 ]
                              },
                              "listtype":"ordered",
                              "startNumber":1,
                              "columnnumber":1,
                              "iconcolor":"iconColor1",
                              "fontstyle":"fontStyle1"
                           }
                        ],
                        "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                     },
                     "status":"wip",
                     "displayedlabel":"Worked Example",
                     "numberedandlabel":true,
                     "parentDetails":[
                        "urn:pearson:entity:ada55c14-5c16-4a40-86fe-0d1ac4215485",
                        "urn:pearson:entity:1a8b9d4e-cd78-467e-bf8f-90c401e803b1"
                     ],
                     "indexPos":[
                        "0",
                        "2"
                     ]
                  }
               ],
               "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
               "title":{
                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text":"111 11 222",
                  "textsemantics":[
                     {
                        "charStart":0,
                        "charEnd":3,
                        "type":"label"
                     },
                     {
                        "charStart":4,
                        "charEnd":6,
                        "type":"number"
                     }
                  ]
               }
            },
            "html":{
               "title":"<p><label><br></label></p>"
            },
            "versionUrn":"urn:pearson:manifest:3cc4f02d-57d5-447a-911b-a51844a1e09e",
            "contentUrn":"urn:pearson:entity:ada55c14-5c16-4a40-86fe-0d1ac4215485",
            "status":"wip",
            "displayedlabel":"Worked Example",
            "numberedandlabel":true,
            "indexPos":"0",
            "parentDetails":[
               
            ],
            "slateEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb"
         },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: [{
                    "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "This is a test"
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                    "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "html": {
                        "text": "imageAssetContent"
                    }
                },
                {
                    "type": "manifestlist",
                    "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt",
                    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                    "listtype": "ordered",
                    "subtype": "lower-alpha",
                    "listdata": {
                        "bodymatter": [
                            {
                                "type": "manifestlistitem",
                                "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nf63f",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                "listitemdata": {
                                    "bodymatter": [
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "More"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nf375",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>More</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "second line of content"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mbd4w",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>second line of content</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "third line of #1"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334knh4e",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>third line of #1</p>"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }]
    }
    let props4 = {
        indexTemp: '0-0',
        index: "0-0-0-0",
        element: {
            listtype: 'ordered',
            startNumber: 2,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        parentElement:{
            "id":"urn:pearson:manifest:8052b6ca-14b0-47b6-a301-ce12242179d7",
            "type":"element-aside",
            "subtype":"sidebar",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "designtype":"asideSidebar01",
            "elementdata":{
               "bodymatter":[
                  {
                     "id":"urn:pearson:manifest:323bfd41-e785-460c-aa5a-cbe40c3e3828",
                     "type":"manifestlist",
                     "subtype":"decimal",
                     "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                     "versionUrn":"urn:pearson:manifest:323bfd41-e785-460c-aa5a-cbe40c3e3828",
                     "contentUrn":"urn:pearson:entity:e261ac9f-d105-4a47-8dcd-f26bc4ab447a",
                     "listdata":{
                        "bodymatter":[
                           {
                              "id":"urn:pearson:manifest:55621e2c-2f21-4aa3-9b8e-bff80649196c",
                              "type":"manifestlistitem",
                              "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                              "versionUrn":"urn:pearson:manifest:55621e2c-2f21-4aa3-9b8e-bff80649196c",
                              "contentUrn":"urn:pearson:entity:4e55781b-df7f-43b2-b302-e42eb869f1d6",
                              "listitemdata":{
                                 "bodymatter":[
                                    {
                                       "id":"urn:pearson:work:692f208d-5aa8-4bee-aae9-cce5db5be3b9",
                                       "type":"element-authoredtext",
                                       "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                       "elementdata":{
                                          "text":"dasdasdas dasdas"
                                       },
                                       "html":{
                                          "text":"<p class=\"paragraphNumeroUno\">dasdasdas dasdas</p>",
                                          "footnotes":{
                                             
                                          },
                                          "glossaryentries":{
                                             
                                          },
                                          "indexEntries":{
                                             
                                          }
                                       },
                                       "versionUrn":"urn:pearson:work:692f208d-5aa8-4bee-aae9-cce5db5be3b9",
                                       "contentUrn":"urn:pearson:entity:7e82b582-aeba-460e-8146-64e79e3f3a90",
                                       "status":"wip",
                                       "inputType":"AUTHORED_TEXT",
                                       "inputSubType":"NA",
                                       "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                       "index":"0",
                                       "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                       "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                    }
                                 ]
                              }
                           }
                        ]
                     },
                     "listtype":"ordered",
                     "startNumber":1,
                     "columnnumber":1,
                     "iconcolor":"iconColor1",
                     "fontstyle":"fontStyle1"
                  }
               ],
               "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
            },
            "versionUrn":"urn:pearson:manifest:8052b6ca-14b0-47b6-a301-ce12242179d7",
            "contentUrn":"urn:pearson:entity:5753eed0-8ad0-40b1-9bb2-4de07c2ce1eb",
            "status":"wip",
            "indexPos":"0",
            "parentDetails":[
               
            ],
            "slateEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb"
         },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: [{
                    "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "This is a test"
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                    "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "html": {
                        "text": "imageAssetContent"
                    }
                },
                {
                    "type": "manifestlist",
                    "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt",
                    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                    "listtype": "ordered",
                    "subtype": "lower-alpha",
                    "listdata": {
                        "bodymatter": [
                            {
                                "type": "manifestlistitem",
                                "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nf63f",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                "listitemdata": {
                                    "bodymatter": [
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "More"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nf375",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>More</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "second line of content"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mbd4w",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>second line of content</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "third line of #1"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334knh4e",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>third line of #1</p>"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }]
    }
    let props5 = {
        indexTemp: '0-0',
        index: 0-0-0-0,
        element: {
            listtype: 'ordered',
            startNumber: 2,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        parentElement:{
            "id":"urn:pearson:manifest:8052b6ca-14b0-47b6-a301-ce12242179d7",
            "type":"element-aside",
            "subtype":"sidebar",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "designtype":"asideSidebar01",
            "elementdata":{
               "bodymatter":[
                  {
                     "id":"urn:pearson:manifest:323bfd41-e785-460c-aa5a-cbe40c3e3828",
                     "type":"manifestlist",
                     "subtype":"decimal",
                     "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                     "versionUrn":"urn:pearson:manifest:323bfd41-e785-460c-aa5a-cbe40c3e3828",
                     "contentUrn":"urn:pearson:entity:e261ac9f-d105-4a47-8dcd-f26bc4ab447a",
                     "listdata":{
                        "bodymatter":[
                           {
                              "id":"urn:pearson:manifest:55621e2c-2f21-4aa3-9b8e-bff80649196c",
                              "type":"manifestlistitem",
                              "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                              "versionUrn":"urn:pearson:manifest:55621e2c-2f21-4aa3-9b8e-bff80649196c",
                              "contentUrn":"urn:pearson:entity:4e55781b-df7f-43b2-b302-e42eb869f1d6",
                              "listitemdata":{
                                 "bodymatter":[
                                    {
                                       "id":"urn:pearson:work:692f208d-5aa8-4bee-aae9-cce5db5be3b9",
                                       "type":"element-authoredtext",
                                       "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                       "elementdata":{
                                          "text":"dasdasdas dasdas"
                                       },
                                       "html":{
                                          "text":"<p class=\"paragraphNumeroUno\">dasdasdas dasdas</p>",
                                          "footnotes":{
                                             
                                          },
                                          "glossaryentries":{
                                             
                                          },
                                          "indexEntries":{
                                             
                                          }
                                       },
                                       "versionUrn":"urn:pearson:work:692f208d-5aa8-4bee-aae9-cce5db5be3b9",
                                       "contentUrn":"urn:pearson:entity:7e82b582-aeba-460e-8146-64e79e3f3a90",
                                       "status":"wip",
                                       "inputType":"AUTHORED_TEXT",
                                       "inputSubType":"NA",
                                       "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                       "index":"0",
                                       "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                       "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                    }
                                 ]
                              }
                           }
                        ]
                     },
                     "listtype":"ordered",
                     "startNumber":1,
                     "columnnumber":1,
                     "iconcolor":"iconColor1",
                     "fontstyle":"fontStyle1"
                  }
               ],
               "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
            },
            "versionUrn":"urn:pearson:manifest:8052b6ca-14b0-47b6-a301-ce12242179d7",
            "contentUrn":"urn:pearson:entity:5753eed0-8ad0-40b1-9bb2-4de07c2ce1eb",
            "status":"wip",
            "indexPos":"0",
            "parentDetails":[
               
            ],
            "slateEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb"
         },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: [{
                    "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "This is a test"
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                    "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "html": {
                        "text": "imageAssetContent"
                    }
                },
                {
                    "type": "manifestlist",
                    "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt",
                    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                    "listtype": "ordered",
                    "subtype": "lower-alpha",
                    "listdata": {
                        "bodymatter": [
                            {
                                "type": "manifestlistitem",
                                "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nf63f",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                "listitemdata": {
                                    "bodymatter": [
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "More"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nf375",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>More</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "second line of content"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mbd4w",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>second line of content</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "third line of #1"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334knh4e",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>third line of #1</p>"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }]
    }

    it('BlockList Component', () => {
        const wrapper = shallow(<BlockList {...props} />);
    })
    it('BlockList Component if > else case', () => {
        const wrapper = shallow(<BlockList {...props1} />);
    })
    it('BlockList Component else if WE case', () => {
        const wrapper = shallow(<BlockList {...props3} />);
    })
    it('BlockList Component else if aside-sidebar case', () => {
        const wrapper = shallow(<BlockList {...props4} />);
    })
    it('BlockList Component else if aside-sidebar case', () => {
        const wrapper = shallow(<BlockList {...props5} />);
    })
    it('BlockList Component else case', () => {
        const wrapper = shallow(<BlockList {...props2} />);
    })
});