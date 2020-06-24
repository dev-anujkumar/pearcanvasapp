/**************************Import Plugins**************************/
import React from 'react';
import { mount } from 'enzyme';
/**************************Import Modules**************************/
import config from '../../../../src/config/config';
import {UsageTypeDropdown} from ' ../../../src/component/AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx';
/*************************Import Constants*************************/
import { MockUsageTypeList_Data } from '../../../../fixtures/AssessmentSlateCanvasTestingData.js';
/**************************Mock Helper Functions**************************/
jest.mock('../../../../src/constants/utility.js', () => {
    return {
        hasReviewerRole: () => {
            return false
        }
    }
})

describe('Testing UsageTypeDropdown component', () => {
    it('UsageTypeDropdown-Single_Assessment', () => {
        config.slateType = "section"
        let props={
            usageTypeList : MockUsageTypeList_Data,
            clickHandlerFn : function(){}
        }
        const component = mount(<UsageTypeDropdown {...props}/>)     
        expect(component).toHaveLength(1);      
    })
    it('UsageTypeDropdown-Assessment_Slate', () => {
        config.slateType = "assessment"
        let props={
            usageTypeList : MockUsageTypeList_Data,
            clickHandlerFn : function(){}
        }
        const component = mount(<UsageTypeDropdown {...props}/>)       
        expect(component).toHaveLength(1);      
    })
});