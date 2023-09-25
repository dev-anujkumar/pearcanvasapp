import axios from "axios";
import { handleC2MediaClick } from "../../../src/component/PdfSlate/Alfresco";
import config from "../../../src/config/config";
import * as functionsModule from "../../../src/constants/utility";

describe('handleC2MediaClick', () => {
    it('handleC2MediaClick with hasReviewerRole return true', () => {
        const props = {
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            permissions: ['add_multimedia_via_alfresco', 'alfresco_crud_access'],
            element: {id:1}
        }
        const mockFetchData = jest.spyOn(functionsModule, 'hasReviewerRole');
        mockFetchData.mockReturnValue(true);
        config.alfrescoMetaData = {
            alfresco: {guid: '1', repositoryFolder: 2, title: 'abcd/234'}
        }
        handleC2MediaClick(props)
    });
    it('handleC2MediaClick with hasReviewerRole return false and Object.keys(alfrescoPath.alfresco).length > 0', () => {
        const props = {
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            saveSelectedAlfrescoElement: jest.fn(),
            permissions: ['add_multimedia_via_alfresco', 'alfresco_crud_access'],
            element: {id:1}
        }
        config.alfrescoMetaData = {
            alfresco: {guid: '1', repositoryFolder: 2, title: 'abcd/234'}
        }
        const mockFetchData = jest.spyOn(functionsModule, 'hasReviewerRole');
        mockFetchData.mockReturnValue(false);
        handleC2MediaClick(props)
    });
    it('handleC2MediaClick with hasReviewerRole return false and Object.keys(alfrescoPath.alfresco).length > 0 with no guid and noderef', () => {
        const props = {
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            saveSelectedAlfrescoElement: jest.fn(),
            permissions: ['add_multimedia_via_alfresco', 'alfresco_crud_access'],
            element: {id:1}
        }
        config.alfrescoMetaData = {
            alfresco: {repositoryFolder: 2, title: 'abcd/234'}
        }
        const mockFetchData = jest.spyOn(functionsModule, 'hasReviewerRole');
        mockFetchData.mockReturnValue(false);
        handleC2MediaClick(props)
    });
    it('handleC2MediaClick with hasReviewerRole return false and Object.keys(alfrescoPath.alfresco).length > 0 with noderef ternary else case', () => {
        const props = {
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            saveSelectedAlfrescoElement: jest.fn(),
            permissions: ['add_multimedia_via_alfresco', 'alfresco_crud_access'],
            element: {id:1}
        }
        config.alfrescoMetaData = {
            alfresco: {nodeRef: '1', name: 'test'}
        }
        const mockFetchData = jest.spyOn(functionsModule, 'hasReviewerRole');
        mockFetchData.mockReturnValue(false);
        handleC2MediaClick(props)
    });
    it('handleC2MediaClick with no guid and noderef ie else case', () => {
        const props = {
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            saveSelectedAlfrescoElement: jest.fn(),
            permissions: ['alfresco_crud_access'],
            element: {id:1}
        }
        config.alfrescoMetaData = {
            alfresco: {nodeRef: '1', repositoryFolder: 2, title: 'abcd/234'}
        }
        // const mockFetchData = jest.spyOn(functionsModule, 'hasReviewerRole');
        // mockFetchData.mockReturnValue(false);
        handleC2MediaClick(props)
    });
    it('handleC2MediaClick with permissions as "alfresco_crud_access', () => {
        const props = {
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            saveSelectedAlfrescoElement: jest.fn(),
            alfrescoPopup: jest.fn(),
            permissions: ['alfresco_crud_access'],
            element: {id:1}
        }
        config.alfrescoMetaData = {
            alfresco: {}
        }
        const mockFetchData = jest.spyOn(functionsModule, 'hasReviewerRole');
        mockFetchData.mockReturnValue(false);
        const responseData = {data :{list: {entries: [1,2,3]}}};
        axios.get = jest.fn(() => Promise.resolve(responseData));
        handleC2MediaClick(props)
    });
    it('handleC2MediaClick with no permissions as "alfresco_crud_access"', () => {
        const props = {
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            saveSelectedAlfrescoElement: jest.fn(),
            alfrescoPopup: jest.fn(),
            permissions: [],
            element: {id:1}
        }
        config.alfrescoMetaData = {
            alfresco: {}
        }
        const mockFetchData = jest.spyOn(functionsModule, 'hasReviewerRole');
        mockFetchData.mockReturnValue(false);
        const responseData = {data :{list: {entries: [1,2,3]}}};
        axios.get = jest.fn(() => Promise.resolve(responseData));
        handleC2MediaClick(props)
    });
});