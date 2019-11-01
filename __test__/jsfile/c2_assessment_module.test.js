const configOBJ = require('../../src/config/config.js');
import $ from 'jquery';
global.$ = global.jQuery = $;


import {c2AssessmentModule } from '../../src/js/c2_assessment_module.js';

describe('testing function', () => {
    it('Test searchAndSelectCallBack function', () => {
        c2AssessmentModule.searchAndSelectCallBack()
    })

    it('Test searchAndSelectonSave function', () => {
        c2AssessmentModule.searchAndSelectonSave()
    })
});