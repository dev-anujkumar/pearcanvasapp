/**
 * Module - Slate Level Reducer
 * Description - all slate related action payloads land here
 * Last modified - 11-09-2019
 */

// IMPORT - Action constants //
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    AUTHORING_ELEMENT_CREATED,
    AUTHORING_ELEMENT_UPDATE,
    DELETE_ELEMENT,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX,
    GET_PAGE_NUMBER,
    SET_UPDATED_SLATE_TITLE,
    SET_SLATE_TYPE,
    SET_SLATE_ENTITY,
    GET_PROJECT_PERMISSIONS,
    SET_OLD_IMAGE_PATH,
    UPDATE_PAGENUMBER_SUCCESS,
    UPDATE_PAGENUMBER,
    UPDATE_PAGENUMBER_FAIL,
    UPDATE_FOOTNOTEGLOSSARY,
    FETCH_DATA_ON_SLATE_REFRESH,
    ACCESS_DENIED_POPUP,
    SET_PARENT_NODE,
    OPEN_POPUP_SLATE,
    CLOSE_POPUP_SLATE,
    CREATE_SHOW_HIDE_ELEMENT,
    SET_PARENT_ASIDE_DATA,
    DELETE_SHOW_HIDE_ELEMENT,
    SET_PARENT_SHOW_DATA,
    GET_ALL_SLATES_DATA,
    SET_CURRENT_SLATE_DATA,
    PAGE_NUMBER_LOADER,
    GET_USAGE_TYPE ,
    SET_SLATE_LENGTH,
    VERSIONING_SLATEMANIFEST,
    SET_TOAST_MESSAGE,
    SHOW_TOAST_MESSAGE,
    STORE_OLD_ASSET_FOR_TCM,
    WIRIS_ALT_TEXT_POPUP,
    LEARNOSITY_PROJECT_INFO,
    SET_FIGURE_GLOSSARY,
    ADD_FIGURE_GLOSSARY_POPUP,
    WRONG_IMAGE_POPUP,
    UPDATE_MULTIPLE_COLUMN_INFO,
    SHOW_REMOVE_GLOSSARY_IMAGE,
    UPDATE_OLD_FIGUREIMAGE_INFO
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of app store
 * update it accordingly
 */

const INITIAL_STATE = {
    slateLevelData: {},
    // elementsTag: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: [],
    permissions: [],
    accesDeniedPopup: false,
    popupSlateData: null,
    roleId: '',
    oldImage: "",
    showHideId: "",
    parentUrn: {},
    asideData: {},
    showHideObj:{},
    allSlateData:{},
    currentSlateAncestorData:{},
    allElemPageData:[],
    pageNumberLoading:false,
    usageTypeListData:{},
    slateLength: "25",
    toastMessage:"",
    showToast:false,
    oldFiguredata : {},
    wirisAltText : {},
    isLearnosityProjectInfo:{},
    figureGlossaryData : {},
    addfigureGlossarypopup:false,
    openWrongImagePopup:false,
    multipleColumnData: [],
    removeGlossaryImage:false,
    oldFigureDataForCompare: {}
};

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

let tempBlockListData = {
    "type": "manifestlist",
    "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d348ju67",
    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
    "listtype": "ordered",
    "subtype": "decimal",
    "listdata": {
      "bodymatter": [
        {
          "type": "manifestlistitem",
          "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34n6y8k",
          "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34n6y8k",
          "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nh5t7",
          "schema": "http://schemas.pearson.com/wip-authoring/list/1",
          "listitemdata": {
            "bodymatter": [
              {
                "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                  "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text": "This is a test"
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg"
              },
              {
                "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5hjt56",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                  "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text": "second line of content"
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngr6",
                "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5hjt56"
              },
              {
                "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5juiyt",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                  "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text": "third line of #1"
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jnfe3",
                "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5juiyt"
              }
            ]
          }
        },
        {
          "type": "manifestlistitem",
          "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34kn6r3",
          "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34kn6r3",
          "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34hjy45",
          "schema": "http://schemas.pearson.com/wip-authoring/list/1",
          "listitemdata": {
            "bodymatter": [
              {
                "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5uijhb",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                  "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text": "Additional Content"
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334hge2q",
                "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5uijhb"
              }
            ]
          }
        },
        {
          "type": "manifestlistitem",
          "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jngyt",
          "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jngyt",
          "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34jhyuj",
          "schema": "http://schemas.pearson.com/wip-authoring/list/1",
          "listitemdata": {
            "bodymatter": [
              {
                "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jhrde",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                  "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text": "More Content"
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334hnfe4",
                "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jhrde"
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
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck"
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
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39"
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
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5"
                          }
                        ]
                      }
                    },
                    {
                      "type": "manifestlistitem",
                      "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34kmn75",
                      "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34kmn75",
                      "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34jng48",
                      "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                      "listitemdata": {
                        "bodymatter": [
                          {
                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jng4e",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "More"
                            },
                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334ng4w9",
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jng4e"
                          }
                        ]
                      }
                    },
                    {
                      "type": "manifestlistitem",
                      "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgvf",
                      "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgvf",
                      "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34ng4s8",
                      "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                      "listitemdata": {
                        "bodymatter": [
                          {
                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5nd5ry",
                            "contentUrn": "urn:pearson:entity:d47ac94e-e5fa-45aa-811a-f74f6d7ng439",
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5nd5ry",
                            "type": "figure",
                            "figuretype": "image",
                            "subtype": "image25Text",
                            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                            "alignment": "quarter-text",
                            "title": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "Figure 3.1"
                            },
                            "subtitle": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "The content entered in the title field"
                            },
                            "captions": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "A caption"
                            },
                            "credits": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "the credits"
                            },
                            "figuredata": {
                              "imageid": "urn:pearson:work:385b007b-ad74-48cc-bb8e-ce9a8b2763ac",
                              "path": "https://cite-media-stg.pearson.com/legacy_paths/e9966883-0cb5-4c3e-98b0-9f36a745d501/ff_x20_008.jpg",
                              "height": "3000",
                              "width": "4000",
                              "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image"
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                "contentUrn": "urn:pearson:entity:836f07e6-a6ac-4639-a6c7-65f4a59jngr5",
                "versionUrn": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt"
              }
            ]
          }
        },
        {
          "type": "manifestlistitem",
          "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jkuy6",
          "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jkuy6",
          "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nh5e7",
          "schema": "http://schemas.pearson.com/wip-authoring/list/1",
          "listitemdata": {
            "bodymatter": [
              {
                "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5mjhf5",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                  "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text": "#4 content"
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mnf6t",
                "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5mjhf5"
              },
              {
                "type": "manifestlist",
                "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d586e2a",
                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                "listtype": "ordered",
                "subtype": "lower-alpha",
                "listdata": {
                  "bodymatter": [
                    {
                      "type": "manifestlistitem",
                      "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34knh67",
                      "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34knh67",
                      "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34mnrw7",
                      "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                      "listitemdata": {
                        "bodymatter": [
                          {
                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5mjy7g",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "Nested"
                            },
                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mtvs5",
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5mjy7g"
                          },
                          {
                            "type": "manifestlist",
                            "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5mk852",
                            "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                            "listtype": "ordered",
                            "subtype": "lower-roman",
                            "listdata": {
                              "bodymatter": [
                                {
                                  "type": "manifestlistitem",
                                  "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34nd5e4",
                                  "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34nd5e4",
                                  "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34jnhty",
                                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                  "listitemdata": {
                                    "bodymatter": [
                                      {
                                        "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5kjngt",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                          "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                          "text": "nested"
                                        },
                                        "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334htyuj",
                                        "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5kjngt"
                                      }
                                    ]
                                  }
                                },
                                {
                                  "type": "manifestlistitem",
                                  "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34hd752",
                                  "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34hd752",
                                  "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34jnge9",
                                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                  "listitemdata": {
                                    "bodymatter": [
                                      {
                                        "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5ng47k",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                          "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                          "text": "hkjsda"
                                        },
                                        "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nht53",
                                        "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5ng47k"
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            "contentUrn": "urn:pearson:entity:836f07e6-a6ac-4639-a6c7-65f4a59jngt6",
                            "versionUrn": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5mk852"
                          }
                        ]
                      }
                    }
                  ]
                },
                "contentUrn": "urn:pearson:entity:836f07e6-a6ac-4639-a6c7-65f4a59u678o",
                "versionUrn": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d586e2a"
              }
            ]
          }
        },
        {
          "type": "manifestlistitem",
          "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34hf3w6",
          "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34hf3w6",
          "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34hngr7",
          "schema": "http://schemas.pearson.com/wip-authoring/list/1",
          "listitemdata": {
            "bodymatter": [
              {
                "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5hyted",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                  "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text": "New Content"
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nhr78",
                "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5hyted"
              },
              {
                "type": "manifestlist",
                "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5mke29",
                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                "listtype": "unordered",
                "listdata": {
                  "bodymatter": [
                    {
                      "type": "manifestlistitem",
                      "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34gt67u",
                      "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34gt67u",
                      "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34h578i",
                      "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                      "listitemdata": {
                        "bodymatter": [
                          {
                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jngr4",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "Bullets"
                            },
                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334n652i",
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jngr4"
                          }
                        ]
                      }
                    },
                    {
                      "type": "manifestlistitem",
                      "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34hr490",
                      "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34hr490",
                      "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34mn639",
                      "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                      "listitemdata": {
                        "bodymatter": [
                          {
                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5mjg58",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                              "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text": "Bullets"
                            },
                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334h590h",
                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5mjg58"
                          },
                          {
                            "type": "manifestlist",
                            "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5mh59s",
                            "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                            "listtype": "unordered",
                            "listdata": {
                              "bodymatter": [
                                {
                                  "type": "manifestlistitem",
                                  "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34nh5ed",
                                  "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34nh5ed",
                                  "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34bg49t",
                                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                  "listitemdata": {
                                    "bodymatter": [
                                      {
                                        "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5nr3qs",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                          "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                          "text": "More"
                                        },
                                        "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334n539u",
                                        "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5nr3qs"
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            "contentUrn": "urn:pearson:entity:836f07e6-a6ac-4639-a6c7-65f4a59ju896",
                            "versionUrn": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5mh59s"
                          }
                        ]
                      }
                    }
                  ]
                },
                "contentUrn": "urn:pearson:entity:836f07e6-a6ac-4639-a6c7-65f4a59vdgya",
                "versionUrn": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5mke29"
              }
            ]
          }
        }
      ]
    },
    "contentUrn": "urn:pearson:entity:836f07e6-a6ac-4639-a6c7-65f4a59jn5d8",
    "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d348ju67"
  }

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case FETCH_SLATE_DATA:
            let tempdata = action.payload;
            tempdata['urn:pearson:manifest:5b952b50-9ada-43b9-86b4-ef05ef6210b4'].contents.bodymatter.push(tempBlockListData)
            return {
                ...state,
                // slateLevelData: action.payload
                slateLevelData:tempdata
            };
        case SET_ACTIVE_ELEMENT:
            return {
                ...state,
                activeElement: action.payload
            };
        case AUTHORING_ELEMENT_CREATED:
        case DELETE_ELEMENT:
        case FETCH_DATA_ON_SLATE_REFRESH:
        case DELETE_SHOW_HIDE_ELEMENT:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            };
        case SWAP_ELEMENT:
        case UPDATE_FOOTNOTEGLOSSARY:
            return {
                ...state,
                slateLevelData: JSON.parse(JSON.stringify(action.payload.slateLevelData))
            };
        case SET_SPLIT_INDEX:
            return {
                ...state,
                splittedElementIndex: action.payload
            }
        case GET_PAGE_NUMBER:
            return {
                ...state,
                pageNumberData: action.payload.pageNumberData,
                allElemPageData: action.payload.allElemPageData
            }
        case SET_UPDATED_SLATE_TITLE:
            return {
                ...state,
                slateTitleUpdated: action.payload.title
            }
        case SET_SLATE_TYPE:
            return {
                ...state,
                slateType: action.payload
            }
        case SET_SLATE_ENTITY:
            return {
                ...state,
                setSlateEntity: action.payload
            }
        case SET_PARENT_NODE:
            return {
                ...state,
                setSlateParent: action.payload
            }
        case AUTHORING_ELEMENT_UPDATE:
        case VERSIONING_SLATEMANIFEST:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            }
        case GET_PROJECT_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload.permissions,
                roleId: action.payload.roleId
            }
        case SET_OLD_IMAGE_PATH:
            return {
                ...state,
                oldImage: action.payload.oldImage
            };
        case UPDATE_PAGENUMBER:
        case UPDATE_PAGENUMBER_SUCCESS:
        case UPDATE_PAGENUMBER_FAIL:
            return {
                ...state,
                pageLoading: action.payload.pageLoading
            };
        case PAGE_NUMBER_LOADER:
            return {
                ...state,
                pageNumberLoading: action.payload.pageNumberLoading
            };
        case ACCESS_DENIED_POPUP:
            return {
                ...state,
                accesDeniedPopup: action.payload
            };
        case CREATE_SHOW_HIDE_ELEMENT:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData,
                showHideId: action.payload.showHideId
            };
        case OPEN_POPUP_SLATE:
            return {
                ...state,
                slateLevelData: {
                    ...state.slateLevelData,
                    [Object.keys(action.payload)[0]]: action.payload[Object.keys(action.payload)[0]]
                }
            }
        case CLOSE_POPUP_SLATE:
            let stateCopy = { ...state.slateLevelData }
            delete stateCopy[action.payload.popupId]
            return {
                ...state,
                slateLevelData: stateCopy
            }
        case SET_PARENT_ASIDE_DATA:
            return {
                ...state,
                parentUrn: action.payload.parentUrn,
                asideData: action.payload.asideData
            }
        case SET_PARENT_SHOW_DATA:
            return {
                ...state,
                showHideObj: action.payload.showHideObj
            }
        // case DELETE_SHOW_HIDE_ELEMENT:
        //     return {
        //         ...state,
        //         slateLevelData: action.payload.slateLevelData
        //     };
        case GET_ALL_SLATES_DATA:
            return {
                ...state,
                allSlateData: action.payload.allSlateData
            }
        case SET_CURRENT_SLATE_DATA:
            return {
                ...state,
                currentSlateAncestorData: action.payload.currentSlateAncestorData
            }
        case GET_USAGE_TYPE:
            return {
                ...state,
                usageTypeListData: action.payload
            }
        case SET_SLATE_LENGTH:
            return {
                ...state,
                slateLength: action.payload
            }
        case SET_TOAST_MESSAGE:
            return {
                ...state,
                toastMessage: action.payload
            }
        case SHOW_TOAST_MESSAGE:
            return {
                ...state,
                showToast: action.payload
            }
        case STORE_OLD_ASSET_FOR_TCM:
            return {
                ...state,
                oldFiguredata: action.payload.oldFiguredata
            }
        case WIRIS_ALT_TEXT_POPUP : 
        return {
            ...state,
            wirisAltText : action.payload
        }

        case LEARNOSITY_PROJECT_INFO : 
        return {
            ...state,
            isLearnosityProjectInfo : action.payload
        }
        case SET_FIGURE_GLOSSARY : 
        return {
            ...state,
            figureGlossaryData : action.payload
        }
        case ADD_FIGURE_GLOSSARY_POPUP:
            return{
                ...state,
                addfigureGlossarypopup:action.payload
            }
        case WRONG_IMAGE_POPUP:
            return{
                ...state,
                openWrongImagePopup:action.payload
            }
        case SHOW_REMOVE_GLOSSARY_IMAGE:
            return {
                ...state,
                removeGlossaryImage:action.payload
            }

        case UPDATE_MULTIPLE_COLUMN_INFO:
            if (action.key) {
                let multipleColumnData = state.multipleColumnData;
                multipleColumnData = multipleColumnData.filter(function (data) {
                    return data.containerId !== action.key
                })
                return {
                    ...state,
                    multipleColumnData: [...multipleColumnData, action.payload]
                }
            } else {
                return {
                    ...state,
                    multipleColumnData: []
                }
            }

        case UPDATE_OLD_FIGUREIMAGE_INFO:
            return {
                ...state,
                oldFigureDataForCompare: action.payload
            }

        default:
            return state;
    }
}
