import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/component/MarkIndexPopup/MarkIndex_Action';
import  mockData  from "../../../src/appstore/mockdata.js";
import { JSDOM } from 'jsdom';

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
                markedIndexReducer:{"elementIndex": "0"}
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
       try{
            let result = await actions.markedIndexPopup(true,"Markedindex",'urn:pearson:work:2318c849-3144-44b0-ba2f-a30895fcef6b','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','element-authoredtext',2, undefined,'term text--', "element-authoredtext", undefined, true);
            const item = await result(store.dispatch);
            expect(item.type).toEqual('OPEN_MARKED_INDEX');
            expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual('<p>ndex</p>');
       } catch(err){
            expect(err).toEqual(err);
       }
   });

    it('should test marked index in 2C ', async() => {
       try{
            let result = await actions.markedIndexPopup(true,"Markedindex",'urn:pearson:work:2318c849-3144-44b0-ba2f-a30895fcef6b','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','element-authoredtext','6-0-0', undefined,'term text--', "element-authoredtext", undefined, true);
            const item = await result(store.dispatch);
            expect(item.type).toEqual('OPEN_MARKED_INDEX');
            expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual('<p>index</p>');
       } catch(err){
           console.log("Error: ", err)
            expect(err).toEqual(err);
       }
   });

   it('should test marked index in aside ', async() => {
    try{
         let result = await actions.markedIndexPopup(true,"Markedindex",'urn:pearson:work:2318c849-3144-44b0-ba2f-a30895fcef6b','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','element-authoredtext','7-0', undefined,'term text--', "element-authoredtext", undefined, true);
         const item = await result(store.dispatch);
         expect(item.type).toEqual('OPEN_MARKED_INDEX');
         expect(item.payload.markedIndexCurrentValue.firstLevel).toEqual('<p>index</p>');
    } catch(err){
         expect(err).toEqual(err);
    }
});
});

