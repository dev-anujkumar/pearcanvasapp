import React from 'react';
import { mount } from 'enzyme';
import ApiResults from '../../../src/component/AssetPopover/ApiResults';
import { assetPopoverSampleData, matchedAssets } from './ApiResultsTestData';

const selectedFigure = jest.fn(() => {
    return {
        type : 'SELECTED_FIGURE',
        payload : {
          selectedFigure : {}
        }
    }
});

let wrapper;
let apiResultsInstance;
beforeEach(() => {
    wrapper = mount(<ApiResults  assetPopoverData = {assetPopoverSampleData} ValueToBeSearch = '1' selectedFigure = {selectedFigure} />)
    apiResultsInstance = wrapper.find('ApiResults').instance();
});

//ApiResults Test Cases
describe('Test ApiResults rendering as expected', () => {
    it('ApiResults component renders without crashing', () => {
        expect(wrapper.find('ApiResults')).toHaveLength(1);
    });
    it('Matching Assets are rendered when Assets are matched', () => {
        expect(wrapper.find('FigureCard').length).toEqual(matchedAssets.length);
        /**
        Note :- Value 8 in toEqual() is number of total
        Asset Types like figures,audios,videos & etc
        This number will change if new Assets types included.
        */
        expect(wrapper.find('h3.figureCount').length).toEqual(8);
        expect(wrapper.find('ErrorComp').length).toEqual(0);
    });
    it('Error Component is rendered when no Assets are matched', () => {
        let assetPopoverSampleData2 = {
            "figures":[
                {
                  "versionUrn":"urn:pearson:work:c5c20fcc-8add-409f-af50-529397eaeb5f",
                  "entityUrn":"urn:pearson:entity:178c21e4-15de-44fb-8aa2-55e59af5d9a1",
                  "parentContainerEntityUrn":"urn:pearson:entity:93a83bd3-2ebf-492c-8c61-bed38f646660",
                  "title":"girl",
                  "subTile":null,
                  "path":"https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
                  "imageId":"urn:pearson:alfresco:e2b1710e-a000-4625-b582-367261a2cd0e"
                },
                {
                  "versionUrn":"urn:pearson:work:42d3e770-5982-4816-a09b-887a5db815f6",
                  "entityUrn":"urn:pearson:entity:6235d479-5113-4264-8f18-c939efbb30ce",
                  "parentContainerEntityUrn":"urn:pearson:entity:93a83bd3-2ebf-492c-8c61-bed38f646660",
                  "title":"girl next door",
                  "subTile":null,
                  "path":"https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
                  "imageId":"urn:pearson:alfresco:e2b1710e-a000-4625-b582-367261a2cd0e"
                }
            ]
        };
        wrapper = mount(<ApiResults  assetPopoverData = {assetPopoverSampleData2} ValueToBeSearch = 'a' selectedFigure = {selectedFigure} />);
        expect(wrapper.find('FigureCard').length).toEqual(0);
        expect(wrapper.find('h3.figureCount').length).toEqual(0);
        expect(wrapper.find('ErrorComp').length).toEqual(1);
    });
});

describe('Testing ApiResults methods', () => {
    it('Testing findMatchingAssets()', () => {
        const matchingAssetsArray = apiResultsInstance.findMatchingAssets(assetPopoverSampleData,"1");
        expect(matchingAssetsArray.length).toEqual(matchedAssets.length);
    });
    it('Testing renderByAssetType()', () => {
        const spy = jest.spyOn(apiResultsInstance, 'apiResultsJsx');
        apiResultsInstance.renderByAssetType(assetPopoverSampleData,selectedFigure,"1");
        /**
        Note :- Value 8 in tohaveBeenCalledTimes() is number of total
        Asset Types like figures,audios,videos & etc
        This number will change if new Assets types included.
        */
        expect(spy).toHaveBeenCalledTimes(8);
    });
    it('Testing apiResultsJsx()', () => {
        const assetDataOfTypeFigures = {
            "figures":[
                {
                  "versionUrn":"urn:pearson:work:c5c20fcc-8add-409f-af50-529397eaeb5f",
                  "entityUrn":"urn:pearson:entity:178c21e4-15de-44fb-8aa2-55e59af5d9a1",
                  "parentContainerEntityUrn":"urn:pearson:entity:93a83bd3-2ebf-492c-8c61-bed38f646660",
                  "title":"A girl",
                  "subTile":null,
                  "path":"https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
                  "imageId":"urn:pearson:alfresco:e2b1710e-a000-4625-b582-367261a2cd0e"
                },
                {
                  "versionUrn":"urn:pearson:work:42d3e770-5982-4816-a09b-887a5db815f6",
                  "entityUrn":"urn:pearson:entity:6235d479-5113-4264-8f18-c939efbb30ce",
                  "parentContainerEntityUrn":"urn:pearson:entity:93a83bd3-2ebf-492c-8c61-bed38f646660",
                  "title":"A girl next door",
                  "subTile":null,
                  "path":"https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
                  "imageId":"urn:pearson:alfresco:e2b1710e-a000-4625-b582-367261a2cd0e"
                }
            ]
        };
        wrapper = mount(<ApiResults  assetPopoverData = {assetDataOfTypeFigures} ValueToBeSearch = 'a' selectedFigure = {selectedFigure} />);
        apiResultsInstance = wrapper.find('ApiResults').instance();
        apiResultsInstance.apiResultsJsx(assetDataOfTypeFigures,selectedFigure,"a");
        expect(wrapper.find('FigureCard').length).toEqual(2);
        expect(wrapper.find('h3.figureCount').length).toEqual(1);
    });
});