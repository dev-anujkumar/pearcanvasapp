import React from 'react';
import { mount } from 'enzyme';
import { ElementSingleAssessment } from '../../../src/component/ElementSingleAssessment/ElementSingleAssessment';
import { c2AssessmentModule } from '../../../src/js/c2_assessment_module';
import {  singleAssessmentCITEDefault} from '../../../fixtures/ElementSingleAssessmentTestData'
jest.mock('../../../src/js/toggleLoader', () => ({
    hideTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    showTocBlocker: ()=>{
        return false
    }
}))
describe('Testing Element Single Assessment component', () => {

test('renders without crashing', () => {
        const component = mount(<ElementSingleAssessment model={singleAssessmentCITEDefault} index="" />)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })

    let props = {
        model: singleAssessmentCITEDefault,
        index:"1",
        usagetype:"Practice",
        handleFocus: function(){},
        onClick : ()=>{},
        handleBlur: function(){},
        showBlocker: jest.fn(),
        
    };

    let singleAssessment = mount(<ElementSingleAssessment {...props}  />);
    const singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
    it('Render Single Assessment default ', () => {
        const spyrenderAssessmentType = jest.spyOn(singleAssessmentInstance, 'renderAssessmentType')
        singleAssessmentInstance.renderAssessmentType(singleAssessmentCITEDefault);
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spyrenderAssessmentType).toHaveBeenCalledWith(singleAssessmentCITEDefault) 
        spyrenderAssessmentType.mockClear()
    });
    it('onClick Event-Select Assessment usage type', () => {
        singleAssessmentInstance.setState({
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType: 'Quiz'
        });
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        singleAssessment.find('div.singleAssessment_Dropdown_Container .singleAssessment_Dropdown_activeDropdown').simulate('click');
        singleAssessment.find('ul.singleAssessment_Dropdown_options>li:first-child').simulate('click');
        singleAssessment.find('div.pearson-component.image').simulate('click');
        singleAssessment.find('div.figureElement').simulate('click');
        expect(singleAssessmentInstance.state.showAssessmentPopup).toBe(true);
        expect(singleAssessmentInstance.state.asseessmentUsageTypeDropdown).toBe(false);
        expect(singleAssessmentInstance.state.activeAsseessmentUsageType).toBe('Quiz');
           
    });
    it('Test-handleAssessmentTypeChange function', () => {
        singleAssessmentInstance.setState({
            showAssessmentPopup: true
        });
        singleAssessmentInstance.forceUpdate();
        const spyhandleAssessmentTypeChange = jest.spyOn(singleAssessmentInstance, 'handleAssessmentTypeChange')
        singleAssessmentInstance.handleAssessmentTypeChange('Practice');
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spyhandleAssessmentTypeChange).toHaveBeenCalledWith('Practice') 
        expect(singleAssessmentInstance.state.showAssessmentPopup).toBe(true);
        expect(singleAssessmentInstance.state.asseessmentUsageTypeDropdown).toBe(false);
        spyhandleAssessmentTypeChange.mockClear()
    });
    it('Test-toggleAssessmentPopup function', () => {
        singleAssessmentInstance.setState({
            showAssessmentPopup: true
        });
        singleAssessmentInstance.forceUpdate();
        const spytoggleAssessmentPopup = jest.spyOn(singleAssessmentInstance, 'toggleAssessmentPopup')
        singleAssessmentInstance.toggleAssessmentPopup({},false);
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spytoggleAssessmentPopup).toHaveBeenCalledWith({},false) 
        expect(singleAssessmentInstance.state.showAssessmentPopup).toBe(false)
        spytoggleAssessmentPopup.mockClear()
    });
    it('Test-toggleUsageTypeDropdown function', () => {
        singleAssessmentInstance.setState({
            asseessmentUsageTypeDropdown: true
        });
        singleAssessmentInstance.forceUpdate();
        const spytoggleUsageTypeDropdown = jest.spyOn(singleAssessmentInstance, 'toggleUsageTypeDropdown')
        singleAssessmentInstance.toggleUsageTypeDropdown(true);
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spytoggleUsageTypeDropdown).toHaveBeenCalledWith(true) 
        expect(singleAssessmentInstance.state.asseessmentUsageTypeDropdown).toBe(false)
        spytoggleUsageTypeDropdown.mockClear()
    });
    it('Test-handleAssessmentFocus function', () => {
        const spyhandleAssessmentFocus = jest.spyOn(singleAssessmentInstance, 'handleAssessmentFocus')
        singleAssessmentInstance.handleAssessmentFocus();
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spyhandleAssessmentFocus).toHaveBeenCalled()
        spyhandleAssessmentFocus.mockClear()
    });
    it('Test-handleAssessmentBlur function', () => {
        const spyhandleAssessmentBlur = jest.spyOn(singleAssessmentInstance, 'handleAssessmentBlur')
        singleAssessmentInstance.handleAssessmentBlur();
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spyhandleAssessmentBlur).toHaveBeenCalled()
        spyhandleAssessmentBlur.mockClear()
    });
    it('Test-C2 media handling',()=>{
        let props = {
            handleFocus: function(){},
            handleBlur : jest.fn(),
            model : singleAssessmentCITEDefault,
            onClick : ()=>{},
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: ()=>{
                return false
            }
        }
        const singleAssessment = mount(<ElementSingleAssessment {...props}/>);
        const singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
        const spyhandleC2AssessmentClick = jest.spyOn(singleAssessmentInstance, 'handleC2AssessmentClick')
        singleAssessmentInstance.handleC2AssessmentClick("");
        c2AssessmentModule.launchAssetBrowser('','','','','','',()=>{});
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spyhandleC2AssessmentClick).toHaveBeenCalled()
        spyhandleC2AssessmentClick.mockClear() 
    })
    describe('Test- launchAssetBrowserCallBack function',()=>{
        let props = {
            handleFocus: function(){},
            handleBlur : jest.fn(),
            model : singleAssessmentCITEDefault,
            onClick : ()=>{},                    
        }
        const singleAssessment = mount(<ElementSingleAssessment {...props}/>);
        const singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
        it('Test- launchAssetBrowserCallBack if-case', () => {
            let assessmentData = {
                id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                itemID: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "Open response question updated",
                itemsData: { taxonomicType: ["cite"] }
            }
            const spylaunchAssetBrowserCallBack = jest.spyOn(singleAssessmentInstance, 'launchAssetBrowserCallBack')
            singleAssessmentInstance.launchAssetBrowserCallBack(assessmentData);
            singleAssessmentInstance.forceUpdate();
            singleAssessment.update();
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
            const spylaunchAssetBrowserCallBack = jest.spyOn(singleAssessmentInstance, 'launchAssetBrowserCallBack')
            singleAssessmentInstance.launchAssetBrowserCallBack(assessmentData);
            singleAssessmentInstance.forceUpdate();
            singleAssessment.update();
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
            const spylaunchAssetBrowserCallBack = jest.spyOn(singleAssessmentInstance, 'launchAssetBrowserCallBack')
            singleAssessmentInstance.launchAssetBrowserCallBack(assessmentData);
            singleAssessmentInstance.forceUpdate();
            singleAssessment.update();
            expect(spylaunchAssetBrowserCallBack).toHaveBeenCalled()
            spylaunchAssetBrowserCallBack.mockClear()
        })
    })
});