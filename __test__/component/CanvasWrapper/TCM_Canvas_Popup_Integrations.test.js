import axios from "axios"
import { handleTCM, tcmButtonHandler, closeTcmPopup } from '../../../src/component/CanvasWrapper/TCM_Canvas_Popup_Integrations';
import thunk from 'redux-thunk';
import config from '../../../src/config/config';
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
        const element = {"id":"urn:pearson:work:cde78307-24c9-4e0d-676-05231ee69b45","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"dsads"},"html":{"text":"<p class=\"paragraphNumeroUno\">dsads</p>","footnotes":{},"glossaryentries":{}},"versionUrn":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","contentUrn":"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442"}
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsads</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsads\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Pending","changeTime":"1625820466940","lastUpdatedTimestamp":"1625820466940","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })
    it('Test-handleTCM if latestPendingTransaction data is present +', () => {
        const element = {"id":"urn:pearson:work:cde78307-24c9-4e0d-676-05231ee69b45","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"dsads"},"html":{"text":"<p class=\"paragraphNumeroUno\">dsads</p>","footnotes":{},"glossaryentries":{}},"versionUrn":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","contentUrn":"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442"}
        const res = {data : [{"elemURN":"urn+:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsads</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsads\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Pending","changeTime":"1625820466940","lastUpdatedTimestamp":"1625820466940","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })
    it('Test-handleTCM if latestPendingTransaction and latestAcceptedTransaction data is present', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Pending","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820563474","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"},"latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsads</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsads\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820466940","lastUpdatedTimestamp":"1625820551433","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })
    it('Test-handleTCM if elemURN.length > 1', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"changeTime": "1625810563474"},"latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45"}},{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"changeTime": "1625820563074",},"latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))
    })
    it('Test-handleTCM if elemURN.length>1 -> if for getLatestPendingOrAccepted > if', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"changeTime": "1625810563474"},"latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","changeTime": "1625820563074"}},{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"changeTime": "1625820563074",},"latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))
    })
    it('Test-handleTCM if elemURN.length>1 -> else', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"changeTime": "1625820563474"}},{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{"changeTime": "1625820563074",}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))
    })
    it('Test-handleTCM if elemURN.length>1 -> else branch coverage', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45"}},{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))
    })
    it('Test-handleTCM for error', () => {
        const res = {data : []}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })
    const latestPendingTransaction = {
        "elemSURN": "urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45",
        "elemSnapshot": "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
        "elemWIPData": "{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}",
        "elementType": "P",
        "elementEditor": "C5, C5 Test02",
        "changeType": "test",
        "changeStatus": "Pending",
        "changeTime": "1625820563474",
        "lastUpdatedTimestamp": "1625820563474",
        "slateType": "slate",
        "slateID": "urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"
    }
    it('Test-handleTCM if latestPendingTransaction is present and latestAcceptedTransaction data is not present', () => {
        axios.get = jest.fn(() => Promise.resolve({"data":[{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{...latestPendingTransaction, "changeType":"Update"}}]}));
        store.dispatch(handleTCM(element, index))       
    })
    it('Test-handleTCM if latestPendingTransaction is present and latestAcceptedTransaction data is not present > create', () => {
        axios.get = jest.fn(() => Promise.resolve({"data":[{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{...latestPendingTransaction, "changeType":"create"}}]}));
        store.dispatch(handleTCM(element, index))       
    })
    it('Test-handleTCM if latestPendingTransaction is present and latestAcceptedTransaction data is not present > delete', () => {
        axios.get = jest.fn(() => Promise.resolve({"data":[{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestPendingTransaction":{...latestPendingTransaction, "changeType":"delete"}}]}));
        store.dispatch(handleTCM(element, index))       
    })
    

    it('Test-handleTCM if latestAcceptedTransaction data is present', () => {
        config.tempSlateManifestURN = 'abc'
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820789835","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })

    it('Test-handleTCM if latestAcceptedTransaction data is present', () => {
        config.tempSlateManifestURN = 'abc'
        const res = {data : [{"elemURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45"}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index))       
    })

    it('Test-handleTCM if latestAcceptedTransaction data is reject', () => {
        config.tempSlateManifestURN = 'abc'
        axios.get = jest.fn(() => Promise.reject());
        store.dispatch(handleTCM(element, index))       
    })

    it('Test-handleTCM if latestAcceptedTransaction data is present +', () => {
        const res = {data : [{"elemURN":"urn:pearson:work:+cde78307-24c9-4e0d-b676-05231ee69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820789835","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}, 
        {"elemURN":"urn+:pearson:work:+cde78307-24c9-4e0d-b676-05231ede69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231eed69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676d-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-bd676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820789835","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index, true, 'urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45'))       
    })

    it('Test-handleTCM if latestAcceptedTransaction data is present isSavingElement tcmslatemanifest', () => {
        config.isSavingElement = true
        config.tcmslatemanifest = 'abc'
        const res = {data : [{"elemURN":"+urn:pearson:work:+cde78307-24c9-4e0d-b676-05231ee69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820789835","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}, 
        {"elemURN":"urn:pearson:work:+cde78307-24c9-4e0d-b676-05231ede69b45","latestAcceptedTransaction":{"elemSURN":"urn:pearson:work:cde78307-24c9-4e0d-b676-05231eed69b45","elemSnapshot":"{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">dsadsa</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}","elemWIPData":"{\"id\":\"urn:pearson:work:cde78307-24c9-4e0d-b676d-05231ee69b45\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"dsadsa\"},\"versionUrn\":\"urn:pearson:work:cde78307-24c9-4e0d-bd676-05231ee69b45\",\"contentUrn\":\"urn:pearson:entity:39946858-117e-405c-8c69-e1afb2302442\"}","elementType":"P","trackChangeApprover":"C5 Test02 C5","elementEditor":"C5, C5 Test02","changeType":"Update","changeStatus":"Accepted","changeTime":"1625820563474","lastUpdatedTimestamp":"1625820789835","slateType":"slate","slateID":"urn:pearson:manifest:2cf2dc69-3e52-43f9-a412-737ff7d8f55b"}}]}
        axios.get = jest.fn(() => Promise.resolve(res));
        store.dispatch(handleTCM(element, index, true, 'urn:pearson:work:cde78307-24c9-4e0d-b676-05231ee69b45'))       
    })


    it('Test-tcmButtonHandler function', () => {
        const res = {}
        axios.patch = jest.fn(() => Promise.resolve(res)); 
        store.dispatch(tcmButtonHandler())
    })
    it('Test-tcmButtonHandler function tempSlateManifestURN', () => {
        config.tcmslatemanifest = null
        config.tempSlateManifestURN = 'abc'
        const res = {}
        axios.patch = jest.fn(() => Promise.resolve(res)); 
        store.dispatch(tcmButtonHandler())
    })
    it('Test-tcmButtonHandler function slateManifestURN', () => {
        config.tcmslatemanifest = 'abc'
        config.tempSlateEntityURN = 'abc'
        const res = {}
        axios.patch = jest.fn(() => Promise.resolve(res)); 
        store.dispatch(tcmButtonHandler())
    })
    it('Test-tcmButtonHandler function tempSlateManifestURN', () => {
        config.tcmslatemanifest = null
        config.tempSlateManifestURN = null
        config.slateManifestURN = 'abc'
        const res = {}
        axios.patch = jest.fn(() => Promise.resolve(res)); 
        store.dispatch(tcmButtonHandler())
    })
    it('Test-tcmButtonHandler function reject', () => {
        config.tempSlateEntityURN = 'abc'
        axios.patch = jest.fn(() => Promise.reject()); 
        store.dispatch(tcmButtonHandler())
    })
    it('Test-closeTCMPopup function', () => {
        store.dispatch(closeTcmPopup())
    })
});

   