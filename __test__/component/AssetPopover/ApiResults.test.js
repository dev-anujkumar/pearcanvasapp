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
                    "versionUrn": "urn:pearson:work:9293a77b-6213-4bca-85be-21ebc1c0c069",
                    "entityUrn": "urn:pearson:entity:43d64bf6-df7f-44fc-a621-bc91864a50db",
                    "parentContainerEntityUrn": "urn:pearson:entity:2a3a61a1-5467-4bc9-8248-b63951cf78c6",
                    "type": "figure",
                    "subType": "imageTextWidth",
                    "figureType": "image",
                    "title": "Figure 1",
                    "subTile": null,
                    "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                    "imageId": "",
                    "numberedandlabel": true,
                    "displayedlabel": "Figure"
                },
                {
                    "versionUrn": "urn:pearson:work:b6d11104-a218-43e0-8502-96fa2ec891d0",
                    "entityUrn": "urn:pearson:entity:f81fd4b7-fe88-4398-8187-4822969dfa45",
                    "parentContainerEntityUrn": "urn:pearson:entity:2a3a61a1-5467-4bc9-8248-b63951cf78c6",
                    "type": "figure",
                    "subType": "imageTextWidth",
                    "figureType": "image",
                    "title": "",
                    "captions": {
                      "text": "Caption for Figure 1.11"
                    },
                    "subTile": null,
                    "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                    "imageId": "",
                    "numberedandlabel": true,
                    "displayedlabel": "Figure"
                }
            ]
        };
        wrapper = mount(<ApiResults  assetPopoverData = {assetPopoverSampleData2} ValueToBeSearch = '2' selectedFigure = {selectedFigure} />);
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
                    "versionUrn": "urn:pearson:work:9293a77b-6213-4bca-85be-21ebc1c0c069",
                    "entityUrn": "urn:pearson:entity:43d64bf6-df7f-44fc-a621-bc91864a50db",
                    "parentContainerEntityUrn": "urn:pearson:entity:2a3a61a1-5467-4bc9-8248-b63951cf78c6",
                    "type": "figure",
                    "subType": "imageTextWidth",
                    "figureType": "image",
                    "title": "Figure 1",
                    "subTile": null,
                    "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                    "imageId": "",
                    "numberedandlabel": true,
                    "displayedlabel": "Figure"
                },
                {
                    "versionUrn": "urn:pearson:work:b6d11104-a218-43e0-8502-96fa2ec891d0",
                    "entityUrn": "urn:pearson:entity:f81fd4b7-fe88-4398-8187-4822969dfa45",
                    "parentContainerEntityUrn": "urn:pearson:entity:2a3a61a1-5467-4bc9-8248-b63951cf78c6",
                    "type": "figure",
                    "subType": "imageTextWidth",
                    "figureType": "image",
                    "title": "",
                    "captions": {
                      "text": "Caption for Figure 1.11"
                    },
                    "subTile": null,
                    "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                    "imageId": "",
                    "numberedandlabel": true,
                    "displayedlabel": "Figure"
                }
            ]
        };
        wrapper = mount(<ApiResults  assetPopoverData = {assetDataOfTypeFigures} ValueToBeSearch = '1' selectedFigure = {selectedFigure} />);
        apiResultsInstance = wrapper.find('ApiResults').instance();
        apiResultsInstance.apiResultsJsx(assetDataOfTypeFigures,selectedFigure,"1");
        expect(wrapper.find('FigureCard').length).toEqual(2);
        expect(wrapper.find('h3.figureCount').length).toEqual(1);
    });
});