/**************************Import Modules**************************/
import * as slateLevelFunctions from '../../../src/component/FigureHeader/slateLevelMediaMapper';
/*************************Import Constants*************************/
import { slateLevelData } from './AutoNumberApiTestData';

describe('-----------------Testing slateLevelMediaMapper-----------------', () => {
    it('Test-1---getImagesInsideSlates---', () => {
        const bodyMatter = slateLevelData.contents.bodymatter
        const spyFunction = jest.spyOn(slateLevelFunctions, 'getImagesInsideSlates');
        const result = slateLevelFunctions.getImagesInsideSlates(bodyMatter);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})