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
    it('returns 200 when convertPdf is called', () => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet(`${config.REACT_APP_API_URL}v1/enable-cypress-plus/${config.projectUrn}/cypress-plus/enable?workUrn='urn:pearson:work:7798cb90-06f6-408e-98f3-3ffeda8f2f63'&slateUrn=${config.slateManifestURN}`).reply(200, data); 
        const spygetCommentElements = jest.spyOn(actions, 'startPdfConversion');
        actions.startPdfConversion("urn:pearson:work:23423523");
        expect(spygetCommentElements).toHaveBeenCalled();
    });
    it('returns 200 when conversion status is called', () => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        config.projectUrn= "urn:pearson:distributable:7798cb90-06f6-408e-98f3-3ffeda8f2f63"
        mock.onGet(`${config.REACT_APP_API_URL}cypress-api/v1/cypress-plus-api/conversion-status/project/${config.projectUrn}/manifest/${config.slateManifestURN}/entity/${config.slateEntityURN}`).reply(200, data); 
        const spygetCommentElements = jest.spyOn(actions, 'pdfConversionStatus');
        actions.pdfConversionStatus();
        expect(spygetCommentElements).toHaveBeenCalled();
    });
    it('testing------- cypressPlusEnabled  ------action', () => {
        store.dispatch(actions.getJoinedPdfStatus({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_JOINED_PDF_STATUS);
    });

});