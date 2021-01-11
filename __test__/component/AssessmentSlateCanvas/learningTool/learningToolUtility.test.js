import * as utilityFunctions from '../../../../src/component/AssessmentSlateCanvas/learningTool/learningToolUtility.js';
import { apiList, disciplines, learningSystemMenu, disciplinesList } from '../../../../fixtures/learningTool'
describe('Test Learning Tool Utility Functions', () => {
    let props = {
        dropdownProps: {
            learningSystems: apiList,
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
        expect(spyFunction).toHaveReturnedWith(["Accounting Sims", "Adaptive Pathways", "Criminal Justice Sims", "Digital Interactives", "Economic Sims", "Exploring Solutions", "Guided Data Explorations", "HelpDesk", "Hospitality Sims", "Information Technology Sims", "Media Quiz", "My Virtual Child", "My Virtual Life", "Personal Finance", "Political Science Sims", "Qualitative Business Sims", "Shared Media", "Sound Bytes", "Surveys and Inventories", "Video Library", "Writing Solutions"])
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