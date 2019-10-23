import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { AssessmentSlateCanvas } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas';
import {assessmentSlateDefault} from "./../../../fixtures/AssessmentSlateCanvasTestingData";
import { c2AssessmentModule } from '../../../src/js/c2_assessment_module'
describe('Testing Assessment Slate Canvas component', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AssessmentSlateCanvas model={assessmentSlateDefault}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    let wrapper;
   
    it('onClick - launch c2AssessmentModule function', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            showBlocker : jest.fn(),
            model : assessmentSlateDefault
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.handleC2AssessmentClick("");
        c2AssessmentModule.launchAssetBrowser('','','','','','',()=>{});
        assessmentSlateInstance.toggleAssessmentPopup(false);

    }) 
    it ('Set getAssessmentDataPopup', () => {
        const mockLoginfn = jest.fn();
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            showBlocker : jest.fn(),
            model : assessmentSlateDefault
        }

        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.setState({
            getAssessmentDataPopup:true,
        })
        assessmentSlateInstance.forceUpdate();
    })
    it ('Set getAssessmentDataPopup', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
  
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
      
            assessmentSlateInstance.setState({assessmentId: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            assessmentItemId : "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            assessmentItemTitle:"Open response question updated",
            getAssessmentData:true,})    
           
            assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
    })   
    it('Test- launchAssetBrowserCallBack function ', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
        let assessmentData={
            id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            itemID: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            title: "Open response question updated",
            itemsData: {taxonomicType:["cite"]}

        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlate.find('div.AssessmentSlateMenu').simulate('click');
        assessmentSlateInstance.handleAssessmentFocus();
        assessmentSlateInstance.launchAssetBrowserCallBack(assessmentData);

    })
    it('Test- onBlur', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.handleAssessmentBlur();
    
    })
    it('Test- Add Assessment', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.updateAssessment("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5","","Open response question updated","puf","","insert");
        assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
            expect(assessmentSlateInstance.state.assessmentId).toEqual("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5")
        
    });
    it('Test- Update Assessment', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.updateAssessment("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5","","Open response question updated","puf","","update");
        assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
            expect(assessmentSlateInstance.state.assessmentId).toEqual("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5")
            assessmentSlateInstance.addPufAssessment(pufObj);
    });
    it('Test- Select assessment type ', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
        const expectedValue = { assessmentType : "CITE"}
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
       const returnvalue = assessmentSlateInstance.selectAssessmentType("Full Assessment CITE");
        assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
            expect(returnvalue).toEqual(expectedValue.assessmentType)
        
    });
});