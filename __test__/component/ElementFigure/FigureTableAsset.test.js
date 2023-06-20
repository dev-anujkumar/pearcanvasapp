import React from 'react';
import { mount } from 'enzyme';
import FigureTableAsset from '../../../src/component/ElementFigure/FigureTableAsset';
import { figureTableAssetWithOutTable, figureTableAssetWithTable } from '../../../fixtures/FigureTableAssetTestingData';

jest.mock('../../../src/constants/utility.js', () => ({
    hasReviewerRole: jest.fn().mockImplementationOnce(() => {
        return true
    })
}))

describe('Testing Coponent FigureTableAsset', () => {
    describe('FigureTableAsset when Table is not added', () => {
        let props = {
            ...figureTableAssetWithOutTable,
            addFigureResource: jest.fn()
        }
        const component = mount(<FigureTableAsset {...props} />)
        it('Renders without crashing - when table is not added', () => {
            expect(component.find('div.table-asset-wrapper-without-asset')).toHaveLength(1);
        })
        it('When clicked on `Add a Table` function addFigureResource is called', () => {
            expect(component.find('button.table-asset-button')).toHaveLength(1);
            component.find('button.table-asset-button').simulate('click');
            expect(props.addFigureResource).toHaveBeenCalled();
        })
    })
    describe('FigureTableAsset when Table is added', () => {
        let props = {
            ...figureTableAssetWithTable,
            addFigureResource: jest.fn()
        }
        const component = mount(<FigureTableAsset {...props} />)
        it('Renders without crashing - when table is added', () => {
            expect(component.find('div.table-asset-wrapper-with-asset')).toHaveLength(1);
        })
        it('When clicked on `Table` function addFigureResource is called', () => {
            expect(component.find('div.table-asset-wrapper-with-asset')).toHaveLength(1);
            component.find('div.table-asset-wrapper-with-asset').simulate('click');
            expect(props.addFigureResource).toHaveBeenCalled();
        })
    })
})