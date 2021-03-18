/**************************Import Plugins**************************/
import React from 'react';
import { JSDOM } from 'jsdom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
/**************************Import Modules**************************/
import config from '../../../src/config/config.js';
import AssessmentSlateData from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateData';
import { DefaultAssessmentSlateData, defaultAS, MockUsageTypeList_Data, assessmentSlateELM } from "./../../../fixtures/AssessmentSlateCanvasTestingData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
if (!global.Element.prototype.hasOwnProperty("innerText")) {
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });

}
/**************************Mock Helper Functions**************************/

jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn()
}))
jest.mock('../../../src/component/AssessmentSlateCanvas/elm/RootElmComponent.jsx', () => {
    return function () {
        return (<div className="elm-wrapper">null</div>)
    }
})
jest.mock('../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx', () => {
    return function () {
        return (<div className="cite-wrapper">null</div>)
    }
})
jest.mock('../../../src/component/AssessmentSlateCanvas/learningTool/learningTool.jsx', () => {
    return function () {
        return (<div className="learning-wrapper">null</div>)
    }
})
jest.mock('../../../src/component/PopUp/PopUp.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/AssessmentSlateCanvas/ElmUpdateButton.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
/**************************Declare Common Variables**************************/
config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
config.ASSET_POPOVER_ENDPOINT = "https://contentapis-staging.pearsoncms.net/manifest-api/"
config.STRUCTURE_APIKEY = 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld'
config.PRODUCTAPI_ENDPOINT = "https://contentapis-staging.pearsoncms.net/product-api/"
config.projectUrn = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
config.slateType = "assessment"
let permissions = [
    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview",
    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
]
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
        slateLevelData: DefaultAssessmentSlateData,
        usageTypeListData: {
            usageTypeList: MockUsageTypeList_Data
        }
    },
    learningToolReducer: {
        learningTypeSelected: ""
    },
    citeTdxReducer: {
        sortBy: "name",
        sortOrder: 1
    },
    assessmentReducer: {
        "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464": {
            activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            assessmentStatus: "final",
            assessmentTitle: "Quiz: 7.4 Developing Relationships",
            assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
            latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565"
        }
    }
};
let expectedRes2 = {
    activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    assessmentStatus: "wip",
    assessmentTitle: "Quiz: 7.4 Developing Relationships",
    assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
    latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565"
}
let initialState2 = {
    ...initialState,
    assessmentReducer: {
        ...initialState.assessmentReducer,
        "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464": expectedRes2
    }
}
let props = {
    type: 'element-assessment',
    isLOExist: jest.fn(),
    model: defaultAS,
    permissions: permissions,
    getAssessmentData: false,
    assessmentSlateObj: {
        assessmentId: "",
        itemId: "",
        title: "",
    },
    getAssessmentDataPopup: false,
    updateAssessment: jest.fn(),
    addPufAssessment: jest.fn(),
    handleCanvasBlocker: {
        showTocBlocker: jest.fn(),
        disableHeader: jest.fn(),
        hideTocBlocker: jest.fn(),
        hideToc: jest.fn(),
        showBlocker: jest.fn(),
        ShowLoader: jest.fn()
    },
    handleAssessmentBlur: jest.fn(),
    addCiteTdxAssessment: jest.fn(),
    setAssessmentFormat: jest.fn(),
    setAssessmentUsageType: jest.fn(),
    setCurrentCiteTdx: jest.fn(),
    assessmentSorting: jest.fn(),
    openLtAction: jest.fn(),
    closeLtAction: jest.fn(),
    openLTFunction: jest.fn(),
    checkElmAssessmentStatus: jest.fn(),
    showToastMessage: jest.fn()
}
describe('Testing Assessment Slate Data component', () => {
    let store = mockStore(initialState);
    const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>)
    let assessmentSlateInstance = component.find('AssessmentSlateData').instance();
    it('Test 1-Render Assessment Slate Data component without crashing ', () => {
        expect(component).toHaveLength(1);
        expect(assessmentSlateInstance).toBeDefined();
        expect(component.find('div.AssessmentSlateCanvas')).toHaveLength(1)
    })
    describe('Test 2- renderAssessmentSlate Method', () => {
        it('Test 2.1-renderAssessmentSlate - Render Assessment Slate with Elm Picker ', () => {
            assessmentSlateInstance.setState({
                showElmComponent: true,
                activeAssessmentType: "puf"
            })
            component.update();
            assessmentSlateInstance.forceUpdate();
            assessmentSlateInstance.renderAssessmentSlate();
            expect(assessmentSlateInstance.state.showElmComponent).toBe(true)
            expect(assessmentSlateInstance.state.activeAssessmentType).toBe("puf")
        })
        it('Test 2.2-renderAssessmentSlate - Render Assessment Slate with Cite Picker ', () => {
            assessmentSlateInstance.setState({
                showCiteTdxComponent: true,
                activeAssessmentType: "cite"
            })
            component.update();
            assessmentSlateInstance.forceUpdate();
            assessmentSlateInstance.renderAssessmentSlate();
            expect(assessmentSlateInstance.state.showCiteTdxComponent).toBe(true)
            expect(assessmentSlateInstance.state.activeAssessmentType).toBe("cite")
            expect(component.find('div.cite-wrapper')).toBeDefined()
        })
        it('Test 2.3-renderAssessmentSlate - Render Assessment Slate with LT/LA Picker ', () => {
            assessmentSlateInstance.setState({
                activeAssessmentType: 'learningtemplate',
                changeLearningData: true,
                learningToolStatus: true
            })
            component.update();
            assessmentSlateInstance.forceUpdate();
            assessmentSlateInstance.renderAssessmentSlate();
            expect(assessmentSlateInstance.state.learningToolStatus).toBe(true)
            expect(assessmentSlateInstance.state.changeLearningData).toBe(true)
            expect(assessmentSlateInstance.state.activeAssessmentType).toBe("learningtemplate")
        })
    })
    it('Test 3-renderAssessmentSlate - Render Assessment Slate Final Slate ', () => {
        const component2 = mount(<Provider store={store}><AssessmentSlateData
            {...props}
            assessmentSlateObj={{
                assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                itemId: "",
                title: "Test Puf",
            }}
            getAssessmentData={true}
            getAssessmentDataPopup={false}
        /></Provider>)
        let assessmentSlateInstance2 = component2.find('AssessmentSlateData').instance();
        assessmentSlateInstance2.setState({
            changeLearningData: false,
            activeAssessmentUsageType: 'Homework'
        })
        component2.update();
        assessmentSlateInstance2.forceUpdate();
        expect(assessmentSlateInstance2.props.getAssessmentData).toBe(true)
        expect(assessmentSlateInstance2.state.changeLearningData).toBe(false)
        expect(assessmentSlateInstance2.state.activeAssessmentUsageType).toBe('Homework')
        expect(assessmentSlateInstance2.props.getAssessmentDataPopup).toBe(false)
    });
    it('Test 4-renderAssessmentSlate - Render Assessment Slate-Success Message', () => {
        const component3 = mount(<Provider store={store}><AssessmentSlateData
            {...props}
            assessmentSlateObj={{
                assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                itemId: "",
                title: "Test Puf",
            }}
            getAssessmentData={true}
            getAssessmentDataPopup={true}
        /></Provider>)
        let assessmentSlateInstance3 = component3.find('AssessmentSlateData').instance();
        assessmentSlateInstance3.setState({
            activeAssessmentUsageType: 'Homework',
            activeAssessmentType: "puf"
        })
        component3.update();
        assessmentSlateInstance3.forceUpdate();
        assessmentSlateInstance3.showSuccessMessage("Test Puf", "puf")
        expect(assessmentSlateInstance3.props.getAssessmentData).toBe(true)
        expect(assessmentSlateInstance3.state.changeLearningData).toBe(false)
        expect(assessmentSlateInstance3.state.activeAssessmentUsageType).toBe('Homework')
        expect(assessmentSlateInstance3.props.getAssessmentDataPopup).toBe(true)
    });
    describe('Test 5- CITE/TDX Assessments Methods', () => {
        let tdxObj = {
            assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            itemId: "",
            title: "Test Tdx",
        }
        const component4 = mount(<Provider store={store}><AssessmentSlateData
            {...props}
            assessmentSlateObj={tdxObj}
            getAssessmentData={true}
            getAssessmentDataPopup={false}
        /></Provider>)
        let assessmentSlateInstance4 = component4.find('AssessmentSlateData').instance();
        it('Test 5.1-addCiteTdxAssessment', () => {
            jest.spyOn(assessmentSlateInstance4, 'addCiteTdxAssessment')
            assessmentSlateInstance4.addCiteTdxAssessment(tdxObj, 'tdx');
            expect(assessmentSlateInstance4.props.getAssessmentData).toBe(true)
            expect(assessmentSlateInstance4.props.getAssessmentDataPopup).toBe(false)
        })
        it('Test 5.2-AssessmentSearchTitle', () => {
            let searchTitle = "Test Tdx",
                filterUUID = "urn:test"
            jest.spyOn(assessmentSlateInstance4, 'addCiteTdxAssessment')
            assessmentSlateInstance4.AssessmentSearchTitle(searchTitle, filterUUID);
            expect(assessmentSlateInstance4.state.searchTitle).toBe(searchTitle)
            expect(assessmentSlateInstance4.state.filterUUID).toBe(filterUUID)
        })
        it('Test 5.3.1-resetPage -IF', () => {
            let isReset = true
            jest.spyOn(assessmentSlateInstance4, 'resetPage')
            assessmentSlateInstance4.resetPage(isReset);
            expect(assessmentSlateInstance4.state.isReset).toBe(true)
            expect(assessmentSlateInstance4.state.parentPageNo).toBe(1)
            expect(assessmentSlateInstance4.state.searchTitle).toBe('')
            expect(assessmentSlateInstance4.state.filterUUID).toBe('')
        })
        it('Test 5.3.2-resetPage -ELSE', () => {
            let isReset = true,
                isSearch = true
            jest.spyOn(assessmentSlateInstance4, 'resetPage')
            assessmentSlateInstance4.resetPage(isReset, isSearch);
            expect(assessmentSlateInstance4.state.isReset).toBe(true)
            expect(assessmentSlateInstance4.state.parentPageNo).toBe(1)
        })
        it('Test 5.4-closeWindowAssessment', () => {
            jest.spyOn(assessmentSlateInstance4, 'closeWindowAssessment')
            assessmentSlateInstance4.closeWindowAssessment();
            expect(assessmentSlateInstance4.state.showCiteTdxComponent).toBe(false)
        })
    })
    describe('Test 6- LT/LA Assessments Methods', () => {
        let learningObj = {
            learningtemplateUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            type: "socialexplorer-pathways",
            learningsystem: "socialexplorer",
            templateid: "2004",
            label: { en: "Test LT/LA" },
        }
        const component5 = mount(<Provider store={store}><AssessmentSlateData
            {...props}
            assessmentSlateObj={learningObj}
            getAssessmentData={true}
            getAssessmentDataPopup={false}
        /></Provider>)
        let assessmentSlateInstance5 = component5.find('AssessmentSlateData').instance();
        assessmentSlateInstance5.setState({
            changeLearningData: false,
            activeAssessmentUsageType: 'Homework'
        })
        component5.update();
        assessmentSlateInstance5.forceUpdate();
        it('Test 6.1-linkLearningApp', () => {
            jest.spyOn(assessmentSlateInstance5, 'linkLearningApp')
            assessmentSlateInstance5.linkLearningApp(learningObj);
            expect(assessmentSlateInstance5.props.getAssessmentData).toBe(true)
            expect(assessmentSlateInstance5.state.changeLearningData).toBe(false)
            expect(assessmentSlateInstance5.state.activeAssessmentUsageType).toBe('Homework')
            expect(assessmentSlateInstance5.props.getAssessmentDataPopup).toBe(false)
        })
        it('Test 6.2-changeLearningApp', () => {
            jest.spyOn(assessmentSlateInstance5, 'changeLearningApp')
            assessmentSlateInstance5.changeLearningApp();
            expect(assessmentSlateInstance5.state.changeLearningData).toBe(true)
            expect(assessmentSlateInstance5.state.activeAssessmentType).toBe('learningtemplate')
        })
        it('Test 6.3-closeLTLAPopUp & closeLTLAPopUpCallback', () => {
            jest.spyOn(assessmentSlateInstance5, 'closeLTLAPopUp')
            jest.spyOn(assessmentSlateInstance5, 'closeLTLAPopUpCallback')
            assessmentSlateInstance5.closeLTLAPopUp();
            assessmentSlateInstance5.closeLTLAPopUpCallback();
            expect(assessmentSlateInstance5.state.changeLearningData).toBe(false)
            expect(assessmentSlateInstance5.state.activeAssessmentType).toBe('learningtemplate')
        })
        it('Test 6.4-closelearningPopup', () => {
            jest.spyOn(assessmentSlateInstance5, 'closelearningPopup')
            assessmentSlateInstance5.closelearningPopup();
            expect(assessmentSlateInstance5.state.changeLearningData).toBe(false)
            expect(assessmentSlateInstance5.state.learningToolStatus).toBe(false)
            expect(assessmentSlateInstance5.state.activeAssessmentType).toBe('learningtemplate')
        })
    })
    describe('Test 7- Elm/Learnosity Assessments Methods', () => {
        let pufObj = {
            assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            title: "Test Puf",
            assessmentFormat: "puf",
            usagetype: "Homework"
        }
        const component6 = mount(<Provider store={store}><AssessmentSlateData
            {...props}
            model={assessmentSlateELM}
            assessmentSlateObj={pufObj}
            getAssessmentData={true}
            getAssessmentDataPopup={false}
        /></Provider>)
        let assessmentSlateInstance6 = component6.find('AssessmentSlateData').instance();
        assessmentSlateInstance6.setState({
            showElmComponent: false,
            activeAssessmentUsageType: 'Homework'
        })
        component6.update();
        assessmentSlateInstance6.forceUpdate();
        it('Test 7.1-addPufAssessment', () => {
            jest.spyOn(assessmentSlateInstance6, 'addPufAssessment')
            assessmentSlateInstance6.addPufAssessment(pufObj);
            expect(assessmentSlateInstance6.props.getAssessmentData).toBe(true)
            expect(assessmentSlateInstance6.state.showElmComponent).toBe(false)
            expect(assessmentSlateInstance6.state.activeAssessmentUsageType).toBe('Homework')
            expect(assessmentSlateInstance6.props.getAssessmentDataPopup).toBe(false)
        })
        it('Test 7.2-updateElm', () => {
            let event = {
                stopPropagation: jest.fn(),
                preventDefault: jest.fn()
            }
            jest.spyOn(assessmentSlateInstance6, 'updateElm')
            assessmentSlateInstance6.updateElm(event);
            expect(assessmentSlateInstance6.state.showUpdatePopup).toBe(true)
        })
        it('Test 7.3-showCustomPopup', () => {
            assessmentSlateInstance6.setState({
                showUpdatePopup: true,
                activeAssessmentUsageType: 'Homework'
            })
            component6.update();
            assessmentSlateInstance6.forceUpdate();
            jest.spyOn(assessmentSlateInstance6, 'showCustomPopup')
            assessmentSlateInstance6.showCustomPopup();
            expect(assessmentSlateInstance6.state.showUpdatePopup).toBe(true)
        })
        it('Test 7.4-updateElmAssessment', () => {
            document.getElementById = () => {
                return {
                    innerText: "",
                    style: { display: "" },
                    classList: {
                        add: jest.fn(),
                        remove: jest.fn()
                    }
                }
            }
            let event = {
                stopPropagation: jest.fn(),
                preventDefault: jest.fn()
            }
            let expectedProps = {
                'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464':
                {
                    activeWorkUrn: 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    assessmentStatus: 'final',
                    assessmentTitle: 'Quiz: 7.4 Developing Relationships',
                    assessmentEntityUrn: 'urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86',
                    latestWorkUrn: 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565',
                    "targetId": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
                }
            }
            jest.spyOn(assessmentSlateInstance6, 'updateElmAssessment')
            assessmentSlateInstance6.updateElmAssessment(event);
            expect(assessmentSlateInstance6.props.assessmentReducer).toEqual(expectedProps)
        })
        it('Test 7.5-closeElmWindow', () => {
            jest.spyOn(assessmentSlateInstance6, 'closeElmWindow')
            assessmentSlateInstance6.closeElmWindow();
            expect(assessmentSlateInstance6.state.showElmComponent).toBe(false)
        })
        it('Test 7.6.1-showElmVersionStatus -IF', () => {
            let expectedProps = {
                'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464':
                {
                    activeWorkUrn: 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    assessmentStatus: 'final',
                    assessmentTitle: 'Quiz: 7.4 Developing Relationships',
                    assessmentEntityUrn: 'urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86',
                    latestWorkUrn: 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565',
                    "targetId": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
                }
            }
            jest.spyOn(assessmentSlateInstance6, 'showElmVersionStatus')
            assessmentSlateInstance6.showElmVersionStatus();
            expect(assessmentSlateInstance6.props.assessmentReducer).toEqual(expectedProps)
        })
        it('Test 7.6.2-showElmVersionStatus -ELSE', () => {
            let expectedProps = {
                'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464': expectedRes2
            }
            let newStore = mockStore(initialState2);
            const component7 = mount(<Provider store={newStore}><AssessmentSlateData
                {...props}
                model={assessmentSlateELM}
                assessmentSlateObj={pufObj}
                getAssessmentData={true}
                getAssessmentDataPopup={false}
            /></Provider>)
            let assessmentSlateInstance7 = component7.find('AssessmentSlateData').instance();
            jest.spyOn(assessmentSlateInstance7, 'showElmVersionStatus')
            assessmentSlateInstance7.showElmVersionStatus();
            expect(assessmentSlateInstance7.props.assessmentReducer).toEqual(expectedProps)
        })
    })
    describe('Test 8- mainAddAssessment', () => {
        const component8 = mount(<Provider store={store}><AssessmentSlateData
            {...props}
            getAssessmentData={true}
            getAssessmentDataPopup={false}
        /></Provider>)
        let assessmentSlateInstance8 = component8.find('AssessmentSlateData').instance();
        component8.update();
        assessmentSlateInstance8.forceUpdate();
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        }
        it('Test 8.1-mainAddAssessment-Learnosity', () => {
            jest.spyOn(assessmentSlateInstance8, 'mainAddAssessment')
            assessmentSlateInstance8.mainAddAssessment(event, 'learnosity');
            expect(assessmentSlateInstance8.state.showElmComponent).toBe(true)
        })
        it('Test 8.2-mainAddAssessment-LT/LA', () => {
            jest.spyOn(assessmentSlateInstance8, 'mainAddAssessment')
            assessmentSlateInstance8.mainAddAssessment(event, 'learningtemplate');
            expect(assessmentSlateInstance8.state.changeLearningData).toBe(true)
            expect(assessmentSlateInstance8.state.learningToolStatus).toBe(true)
        })
        it('Test 8.3-mainAddAssessment-CITE', () => {
            jest.spyOn(assessmentSlateInstance8, 'mainAddAssessment')
            assessmentSlateInstance8.mainAddAssessment(event, 'cite');
            expect(assessmentSlateInstance8.state.showCiteTdxComponent).toBe(true)
        })
    })
    describe('Test 10- Other Functions', () => {
        const component9 = mount(<Provider store={store}><AssessmentSlateData
            {...props}
            getAssessmentData={true}
            getAssessmentDataPopup={false}
        /></Provider>)
        let assessmentSlateInstance9 = component9.find('AssessmentSlateData').instance();
        component9.update();
        assessmentSlateInstance9.forceUpdate();
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            target: { classList: { contains: () => { return false } } }
        }
        it('Test 10.1-toggleAssessmentTypeDropdown', () => {
            assessmentSlateInstance9.setState({
                openAssessmentDropdown: false,
            })
            component9.update();
            assessmentSlateInstance9.forceUpdate();
            jest.spyOn(assessmentSlateInstance9, 'toggleAssessmentTypeDropdown')
            assessmentSlateInstance9.toggleAssessmentTypeDropdown();
            expect(assessmentSlateInstance9.state.openAssessmentDropdown).toBe(true)
            expect(assessmentSlateInstance9.state.openUsageDropdown).toBe(false)
        })
        it('Test 10.2-selectAssessmentType && handleAssessmentTypeChange', () => {
            jest.spyOn(assessmentSlateInstance9, 'selectAssessmentType')
            assessmentSlateInstance9.selectAssessmentType()
            assessmentSlateInstance9.handleAssessmentTypeChange('Full Assessment Cite', event);
            expect(assessmentSlateInstance9.state.openAssessmentDropdown).toBe(false)
            expect(assessmentSlateInstance9.state.openUsageDropdown).toBe(false)
        })
        it('Test 10.3-toggleUsageTypeDropdown', () => {
            assessmentSlateInstance9.setState({
                openUsageDropdown: true,
                openAssessmentDropdown: false,
            })
            component9.update();
            assessmentSlateInstance9.forceUpdate();
            jest.spyOn(assessmentSlateInstance9, 'toggleUsageTypeDropdown')
            assessmentSlateInstance9.toggleUsageTypeDropdown();
            expect(assessmentSlateInstance9.state.openAssessmentDropdown).toBe(false)
            expect(assessmentSlateInstance9.state.openUsageDropdown).toBe(false)
        })
        it('Test 10.4-handleAssessmentUsageTypeChange', () => {
            jest.spyOn(assessmentSlateInstance9, 'handleAssessmentUsageTypeChange')
            assessmentSlateInstance9.setState({
                changeLearningData: false,
            })
            component9.update();
            assessmentSlateInstance9.forceUpdate();
            assessmentSlateInstance9.handleAssessmentUsageTypeChange('Quiz');
            expect(assessmentSlateInstance9.state.activeAssessmentUsageType).toBe('Quiz')
            expect(assessmentSlateInstance9.state.openAssessmentDropdown).toBe(false)
            expect(assessmentSlateInstance9.state.openUsageDropdown).toBe(false)
        })
        it('Test 10.5-handleClickOutside', () => {
            jest.spyOn(assessmentSlateInstance9, 'handleClickOutside')
            assessmentSlateInstance9.dropdownRef.current = { contains: () => { return false } }
            assessmentSlateInstance9.setState({
                openAssessmentDropdown: true,
                openUsageDropdown: true
            })
            component9.update();
            assessmentSlateInstance9.forceUpdate();
            assessmentSlateInstance9.handleClickOutside(event);
            expect(assessmentSlateInstance9.state.openAssessmentDropdown).toBe(false)
            expect(assessmentSlateInstance9.state.openUsageDropdown).toBe(false)
        })
        it('Test 10.6-setSlateTagIcon', () => {
            jest.spyOn(assessmentSlateInstance9, 'setSlateTagIcon')
            document.getElementsByClassName = () => {
                return [
                    {
                        classList: { remove: jest.fn() }
                    }
                ]
            }
            assessmentSlateInstance9.setSlateTagIcon();
            expect(assessmentSlateInstance9.setSlateTagIcon).toHaveBeenCalled()
            expect(assessmentSlateInstance9.props.getAssessmentData).toBe(true)
            expect(assessmentSlateInstance9.props.model.elementdata.assessmentid).toBe('')
        })
        it('Test 10.5-sendDataAssessment', () => {
            config.parentEntityUrn = "BodyMatter"
            jest.spyOn(assessmentSlateInstance9, 'sendDataAssessment')
            assessmentSlateInstance9.sendDataAssessment(event);
            expect(assessmentSlateInstance9.props.model.elementdata.assessmentid).toBe('')
        })
        it('Test 10.6-componentWillUnmount', () => {
            jest.spyOn(assessmentSlateInstance9, 'componentWillUnmount')
            document.removeEventListener = () => {
                return true
            }
            assessmentSlateInstance9.componentWillUnmount();
            expect(assessmentSlateInstance9.componentWillUnmount).toHaveBeenCalled()
            expect(assessmentSlateInstance9.props.model.elementdata.assessmentid).toBe('')
        })
        it('Test 10.6-componentDidUpdate', () => {
            jest.spyOn(assessmentSlateInstance9, 'componentDidUpdate')
            let nextProps = {
                ...props,
                getAssessmentDataPopup: true
            }
            assessmentSlateInstance9.componentDidUpdate(nextProps);
            expect(assessmentSlateInstance9.componentDidUpdate).toHaveBeenCalled()
            expect(assessmentSlateInstance9.props.getAssessmentDataPopup).toBe(false)
        })
    })
})