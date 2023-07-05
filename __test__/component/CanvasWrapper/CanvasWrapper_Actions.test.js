/**************************Import Plugins**************************/
import axios from 'axios';
import { JSDOM } from 'jsdom'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
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
    OEP_DISCUSSION,
    SET_PROJECT_SHARING_ROLE,
    SET_PROJECT_SUBSCRIPTION_DETAILS,
    OWNERS_SUBSCRIBED_SLATE,
    GET_TCM_RESOURCES,
    SUBSCRIBERS_SUBSCRIBED_SLATE,
    SET_TOC_SLATE_LABEL
} from '../../../src/constants/Action_Constants';
import config from '../../../src/config/config.js';
import * as canvasActions from '../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
/*************************Import Test Data*************************/
import { slateTestData } from './mockData.js';
import { PROJECT_SHARING_ROLE } from '../../../src/constants/IFrameMessageTypes';
/**********************Mock Helper Functions***********************/
jest.mock('axios');
jest.mock('../../../src/constants/IFrameMessageTypes.js', () => {
    return {
        HideLoader: jest.fn()
    }
});
jest.mock('../../../src/js/getAllSlatesData.js', () => {
    return {
        fetchAllSlatesData: jest.fn(),
        setCurrentSlateAncestorData: jest.fn(),
        fetchAnySlateData: jest.fn()
    }
});
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshot_Actions', () => {
    return {
        tcmSnapshot: jest.fn(),
        handleTCMData: jest.fn(),
        sendElementTcmSnapshot: jest.fn()
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
        createTitleSubtitleModel: ()=>{
            return "<p><label>LABEL&nbsp;</label>TITLE</p>"
        },
        requestConfigURI: jest.fn(),
        createLabelNumberTitleModel: jest.fn()
    }
});
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshots_Utility', () => {
    return {
        tcmSnapshotsForCreate: jest.fn()
    }
});
jest.mock('../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentActions', () => {
    return {
        fetchAssessmentMetadata: jest.fn(),
        resetAssessmentStore: jest.fn()
    }
});
jest.mock('../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentUtility', () => {
    return {
        isElmLearnosityAssessment: ()=>{return true}
    }
});

jest.mock('../../../src/component/ShowHide/ShowHide_Helper', () => {
    return {
        getShowHideElement: () => {
            return {
                type: 'showhide', 
                interactivedata: {
                    "postertextobject": [
                        {
                            "type": "element-authoredtext",
                            "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                            "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f",
                            "versionUrn":"urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
                        }
                    ]
                }
            }
        },
        indexOfSectionType: () => {return "postertextobject"}
    }
})
/*********************Declare Common Variables**********************/
const cb = jest.fn();
config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
config.projectUrn = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
config.parentEntityUrn = "bodyMatter"
config.totalPageCount = 0
config.tcmStatus = true
describe('|Testing ----------------------[ CanvasWrapper_Actions ]----------------------|', () => {
    describe('Test-1- fetchElementTag', () => {
        it('Test-1.1-fetchElementTag - Blocklist', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({...activeElement, type:'manifestlist'}, '0-0-0');
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
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
        it('Test-1.10-fetchElementTag - Opener Element: no bgimage altext and longdescription', () => {
            let activeElement = { type: 'openerelement', backgroundimage: { alttext: "", longdescription: "" } };
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
        it('Test-1.18-fetchElementTag - Handwriting', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[12];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 10);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('HS');
            spyFunction.mockClear()
        })
        it('Test-1.19-fetchElementTag - element-learningobjectivemapping', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[13];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 13);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('LO');
            spyFunction.mockClear()
        })
        it('Test-1.20-fetchElementTag - element-generateLOlist', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[14];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 14);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('MA');
            spyFunction.mockClear()
        })
        it('Test-1.21-fetchElementTag - element-learningobjectives', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[15];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 15);
            expect(spyFunction).toHaveBeenCalled();
            // expect(spyFunction).toHaveReturnedWith('HS');
            spyFunction.mockClear()
        })
        it('Test-1.22-fetchElementTag - element-dialogue', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[16];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 16);
            expect(spyFunction).toHaveBeenCalled();
            // expect(spyFunction).toHaveReturnedWith('HS');
            spyFunction.mockClear()
        })
        it('Test-1.23-fetchElementTag - discussion', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[17];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 17);
            expect(spyFunction).toHaveBeenCalled();
            // expect(spyFunction).toHaveReturnedWith('HS');
            spyFunction.mockClear()
        })
        it('Test-1.24-fetchElementTag - designtype != Handwriting', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[18];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 18);
            expect(spyFunction).toHaveBeenCalled();
            // expect(spyFunction).toHaveReturnedWith('HS');
            spyFunction.mockClear()
        })

        it('Test-1.25-fetchElementTag - element type is group', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[20];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 20);
            expect(spyFunction).toHaveBeenCalled();
            // expect(spyFunction).toHaveReturnedWith('HS');
            spyFunction.mockClear()
        })
        it('Test-1.25-fetchElementTag - element type is groupedcontent and subtype is tab', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[21];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 21);
            expect(spyFunction).toHaveBeenCalled();
            // expect(spyFunction).toHaveReturnedWith('HS');
            spyFunction.mockClear()
        })
        describe('isLearnosityProjectInfo', () => {
            beforeEach(()=>{
                jest.mock('../../../src/appstore/store.js', () => ({
                    getState: () => {
                        return {
                            appStore: {
                                isLearnosityProjectInfo: [{ "ItemBankName": "elm sandbox" }]
                            },
                            tcmReducer: {
                                tcmSnapshot: [{
                                    "txCnt": 1,
                                    "isPrevAcceptedTxAvailable": false,
                                    "elemURN": "urn:pearson:work:d5dd0c76-5b37-4370-ab84-a4d69b4f5056",
                                    "feedback": null
                                }]
                            }
                        };
                    }
                }));
            })
            it('Test-1.35-fetchElementTag - Assessment Element isLearnosityProjectInfo', () => {
                // const mockData = { "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"] }

                let activeElement = { type: 'figure', figuretype: 'assessment', html: { text: 'title' }, figuredata: { elementdata: { assessmentformat: 'learnosity', usagetype: "Test" } } };
                const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
                canvasActions.fetchElementTag(activeElement, 12);
                expect(spyFunction).toHaveBeenCalled();
                expect(spyFunction).toHaveReturnedWith('Qu');
                spyFunction.mockClear();
            })
        })
        it('Test-1.26-fetchElementTag - Poetry V2', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({...activeElement, numberedline: true, startlinenumber: "2"}, 0);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('PE');
            spyFunction.mockClear()
        })
        it('Test-1.27-fetchElementTag - showhide', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[0];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({type:"showhide",id:"test"}, 0);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('SH');
            spyFunction.mockClear()
        })
        it('Test-1.27-fetchElementTag - element-assessment', () => {
            let activeElement = { type: 'element-assessment', elementdata: { } };
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 0);
            expect(spyFunction).toHaveBeenCalled();
            expect(spyFunction).toHaveReturnedWith('P');
            spyFunction.mockClear()
        })
        it('Test-1.28-fetchElementTag - elementType - manifestlist - style', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({ ...activeElement, type: 'manifestlist', fontstyle: [], iconcolor: [], index: '0-0-0' });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.29-fetchElementTag - elementType - figure and figuretype - image', () => {
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({ ...activeElement, type: 'figure', figuretype: 'image', index: '0-0-0' });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.30-fetchElementTag - elementType - figure and figuretype - interactive', () => {
            const elementData = {
                ...activeElement, 
                type: 'figure', 
                figuretype: 'interactive',
                figuredata: {
                    alttext: 'alttext',
                    longdescription: 'longdescription '
                }
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({ ...elementData, index: '0-0-0' });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.30-fetchElementTag - elementType - figure and figuretype - interactive else case', () => {
            const elementData = {
                ...activeElement, 
                type: 'figure', 
                figuretype: 'interactive',
                figuredata: {
                    alttext: 'alttext',
                    longdescription: 'longdescription ',
                    interactivetype:'3rd-party',
                    interactiveid: "123",
                    intendedPlaybackMode:"test"
                }
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({ ...elementData, index: '0-0-0' });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.31-fetchElementTag - elementType - figure and figuretype - video', () => {
            const elementData = {
                ...activeElement, 
                type: 'figure', 
                figuretype: 'video',
                figuredata: {
                    srctype: 'internal'
                }
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({ ...elementData, index: '0-0-0' });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.32-fetchElementTag - elementType - figure and figuretype - video - srctype - empty', () => {
            const elementData = {
                ...activeElement, 
                type: 'figure', 
                figuretype: 'video',
                figuredata: {
                    srctype: ''
                }
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({ ...elementData, index: '0-0-0' });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.34-fetchElementTag - elementType - figure and figuretype - interactive', () => {
            const elementData = {
                ...activeElement, 
                type: 'figure', 
                figuretype: 'interactive',
                figuredata: {
                    alttext: '',
                    longdescription: '',
                    interactiveformat: 'mmi'
                }
            }
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[10];
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag({ ...elementData, index: '0-0-0' });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-1.35-fetchElementTag - Aside - no Subtype', () => {
            let activeElement = { type: 'element-aside', subtype: '', designtype: "", html: {title: '<p>Element Aside</p>'}};
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 8);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('Test-1.36-fetchElementTag - element-list - elementdata - subtype', () => {
            let activeElement = { type: 'element-list', subtype: '', designtype: "", elementdata: {subtype:''}};
            const spyFunction = jest.spyOn(canvasActions, 'fetchElementTag')
            canvasActions.fetchElementTag(activeElement, 8);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
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
        it('Test-2.3-fetchAuthUser - then - else cases', () => {
            let dispatch = jest.fn();
            let responseData = { data: slateTestData.fetchAuthUserResponse2 }
            const spyFunction = jest.spyOn(canvasActions, 'fetchAuthUser')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchAuthUser()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            expect(dispatch).not.toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-3- setActiveElement', () => {
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

        it('Test-3.2.1-setActiveElement - Figure Image at Slate Level: subType conditional coverage', () => {
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
            let activeElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[3];
            const spyFunction = jest.spyOn(canvasActions, 'setActiveElement')
            canvasActions.setActiveElement(activeElement, 3, {}, {}, true, undefined)(dispatch, getState);
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
                        parentUrn: {},
                        asideData:{
                            type:'showhide'
                        }
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
                        parentUrn: {},
                        asideData:{
                            type:'showhide'
                        }
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
                        parentUrn: {},
                        asideData:{
                            type:'showhide'
                        }
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
                        parentUrn: {},
                        asideData:{
                            type: 'showhide'
                        }
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

        it('Test-3.5.3-setActiveElement - Interactive Elemente in WE-Section Break covering getPathOfFigureAsset function', () => {
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
                        parentUrn: {},
                        asideData: {
                            type: 'showhide'
                        }
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
        it('Test-3.5.5-setActiveElement - Interactive Element at Slate Level when updateFromC2Flag is true', () => {
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
            canvasActions.setActiveElement(activeElement, 6, {}, {}, true, undefined)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
        it('Test-3.6-setActiveElement - deafult params', () => {
            let oldPath = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";
            let dispatch = (obj) => {
                if (obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual({
                        elementType: 'element-authoredtext',
                        primaryOption: 'primary-paragraph',
                        secondaryOption: 'secondary-paragraph',
                        elementId: undefined,
                        index: 0,
                        elementWipType: undefined,
                        // toolbar: ['insertMedia'],
                        tag: 'P'
                    }
                    );
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
            canvasActions.setActiveElement()(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        })
    });
    describe('Test-4.B- fetchSlateData',()=>{
        const spy = jest.spyOn(Storage.prototype, 'setItem');
        it('Test-4.B.1-fetchSlateData - calledFrom - versioning slate', () => {
            config.cachedActiveElement={}
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c1"
            config.fromTOC = false

            let responseData = {
                data: {
                    "id": "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                    "type": "manifest",
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                    "versionUrn": "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                    "contentUrn": "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                    "contents": {
                        "bodymatter": []
                    },
                    pageNo: "2",pageCount: "1", pageLimit: "25"
                }
            }
            const newSlateData = {
                "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": responseData.data
            }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === FETCH_SLATE_DATA) {
                    expect(obj.payload).toEqual(newSlateData);
                }
                else if (obj && obj.type === SET_ACTIVE_ELEMENT) {
                    expect(obj.payload).toEqual({});
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: newSlateData,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9',
                entityURN = 'urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294',
                page = 3,
                versioning = '',
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.10-fetchSlateData - Popup Slate', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN =  "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"
            let responseData = { data: newPopupData }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: newPopupData,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670',
                entityURN = 'urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677',
                page = 1,
                versioning = false,
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.11-fetchSlateData - Aside versioning if', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "element-aside",
                    indexes: [11,0,2,1],
                    parent:{type : 'groupedcontent'}
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.12-fetchSlateData - Aside versioning else', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "element-aside",
                    indexes: [8],
                    parent:{type : 'groupedcontent'}
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.13-fetchSlateData - showhide versioning if', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "showhide",
                    indexes: 8
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.14-fetchSlateData - showhide versioning else', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "showhide",
                    indexes: [8,1]
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.14-fetchSlateData - showhide versioning else if', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "showhide",
                    index: "8-1"
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.14-fetchSlateData - manifestlist versioning else if - number index', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "manifestlist",
                    index: 1,
                    parent:{
                        type:'showhide',
                        showHideType:true
                    }
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.14-fetchSlateData - manifestlist versioning else if - string index', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "manifestlist",
                    index: "0-1"
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.14-fetchSlateData - manifestlist versioning else if - array index', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "manifestlist",
                    indexes: ["0","1"]
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.14-fetchSlateData - manifestlist versioning else if - null index', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "manifestlist",
                    indexes: 1,
                    parent:{
                        showHideType:{},
                        type:'showhide',
                    }
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.15-fetchSlateData - tabbed2column', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "groupedcontent",
                    indexes: [11,0,2,1],
                    parent:{type : 'groupedcontent'},
                    subtype: 'tab'
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.16-fetchSlateData - tabbed2column when indexes not provided', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2", pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
            let responseData = { data: slateTestData.slateData1 }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
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
            let manifestURN = "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                entityURN = "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
                page = 1,
                versioning = {
                    type: "groupedcontent",
                    index:'0-0-0-0',
                    parent:{type : 'groupedcontent'},
                    subtype: 'tab'
                },
                calledFrom = '',
                versionPopupReload = undefined
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    })
    describe('Test-4- fetchSlateData', () => {
        it('Test-4.1-fetchSlateData - Assessment Slate', () => {
            config.slateType ="assessment"
            let responseData = {
                data: {
                    "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": {
                        id: "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                        type: "element-assessment",
                        contents: {
                            bodymatter: [{
                                type: "element-assessment", elementdata: { assessmentformat: "puf", assessmentid: "test" }
                            }]
                        }
                    }
                }
            }
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
        it('Test-4.1-fetchSlateData - Assessment Slate from RC', () => {
            config.slateType ="assessment"
            let responseData = {
                data: {
                    "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": {
                        id: "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                        type: "element-assessment",
                        contents: {
                            bodymatter: [{
                                type: "element-assessment", elementdata: { assessmentformat: "puf", assessmentid: "test" }
                            }]
                        }
                    }
                }
            }
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
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload, true)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })

        it('Test-4.1-fetchSlateData - Pdf Slate joined pdf', () => {
            config.slateType ="pdfslate"
            let responseData = {
                data: {
                    "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": {
                        id: "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                        type: "element-pdf",
                        contents: {
                            bodymatter: [{
                                type: "element-pdf", elementdata:{}
                            },{
                                type: "element-pdf", elementdata:{}
                            }]
                        }
                    }
                }
            }
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
                        isCypressPlusEnabled: true
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

        it('Test-4.1-fetchSlateData - Pdf Slate', () => {
            config.slateType ="pdfslate"
            let responseData = {
                data: {
                    "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": {
                        id: "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
                        type: "element-pdf",
                        contents: {
                        }
                    }
                }
            }
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
                        isCypressPlusEnabled: true
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

        config.slateType = "section"
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
                versioning = { ...slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8], [slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8]]: slateTestData.asideVersioning },
                calledFrom = '',
                versionPopupReload = false
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })

        it('Test-4.4-fetchSlateData - Aside Element inside S/H - Versioning', () => {
            let responseData = { data: { ...slateTestData.slateData1 } }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === AUTHORING_ELEMENT_UPDATE) {
                    expect(obj.payload).toEqual({ ...slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[19], [slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[19]]: slateTestData.asideVersioning });
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
            let manifestURN = 'urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02',
                entityURN = 'urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714',
                page = 0,
                versioning = {
                    type: 'element-aside', 
                    indexes: [19, 0, 0, 0],
                    parent: {type: 'showhide', showHideType: 'show'} 
                },
                calledFrom = '',
                versionPopupReload = false
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.5-fetchSlateData - Aside Element inside S/H - Versioning', () => {
            let responseData = { data: { ...slateTestData.slateData1 } }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === AUTHORING_ELEMENT_UPDATE) {
                    expect(obj.payload).toEqual({ ...slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[19], [slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[19]]: slateTestData.asideVersioning });
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
            let manifestURN = 'urn:pearson:manifest:ef6d234d-5965-4976-8e21-0e093c5ba7a0',
                entityURN = 'urn:pearson:entity:e1d634f7-3edf-4f57-9e45-a351ae35b2b6',
                page = 0,
                versioning = {
                    type: 'citations', 
                    indexes: [19, 0, 0, 0],
                    parent: {type: 'showhide', showHideType: 'show'} 
                },
                calledFrom = '',
                versionPopupReload = false
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })

        it('Test-4.8-fetchSlateData - Popup Slate - Versioning config.cachedActiveElement', () => {
            config.cachedActiveElement = {
                element: {
                    type: "popup",
                    id : "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2671"
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
                versionPopupReload = false
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            canvasActions.fetchSlateData(manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-4.8-fetchSlateData - Popup Slate - Versioning config.cachedActiveElement', () => {
            config.cachedActiveElement = {
                element: {
                    type: "manifest",
                    id : "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2671"
            let responseData = { data: { ...slateTestData.approvedSlate } }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.approvedSlate,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670',
                entityURN = 'urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677',
                page = 0,
                versioning = slateTestData.popupSlateLabelVersioning,
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
        it('Test-4.6-fetchSlateData - Popup Slate config.cachedActiveElement', () => {
            config.cachedActiveElement = {
                element: {
                    type: "popup",
                    id : "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"
                }
            }
            document.getElementsByClassName = () => { return {length: 1}}
            config.slateManifestURN = "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"
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
        it('Test-4.7-fetchSlateData - Popup Slate - Versioning config.cachedActiveElement', () => {
            config.cachedActiveElement = {
                element: {
                    type: "popup",
                    id : "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"
                }
            }
            config.slateManifestURN = "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2671"
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
        it('Test-4.10-fetchSlateData - Popup Slate', () => {
            const newPopupData = {
                "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670" : {
                    ...slateTestData.popupSlate["urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"],
                    pageNo: "2",pageCount: "1", pageLimit: "25"
                }
            }
            config.slateManifestURN =  "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670"
            let responseData = { data: newPopupData }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_PAGE_NUMBER) {
                    expect(obj.payload).toEqual({ pageNumberData: [], allElemPageData: [] });
                }
                else if (obj && obj.type === OPEN_POPUP_SLATE) {
                    expect(obj.payload).toEqual(newPopupData);
                }
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: newPopupData,
                        activeElement: {},
                    }
                };
            }
            let manifestURN = 'urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670',
                entityURN = 'urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677',
                page = 1,
                versioning = false,
                calledFrom = '',
                versionPopupReload = undefined
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
        config.tcmStatus = false;
        let slateManifestURN = 'urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9'
        it('Test-6.1-createPopupUnit - popupField - formatted-title', () => {
            let responseData = { data: slateTestData.popupLabelResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(ERROR_POPUP);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: {"urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670": slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"]},
                        activeElement: {},
                        isCypressPlusEnabled: true
                    },
                    tcmReducer: { tcmSnapshot: [{
                        "txCnt": 1,
                        "isPrevAcceptedTxAvailable": false,
                        "elemURN": "urn:pearson:work:d5dd0c76-5b37-4370-ab84-a4d69b4f5056",
                        "feedback": null
                    }]}
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
                expect(obj.type).toBe(ERROR_POPUP);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: {"urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670": slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"]},
                        activeElement: {},
                    },
                    tcmReducer: { tcmSnapshot: []}
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
                    },
                    tcmReducer: { tcmSnapshot: []}
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
                    },
                    tcmReducer: { tcmSnapshot: []}
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
                expect(obj.type).toBe(ERROR_POPUP);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    },
                    tcmReducer: { tcmSnapshot: []}
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
        config.tcmStatus = true;
        it('Test-6.6-createPopupUnit - Popup in WE', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData = { data: slateTestData.popupLabelResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(ERROR_POPUP);
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                    },
                    tcmReducer: { tcmSnapshot: []}
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
        // config.tcmStatus = false;
        it('Test-6.6-createPopupUnit - Popup in WE', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData = { data: slateTestData.popupLabelResponse }
            let dispatch = (obj) => {
                expect(obj.type).toBe(ERROR_POPUP);
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
        it('Test-9.1-fetchLearnosityContent - then', () => {
            let responseData = { data: slateTestData.learnosityData, status: 200 }
            let dispatch = (obj) => {
                expect(obj.type).toBe('LEARNOSITY_PROJECT_INFO');
                expect(obj.payload).toEqual(responseData.data);
            }
            const spyFunction = jest.spyOn(canvasActions, 'fetchLearnosityContent')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchLearnosityContent()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
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
        it('Test-9.3-fetchLearnosityContent - response status is not 200', () => {
            let dispatch = jest.fn();
            let responseData = { data: slateTestData.learnosityData, status: 201 }
            const spyFunction = jest.spyOn(canvasActions, 'fetchLearnosityContent')
            axios.get = jest.fn(() => Promise.resolve(responseData))
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
                expect(obj.payload).toEqual(expectedPayload);
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
                expect(obj.payload).toEqual(expectedPayload);
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
                expect(obj.payload).toEqual(expectedPayload);
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
        it('Test-10.5-fetchProjectLFs Response status is not 200', () => {
            let dispatch = jest.fn()
            let responseData = { data: slateTestData.learningFrameworksApiResponse_CyLF, status: 201 }
            const spyFunction = jest.spyOn(canvasActions, 'fetchProjectLFs')
            axios.get = jest.fn(() => Promise.resolve(responseData))
            canvasActions.fetchProjectLFs()(dispatch);
            expect(dispatch).not.toHaveBeenCalled();
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.6-fetchProjectLFs Only Cypress LF and no External LF', () => {
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
                expect(obj.payload).toEqual(expectedPayload);
            }
            config.book_title = "ev_LF_Ext_0"
            let responseData = { data: slateTestData.learningFrameworksApiResponse_CyLF, status: 200 }
            const spyFunction = jest.spyOn(canvasActions, 'fetchProjectLFs')
            axios.get = jest.fn(() => Promise.resolve(responseData))
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

        it('Test-11.5 Get Project Details - then Block for english discussion', async () => {
            let firstResponseData = {
                "data": {
                    "lineOfBusiness": "english"
                }
            }
            let lineOfBusiness = OEP_DISCUSSION
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.resolve(firstResponseData))
            await canvasActions.getProjectDetails(lineOfBusiness)(dispatch)
            expect(dispatch).toHaveBeenCalled();
        })
        it('Test-11.1 Get Project Details - then Block: With Parameters', async () => {
            let firstResponseData = {
                "data": {
                    "lineOfBusiness":"ukschools",
                    "parameters":{
                        enablenumberedandlabel:true
                    },
                    "elementPermissions":{
                        'playscript': 'true',
                        'discussion': 'true'}
                }
            }
            let discussionResponse = {
                "data":[]
            }
            let lineOfBusiness = "ukschools"
            let dispatch = jest.fn();
            axios.post.mockImplementation(() => Promise.resolve(discussionResponse))
            axios.get.mockImplementation(() => Promise.resolve(firstResponseData))
            await canvasActions.getProjectDetails(lineOfBusiness)(dispatch)
            expect(dispatch).toHaveBeenCalled();
        })
        it('Test-11.1 Get Project Details - then Block: With Parameters when enablenumberedandlabel is not as parameter', async () => {
            let firstResponseData = {
                "data": {
                    "lineOfBusiness":"ukschools",
                    "parameters":{
                        "abch":{abc:''}
                    }
                }
            }
            let lineOfBusiness = "ukschools"
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.resolve(firstResponseData))
            await canvasActions.getProjectDetails(lineOfBusiness)(dispatch)
            expect(dispatch).toHaveBeenCalled();
        })

        
    });
    describe('Test-12- tcmCosConversionSnapshot ', () => {
        it('Test-12.1 tcmCosConversionSnapshot  - then Block', async () => {
            let firstResponseData = {}
            let dispatch = jest.fn();
            axios.patch.mockImplementation(() => Promise.resolve(firstResponseData))
            const spyFunction = jest.spyOn(canvasActions, 'tcmCosConversionSnapshot')
            await canvasActions.tcmCosConversionSnapshot()(dispatch)
            expect(dispatch).not.toHaveBeenCalled();
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-12.2 tcmCosConversionSnapshot  - catch Block', async () => {
            let firstResponseData = {}
            let dispatch = jest.fn();
            axios.patch.mockImplementation(() => Promise.reject(firstResponseData))
            const spyFunction = jest.spyOn(canvasActions, 'tcmCosConversionSnapshot')
            await canvasActions.tcmCosConversionSnapshot()(dispatch)
            expect(dispatch).not.toHaveBeenCalled();
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    });
    describe('Test-12- fetchSlateAncestorData ', () => {
        it('Test-12.1 fetchSlateAncestorData', () => {
            let firstResponseData = {}
            let dispatch = jest.fn();
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        currentSlateAncestorData: {
                            ancestor: { title: 'ancestor-title', entityUrn: "urn" },
                            label: 'module'
                        }
                    }
                };
            }
            axios.patch.mockImplementation(() => Promise.resolve(firstResponseData))
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateAncestorData')
            canvasActions.fetchSlateAncestorData()(dispatch, getState)
            expect(dispatch).not.toHaveBeenCalled();
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Test-12.2 fetchSlateAncestorData  - catch Block', () => {
            let firstResponseData = {}
            let dispatch = (obj) => {
                expect(obj.type).toBe('SET_CURRENT_SLATE_DATA');
            }
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: slateTestData.slateData1,
                        activeElement: {},
                        currentSlateAncestorData: {
                            ancestor: { title: 'ancestor-title', entityUrn: "urn" },
                            label: 'module'
                        }
                    }
                };
            }
            let tocNode = {
                title: 'toc-title',
                entityUrn: "urn"
            }
            axios.patch.mockImplementation(() => Promise.reject(firstResponseData))
            const spyFunction = jest.spyOn(canvasActions, 'fetchSlateAncestorData')
            canvasActions.fetchSlateAncestorData(tocNode)(dispatch, getState)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    });
    describe('Test-13- appendCreatedElement', () => {
        let slateManifestURN = 'urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9'
        let dispatch = (obj) => {
            expect(obj.type).toBe(AUTHORING_ELEMENT_UPDATE);
        }
        let responseData = { ...slateTestData.popupLabelResponse }
        let getState = () => {
            return {
                appStore: {
                    slateLevelData: { "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"] },
                    activeElement: {},
                },
                tcmReducer: {
                    tcmSnapshot: [{
                        "txCnt": 1,
                        "isPrevAcceptedTxAvailable": false,
                        "elemURN": "urn:pearson:work:d5dd0c76-5b37-4370-ab84-a4d69b4f5056",
                        "feedback": null
                    }]
                }
            };
        }
        document.getElementById = () => {
            return {
                innerHTML: "label",
                innerText: "title"
            }
        }
        it('Test-13.1-appendCreatedElement - popupField - formatted-title', () => {
            let popupElementIndex = "1"

            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[1],
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, {elementdata: {text: ""}, html: {text: ""}})
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13.2-appendCreatedElement - popupField - formatted-subtitle', () => {
            let popupElementIndex = "1"

            let popupField = 'formatted-subtitle',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[1],
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            document.getElementById = () => {
                return {
                    innerHTML: "",
                    innerText: "title"
                }
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13.3-appendCreatedElement - Popup in Aside', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData2 = { ...slateTestData.popupLabelResponse }
            let popupField = 'formatted-titletitle',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[8].elementdata.bodymatter[4],
                popupElementIndex = '8-4-0',
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData2)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13.4-appendCreatedElement - Popup in WE', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData3 = { ...slateTestData.popupLabelResponse }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[9].elementdata.bodymatter[1].contents.bodymatter[4],
                popupElementIndex = '9-1-4-1',
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData3)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13.5-appendCreatedElement - Popup in WE:HEAD in 3C', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData2 = { ...slateTestData.popupLabelResponse }
            let popupField = 'formatted-titletitle',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[11].groupeddata.bodymatter[0].groupdata.bodymatter[2].elementdata.bodymatter[1],
                popupElementIndex = '11-0-2-1-0',
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData2)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13.6appendCreatedElement - Popup in WE:BODY in 3C', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData3 = { ...slateTestData.popupLabelResponse }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[11].groupeddata.bodymatter[0].groupdata.bodymatter[2].elementdata.bodymatter[2].contents.bodymatter[0],
                popupElementIndex = '11-0-2-2-0-0',
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData3)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })

        it('Test-13.7appendCreatedElement - Citation in S/H', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData3 = { ...slateTestData.CitationTitleResponse }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[19].interactivedata.show[0],
                popupElementIndex = '19-0-0-0',
                createdFromFootnote = undefined,
                cgTitleFieldData = {
                    asideData: {
                        parent: {
                            showHideType: 'show'
                        }
                    }
                };
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote,
                cgTitleFieldData
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData3)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13.7appendCreatedElement - Citation in S/H for conditional coverage', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData3 = { ...slateTestData.CitationTitleResponse }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[19].interactivedata.show[0],
                popupElementIndex = '19-0-0-0',
                createdFromFootnote = undefined,
                cgTitleFieldData = {};
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote,
                cgTitleFieldData
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData3)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13.8 appendCreatedElement - TB->Tab->AS/WE->HEAD->Popup', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData3 = { ...slateTestData.popupLabelResponse }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[22].groupeddata.bodymatter[0].groupdata.bodymatter[0].groupeddata.bodymatter[0].groupdata.bodymatter[0].elementdata.bodymatter[1],
                popupElementIndex = '22-0-0-0-1-0',
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData3)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
        it('Test-13. 9appendCreatedElement - TB->Tab->AS/WE->HEAD->Popup', () => {
            document.getElementById = () => {
                return {
                    innerText: "innerText",
                    innerHTML: "<p>innerHTML</p>"
                }
            }
            let responseData3 = { ...slateTestData.popupLabelResponse }
            let popupField = 'formatted-title',
                parentElement = slateTestData.slateData1["urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"].contents.bodymatter[23].groupeddata.bodymatter[0].groupdata.bodymatter[0].groupeddata.bodymatter[0].groupdata.bodymatter[0].elementdata.bodymatter[1].contents.bodymatter[1],
                popupElementIndex = '23-0-0-0-1-1-0',
                createdFromFootnote = undefined;
            let paramObj = {
                popupElementIndex,
                getState,
                slateManifestURN,
                parentElement,
                dispatch,
                cb,
                popupField,
                createdFromFootnote
            }
            const spyFunction = jest.spyOn(canvasActions, 'appendCreatedElement')
            canvasActions.appendCreatedElement(paramObj, responseData3)
            expect(spyFunction).toHaveBeenCalled()
            spyFunction.mockClear()
        })
    });
    describe('Test-14- fetchFigureDropdownOptions', () => {
        let getState = () => {
            return {
                autoNumberReducer:{
                    isAutoNumberingEnabled: true
                }
            }
        }
        it('Test-14.1 fetchFigureDropdownOptions - then Block', async () => {
            let firstResponseData = {
                "data": {
                    audio: ["No Label", "Custom"],
                    image: ["No Label", "Custom"],
                    smartlinks: ["No Label", "Custom"],
                    video: ["No Label", "Custom"]
                }
            }
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.resolve(firstResponseData))
            await canvasActions.fetchFigureDropdownOptions()(dispatch, getState)
            expect(dispatch).toHaveBeenCalled();
        })

        xit('Test-14.2 fetchFigureDropdownOptions - then Block with empty obj', async () => {
            let firstResponseData = {
                "data": {}
            }
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.resolve(firstResponseData))
            await canvasActions.fetchFigureDropdownOptions()(dispatch, getState)
            expect(dispatch).not.toHaveBeenCalled();
        })

        it('Test-14.3 fetchFigureDropdownOptions - catch Block', async () => {
            let firstResponseData = { }
            let dispatch = jest.fn();
            axios.get.mockImplementation(() => Promise.reject(firstResponseData))
            await canvasActions.fetchFigureDropdownOptions()(dispatch, getState)
            expect(dispatch).not.toHaveBeenCalled();
        })
    });
});

describe('Test-15 updateFigureDropdownValues', () => {
    let getState = () => {
        return {
            autoNumberReducer:{
                autoNumberReducer: {}
            }
        }
    }
    it('15.1 updateFigureDropdownValues when dropdownOptionsObj is given',() => {
        const data = {
            audio: [ 'No Label', 'Custom' ],
            image: [ 'No Label', 'Custom' ],
            smartlinks: [ 'No Label', 'Custom' ],
            video: [ 'No Label', 'Custom' ],
            abc:['No Label', 'Custom']
          }
        let dispatch = jest.fn()
        canvasActions.updateFigureDropdownValues(data)(dispatch,getState)
        expect(dispatch).toHaveBeenCalled();
    })
})
it('Test: setProjectSharingRole function', () => {
    const expectedActions = {
        type: SET_PROJECT_SHARING_ROLE,
        payload: 'abc'
    };
    const role = 'abc'
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }

    const spyFunction = jest.spyOn(canvasActions, 'setProjectSharingRole')
    canvasActions.setProjectSharingRole(role)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})
it('Test: setProjectSubscriptionDetails function', () => {
    const expectedActions = {
        type: SET_PROJECT_SUBSCRIPTION_DETAILS,
        payload: {}
    };
    const details = {}
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }

    const spyFunction = jest.spyOn(canvasActions, 'setProjectSubscriptionDetails')
    canvasActions.setProjectSubscriptionDetails(details)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})
it('Test: isOwnersSubscribedSlate function', () => {
    const expectedActions = {
        type: OWNERS_SUBSCRIBED_SLATE,
        payload: true
    };
    const showPopup = true
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }

    const spyFunction = jest.spyOn(canvasActions, 'isOwnersSubscribedSlate')
    canvasActions.isOwnersSubscribedSlate(showPopup)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})
it('Test: isSubscribersSubscribedSlate function', () => {
    const expectedActions = {
        type: SUBSCRIBERS_SUBSCRIBED_SLATE,
        payload: true
    };
    const showPopup = true
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }

    const spyFunction = jest.spyOn(canvasActions, 'isSubscribersSubscribedSlate')
    canvasActions.isSubscribersSubscribedSlate(showPopup)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})

it('Test: setTocSlateLabel function', () => {
    const expectedActions = {
        type: SET_TOC_SLATE_LABEL,
        payload: "slate"
    };
    const label = "slate"
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }

    const spyFunction = jest.spyOn(canvasActions, 'setTocSlateLabel')
    canvasActions.setTocSlateLabel(label)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})

it('Testing fetchLOBList - try block', async () => {
    const response = {
        status: 200,
        data : 
            {
                "id": "627b7445f9a4681ce8cd88e6",
                "key": "lob_details",
                "details": {
                    "listOfLob": [
                        {
                            "lineOfBusiness": "highernationalonline",
                            "label": "HNO",
                            "description": "Higher National Online"
                        },
                        {
                            "lineOfBusiness": "onlineblendedlearning",
                            "label": "OBL",
                            "description": "OBL/Online Blended Learning"
                        },
                        {
                            "lineOfBusiness": "onlineenglishproficiency",
                            "label": "OEP",
                            "description": "Online English Proficiency"
                        }
                    ]
                }
            }
        }
    const state = {}
    const store = mockStore(() => state);
    axios.get = jest.fn(() => Promise.resolve(response));
    await store.dispatch(canvasActions.fetchLOBList());
    const { type } = store.getActions()[0];
    expect(type).toBe('PROJECT_LOB_LIST');
});

it('Testing fetchLOBList - catch block', async () => {
    const state = {}
    const store = mockStore(() => state);
    const spyFunction = jest.spyOn(canvasActions,'fetchLOBList');
    axios.get = jest.fn(() => Promise.reject({}));
    await store.dispatch(canvasActions.fetchLOBList());
    expect(spyFunction).toHaveBeenCalled();
});

it('Test: resetLOBDiscussionItems function', async () => {
    const expectedActions = {
        type: "UPDATE_DISCUSSION_ITEMS",
        payload: []
    };
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }
    const spyFunction = jest.spyOn(canvasActions,'resetLOBDiscussionItems')
    canvasActions.resetLOBDiscussionItems([])(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})

it('Testing getLOBDiscussionItems - try block', async () => {
    const response = {
        status: 200,
        data : 
             [
                 {
                     "0":
                     {
                        "createTimeStamp": "2022-01-25T07:07:23.862Z",
                        "discussionUrn": "urn:pearson:gps:discussion:84486489-cd76-4bb9-b037-7ab3574bffcb",
                        'lineOfBusiness': "onlineblendedlearning",
                        "question": "What needs to be done to switch to the new discussion builder?",
                        'sampleAnswer': "They need to render in Vega when published.",
                        'smartLink': "",
                        'stimulus': "You previously learned all the parts and pieces that go into how discussions are currently built and heard about a new discussion builder.",
                        "subTitle": "PVS Section Title",
                        "title": "PVS_Discussion_Test",
                        "updatedTimeStamp": "2022-01-25T07:07:23.913Z"
                     }
                 }
                    ]
        }
    const state = {}
    const store = mockStore(() => state);
    axios.get = jest.fn(() => Promise.resolve(response));
    await store.dispatch(canvasActions.getLOBDiscussionItems());
    const { type } = store.getActions()[0];
    expect(type).toBe('UPDATE_DISCUSSION_ITEMS');
});

it('Testing getLOBDiscussionItems - try block', async () => {
    const response = {status: 500}
    const state = {}
    const store = mockStore(() => state);
    axios.get = jest.fn(() => Promise.resolve(response));
    await store.dispatch(canvasActions.getLOBDiscussionItems());
    const { type } = store.getActions()[0];
    expect(type).toBe('UPDATE_DISCUSSION_ITEMS');
});

it('Testing getLOBDiscussionItems - catch block', async () => {
    const expectedActions = {
        type: "NO_DISCUSSION_ITEMS",
        payload: true
    };
    let dispatch = (obj) => {
        expect(obj).toEqual(expectedActions);
    }
    const spyFunction = jest.spyOn(canvasActions,'getLOBDiscussionItems')
    canvasActions.getLOBDiscussionItems(true)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear()
})
