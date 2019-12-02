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
jest.mock('../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                appStore:{slateLevelData:mockData},
                glossaryFootnoteReducer:{elementIndex:1}
            }
        },
        dispatch:()=>{
            return jest.fn();
        }
    }
})

describe('Tests commentsPanel action', () => {

    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
             glossaaryFootnoteValue:{ "type":"","popUpStatus":false},
             appStore:{slateLevelData:mockData},
        };
    });
 

   it('glossaaryFootnotePopup glossary---', async() => {
        let result = await actions.glossaaryFootnotePopup(true,"Glossary",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','01-21-1-23','image','term text--');
        result(store.dispatch);

   });
   it('glossaaryFootnotePopup glossary---if element type not defined', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"Glossary",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','',0,'image','term text--');
    result(store.dispatch);

});
   it('await functionalityglossaaryFootnotePopup Footnote---', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"Footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','0-1-2223','image','term text--');
    result(store.dispatch);
   });
   it('await functionalityglossaaryFootnotePopup Footnote---', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','',0,'image','term text--');
    result(store.dispatch);
   });
   describe('testing saveGlossaryAndFootnote ',() => {
    xit('testing new func', () => {
        Object.defineProperty(global, 'document', {
            getElementById:()=>{
                return {innerHTML:'tests'}
            }
        });
        document.body.innerHTML =
            '<div>' +
            '  <div id="cypress-1-0" >Hello</div>' +
            '</div>';
        let el = document.getElementById('cypress-1-0');
        let newText = 'new inner text';
        el.innerText = newText;
        expect(el.innerText).toEqual(newText);
        actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','image'); 
       });
   })

})

