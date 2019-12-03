import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
//import rootReducer from '../../../src/Appstore/rootReducer.js';
import moxios from 'moxios';
import * as actions from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions';
import  mockData  from "../../../src/appstore/mockdata.js";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let  initialState = {
    appStore:{slateLevelData:mockData},
    glossaaryFootnoteValue:{ "type":"","popUpStatus":false}
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
let responseData = {};
jest.mock('../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                appStore:{slateLevelData:mockData},
                glossaryFootnoteReducer:{elementIndex:1}
            }
        },
        dispatch:(obj)=>{
            responseData = obj;
            console.log("object123456---",obj);
            return jest.fn();
        }
    }
})

describe('Tests commentsPanel action', () => {
    beforeAll(() => {
        Object.defineProperty(global, 'document', {
            getElementById:()=>{
                return {innerHTML:'tests'}
            }
        });
      })
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
             glossaaryFootnoteValue:{ "type":"","popUpStatus":false},
             appStore:{slateLevelData:mockData},
        };
    });
 

   it('glossaaryFootnotePopup glossary---', async() => {
        let result = await actions.glossaaryFootnotePopup(true,"Glossary",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','figure','01-21-1-23-21','image','term text--');
        result(store.dispatch).then((item)=>{
            expect(typeof(item)).toEqual('object');
            expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        }).catch((err)=>{
            expect(err).toEqual(err)
        });
   });
   it('glossaaryFootnotePopup glossary---if element type not defined', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"Glossary",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','',0,'image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual('image')
    }).catch((err) =>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote---', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"Footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','0-1-2223','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual('image')
    }).catch((err)=>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote---', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','',0,'image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual('image');
    }).catch((err)=>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when index in less than3 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','12-12-121-2','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("12-12-121-2-12")
    }).catch((err)=>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when index in less than3 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','12-12-121-2-12-32','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual(0)
    }).catch((err) =>{
     expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 4 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','12-12-121-2','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual(0)
    }).catch((err) =>{
     expect(err).toEqual(err)
    });
   });

   describe('testing saveGlossaryAndFootnote ',() => {
    xit('testing new func', () => {
        actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','image'); 
       });
       xit('glossaryfootnoteid undefined', () => {
        actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure',undefined,'FOOTNOTE','apple','fruit','image'); 
       });
   })

})

