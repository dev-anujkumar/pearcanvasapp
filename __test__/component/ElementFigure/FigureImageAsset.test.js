import React from 'react';
import { mount } from 'enzyme';
import FigureImageAsset from '../../../src/component/ElementFigure/FigureImageAsset';
import { figureImageAssetWithOutImage } from '../../../fixtures/FigureImageAssetTestingData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
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