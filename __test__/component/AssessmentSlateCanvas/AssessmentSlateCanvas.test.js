import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { AssessmentSlateCanvas } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas';
import {assessmentSlateDefault} from "./../../../fixtures/AssessmentSlateCanvasTestingData";
import { c2AssessmentModule } from '../../../src/js/c2_assessment_module';
import {selectedResult} from '../../../fixtures/learningTool';
describe('Testing Assessment Slate Canvas component', () => {
    test('renders without crashing', () => {
        let props ={slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }}
        const component = mount(<AssessmentSlateCanvas model={assessmentSlateDefault} {...props}/>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })
    it('onClick - launch c2AssessmentModule function', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            showBlocker : jest.fn(),
            model : assessmentSlateDefault,slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        const spyhandleC2AssessmentClick = jest.spyOn(assessmentSlateInstance, 'handleC2AssessmentClick')
        assessmentSlateInstance.handleC2AssessmentClick("");
        c2AssessmentModule.launchAssetBrowser('','','','','','',()=>{});
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(spyhandleC2AssessmentClick).toHaveBeenCalled()
        spyhandleC2AssessmentClick.mockClear() 
    }) 
    it('Test- toggleAssessmentPopup function', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            showBlocker : jest.fn(),
            model : assessmentSlateDefault,
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        const spytoggleAssessmentPopup = jest.spyOn(assessmentSlateInstance, 'toggleAssessmentPopup')
        assessmentSlateInstance.toggleAssessmentPopup(false);
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(spytoggleAssessmentPopup).toHaveBeenCalledWith(false)
        spytoggleAssessmentPopup.mockClear() 
    })
    it ('Set getAssessmentDataPopup', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            showBlocker : jest.fn(),
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            },
            model : assessmentSlateDefault
        }

        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.setState({
            getAssessmentDataPopup:true,
        })
        assessmentSlateInstance.forceUpdate();
        expect(assessmentSlateInstance.state.getAssessmentDataPopup).toBe(true);
    })
    it ('Set getAssessmentDataPopup', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
  
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();      
            assessmentSlateInstance.setState({assessmentId: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            assessmentItemId : "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            assessmentItemTitle:"Open response question updated",
            getAssessmentData:true,})             
            assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
            expect(assessmentSlateInstance.state.assessmentId).toBe("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5");
            expect(assessmentSlateInstance.state.assessmentItemId).toBe("urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b");
            expect(assessmentSlateInstance.state.assessmentItemTitle).toBe("Open response question updated");
            expect(assessmentSlateInstance.state.getAssessmentData).toBe(true);

    })   
    describe('Test- launchAssetBrowserCallBack function', () => {
        let props = {
            handleFocus: function () { },
            handleBlur: function () { },
            model: assessmentSlateDefault,
            onClick: () => { },
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props} />);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlate.find('div.AssessmentSlateMenu').simulate('click');
        assessmentSlateInstance.handleAssessmentFocus();
        it('Test- launchAssetBrowserCallBack if-case', () => {
            let assessmentData = {
                id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                itemID: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "Open response question updated",
                itemsData: { taxonomicType: ["cite"] }
            }
            const spylaunchAssetBrowserCallBack = jest.spyOn(assessmentSlateInstance, 'launchAssetBrowserCallBack')
            assessmentSlateInstance.launchAssetBrowserCallBack(assessmentData);
            assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
            expect(spylaunchAssetBrowserCallBack).toHaveBeenCalled()
            spylaunchAssetBrowserCallBack.mockClear()
        })
        it('Test- launchAssetBrowserCallBack if-else-case', () => {
            let assessmentData = {
                id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                itemID: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "Open response question updated",
                itemsData: {}
            }
            const spylaunchAssetBrowserCallBack = jest.spyOn(assessmentSlateInstance, 'launchAssetBrowserCallBack')
            assessmentSlateInstance.launchAssetBrowserCallBack(assessmentData);
            assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
            expect(spylaunchAssetBrowserCallBack).toHaveBeenCalled()
            spylaunchAssetBrowserCallBack.mockClear()
        })
        it('Test- launchAssetBrowserCallBack if-else-case', () => {
            let assessmentData = {
                id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                itemID: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "Open response question updated",
                assessmentData: { taxonomicType: ["cite"] }
            }
            const spylaunchAssetBrowserCallBack = jest.spyOn(assessmentSlateInstance, 'launchAssetBrowserCallBack')
            assessmentSlateInstance.launchAssetBrowserCallBack(assessmentData);
            assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
            expect(spylaunchAssetBrowserCallBack).toHaveBeenCalled()
            spylaunchAssetBrowserCallBack.mockClear()
        })
    })
    it('Test- LinkLearningApp function ', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
            closeLtAction: function(){},
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        const spylinkLearningApp = jest.spyOn(assessmentSlateInstance, 'linkLearningApp')
        const spyupdateAssessment = jest.spyOn(assessmentSlateInstance, 'updateAssessment')
        assessmentSlateInstance.linkLearningApp(selectedResult,'Quiz','insert'); 
        assessmentSlateInstance.updateAssessment();
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(spylinkLearningApp).toHaveBeenCalledWith(selectedResult,'Quiz','insert')
        expect(spyupdateAssessment).toHaveBeenCalled()
        spylinkLearningApp.mockClear() 
        spyupdateAssessment.mockClear() 

    })
    it('Test- onBlur', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        const spyhandleAssessmentBlur = jest.spyOn(assessmentSlateInstance, 'handleAssessmentBlur')
        assessmentSlateInstance.handleAssessmentBlur();
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(spyhandleAssessmentBlur).toHaveBeenCalled()
        spyhandleAssessmentBlur.mockClear() 
    
    })
    it('Test- Add Assessment', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        const spyupdateAssessment = jest.spyOn(assessmentSlateInstance, 'updateAssessment')
        assessmentSlateInstance.updateAssessment("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5","","Open response question updated","puf","","insert");
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(assessmentSlateInstance.state.assessmentId).toEqual("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5")
        expect(spyupdateAssessment).toHaveBeenCalledWith("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5","","Open response question updated","puf","","insert")        
        spyupdateAssessment.mockClear() 
    });
    it('Test- Update Assessment', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        const spyupdateAssessment = jest.spyOn(assessmentSlateInstance, 'updateAssessment')
        const spyaddPufAssessment = jest.spyOn(assessmentSlateInstance, 'addPufAssessment')
        assessmentSlateInstance.updateAssessment("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5","","Open response question updated","puf","","update");
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(spyupdateAssessment).toHaveBeenCalledWith("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5","","Open response question updated","puf","","update")
        spyupdateAssessment.mockClear()
        expect(assessmentSlateInstance.state.assessmentId).toEqual("urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5")
        assessmentSlateInstance.addPufAssessment(pufObj);
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(spyaddPufAssessment).toHaveBeenCalledWith(pufObj)
        spyaddPufAssessment.mockClear()
    });
    it('Test- Select assessment type ', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        const expectedValue = { assessmentType: "CITE" }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props} />);
        const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        const spyselectAssessmentType = jest.spyOn(assessmentSlateInstance, 'selectAssessmentType')
        const returnvalue = assessmentSlateInstance.selectAssessmentType("Full Assessment CITE");
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(returnvalue).toEqual(expectedValue.assessmentType)
        expect(spyselectAssessmentType).toHaveBeenCalledWith("Full Assessment CITE")
        spyselectAssessmentType.mockClear()
        
    });
});