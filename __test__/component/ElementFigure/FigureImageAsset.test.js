import React from 'react';
import { mount } from 'enzyme';
import FigureImageAsset from '../../../src/component/ElementFigure/FigureImageAsset';
import { figureImageAssetWithImage, figureImageAssetWithOutImage, figureImageAssetWithOutImageBranch } from '../../../fixtures/FigureImageAssetTestingData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as utils from '../../../src/constants/utility';
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
    keyboardReducer : {
        selectedElement: ''
    }
}
let store = mockStore(initialState);
describe('Testing Coponent FigureImageAsset', () => {
    describe('FigureImageAsset when Image is not added', () => {
        let props = {
            ...figureImageAssetWithOutImage,
            addFigureResource: jest.fn(),
            isEnableKeyboard: true
        }
        let props2 = {
            ...figureImageAssetWithOutImageBranch,
            addFigureResource: jest.fn(),
            isEnableKeyboard: true
        }
        const component = mount(<Provider store={store}><FigureImageAsset {...props} /></Provider>)
        it('Renders without crashing - when image is not added', () => {
            expect(component.find('div.figurebutton')).toHaveLength(1);
        })
        it('When clicked on `Select an Image` function addFigureResource is called', () => {
            jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
            expect(component.find('div.figurebutton')).toHaveLength(1);
            component.find('div.figurebutton').simulate('click');
            expect(props.addFigureResource).toHaveBeenCalled();
        })
        it('Branch coverage when path is not defined', () => {
            const component2 = mount(<Provider store={store}><FigureImageAsset {...props2} /></Provider>)
            expect(component2.find('div.figurebutton')).toHaveLength(0);
        })
    })
    describe('FigureImageAsset when Image is added', () => {
        let props2 = {
            ...figureImageAssetWithImage,
            addFigureResource: jest.fn(),
            toggleDeletePopup: jest.fn(),
            removeFocus: jest.fn(),
            isEnableKeyboard: true
        }
        const component = mount(<Provider store={store}><FigureImageAsset {...props2} /></Provider>)
        it('Renders without crashing - when image is present', () => {
            expect(component.find('div.updatefigurebutton')).toHaveLength(1);
        })
        it('When clicked on `Update Image` function addFigureResource is called', () => {
            expect(component.find('div.updatefigurebutton')).toHaveLength(1);
            component.find('div.updatefigurebutton').simulate('click');
            expect(props2.addFigureResource).toHaveBeenCalled();
        })
        it('When clicked on `Delete Image` function deleteFigureResource is called', () => {
            expect(component.find('div.deletefigurebutton')).toHaveLength(1);
            component.find('div.deletefigurebutton').simulate('click');
            expect(props2.toggleDeletePopup).toHaveBeenCalledWith(true);
        })
        it("Tesing onBlur for `Delete Image` function", () => {
            let FigureImageAssetInstance = component.find('div.deletefigurebutton').instance();
            FigureImageAssetInstance.onBlur = jest.fn()
            component.find('.deletefigurebutton').simulate('blur', (null, 'remove'))
            expect(component).toHaveLength(1);
            expect(FigureImageAssetInstance).toBeDefined();
        })
        it("Testing onKeydown > if > first if", () => {
            let event = {
                preventDefault: jest.fn(),
                keyCode: 13,
                which: 86
            }
            component.find('.deletefigurebutton').at(0).simulate('keyDown', event);
        });
        it("Testing onKeydown > if > second if", () => {
            let event = {
                preventDefault: jest.fn(),
                keyCode: 38,
                which: 86
            }
            component.find('.deletefigurebutton').at(0).simulate('keyDown', event);
        });
    })
    describe('When isEnableKeyboard is false', () => {
        let props3 = {
            ...figureImageAssetWithImage,
            addFigureResource: jest.fn(),
            toggleDeletePopup: jest.fn(),
            removeFocus: jest.fn(),
            isEnableKeyboard: false
        }
        const component2 = mount(<Provider store={store}><FigureImageAsset {...props3} /></Provider>)
        it('Renders without crashing - when image is present', () => {
            expect(component2.find('div.updatefigurebutton')).toHaveLength(1);
        })
        it('When clicked on `Update Image` function addFigureResource is called', () => {
            jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
            expect(component2.find('div.updatefigurebutton')).toHaveLength(1);
            component2.find('div.updatefigurebutton').simulate('click');
            expect(props3.addFigureResource).toHaveBeenCalled();
        })
        it("Testing onKeydown > if > second if", () => {
            let event = {
                preventDefault: jest.fn(),
                keyCode: 38,
                which: 86
            }
            component2.find('.deletefigurebutton').at(0).simulate('keyDown', event);
        });
    })
})