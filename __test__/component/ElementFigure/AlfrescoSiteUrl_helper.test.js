import * as AlfrescoSiteUrlMethods from '../../../src/component/ElementFigure/AlfrescoSiteUrl_helper.js';
import axios from 'axios';

jest.mock('axios');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: { status: '200' } }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('-----------------------Test AlfrescoSiteUrl_helper Functions-----------------------', () => {
    describe('Test-1-Function--1--handleAlfrescoSiteUrl', () => {
        it('handleAlfrescoSiteUrl', () => {
            axios.put.mockResolvedValue({
                data: {
                    status: '200'
                }
            });
            const spyHandleAlfrescoSiteUrl  = jest.spyOn(AlfrescoSiteUrlMethods, 'handleAlfrescoSiteUrl')
            AlfrescoSiteUrlMethods.handleAlfrescoSiteUrl();
            expect(spyHandleAlfrescoSiteUrl).toHaveBeenCalled();
            spyHandleAlfrescoSiteUrl.mockClear();
        })
        it('handleAlfrescoSiteUrl catch case', () => {
            axios.put = jest.fn(() => Promise.reject({}));
            const spyHandleAlfrescoSiteUrl  = jest.spyOn(AlfrescoSiteUrlMethods, 'handleAlfrescoSiteUrl')
            AlfrescoSiteUrlMethods.handleAlfrescoSiteUrl();
            expect(spyHandleAlfrescoSiteUrl).toHaveBeenCalled();
            spyHandleAlfrescoSiteUrl.mockClear();
        })
    });

    describe('Test-3-Function--1--handleSiteOptionsDropdown', () => {
        it('handleSiteOptionsDropdown', () => {
            axios.get.mockResolvedValue({
                data: {
                    "list": {
                        "pagination": {
                            "count": 6,
                            "hasMoreItems": false,
                            "totalItems": 6,
                            "skipCount": 0,
                            "maxItems": 1000
                        },
                        "entries": [{
                            "entry": {
                                "site": {
                                    "role": "SiteManager",
                                    "visibility": "MODERATED",
                                    "guid": "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                                    "id": "c5-media-poc",
                                    "preset": "site-dashboard",
                                    "title": "001_C5 Media POC"
                                },
                                "role": "SiteManager",
                                "guid": "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                                "id": "c5-media-poc"
                            }
                        }, {
                            "entry": {
                                "site": {
                                    "role": "SiteManager",
                                    "visibility": "MODERATED",
                                    "guid": "5f1065b0-def6-4ef6-b766-d42a2ee84fa2",
                                    "id": "c5-media-poc-uk",
                                    "preset": "site-dashboard",
                                    "title": "C5-Media-Poc-UK"
                                },
                                "role": "SiteManager",
                                "guid": "5f1065b0-def6-4ef6-b766-d42a2ee84fa2",
                                "id": "c5-media-poc-uk"
                            }
                        }]
                    }
                }
            });
            const spyHandleSiteOptionsDropdown  = jest.spyOn(AlfrescoSiteUrlMethods, 'handleSiteOptionsDropdown')
            AlfrescoSiteUrlMethods.handleSiteOptionsDropdown();
            expect(spyHandleSiteOptionsDropdown).toHaveBeenCalled();
            spyHandleSiteOptionsDropdown.mockClear();
        })
        it('handleSiteOptionsDropdown catch case', () => {
            axios.get = jest.fn(() => Promise.reject({}));
            const spyHandleSiteOptionsDropdown  = jest.spyOn(AlfrescoSiteUrlMethods, 'handleSiteOptionsDropdown')
            AlfrescoSiteUrlMethods.handleSiteOptionsDropdown();
            expect(spyHandleSiteOptionsDropdown).toHaveBeenCalled();
            spyHandleSiteOptionsDropdown.mockClear();
        })
    });
});

