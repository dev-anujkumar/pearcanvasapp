import React from 'react';
import ReactDOM from 'react-dom';
import { mount , shallow} from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import  {AssessmentSlateCanvas}  from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas';
import {assessmentSlateDefault} from "./../../../fixtures/AssessmentSlateCanvasTestingData";
import { c2AssessmentModule } from '../../../src/js/c2_assessment_module';
import {selectedResult} from '../../../fixtures/learningTool';
// import {} from '../../../src/component/tinyMceEditor.js';//
const mockStore = configureMockStore(middlewares);
jest.mock('../../../src/component/tinyMceEditor.js', () => ({
}))
let initialState = {
        elmReducer: {
        elmData: {
            numberOfResources: 88,
            contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
        },
        errFlag: false,
        errorStatus: ""
    },
    appStore: {
        pageNumberData: {},
        slateLevelData: {},
        permissions: [
            'quad_linking_assessment'
        ]
    },
    learningToolReducer:{
        learningTypeSelected:""
    }
};
describe('Testing Assessment Slate Canvas component', () => {
    let store = {};
    beforeEach(() => {
        store = mockStore(initialState);
    })
    test('renders without crashing', () => {
        let props ={slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }}
        const component = shallow(<Provider store={store}><AssessmentSlateCanvas model={assessmentSlateDefault} {...props}/></Provider>)
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
            },
            
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ]
        }
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.instance();
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
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.instance();
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

        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.instance();
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
  
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.instance();      
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
            },
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ]
        }
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props} />);
        const assessmentSlateInstance = assessmentSlate.instance();
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
        xit('Test- launchAssetBrowserCallBack if-else-case', () => {
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
        xit('Test- launchAssetBrowserCallBack if-else-case', () => {
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
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.instance();
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
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.instance();
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
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props}/>);
        const assessmentSlateInstance = assessmentSlate.instance();
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
    xit('Test- Select assessment type ', () => {
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
        const assessmentSlate = shallow(<AssessmentSlateCanvas {...props} />);
        const assessmentSlateInstance = assessmentSlate.instance();
        const spyselectAssessmentType = jest.spyOn(assessmentSlateInstance, 'selectAssessmentType')
        const returnvalue = assessmentSlateInstance.selectAssessmentType("Full Assessment CITE");
        assessmentSlateInstance.forceUpdate();
        assessmentSlate.update();
        expect(returnvalue).toEqual(expectedValue.assessmentType)
        expect(spyselectAssessmentType).toHaveBeenCalledWith("Full Assessment CITE")
        spyselectAssessmentType.mockClear()
        
    });
});