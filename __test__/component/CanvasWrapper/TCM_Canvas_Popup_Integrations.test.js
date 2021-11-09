import axios from "axios"
import { handleTCM, tcmButtonHandler, closeTcmPopup } from '../../../src/component/CanvasWrapper/TCM_Canvas_Popup_Integrations';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {}
let store = mockStore(() => initialState);
const element = {"id":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"dsads"},"html":{"text":"<p class=\"paragraphNumeroUno\">dsads</p>","footnotes":{},"glossaryentries":{}},"versionUrn":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","contentUrn":"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442"}
const index = 0

jest.mock('../../../src/config/config.js', () => ({
    currentSlateUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    currentProjectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    TCM_CANVAS_POPUP_DATA: "https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    isSavingElement: false
}))
jest.mock('axios');

describe('Testing handleTCM function to call fetchAllDataMapper function', () => {
    it('Test-handleTCM if latestPendingTransaction data is present', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsads</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsads\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Pending","changeTime":"1625820466940","lastUpdatedTimestamp":"1625820466940","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })
    it('Test-handleTCM if latestPendingTransaction and latestAcceptedTransaction data is present', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Pending","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820563474","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"},"latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsads</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsads\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820466940","lastUpdatedTimestamp":"1625820551433","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })

    it('Test-handleTCM if latestAcceptedTransaction data is present', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820789835","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })

    it('Test-tcmButtonHandler function', () => {
        const res = {}
        axios.patch = jest.fn(() => Promise.resolve(res)); 
        store.dispatch(tcmButtonHandler())
    })
    it('Test-closeTCMPopup function', () => {
        store.dispatch(closeTcmPopup())
    })
});

   