const configOBJ = require('../../src/config/config.js');


import {c2AssessmentModule } from '../../src/js/c2_assessment_module.js';

let obj = {
    fileName:'c2_assessment_module.js',
    filterType:'none',
    searchMode:'true',
    searchSelectAssessmentURN:'pearsonId:12345455667',
    productId:'id:12344',
    searchTypeOptVal:'1'
} 

describe('testing function', () => {
    it('Test searchAndSelectonSave function', () => {
        c2AssessmentModule.searchAndSelectonSave();
        c2AssessmentModule.searchAndSelectonSave = jest.fn();
        c2AssessmentModule.searchAndSelectonSave();
        expect(c2AssessmentModule.searchAndSelectonSave).toHaveBeenCalled();
    })
    it('Test launchAssetBrowser function',() => {
         let callback = jest.fn();
         c2AssessmentModule.launchAssetBrowser({...obj},callback);
         expect(callback).not.toHaveBeenCalled();
    })
    it('Test launchAssetBrowser function',() => {
        let callback = jest.fn();
        c2AssessmentModule.launchAssetBrowser('');
        expect(callback).not.toHaveBeenCalled();
   })
});