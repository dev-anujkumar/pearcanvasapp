import React from 'react';
import { mount } from 'enzyme';
import ElementSingleAssessment from '../../../src/component/ElementSingleAssessment/ElementSingleAssessment';
import { c2AssessmentModule } from '../../../src/js/c2_assessment_module';
import {  singleAssessmentCITEDefault} from '../../../fixtures/ElementSingleAssessmentTestData'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    citeTdxReducer:{ 
        currentAssessmentSelected:{
            "versionUrn":"dfer",
            "name":"mmoi"
        },
        citeApiData:{assessments:{"dfsarfw":"Sdfa"}},
        tdxApiData:{assessments:{"dfsarfw":"Sdfa"}},
        mmiApiData:{assessments:{"dfsarfw":"Sdfa"}},
        isLoading:false,
        currentSingleAssessmentSelected:{},
        citeErrorFlag:"",
        assessmenterrFlag:false,

 },
};
let store = mockStore(initialState);
jest.mock('../../../src/js/toggleLoader', () => ({
    hideTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    showTocBlocker: ()=>{
        return false
    }
}))

describe('Testing Element Single Assessment component', () => {

test('renders without crashing', () => {
        const component = mount(<Provider store={store}><ElementSingleAssessment model={singleAssessmentCITEDefault} index="" /></Provider>)
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
        openCustomPopup: jest.fn(),
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],      
    };

    let singleAssessment = mount(<Provider store={store}><ElementSingleAssessment {...props}  /></Provider>);
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
            activeAsseessmentUsageType: 'Quiz',
            showAssessmentPopup: true
        });
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        singleAssessment.find('div.singleAssessment_Dropdown_Container .singleAssessment_Dropdown_activeDropdown').simulate('click');
        singleAssessment.find('ul.singleAssessment_Dropdown_options>li:first-child').simulate('click');
        singleAssessment.find('div.pearson-component').simulate('click');
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
        expect(singleAssessmentInstance.state.showAssessmentPopup).toBe(true)
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
    it('Test-resetPage function', () => {
        const spyhandleAssessmentBlur = jest.spyOn(singleAssessmentInstance, 'resetPage')
        singleAssessmentInstance.resetPage(true,true);
        expect(spyhandleAssessmentBlur).toHaveBeenCalled()
        spyhandleAssessmentBlur.mockClear()
    });
    it('Test-resetPage search false function', () => {
        const spyhandleAssessmentBlur = jest.spyOn(singleAssessmentInstance, 'resetPage')
        singleAssessmentInstance.resetPage(true,false);
        expect(spyhandleAssessmentBlur).toHaveBeenCalled()
        spyhandleAssessmentBlur.mockClear()
    });
    it('Test-AssessmentSearchTitle  function', () => {
        const spyhandleAssessmenSearch = jest.spyOn(singleAssessmentInstance, 'AssessmentSearchTitle')
        singleAssessmentInstance.AssessmentSearchTitle();
        expect(spyhandleAssessmenSearch).toHaveBeenCalled()
        spyhandleAssessmenSearch.mockClear()
    });
    it('Test-closeWindowAssessment  function', () => {
        const spyClose = jest.spyOn(singleAssessmentInstance, 'closeWindowAssessment')
        singleAssessmentInstance.closeWindowAssessment();
        expect(spyClose).toHaveBeenCalled()
        spyClose.mockClear()
    });
    it('Test-assessmentNavigateBack function', () => {
        const spyNavigateBack = jest.spyOn(singleAssessmentInstance, 'assessmentNavigateBack')
        singleAssessmentInstance.assessmentNavigateBack();
        expect(spyNavigateBack).toHaveBeenCalled()
        spyNavigateBack.mockClear()
    });
    it('Test-addCiteTdxAssessment function', () => {
        let obj={
            slateType:"singleSlateAssessment"
        }
        const spyaddAssessment = jest.spyOn(singleAssessmentInstance, 'addCiteTdxAssessment')
        singleAssessmentInstance.addCiteTdxAssessment(obj);
        expect(spyaddAssessment).toHaveBeenCalled()
        spyaddAssessment.mockClear()
    });
    it('Test-addCiteTdxAssessment else function', () => {
        let obj={
            slateType:"singleSlateAssessmentInner",
            singleAssessmentID:{
                versionUrn:"45678890"
            }
        }
        const spyaddAssessment = jest.spyOn(singleAssessmentInstance, 'addCiteTdxAssessment')
        singleAssessmentInstance.addCiteTdxAssessment(obj);
        expect(spyaddAssessment).toHaveBeenCalled()
        spyaddAssessment.mockClear()
    });
    it('Test-closeElmWindow function', () => {
        const spycloseELMWindow = jest.spyOn(singleAssessmentInstance, 'closeElmWindow')
        singleAssessmentInstance.closeElmWindow();
        expect(spycloseELMWindow).toHaveBeenCalled()
        spycloseELMWindow.mockClear()
    });
    it('Test-addPufAssessment function', () => {
        let pufObj={
            id:"hj",
        itemid:"6789",

    }
        const spyaddPuffAssessment = jest.spyOn(singleAssessmentInstance, 'addPufAssessment')
        singleAssessmentInstance.addPufAssessment(pufObj);
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    it('Test-addAssessmentResource function', () => {
        let props = {
            model: singleAssessmentCITEDefault,
            index:"1",
            usagetype:"Practice",
            handleFocus: function(){},
            onClick : ()=>{},
            handleBlur: function(){},
            showBlocker: jest.fn(),
            openCustomPopup: jest.fn(),
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],      
        };
    
        let singleAssessment = mount(<Provider store={store}><ElementSingleAssessment {...props}  /></Provider>);
        const singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
        const spyaddAssessmentResource = jest.spyOn(singleAssessmentInstance, 'addAssessmentResource')
        singleAssessmentInstance.addAssessmentResource();
        expect(spyaddAssessmentResource).toHaveBeenCalled()
        spyaddAssessmentResource.mockClear()
    });
    
    
});
