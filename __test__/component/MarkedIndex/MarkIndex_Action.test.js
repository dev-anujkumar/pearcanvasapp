import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/component/MarkIndexPopup/MarkIndex_Action';
import  mockData  from "../../../src/appstore/mockdata.js";
import { JSDOM } from 'jsdom';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
if (!global.Element.prototype.hasOwnProperty("innerText")) {
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });
}
let  initialState = {
    appStore:{
        slateLevelData:mockData,
        activeElement: {
            altText: "",
            elementId: "urn:pearson:work:282ddf7a-4e73-4cb7-814c-5873bc750184",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: 0,
            primaryOption: "primary-smartlink",
            secondaryOption: "secondary-interactive-smartlink-pdf",
            tag: "SL",
            toolbar: ["crossLinkingIcon", "assetpopover", "glossary"]
        }
    },
    markedIndexReducer: {"elementIndex" : "0"}
};


jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121ag0i",
    ASSET_POPOVER_ENDPOINT:"https://contentapis-staging.pearsoncms.net/manifest-api/",
    STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    PRODUCTAPI_ENDPOINT:"https://contentapis-staging.pearsoncms.net/product-api/",
    projectUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
    parentEntityUrn : "bodyMatter",
    slateType: "assessment"
}));

jest.mock('../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                appStore:{slateLevelData:mockData,
                    activeElement: {
                        altText: "",
                        elementId: "urn:pearson:work:282ddf7a-4e73-4cb7-814c-5873bc750184",
                        elementType: "element-interactive",
                        elementWipType: "figure",
                        index: 0,
                        primaryOption: "primary-smartlink",
                        secondaryOption: "secondary-interactive-smartlink-pdf",
                        tag: "SL",
                        toolbar: ["crossLinkingIcon", "assetpopover", "glossary"]
                    },
                    parentUrn : {
                        contentUrn : "urn:pearson:work:282ddf7a-4e73-4cb7-814c-5873bc750184"
                    }
                },
                markedIndexReducer:{
                    markedIndexValue: { "type": "", "popUpStatus": false },
                    markedIndexCurrentValue: '',
                    elementIndex: '',
                    markedIndexGlossary: {popUpStatus: false,  indexEntries: {}, markedIndexEntryURN: 'test', }
                }
            }
        },
        dispatch:(obj)=>{
            responseData = obj;
            return jest.fn();
        }
    }
})

describe('Tests marked index action', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
            markedIndexValue: { "type": "", "popUpStatus": false },
            markedIndexCurrentValue: '',
            elementIndex: '',
            markedIndexGlossary: {popUpStatus: false,  indexEntries: {}, markedIndexEntryURN: '', }
        };
    });
 

   it('should test marked index in para', async() => {
        let result = await actions.markedIndexPopup(true,"Markedindex",'urn:pearson:work:2318c849-3144-44b0-ba2f-a30895fcef6b','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','element-authoredtext',2, undefined,'<p>ndex</p>', "element-authoredtext", undefined, true);
        const item = await result(store.dispatch);
        expect(item.type).toEqual('OPEN_MARKED_INDEX');
        expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual('<p>ndex</p>');
   });

    it('should test marked index in 2C ', async() => {
        let result = await actions.markedIndexPopup(true,"Markedindex",'urn:pearson:work:2318c849-3144-44b0-ba2f-a30895fcef6b','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','element-authoredtext','7-0-0', undefined,'<p>index</p>', "element-authoredtext", undefined, true);
        const item = await result(store.dispatch);
        expect(item.type).toEqual('OPEN_MARKED_INDEX');
        expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual('<p>index</p>');
   });

   it('should test marked index in aside ', async() => {
        let result = await actions.markedIndexPopup(true,"Markedindex",'urn:pearson:work:2318c849-3144-44b0-ba2f-a30895fcef6b','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','element-authoredtext','8-0', undefined,'<p>index</p>', "element-authoredtext", undefined, true);
        const item = await result(store.dispatch);
        expect(item.type).toEqual('OPEN_MARKED_INDEX');
        expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual('<p>index</p>');
    });

    it('should test marked index in aside of 2C', async() => {
        let result = await actions.markedIndexPopup(true,"Markedindex",'urn:pearson:work:2318c849-3144-44b0-ba2f-a30895fcef6b','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','element-authoredtext','9-0-0-0', undefined,'index', "element-authoredtext", undefined, true);
        const item = await result(store.dispatch);
        expect(item.type).toEqual('OPEN_MARKED_INDEX');
        expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual('index');
    });

    it('should test markedIndexPopupOverGlossary - else case', () => {
        let result = actions.markedIndexPopupOverGlossary(true);
        const item = result(store.dispatch);
        expect(item.type).toEqual('OPEN_MARKED_INDEX_ON_GLOSSARY');
        expect(item.payload.markedIndexGlossary.markedIndexEntryURN).toEqual('test');
    });

    it('should test markedIndexPopupOverGlossary - if case', () => {
        let result = actions.markedIndexPopupOverGlossary(true, "<p>index23</p>", "<p>sub</p>", "urn:pearson:work:1c4d7884-139f-42f6-bce3-4327c2eb8ef5", true);
        const item = result(store.dispatch);
        expect(item.type).toEqual('OPEN_MARKED_INDEX_ON_GLOSSARY');
        expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual("<p>index23</p>");
    });

    it('should test updateMarkedIndexStore', () => {
        const glossaryFootElem = {
            contentUrn: "urn:pearson:entity:a7aeb98e-44ac-421d-84b6-fe547b51001f",
            elementdata: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "", glossaryentries: []},
            html:{
              assetsPopover: {},
              footnotes: {},
              glossaryentries:{
                "urn:pearson:work:83035b0c-7b6d-4830-ad8e-eedd2265f899": '{"term":"<p mark-index-id=\"urn:pearson:work:1c4d7884-139f-42f6-bce3-4327c2eb8ef5\">index</p>","definition":"<p></p>"}'
              },
              indexEntries:{
                "urn:pearson:work:1c4d7884-139f-42f6-bce3-4327c2eb8ef5": '{"firstLevelEntry":"<p>index23</p>","secondLevelEntry":"<p>sub</p>"}'
              },
              text: '<p class="paragraphNumeroUno"><dfn class="Pearson-Component GlossaryTerm" data-uri="urn:pearson:work:83035b0c-7b6d-4830-ad8e-eedd2265f899" mark-index-id="urn:pearson:work:1c4d7884-139f-42f6-bce3-4327c2eb8ef5">index</dfn></p>',
              id: "urn:pearson:work:a3b8b373-0969-4f79-9a75-14eb55826b3b",
              schema: "http://schemas.pearson.com/wip-authoring/element/1",
              type: "element-authoredtext",
              versionUrn: "urn:pearson:work:a3b8b373-0969-4f79-9a75-14eb55826b3b"
            }
          }
        const glossaaryFootnoteValue = {
            elementSubType: undefined,
            elementType: "element-authoredtext",
            elementWorkId: "urn:pearson:work:a3b8b373-0969-4f79-9a75-14eb55826b3b",
            glossaryTermText: "",
            glossaryfootnoteid: "urn:pearson:work:83035b0c-7b6d-4830-ad8e-eedd2265f899",
            poetryField: undefined,
            popUpStatus: true,
            type: "Glossary",
            typeWithPopup: "element-authoredtext",
          }
        let item = actions.updateMarkedIndexStore('<p mark-index-id="urn:pearson:work:1c4d7884-139f-42f6-bce3-4327c2eb8ef5">index</p>', glossaryFootElem, glossaaryFootnoteValue, 0);
        expect(item.type).toEqual('OPEN_MARKED_INDEX');
        expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual("<p>index23</p>");
    });

    it("Should test getCrossReferenceValues", async () => {
        const resp = {
            data: {
            "type": "index",
            "id": "urn:pearson:manifest:01aa10b8-c75d-48ae-ac26-4f17d297bad4",
            "schema": "http://schemas.pearson.com/cite/master-sequence/index/1.15",
            "versionUrn": "urn:pearson:manifest:01aa10b8-c75d-48ae-ac26-4f17d297bad4",
            "contentUrn": "urn:pearson:entity:97ee23ce-bdab-4135-9cd6-e4ac7eb47153",
            "items": [
                {
                    "schema": "http://schemas.pearson.com/cite/master-sequence/index/1.15#/definitions/indexitem",
                    "language": "en-us",
                    "direction": "lefttoright",
                    "firstlevelentry": {
                        "firstlevelentry": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "index"
                        },
                        "locations": [],
                        "secondlevelentries": [
                            {
                                "secondlevelentry": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "sub-index"
                                },
                                "locations": [
                                    {
                                        "parentElementEntityUrn": "urn:pearson:entity:161f43bf-8255-43a7-bf04-1479b624a43b",
                                        "parentElementVersionUrn": "urn:pearson:work:bc4716d7-6b45-467d-87c1-7324a6360c2e"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "schema": "http://schemas.pearson.com/cite/master-sequence/index/1.15#/definitions/indexitem",
                    "language": "en-us",
                    "direction": "lefttoright",
                    "firstlevelentry": {
                        "firstlevelentry": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "gloss"
                        },
                        "locations": [],
                        "secondlevelentries": [
                            {
                                "secondlevelentry": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "sub-gloss"
                                },
                                "locations": [
                                    {
                                        "parentElementEntityUrn": "urn:pearson:entity:f650261f-3c58-461b-a0c3-50b2b4d2d80e",
                                        "parentElementVersionUrn": "urn:pearson:work:d2287b04-5701-4c9e-8a6e-c2cde0087ed4"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }};
        axios.get.mockResolvedValue(resp);

        let result = actions.getCrossReferenceValues();
        let item = await result(store.dispatch);
        expect(item.type).toEqual('UPDATE_CROSS_REFERENCE_VALUES');
    })

    it("Should test getCrossReferenceValues - fail case", async () => {
        axios.get.mockRejectedValue("Something went wrong");

        let result = actions.getCrossReferenceValues();
        let item = await result(store.dispatch);
        expect(item.type).toEqual('UPDATE_CROSS_REFERENCE_VALUES');
    })
});