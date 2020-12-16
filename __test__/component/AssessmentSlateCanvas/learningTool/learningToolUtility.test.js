import * as utilityFunctions from '../../../../src/component/AssessmentSlateCanvas/learningTool/learningToolUtility.js';
import { learningSystemList, disciplines, learningSystemMenu, disciplinesList } from '../../../../fixtures/learningTool'
describe('Test Learning Tool Utility Functions', () => {
    let props = {
        dropdownProps: {
            learningSystems: learningSystemList,
            apiResponseForDis: disciplines.options
        }
    }

    it('Test-capitalizeString', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'capitalizeString');
        utilityFunctions.capitalizeString('capitalize-string')
        expect(spyFunction).toHaveReturnedWith('Capitalize String')
    })
    it('Test-prepareAppTypeList -IF', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'prepareAppTypeList');
        utilityFunctions.prepareAppTypeList(props)
        expect(spyFunction).toHaveReturnedWith(learningSystemMenu)
    })

    it('Test-prepareAppTypeList -ELSE', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'prepareAppTypeList');
        utilityFunctions.prepareAppTypeList({})
        expect(spyFunction).toHaveReturnedWith([])
    })
    it('Test-prepareDisciplineList -IF', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'prepareDisciplineList');
        utilityFunctions.prepareDisciplineList(props)
        expect(spyFunction).toHaveReturnedWith(disciplinesList)
    })
    it('Test-prepareDisciplineList -ELSE', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'prepareDisciplineList');
        utilityFunctions.prepareDisciplineList({})
        expect(spyFunction).toHaveReturnedWith([])
    })

})