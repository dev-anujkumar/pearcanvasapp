/**************************Import Plugins**************************/
import axios,{ mockAxios } from 'axios';
import { JSDOM } from 'jsdom'
global.document = (new JSDOM()).window.Element;
if (!global.Element.prototype.hasOwnProperty("getElementById")) {
    Object.defineProperty(global.Element.prototype, 'getElementById', {
        get() {
            return {
                innerText: "innerText",
                innerHTML: "<p>innerHTML</p>"
            };
        },
    });

}
/***************************Import Modules*************************/
import {
    ERROR_POPUP,
    GET_PAGE_NUMBER,
    FETCH_SLATE_DATA,
    CLOSE_POPUP_SLATE,
    SET_ACTIVE_ELEMENT,
    SET_OLD_IMAGE_PATH,
    SET_PARENT_SHOW_DATA,
    SET_PARENT_ASIDE_DATA,
    AUTHORING_ELEMENT_UPDATE,
    OPEN_POPUP_SLATE,
    UPDATE_PROJECT_INFO,
    UPDATE_LOB_PERMISSIONS
} from '../../../src/constants/Action_Constants';
import config from '../../../src/config/config.js';
import * as canvasActions from '../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
/*************************Import Test Data*************************/
import { slateTestData } from './mockData.js';
import { debug } from 'webpack';
import { response } from 'express';
/**********************Mock Helper Functions***********************/
jest.mock('axios');
jest.mock('../../../src/constants/ga', () => {
    return {
        sendToDataLayer: jest.fn()
    }
});
jest.mock('../../../src/constants/IFrameMessageTypes.js', () => {
    return {
        HideLoader: jest.fn()
    }
});
jest.mock('../../../src/js/getAllSlatesData.js', () => {
    return {
        fetchAllSlatesData: jest.fn(),
        setCurrentSlateAncestorData: jest.fn()
    }
});
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshot_Actions', () => {
    return {
        tcmSnapshot: jest.fn(),
        handleTCMData: jest.fn()
    }
});
jest.mock('../../../src/component/CommentsPanel/CommentsPanel_Action', () => {
    return {
        fetchComments: jest.fn(),
        fetchCommentByElement: jest.fn()
    }
});
jest.mock('../../../src/constants/utility.js', () => {
    return {
        sendDataToIframe: jest.fn(),
        createTitleSubtitleModel: jest.fn(),
        requestConfigURI: jest.fn(),
    }
});

/*********************Declare Common Variables**********************/
const cb = jest.fn();
config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
config.projectUrn = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
config.parentEntityUrn = "bodyMatter"
config.totalPageCount = 0
config.tcmStatus = true
describe('|Testing ----------------------[ CanvasWrapper_Actions ]----------------------|', () => {
    describe('Test-1- fetchElementTag', () => {
        it('Test-1.1-fetchElementTag - Heading', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 10);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('H1');
            spyFunction.mockClear()
        })
        it('Test-1.2-fetchElementTag - Stanza', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0].contents.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, '0-3-0');
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('PE');
            spyFunction.mockClear()
        })
        it('Test-1.3-fetchElementTag - Table Editor', () => {
            let activeElement = { type: 'figure', figuretype: 'tableasmarkup', figuredata: { ...slateTestData.ImageFigureData } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 13);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('TE');
            spyFunction.mockClear()
        })
        it('Test-1.4-fetchElementTag - Assessment Element', () => {
            let activeElement = { type: 'figure', figuretype: 'assessment', figuredata: { elementdata: { assessmentformat: 'puf' } } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 12);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('Qu');
            spyFunction.mockClear();
        })
        it('Test-1.5-fetchElementTag - Assessment Slate', () => {
            let activeElement = { type: 'element-assessment', elementdata: { assessmentformat: 'puf' } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 0);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('P');
            spyFunction.mockClear()
        })
        it('Test-1.6-fetchElementTag - Popup Element', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[1];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 1);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('Pop');
            spyFunction.mockClear()
        })
        it('Test-1.7.1-fetchElementTag - Aside - Default', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 8);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('As');
            spyFunction.mockClear()
        })
        it('Test-1.7.2-fetchElementTag - Aside - no Subtype', () => {
            let activeElement = { type: 'element-aside', subtype: '', designtype: "" };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 8);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('As');
            spyFunction.mockClear()
        })
        it('Test-1.7.2-fetchElementTag - Aside - Subtype = Tactic', () => {
            let activeElement = { type: 'element-aside', subtype: 'Tactic', designtype: "" };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 8);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('');
            spyFunction.mockClear()
        })
        it('Test-1.8.1-fetchElementTag - WE -Default', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[9];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 9);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('WE');
            spyFunction.mockClear()
        })
        it('Test-1.8.2-fetchElementTag - WE - no designtype', () => {
            let activeElement = { type: 'element-aside', subtype: 'workedexample', designtype: "" };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 9);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('WE');
            spyFunction.mockClear()
        })
        it('Test-1.9-fetchElementTag - Poetry', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 0);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('PE');
            spyFunction.mockClear()
        })
        it('Test-1.10-fetchElementTag - Opener Element', () => {
            let activeElement = { type: 'openerelement', backgroundimage: { alttext: "alttext", longdescription: "longdescription" } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 0);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('OE');
            spyFunction.mockClear()
        })
        it('Test-1.11-fetchElementTag - List Element', () => {
            let activeElement = { type: 'element-list', subtype: 'lower-alpha', elementdata: { subtype: 'lower-alpha' } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 12);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('OL');
            spyFunction.mockClear()
        })
        it('Test-1.12-fetchElementTag - BlockQuote', () => {
            let activeElement = { type: 'element-blockfeature', elementdata: { type: 'pullquote' } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 11);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('PQ');
            spyFunction.mockClear()
        })
        it('Test-1.13-fetchElementTag - MultiColumn', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[7];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 7);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('2C');
            spyFunction.mockClear()
        })
        it('Test-1.14.1-fetchElementTag - Block Code -Default', () => {
            let activeElement = { type: 'figure', figuretype: 'codelisting', figuredata: { ...slateTestData.BceFigureData } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 14);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('BCE');
            spyFunction.mockClear()
        })
        it('Test-1.14.2-fetchElementTag - Block Code -Java', () => {
            let activeElement = { type: 'figure', figuretype: 'codelisting', figuredata: { ...slateTestData.BceFigureData, programlanguage: "Java" } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 14);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('BCE');
            spyFunction.mockClear()
        })
        it('Test-1.15-fetchElementTag - Default', () => {
            let activeElement = { type: 'paragraph' };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 10);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('P');
            spyFunction.mockClear()
        })
        it('Test-1.16-fetchElementTag - Mathml Element', () => {
            let activeElement = { type: 'figure', figuretype: 'authoredtext', figuredata: {} };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 12);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('MML');
            spyFunction.mockClear();
        })
        it('Test-1.17-fetchElementTag - Catch Block', () => {
            let activeElement = {};
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 10);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.17-fetchElementTag - MultiColumn 3 column Element', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[11];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 11);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('3C');
            spyFunction.mockClear()
        });
    });
    describe('Test-2- fetchAuthUser', () => {
        it('Test-2.1-fetchAuthUser', () => {
            let dispatch = jest.fn();
            let responseData = { data: slateTestData.fetchAuthUserResponse }
            const spyFunction = jest.spyOn(canvasActions, 'fetchAuthUser')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchAuthUser()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            expect(dispatch).not.toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.2-fetchAuthUser - Catch Block', () => {
            let dispatch = jest.fn();
            const spyFunction = jest.spyOn(canvasActions, 'fetchAuthUser')
            axios.get = jest.fn(() => Promise.reject({}))
            canvasActions.fetchAuthUser()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            expect(dispatch).not.toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    xdescribe('Test-3- setActiveElement', () => {
        config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
        it('Test-3.1-setActiveElement - Citations', () => {
            let dispatch = (obj) => {
                if (obj && obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.citationGroup);
                }
                else if (obj && obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj && obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[2];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, 2, {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.2.1-setActiveElement - Figure Image at Slate Level', () => {
            let oldPath = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.figureImage);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: oldPath });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[3];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, 3, {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.2.2-setActiveElement - Figure Image in Aside', () => {
            let oldPath = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.figureInAside);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: oldPath });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '8-0', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.2.3-setActiveElement - Figure Image in WE-Section Break', () => {
            let oldPath = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.figureInWE);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: oldPath });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[9].elementdata.bodymatter[1].contents.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '9-1-0', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.2.4-setActiveElement - Figure Image in Multi-Column', () => {
            let oldPath = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.figureInMultiColumn);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: oldPath });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: { elementType: "group" }
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[7].groupeddata.bodymatter[0].groupdata.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '7-0-0', {}, {}, false, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.3.1-setActiveElement - Audio Element at Slate Level', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.audioElement);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[5];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, 5, {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.3.2-setActiveElement - Audio Element in Aside', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.audioInAside);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[2];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '8-2', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.3.3-setActiveElement - Audio Elemente in WE-Section Break', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.audioInWE);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[9].elementdata.bodymatter[1].contents.bodymatter[1];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '9-1-1', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.3.4-setActiveElement - Audio Element in Multi-Column', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.audioInMultiColumn);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: { elementType: "group" }
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[7].groupeddata.bodymatter[0].groupdata.bodymatter[1];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '7-0-1', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.4.1-setActiveElement - Video Element at Slate Level', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.videoElement);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[4];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, 4, {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.4.2-setActiveElement - Video Element in Aside', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.videoInAside);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[1];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '8-1', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.4.3-setActiveElement - Video Element in WE-Section Break', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.videoInWE);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[9].elementdata.bodymatter[1].contents.bodymatter[2];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '9-1-2', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.4.4-setActiveElement - Video Element in Multi-Column', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.videoInMultiColumn);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: { elementType: "group" }
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[7].groupeddata.bodymatter[1].groupdata.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '7-1-0', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.5.1-setActiveElement - Interactive Element at Slate Level', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.interactiveElement);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[6];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, 6, {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.5.2-setActiveElement - Interactive Element in Aside', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.interactiveInAside);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[3];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '8-3', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.5.3-setActiveElement - Interactive Elemente in WE-Section Break', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.interactiveInWE);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: {}
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[9].elementdata.bodymatter[1].contents.bodymatter[3];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '9-1-3', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.5.4-setActiveElement - Interactive Element in Multi-Column', () => {
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual(slateTestData.setActiveElementPayload.interactiveInMultiColumn);
                }
                else if (obj.type === SET_PARENT_ASIDE_DATA) {
                    expect(obj.payload).toEqual({ parentUrn: {}, asideData: {} });
                }
                else if (obj.type === SET_PARENT_SHOW_DATA) {
                    expect(obj.payload).toEqual({ showHideObj: undefined });
                }
                else if (obj.type === SET_OLD_IMAGE_PATH) {
                    expect(obj.payload).toEqual({ oldImage: "" });

                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        parentUrn: { elementType: "group" }
                    }
                };
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[7].groupeddata.bodymatter[1].groupdata.bodymatter[1];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, '7-1-1', {}, {}, undefined, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
    });
    describe('Test-4- fetchSlateData', () => {
        it('Test-4.1-fetchSlateData - calledFrom - SlateRefresh', () => {
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === FETCH_SLATE_DATA) {
                    expect(obj.payload).toEqual(slateTestData.slateData1);
                }
                else if (obj && obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual({});
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9',
                entityURN = 'urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294',
                page = 1,
                versioning = '',
                calledFrom = 'SlateRefresh',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.2-fetchSlateData - Poetry Element - Versioning', () => {
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === AUTHORING_ELEMENT_UPDATE) {
                    expect(obj.payload).toEqual(slateTestData.poetryElementVersion);
                }
                else if (obj && obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual({});
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:ff22f67a-e32f-4f5c-a9e5-a57c8c757ce0',
                entityURN = 'urn:pearson:entity:767e921e-255d-44a5-87bb-c0381cf3ef50',
                page = 0,
                versioning = slateTestData.poetryElementVersion,
                calledFrom = '',
                versionPopupReload = false
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.3-fetchSlateData - Aside Element - Versioning', () => {
            let responseData = { data: { ...slateTestData.slateData1 } }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === AUTHORING_ELEMENT_UPDATE) {
                    expect(obj.payload).toEqual({ ...slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8], [slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[5]]: slateTestData.asideVersioning });
                }
                else if (obj && obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual({});
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:7bb268e1-c3b6-4174-b0d7-12c57a46e93b',
                entityURN = 'urn:pearson:entity:7c7fc762-2432-4499-88c0-3c6b824d2470',
                page = 0,
                versioning = { ...slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8], [slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[5]]: slateTestData.asideVersioning },
                calledFrom = '',
                versionPopupReload = false
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.4-fetchSlateData - Popup Slate', () => {
            let responseData = { data: { ...slateTestData.popupSlate } }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(slateTestData.popupSlate);
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.popupSlate,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670',
                entityURN = 'urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677',
                page = 0,
                versioning = false,
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.5-fetchSlateData - Popup Slate - Versioning', () => {
            let responseData = { data: { ...slateTestData.popupSlate } }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.popupSlate,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670',
                entityURN = 'urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677',
                page = 0,
                versioning = slateTestData.popupSlateLabelVersioning,
                calledFrom = '',
                versionPopupReload = true
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    });
    describe('Test-5- openPopupSlate', () => {
        it('Test-5.1-openPopupSlate - IF Case', () => {
            let dispatch = jest.fn();
            let popupId = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9";
            const spyFunction = jest.spyOn(canvasActions, 'openPopupSlate')
            canvasActions.openPopupSlate({ id: "popupId" }, popupId)(dispatch);
            expect(spyFunction).toHaveBeenCalled()
            expect(dispatch).not.toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-5.2-openPopupSlate - ELSE Case', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(CLOSE_POPUP_SLATE);
                expect(obj.payload.popupId).toBe("urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9");
            }
            let popupId = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9";
            const spyFunction = jest.spyOn(canvasActions, 'openPopupSlate')
            canvasActions.openPopupSlate(undefined, popupId)(dispatch);
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
    });
    describe('Test-6- createPopupUnit', () => {
        let slateManifestURN = 'urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9'
        it('Test-6.1-createPopupUnit - popupField - formatted-title', () => {
            let responseData = { data: slateTestData.popupLabelResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[1],
                popupElementIndex = '1-0',
                createdFromFootnote = undefined;
            const spyFunction = jest.spyOn(canvasActions, 'createPopupUnit')
            axios.post = jest.fn(() => Promise.resolve(responseData))
            canvasActions.createPopupUnit(popupField, parentElement, cb, popupElementIndex, slateManifestURN, createdFromFootnote)(dispatch, getState)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-6.2-createPopupUnit - popupField - formatted-subtitle', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData = { data: slateTestData.popupLabelResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let popupField = 'formatted-subtitle',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[1],
                popupElementIndex = '1-1',
                createdFromFootnote = undefined;
            const spyFunction = jest.spyOn(canvasActions, 'createPopupUnit')
            axios.post = jest.fn(() => Promise.resolve(responseData))
            canvasActions.createPopupUnit(popupField, parentElement, cb, popupElementIndex, slateManifestURN, createdFromFootnote)(dispatch, getState)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-6.3-createPopupUnit - CITATIONS', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData = { data: slateTestData.CitationTitleResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[2],
                popupElementIndex = '2-0';
            const spyFunction = jest.spyOn(canvasActions, 'createPopupUnit')
            axios.post = jest.fn(() => Promise.resolve(responseData))
            canvasActions.createPopupUnit(undefined, parentElement, cb, popupElementIndex, slateManifestURN, undefined)(dispatch, getState)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-6.4-createPopupUnit - popupField - catch Block', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(ERROR_POPUP);
                expect(obj.payload.show).toBe(true);
            };
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[1],
                popupElementIndex = '1-0',
                createdFromFootnote = undefined;
            const spyFunction = jest.spyOn(canvasActions, 'createPopupUnit')
            axios.post = jest.fn(() => Promise.reject({}))
            canvasActions.createPopupUnit(popupField, parentElement, cb, popupElementIndex, slateManifestURN, createdFromFootnote)(dispatch, getState)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-6.5-createPopupUnit - Popup in Aside', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData = { data: slateTestData.popupLabelResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let popupField = 'formatted-subtitle',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[4],
                popupElementIndex = '8-4-0',
                createdFromFootnote = undefined;
            const spyFunction = jest.spyOn(canvasActions, 'createPopupUnit')
            axios.post = jest.fn(() => Promise.resolve(responseData))
            canvasActions.createPopupUnit(popupField, parentElement, cb, popupElementIndex, slateManifestURN, createdFromFootnote)(dispatch, getState)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-6.6-createPopupUnit - Popup in WE', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData = { data: slateTestData.popupLabelResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let popupField = 'formatted-subtitle',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[9].elementdata.bodymatter[1].contents.bodymatter[4],
                popupElementIndex = '9-1-4-1',
                createdFromFootnote = undefined;
            const spyFunction = jest.spyOn(canvasActions, 'createPopupUnit')
            axios.post = jest.fn(() => Promise.resolve(responseData))
            canvasActions.createPopupUnit(popupField, parentElement, cb, popupElementIndex, slateManifestURN, createdFromFootnote)(dispatch, getState)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
    });
    describe('Test-7- createPoetryUnit', () => {
        let slateManifestURN = 'urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9'
        it('Test-7.1-createPoetryUnit - poetryField - formatted-subtitle', () => {
            let responseData = { data: slateTestData.poetryTitleResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let poetryField = 'formatted-subtitle',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0],
                ElementIndex = '0-1';
            const spyFunction = jest.spyOn(canvasActions, 'createPoetryUnit');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            canvasActions.createPoetryUnit(poetryField, parentElement, cb, ElementIndex, slateManifestURN)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-7.2-createPoetryUnit - poetryField - creditsarray', () => {
            let responseData = { data: slateTestData.poetryTitleResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let poetryField = 'creditsarray',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0],
                ElementIndex = '0-4';
            const spyFunction = jest.spyOn(canvasActions, 'createPoetryUnit');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            canvasActions.createPoetryUnit(poetryField, parentElement, cb, ElementIndex, slateManifestURN)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-7.3-createPoetryUnit - poetryField - formatted-title', () => {
            let responseData = { data: slateTestData.poetryTitleResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let poetryField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0],
                ElementIndex = '0-1';
            const spyFunction = jest.spyOn(canvasActions, 'createPoetryUnit');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            canvasActions.createPoetryUnit(poetryField, parentElement, cb, ElementIndex, slateManifestURN)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-7.4-createPoetryUnit - poetryField - else case', () => {
            let responseData = { data: slateTestData.poetryTitleResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            }
            let poetryField = 'formatted-title ',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0],
                ElementIndex = '0-1';
            const spyFunction = jest.spyOn(canvasActions, 'createPoetryUnit');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            canvasActions.createPoetryUnit(poetryField, parentElement, cb, ElementIndex, slateManifestURN)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-7.5-createPoetryUnit - catch block', () => {
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    }
                };
            },
                dispatch;
            let poetryField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0],
                ElementIndex = '0-1';
            const spyFunction = jest.spyOn(canvasActions, 'createPoetryUnit');
            axios.post = jest.fn(() => Promise.reject({}));
            canvasActions.createPoetryUnit(poetryField, parentElement, cb, ElementIndex, slateManifestURN)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            expect(config.savingInProgress).toBe(false);
            spyFunction.mockClear();
        })
    });
    it('Test 8-setSlateLength', () => {
        let expectedResult = {
            type: 'SET_SLATE_LENGTH',
            payload: 25
        }
        let result = canvasActions.setSlateLength(25)
        expect(result).toEqual(expectedResult);
    })
    describe('Test-9- fetchLearnosityContent', () => {
        it('Test-9.1-fetchLearnosityContent', () => {
            let dispatch = jest.fn();
            let responseData = { data: slateTestData.learnosityData }
            const spyFunction = jest.spyOn(canvasActions, 'fetchLearnosityContent')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchLearnosityContent()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            expect(dispatch).not.toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-9.2-fetchLearnosityContent - Catch Block', () => {
            let dispatch = jest.fn();
            const spyFunction = jest.spyOn(canvasActions, 'fetchLearnosityContent')
            axios.get = jest.fn(() => Promise.reject({}))
            canvasActions.fetchLearnosityContent()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            expect(dispatch).not.toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-10- fetchProjectLFs', () => {
        config.book_title = 'Dev_LF_Ext_01'
        it('Test-10.1-fetchProjectLFs', () => {
            let expectedPayload = {
                cypressLF: {
                    "urn": "urn:pearson:goalframework:9bc2ab38-3147-492a-9e93-3ec735e54a9d",
                    "label": {
                        "en": "ev_LF_Ext_0"
                    },
                    "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/higher-education"
                },
                externalLF: [{
                    "urn": "urn:pearson:goalframework:73e75aaa-1d1d-4414-a042-9a45213a98ef",
                    "label": {
                        "en": "The Sociology Project 2.5"
                    },
                    "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/ukschools"
                }]
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe('PROJECT_LEARNING_FRAMEWORKS');
                expect(obj.payload.apiStatus).toEqual(expectedPayload);
            }
            let responseData = { data: slateTestData.learningFrameworksApiResponse, status: 200 }
            const spyFunction = jest.spyOn(canvasActions, 'fetchProjectLFs')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchProjectLFs()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.2-fetchProjectLFs Only External LF', () => {
            let expectedPayload = {
                cypressLF: {},
                externalLF: [{
                    "urn": "urn:pearson:goalframework:73e75aaa-1d1d-4414-a042-9a45213a98ef",
                    "label": {
                        "en": "The Sociology Project 2.5"
                    },
                    "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/ukschools"
                }]
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe('PROJECT_LEARNING_FRAMEWORKS');
                expect(obj.payload.apiStatus).toEqual(expectedPayload);
            }
            let responseData = { data: slateTestData.learningFrameworksApiResponse_ExtLF, status: 200 }
            const spyFunction = jest.spyOn(canvasActions, 'fetchProjectLFs')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchProjectLFs()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.3-fetchProjectLFs Only Cypress LF', () => {
            let expectedPayload = {
                cypressLF: {
                    "urn": "urn:pearson:goalframework:9bc2ab38-3147-492a-9e93-3ec735e54a9d",
                    "label": {
                        "en": "ev_LF_Ext_0"
                    },
                    "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/higher-education"
                },
                externalLF: []
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe('PROJECT_LEARNING_FRAMEWORKS');
                expect(obj.payload.apiStatus).toEqual(expectedPayload);
            }
            let responseData = { data: slateTestData.learningFrameworksApiResponse_CyLF, status: 200 }
            const spyFunction = jest.spyOn(canvasActions, 'fetchProjectLFs')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchProjectLFs()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.4-fetchProjectLFs - Catch Block', () => {
            let expectedPayload = {}
            let dispatch = (obj) => {
                expect(obj.type).toBe('PROJECT_LEARNING_FRAMEWORKS');
                expect(obj.payload.apiStatus).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(canvasActions, 'fetchProjectLFs')
            axios.get = jest.fn(() => Promise.reject({}))
            canvasActions.fetchProjectLFs()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-11- getProjectDetails', () => {
        it('Test-11.1 Get Project Details - then Block', async () => {
            let firstResponseData = {
                "data": {
                    "lineOfBusiness":"ukschools"
                }
            }
            let lineOfBusiness = "ukschools"
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.resolve(firstResponseData))
            await canvasActions.getProjectDetails(lineOfBusiness)(dispatch)
            expect(dispatch).toHaveBeenCalled();
        })

        it('Test-11.2 Get Project Details - catch Block', async () => {
            let firstResponseData = { }
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.reject(firstResponseData))
            await canvasActions.getProjectDetails()(dispatch)
            expect(dispatch).not.toHaveBeenCalled();
        })

        it('Test-11.3 Get LOB Data - then Block', async () => {
            let secondResponseData = {
                'playscript': 'true',
                'discussion': 'true'
            }
            let lineOfBusiness = "ukschools"
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.resolve(secondResponseData))
            await canvasActions.getProjectDetails(lineOfBusiness)(dispatch)
            expect(dispatch).toHaveBeenCalled();
        })

        it('Test-11.4 Get LOB Data - catch Block' , async () => {
            let secondResponseData = { }
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.reject(secondResponseData))
            await canvasActions.getProjectDetails()(dispatch)
            expect(dispatch).not.toHaveBeenCalled();
        })
    });
});