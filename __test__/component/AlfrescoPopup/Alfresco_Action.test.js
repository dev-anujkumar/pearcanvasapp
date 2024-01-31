import * as AlfrescoActions from '../../../src/component/AlfrescoPopup/Alfresco_Action';
import axios from 'axios';
import config  from '../../../src/config/config';

jest.mock('../../../src/config/config', () => {
    return {
        alfrescoMetaData: {
            alfresco: {
                nodeRef: "node"
            }
        }
    };
});
jest.mock('axios');

describe('Test Actions', () => {
    it('Test-1.1---alfrescoPopup', () => {
        const spyFunction = jest.spyOn(AlfrescoActions, 'alfrescoPopup');
        let result = AlfrescoActions.alfrescoPopup(true);
        expect(result.type).toEqual('SET_ALFRESCO_POPUP');
        expect(result.payload).toEqual(true);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    }); 
    it('Test-1.2---saveSelectedAssetData', () => {
        const spyFunction = jest.spyOn(AlfrescoActions, 'saveSelectedAssetData');
        let result = AlfrescoActions.saveSelectedAssetData(true);
        expect(result.type).toEqual('SAVE_ALFRESCO_ASSET_DATA');
        expect(result.payload).toEqual(true);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-1.3---saveInlineImageData', () => {
        const spyFunction = jest.spyOn(AlfrescoActions, 'saveInlineImageData');
        let result = AlfrescoActions.saveInlineImageData(true);
        expect(result.type).toEqual('SAVE_INLINE_IMAGE_DATA');
        expect(result.payload).toEqual(true);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-1.4---saveSelectedAlfrescoElement', () => {
        const spyFunction = jest.spyOn(AlfrescoActions, 'saveSelectedAlfrescoElement');
        let result = AlfrescoActions.saveSelectedAlfrescoElement(true);
        expect(result.type).toEqual('SAVE_ALFRESCO_ELEMENT');
        expect(result.payload).toEqual(true);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-1.4---saveSelectedAltTextLongDescData', () => {
        const data = {
            altText : "",
            longDesc: ""
        }
        const spyFunction = jest.spyOn(AlfrescoActions, 'saveSelectedAltTextLongDescData');
        let result = AlfrescoActions.saveSelectedAltTextLongDescData(data);
        expect(result.type).toEqual('SAVE_ALFRESCO_ALT_LONG_DESC_DATA');
        expect(result.payload).toEqual(data);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
});
describe('Test fetchAlfrescoSiteDropdownList',()=>{
    it('Test-2.1---fetchAlfrescoSiteDropdownList-Then- with res.data', () => {
        let responseData = {
            data: {"list":{"pagination":{"count":6,"hasMoreItems":false,"totalItems":6,"skipCount":0,"maxItems":1000},"entries":[{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc","preset":"site-dashboard","title":"001_C5 Media POC"},"role":"SiteManager","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"5f1065b0-def6-4ef6-b766-d42a2ee84fa2","id":"c5-media-poc-uk","preset":"site-dashboard","title":"C5-Media-Poc-UK"},"role":"SiteManager","guid":"5f1065b0-def6-4ef6-b766-d42a2ee84fa2","id":"c5-media-poc-uk"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"936bd259-fc6b-49ae-b557-7463367d7b40","id":"cite-sandbox","preset":"CITE","title":"CITE sandbox"},"role":"SiteManager","guid":"936bd259-fc6b-49ae-b557-7463367d7b40","id":"cite-sandbox"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"b82e73e1-2fa8-470f-9e0e-fcfe2c916fce","id":"dec02henslindemo","preset":"CITE","title":"Dec02_Henslin_Demo"},"role":"SiteManager","guid":"b82e73e1-2fa8-470f-9e0e-fcfe2c916fce","id":"dec02henslindemo"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"9ae9a3e5-894f-4e1d-b500-0860e88cbb9e","id":"everest-poc","preset":"site-dashboard","title":"Everest POC"},"role":"SiteManager","guid":"9ae9a3e5-894f-4e1d-b500-0860e88cbb9e","id":"everest-poc"}},{"entry":{"site":{"role":"SiteCoordinator","visibility":"MODERATED","guid":"711971d8-13cf-4fdd-8ce0-8481f2d8da35","id":"revel-et2-conversion-site-three","preset":"site-dashboard","title":"Revel eT2 Conversion Site Three"},"role":"SiteCoordinator","guid":"711971d8-13cf-4fdd-8ce0-8481f2d8da35","id":"revel-et2-conversion-site-three"}}]}}
        }

        const spyFunction = jest.spyOn(AlfrescoActions, 'fetchAlfrescoSiteDropdownList');
        axios.get = jest.fn(() => Promise.resolve(responseData));
        AlfrescoActions.fetchAlfrescoSiteDropdownList("projectAlfrescoSettings");
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.2---fetchAlfrescoSiteDropdownList-Then- with res.data - else part', () => {
        let responseData = {
            data: {}
        }

        const spyFunction = jest.spyOn(AlfrescoActions, 'fetchAlfrescoSiteDropdownList');
        axios.get = jest.fn(() => Promise.resolve(responseData));
        AlfrescoActions.fetchAlfrescoSiteDropdownList("projectAlfrescoSettings");
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.3---fetchAlfrescoSiteDropdownList-Then- with res.data - parameter else part', () => {
        let responseData = {
            data: {"list":{"pagination":{"count":6,"hasMoreItems":false,"totalItems":6,"skipCount":0,"maxItems":1000},"entries":[{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc","preset":"site-dashboard","title":"001_C5 Media POC"},"role":"SiteManager","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"5f1065b0-def6-4ef6-b766-d42a2ee84fa2","id":"c5-media-poc-uk","preset":"site-dashboard","title":"C5-Media-Poc-UK"},"role":"SiteManager","guid":"5f1065b0-def6-4ef6-b766-d42a2ee84fa2","id":"c5-media-poc-uk"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"936bd259-fc6b-49ae-b557-7463367d7b40","id":"cite-sandbox","preset":"CITE","title":"CITE sandbox"},"role":"SiteManager","guid":"936bd259-fc6b-49ae-b557-7463367d7b40","id":"cite-sandbox"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"b82e73e1-2fa8-470f-9e0e-fcfe2c916fce","id":"dec02henslindemo","preset":"CITE","title":"Dec02_Henslin_Demo"},"role":"SiteManager","guid":"b82e73e1-2fa8-470f-9e0e-fcfe2c916fce","id":"dec02henslindemo"}},{"entry":{"site":{"role":"SiteManager","visibility":"MODERATED","guid":"9ae9a3e5-894f-4e1d-b500-0860e88cbb9e","id":"everest-poc","preset":"site-dashboard","title":"Everest POC"},"role":"SiteManager","guid":"9ae9a3e5-894f-4e1d-b500-0860e88cbb9e","id":"everest-poc"}},{"entry":{"site":{"role":"SiteCoordinator","visibility":"MODERATED","guid":"711971d8-13cf-4fdd-8ce0-8481f2d8da35","id":"revel-et2-conversion-site-three","preset":"site-dashboard","title":"Revel eT2 Conversion Site Three"},"role":"SiteCoordinator","guid":"711971d8-13cf-4fdd-8ce0-8481f2d8da35","id":"revel-et2-conversion-site-three"}}]}}
        }

        const spyFunction = jest.spyOn(AlfrescoActions, 'fetchAlfrescoSiteDropdownList');
        axios.get = jest.fn(() => Promise.resolve(responseData));
        AlfrescoActions.fetchAlfrescoSiteDropdownList('');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.4---fetchAlfrescoSiteDropdownList-Then- without res.data', () => {
        
        const spyFunction = jest.spyOn(AlfrescoActions, 'fetchAlfrescoSiteDropdownList');
        axios.get = jest.fn(() => Promise.reject());
        AlfrescoActions.fetchAlfrescoSiteDropdownList('projectAlfrescoSettings');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})
describe('Test ',()=>{
    it('test case for sendSelectedSiteData ', () => {
        const props = {
            editor: {},
            alfrescoPath: {
                eTag: "1234"
            },
            locationData:{
                nodeRef:'nodde',
                title:'title'
            },
            currentAsset: {
                type: 'type'
            },
            saveSelectedAlfrescoElement: jest.fn(),
            alfrescoPopup: jest.fn(),
            linkAlfrescoToProject: jest.fn(() => {})
        }
        const selectedSite = {
            "site": {
                "role": "SiteManager",
                "visibility": "MODERATED",
                "guid": "936bd259-fc6b-49ae-b557-7463367d7b40",
                "id": "cite-sandbox",
                "preset": "CITE",
                "title": "CITE sandbox"
            },
        }
        axios.patch = jest.fn(() => Promise.resolve());
        const spyonsendSelectedSiteData = jest.spyOn(AlfrescoActions, "sendSelectedSiteData");
        AlfrescoActions.sendSelectedSiteData(props,selectedSite);
        expect(spyonsendSelectedSiteData).toHaveBeenCalled();
    });
    it('test case for sendSelectedSiteData ', () => {
        const props = {
            editor: {},
            alfrescoPath: {
                eTag: "1234"
            },
            locationData:{
                guid:'guid',
                repositoryFolder:'repo'
            },
            currentAsset: {
                type: 'type'
            },
            saveSelectedAlfrescoElement: jest.fn(),
            alfrescoPopup: jest.fn(),
            linkAlfrescoToProject: jest.fn(() => {})
        }
        const selectedSite = {
            "site": {
                "role": "SiteManager",
                "visibility": "MODERATED",
                "guid": "936bd259-fc6b-49ae-b557-7463367d7b40",
                "id": "cite-sandbox",
                "preset": "CITE",
                "title": "CITE sandbox"
            },
        }
        axios.patch = jest.fn(() => Promise.resolve());
        const spyonsendSelectedSiteData = jest.spyOn(AlfrescoActions, "sendSelectedSiteData");
        AlfrescoActions.sendSelectedSiteData(props,selectedSite);
        expect(spyonsendSelectedSiteData).toHaveBeenCalled();
    });
    it('test case for sendSelectedSiteData ', () => {
        const props = {
            editor: {},
            alfrescoPath:{
            },
            locationData:{
                title:''
            },
            currentAsset: {
                type: 'type'
            },
            saveSelectedAlfrescoElement: jest.fn(),
            alfrescoPopup: jest.fn(),
            linkAlfrescoToProject: jest.fn(() => {})
        }
        const selectedSite = {
            "site": {
                "role": "SiteManager",
                "visibility": "MODERATED",
                "guid": "936bd259-fc6b-49ae-b557-7463367d7b40",
                "id": "cite-sandbox",
                "preset": "CITE",
                "title": "CITE sandbox"
            },
        }
        axios.patch = jest.fn(() => Promise.resolve());
        const spyonsendSelectedSiteData = jest.spyOn(AlfrescoActions, "sendSelectedSiteData");
        AlfrescoActions.sendSelectedSiteData(props,selectedSite);
        expect(spyonsendSelectedSiteData).toHaveBeenCalled();
    });
})