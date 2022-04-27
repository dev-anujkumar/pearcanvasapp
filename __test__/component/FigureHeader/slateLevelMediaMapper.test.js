import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
/**************************Import Modules**************************/
import * as slateLevelFunctions from '../../../src/component/FigureHeader/slateLevelMediaMapper';
import * as AutoNumberActions from '../../../src/component/FigureHeader/AutoNumberActions';
/*************************Import Constants*************************/
import { AsideElement, currentSlateData, slateData1, autoNumberingSlateData, ContainerInMulticolumn, ContainerInPopup, ContainerInShowhide, PopupInContainer } from './AutoNumberApiTestData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('-----------------Testing slateLevelMediaMapper-----------------', () => {
    it('Test-1---getAutoNumberedElementsOnSlate---', () => {
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const dispatch = () => {};
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAutoNumberedElementsOnSlate');
        slateLevelFunctions.getAutoNumberedElementsOnSlate(autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'], {dispatch});
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.1---getImagesInsideSlates---', () => {
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const data = [{id: 'urn:pearson:manifest:96b35981-a575-4c92-b20f-1b57052444fc'}]
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates(autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter, [], [], [], data);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.2---getImagesInsideSlates---conditional coverage', () => {
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const data = [{id: 'urn:pearson:manifest:96b35981-a575-4c92-b20f-1b57052444gd'}]
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates(autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter, [], [], [], data);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.3---getImagesInsideSlates---conditional coverage', () => {
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const bodymatter = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[0].groupeddata.bodymatter;
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates(bodymatter, [], [1], [], []);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.4---getImagesInsideSlates---conditional coverage', () => {
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates(currentSlateData.contents.bodymatter);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.5---getImagesInsideSlates---conditional coverage', () => {
        let popupData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[4];
        popupData.type = 'popup';
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(popupData);
        });
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates(autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.6---getImagesInsideSlates---conditional coverage', () => {
        autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[2].elementdata.bodymatter = [];
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates(autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.7---getImagesInsideSlates---conditional coverage', () => {
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates([ContainerInMulticolumn]);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.8---getImagesInsideSlates---conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter[0].groupdata.bodymatter[1].interactivedata = {}
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates([element]);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.9---getImagesInsideSlates---conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter[0].groupdata.bodymatter = [];
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates([element]);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.10---getImagesInsideSlates---conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter[0].type = 'element';
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates([element]);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.11---getImagesInsideSlates---conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter = [];
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates([element]);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-2.12---getImagesInsideSlates---conditional coverage', () => {
        let showHide = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[1];
        showHide.interactivedata = {}
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        slateLevelFunctions.getImagesInsideSlates([showHide]);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.1---getAsideElementsWrtKey---', () => {
        let popupData = ContainerInPopup;
        popupData.contents.bodymatter[2] = ContainerInMulticolumn;
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(popupData);
        });
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey(autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter, 'element-aside', [], [1], ['8a56-ea7079bcb355']);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.2---getAsideElementsWrtKey--- conditional coverage', () => {
        let popupData = ContainerInPopup;
        popupData.contents.bodymatter[2] = ContainerInMulticolumn;
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(popupData);
        });
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey(autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter, 'element-aside');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.3---getAsideElementsWrtKey--- conditional coverage', () => {
        let popupData = ContainerInPopup;
        popupData.contents.bodymatter = [];
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(popupData);
        });
        let bodyMatter = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter;
        bodyMatter[4].type = 'element';
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey(bodyMatter, 'showhide');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.4---getAsideElementsWrtKey--- conditional coverage', () => {
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey([ContainerInShowhide], 'element-aside');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.5---getAsideElementsWrtKey--- conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter = [{
            type: 'group',
            groupdata: {
                bodymatter: [ AsideElement, { type: 'element' } ]
            }
        }, {
            type: 'element'
        }]
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey([element], 'element-aside');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.6---getAsideElementsWrtKey--- conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter = [{
            type: 'group',
            groupdata: {
                bodymatter: [ { type: 'showhide' } ]
            }
        }]
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey([element], 'showhide');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.7---getAsideElementsWrtKey--- conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter = [{
            type: 'group',
            groupdata: {
                bodymatter: []
            }
        }]
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey([ContainerInMulticolumn], 'element-aside');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-3.8---getAsideElementsWrtKey--- conditional coverage', () => {
        let element = {...ContainerInMulticolumn};
        element.groupeddata.bodymatter = []
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAsideElementsWrtKey');
        slateLevelFunctions.getAsideElementsWrtKey([element], 'element-aside');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-4.1---getPopupDataInsideContainer--- conditional coverage', () => {
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getPopupDataInsideContainer');
        slateLevelFunctions.getPopupDataInsideContainer(PopupInContainer.elementdata.bodymatter, [1], [], 'element-aside');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-4.2---getPopupDataInsideContainer--- conditional coverage', () => {
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getPopupDataInsideContainer');
        slateLevelFunctions.getPopupDataInsideContainer(PopupInContainer.elementdata.bodymatter, [], [], 'element-aside');
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-5.1---containerBodyMatter--- conditional coverage', () => {
        let popupData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[4];
        popupData.type = 'popup';
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(popupData);
        });
        const spyFunction = jest.spyOn(slateLevelFunctions, 'containerBodyMatter');
        slateLevelFunctions.containerBodyMatter(popupData);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-6.1---getAutoNumberedElementsOnSlate--- conditional coverage', () => {
        const dispatch = () => {};
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getAutoNumberedElementsOnSlate');
        slateLevelFunctions.getAutoNumberedElementsOnSlate(autoNumberingSlateData, {dispatch});
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });    
})