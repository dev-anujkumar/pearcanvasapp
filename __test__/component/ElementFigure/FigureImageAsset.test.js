import React from 'react';
import { mount } from 'enzyme';
import FigureImageAsset from '../../../src/component/ElementFigure/FigureImageAsset';
import { figureImageAssetWithOutImage } from '../../../fixtures/FigureImageAssetTestingData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    },
    appStore: {
        figureDropdownData: {
            audio: ["Audio"],
            image: ["Figure", "Table", "Equation"],
            smartlinks: ["No Label", "Custom"],
            video: ["Video"]
        },
        activeElement: {
            altText: "",
            elementId: "urn:pearson:work:c76ca6f7-af8c-4b46-8de4-6b136fa3bd93",
            elementType: "figure",
            elementWipType: "figure",
            index: 0,
            longDesc: "",
            podwidth: "",
            primaryOption: "primary-image-figure",
            secondaryOption: "secondary-image-figure-width",
            tag: "Fg"
        },
        currentSlateAncestorData: {
            "containerUrn": "urn:pearson:manifest:dd2504ac-ef6f-4cdc-8d24-de6b6170baee",
            "entityUrn": "urn:pearson:entity:2a741486-681c-4536-ae46-5ea974db041b",
            "title": "",
            "label": "appendixslate",
            "matterType": "BackMatter",
            "ancestor": {
                "containerUrn": "urn:pearson:manifest:34e2807d-fd3f-4938-aa38-4b81e612eb0f",
                "entityUrn": "urn:pearson:entity:275d98d9-afb7-409f-8021-8aad2bd06656",
                "title": "",
                "label": "appendix",
                "ancestor": {
                    "containerUrn": "urn:pearson:distributable:2c5fbcf9-81c4-4831-b5ca-adfbf644cfe7",
                    "entityUrn": "urn:pearson:entity:fc1224f4-09b2-452f-aa74-f66f6344b64d",
                    "title": "dev_test_39",
                    "label": "project"
                }
            }
        }
    },
    projectMetadata: {},
    autoNumberReducer: {},
    keyboardReducer : {selectedElement: '' }
}
let store = mockStore(initialState);
describe('Testing Coponent FigureImageAsset', () => {
    describe('FigureImageAsset when Image is not added', () => {
        let props = {
            ...figureImageAssetWithOutImage,
            addFigureResource: jest.fn()
        }
        const component = mount(<Provider store={store}><FigureImageAsset {...props} /></Provider>)
        it('Renders without crashing - when image is not added', () => {
            expect(component.find('div.figurebutton')).toHaveLength(1);
        })
        it('When clicked on `Select an Image` function addFigureResource is called', () => {
            expect(component.find('div.figurebutton')).toHaveLength(1);
            component.find('div.figurebutton').simulate('click');
            expect(props.addFigureResource).toHaveBeenCalled();
        })
    })
})