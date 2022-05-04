import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from "../../src/config/config"
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/component/PdfSlate/CypressPlusAction';
import { SET_JOINED_PDF_STATUS } from '../../src/constants/Action_Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('CyprssPlusAction', () => {
    let store;
    let initialState = { appStore: {} };
    store = mockStore(() => initialState);
    it('returns 200 when convertPdf is called', async () => {
        jest.spyOn(axios,'post').mockImplementation(() => {
            return Promise.resolve("Success")
        });
        const res = await actions.startPdfConversion("urn:pearson:work:23423523");
        expect(res).toEqual("Success");
    });
    it('returns 200 when conversion status is called', async () => {
        jest.spyOn(axios,'get').mockImplementation(() => {
            return Promise.resolve("Success")
        });
        const res = await actions.pdfConversionStatus("urn:pearson:work:23423523");
        expect(res).toEqual("Success");
    });
    it('testing------- cypressPlusEnabled  ------action', () => {
        store.dispatch(actions.getJoinedPdfStatus({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_JOINED_PDF_STATUS);
    });

});