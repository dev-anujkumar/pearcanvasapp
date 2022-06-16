import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore } from 'redux';
import configureMockStore from 'redux-mock-store';
import AlfrescoPopup from "../../../src/component/AlfrescoPopup/AlfrescoPopup.jsx";

jest.mock('../../../src/constants/utility.js', () => {
    return {
        sendDataToIframe: () => {
            return "testing"
        }
    }
})

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let initialState = {
    alfrescoReducer: {
        elementId: 5,
        isInlineEditorOpen: false,
        locationData: "",
        calledFromGlossaryFootnote: false,
        calledFromImageGlossaryFootnote: false
    }
}

describe('Testing AlfrescoPopup component', () => {
    let store = mockStore(initialState);
    let props={
        alfrescoListOption: [{"entry":{"site":{"role":"SiteCollaborator","visibility":"MODERATED","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc","preset":"site-dashboard","title":"001_C5 Media POC"},"role":"SiteCollaborator","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc"}},{"entry":{"site":{"role":"SiteCoordinator","visibility":"MODERATED","guid":"6eb551b3-a5d0-46c6-a389-5a773ee2b772","id":"cite-patterns-content-design","preset":"site-dashboard","title":"CITE Patterns Content Design"},"role":"SiteCoordinator","guid":"6eb551b3-a5d0-46c6-a389-5a773ee2b772","id":"cite-patterns-content-design"}}],
        alfrescoReducer: {
            elementId: "abc"
        },
        style: {
            width: 360,
            height: 208
        }
    }
    it('AlfrescoPopup Container', () => {
        const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);   
        wrapper.find("AlfrescoPopup");
    })
    
});