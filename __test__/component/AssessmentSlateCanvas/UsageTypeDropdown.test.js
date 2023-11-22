/**************************Import Plugins**************************/
import React from 'react';
import { mount } from 'enzyme';
/**************************Import Modules**************************/
import config from '../../../src/config/config';
import {UsageTypeDropdown} from ' ../../../src/component/AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx';
/*************************Import Constants*************************/
import { MockUsageTypeList_Data1 } from '../../../fixtures/AssessmentSlateCanvasTestingData.js';
/**************************Mock Helper Functions**************************/
jest.mock('../../../src/constants/utility.js', () => {
    return {
        hasReviewerRole: () => {
            return false
        },
        handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
    }
})

describe('Testing UsageTypeDropdown component', () => {
    it('UsageTypeDropdown-Single_Assessment', () => {
        config.slateType = "section"
        let props={
            usageTypeList : MockUsageTypeList_Data1,
            clickHandlerFn : function(){}
        }
        const component = mount(<UsageTypeDropdown {...props}/>)     
        expect(component).toHaveLength(1);
        component.find('.slate_assessment_metadata_dropdown_name').at(1).simulate('click'); 
    })
});