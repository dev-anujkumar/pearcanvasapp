import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
import MetaDataPopUpForTE from '../../../src/component/ElementFigure/MetaDataPopUpForTE';


describe('Testcase for MetaDataPopUpForTE Component', () => {
    let wrapper;
    let props = {
        togglePopup: jest.fn()
    }
    jest.mock('./../../../src/component/ElementContainer/ElementContainer_Actions.js', () => {
        return { 
            updateEditedData: ()=>{
                return jest.fn()
            },
        }
    })
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
        appStore: {
            editedImageList: {
                    "altText": "TEst  new",
                    "longdescription": "Tet",
                    "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg",
                    "imgId": "imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:2703"
            }
        }
    })
    beforeEach(() => {
        wrapper = mount(<Provider store={store}><MetaDataPopUpForTE {...props} /></Provider>);
     });
    it("MetaDataPopUpForTE component render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    });
})