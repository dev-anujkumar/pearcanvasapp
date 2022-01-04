import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from "../../src/config/config"
import * as actions from '../../src/component/PdfSlate/CypressPlusAction';

describe('CyprssPlusAction', () => {
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
        mock.onGet(`${config.REACT_APP_API_URL}cypress-api/v1/cypress-plus-api/conversion-status/urn:pearson:work:7798cb90-06f6-408e-98f3-3ffeda8f2f63`).reply(200, data); 
        const spygetCommentElements = jest.spyOn(actions, 'pdfConversionStatus');
        actions.pdfConversionStatus("urn:pearson:work:7798cb90-06f6-408e-98f3-3ffeda8f2f63");
        expect(spygetCommentElements).toHaveBeenCalled();
    });
});