import FetchAllDataMapper from '../../../src/component/TcmSnapshots/FetchAllDataMapper/FetchTcmDataMapper'
import axios from "axios"
import { handleTCM, tcmButtonHandler, closeTcmPopup } from '../../../src/component/CanvasWrapper/TCM_Canvas_Popup_Integrations';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {}
let store = mockStore(() => initialState);
const element = {id: "urn:pearson:work:c5f26743-d2d2-4664-b0df-9ac59e11642b"}

jest.mock('../../../src/config/config.js', () => ({
    currentSlateUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    currentProjectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    TCM_CANVAS_POPUP_DATA: "https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html",
    isSavingElement: false
}))
jest.mock('axios');

describe('Testing handleTCM function', () => {
    it('Test-handleTCM', () => {
        const res = { data : [{

        }]
        }
        const elementData = {elemURN: 'urn:pearson:work:c5f26743-d2d2-4664-b0df-9ac59e11642b'}
        const id = element.id
        expect(elementData.elemURN).toEqual(id)
        axios.get = jest.fn(() => Promise.resolve(res)); 
        store.dispatch(handleTCM(element))       
    })

    it('Test-tcmButtonHandler function', () => {
        const res = {
        }
        axios.patch = jest.fn(() => Promise.resolve(res)); 
        store.dispatch(tcmButtonHandler())
    })
    it('Test-closeTCMPopup function', () => {
        store.dispatch(closeTcmPopup())
    })
});

   