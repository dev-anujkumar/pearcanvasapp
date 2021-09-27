import React from 'react';
import { mount } from 'enzyme';
import ElementSingleAssessment from '../../../src/component/ElementSingleAssessment/ElementSingleAssessment';
import {  singleAssessmentCITEDefault, singleAssessmentElmDefault, singleAssessmentElmWithData, singleAssessmentTDXDefault} from '../../../fixtures/ElementSingleAssessmentTestData'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userPermissions = [
    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
]
let assessmentRed = {
    "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464": {
        activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        latestVersion: {
            id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
            title: "latestTitle",
            status: 'wip',
            latestCleanVersion: false

        },
        secondLatestVersion:{
            id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec569",
            title:"latestTitle"
        },
        latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
        items: [
            {
                oldItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                latestItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                latestItemTitle:"item-title"
            }
        ],
        showUpdateStatus: false
    }
}
let assessmentRed2 = {
    "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464": {
        activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        latestVersion: {
            id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
            title: "latestTitle",
            status: 'wip',
            latestCleanVersion: true

        },
        secondLatestVersion: {
            id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec569",
            title: "latestTitle"
        },
        latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
        items: [
            {
                oldItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                latestItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                latestItemTitle: "item-title"
            }
        ],
        showUpdateStatus: false
    }
}
let initialState = {
    citeTdxReducer: {
        currentAssessmentSelected: {
            "versionUrn": "dfer",
            "name": "mmoi"
        },
        citeApiData: { assessments: { "dfsarfw": "Sdfa" } },
        tdxApiData: { assessments: { "dfsarfw": "Sdfa" } },
        mmiApiData: { assessments: { "dfsarfw": "Sdfa" } },
        isLoading: false,
        currentSingleAssessmentSelected: {},
        citeErrorFlag: "",
        assessmenterrFlag: false,

    },
    appStore: {
        usageTypeListData: { usageTypeList: ["Quiz", "Concept Check", "Test"] }
    },
    assessmentReducer: assessmentRed
};
let store = mockStore(initialState);
jest.mock('../../../src/js/toggleLoader', () => ({
    hideToc: jest.fn(),
    disableHeader: jest.fn(),
    hideTocBlocker: jest.fn(),
    ShowCanvasLoader: jest.fn(),
    showTocBlocker: () => {
        return false
    },
    hideBlocker: jest.fn(),
}))
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: ()=>{ return false}
}))
jest.mock('../../../src/js/header.js', () => ({
    logout: jest.fn()
}))
jest.mock('../../../src/component/AssessmentSlateCanvas/ElmUpdateButton.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/PopUp/PopUp.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
describe('Testing Element Single Assessment component', () => {

    it('renders without crashing', () => {
        const component = mount(<Provider store={store}><ElementSingleAssessment model={singleAssessmentCITEDefault} index="" /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();
    })

    let props = {
        model: singleAssessmentCITEDefault,
        index: "1",
        usagetype: "Practice",
        handleFocus: function () { },
        onClick: () => { },
        handleBlur: function () { },
        showBlocker: jest.fn(),
        openCustomPopup: jest.fn(),
        permissions: userPermissions,
    };

    let singleAssessment = mount(<Provider store={store}><ElementSingleAssessment {...props} /></Provider>);
    const singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
    it('Render Single Assessment default ', () => {
        const spyrenderAssessmentType = jest.spyOn(singleAssessmentInstance, 'renderAssessmentType')
        singleAssessmentInstance.renderAssessmentType(singleAssessmentCITEDefault);
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spyrenderAssessmentType).toHaveBeenCalledWith(singleAssessmentCITEDefault) 
        spyrenderAssessmentType.mockClear()
    });
    xit('onClick Event-Select Assessment usage type', () => {
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
        singleAssessmentInstance.toggleUsageTypeDropdown();
        singleAssessmentInstance.forceUpdate();
        singleAssessment.update();
        expect(spytoggleUsageTypeDropdown).toHaveBeenCalled() 
        expect(singleAssessmentInstance.state.asseessmentUsageTypeDropdown).toBe(false)
        spytoggleUsageTypeDropdown.mockClear()
    });
    it('Test-handleAssessmentFocus function', () => {
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        }
        const spyhandleAssessmentFocus = jest.spyOn(singleAssessmentInstance, 'handleAssessmentFocus')
        singleAssessmentInstance.handleAssessmentFocus(event);
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
    it('Test-addAssessmentResource function', () => {
        let nextProps = {
            model: singleAssessmentCITEDefault,
            index: "1",
            usagetype: "Practice",
            handleFocus: function () { },
            onClick: () => { },
            handleBlur: function () { },
            showBlocker: jest.fn(),
            openCustomPopup: jest.fn(),
            permissions: userPermissions,
        };

        let singleAssessment2 = mount(<Provider store={store}><ElementSingleAssessment {...nextProps} /></Provider>);
        const singleAssessmentInstance2 = singleAssessment2.find('ElementSingleAssessment').instance();
        const spyaddAssessmentResource = jest.spyOn(singleAssessmentInstance2, 'addAssessmentResource')
        singleAssessmentInstance2.addAssessmentResource();
        expect(spyaddAssessmentResource).toHaveBeenCalled()
        spyaddAssessmentResource.mockClear()
    });
    describe('Testing Element Single Assessment - ELM ASSESSMENTS', () => {
        let newProps = {
            model: singleAssessmentElmDefault,
            index: "1",
            usagetype: "Practice",
            handleFocus: jest.fn(),
            onClick: jest.fn(),
            handleBlur: jest.fn(),
            showBlocker: jest.fn(),
            openCustomPopup: jest.fn(),
            permissions: userPermissions,
            checkEntityUrn: jest.fn(),
            fetchAssessmentMetadata: jest.fn(),
            updateAssessmentVersion: jest.fn(),
            fetchAssessmentLatestVersion: jest.fn()
        };
        let cb = jest.fn();
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        }
        let elmAssessment = mount(<Provider store={store}><ElementSingleAssessment {...newProps} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        it('Test-1-addPufAssessment function', () => {
            let pufObj = {
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "ELM Assessment"
            }
            const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'addPufAssessment')
            elmAssessmentInstance.addPufAssessment(pufObj, cb);
            expect(elmAssessmentInstance.state.elementType).toBe('puf')
            expect(elmAssessmentInstance.state.assessmentId).toBe(pufObj.id)
            expect(spyaddPuffAssessment).toHaveBeenCalled()
            spyaddPuffAssessment.mockClear()
        });
        it('Test-2-updateElmOnSaveEvent function', () => {
            let pufProps = {
                assessmentReducer: assessmentRed
            }
            let pufObj = {
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "ELM Assessment"
            }
            elmAssessmentInstance.setState({
                assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentItemId: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b"
            })
            elmAssessment.update();
            elmAssessmentInstance.forceUpdate();
            const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'updateElmOnSaveEvent')
            elmAssessmentInstance.updateElmOnSaveEvent(pufProps);
            expect(elmAssessmentInstance.state.elementType).toBe('puf')
            expect(elmAssessmentInstance.state.assessmentId).toBe(pufObj.id)
            expect(elmAssessmentInstance.props.assessmentReducer[elmAssessmentInstance.state.assessmentId].items[0].latestItemId).toBe(pufObj.itemid)
            expect(spyaddPuffAssessment).toHaveBeenCalled()
            spyaddPuffAssessment.mockClear()
        });
        it('Test-3-openUpdateElmPopup function', () => {
            const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'openUpdateElmPopup')
            elmAssessmentInstance.openUpdateElmPopup(event);
            expect(elmAssessmentInstance.state.elementType).toBe('puf');
            expect(elmAssessmentInstance.state.showElmUpdatePopup).toBe(true);
            expect(spyaddPuffAssessment).toHaveBeenCalled();
            spyaddPuffAssessment.mockClear();
        });
        it('Test-4-showCustomPopup', () => {
            elmAssessmentInstance.setState({
                showUpdatePopup: true
            })
            elmAssessment.update();
            elmAssessmentInstance.forceUpdate();
            jest.spyOn(elmAssessmentInstance, 'showCustomPopup')
            elmAssessmentInstance.showCustomPopup();
            expect(elmAssessmentInstance.state.showElmUpdatePopup).toBe(true)
        })
        it('Test-5-updatePufAssessment', () => {
            let pufObj = {
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "ELM Assessment"
            }
            elmAssessment.update();
            elmAssessmentInstance.forceUpdate();
            jest.spyOn(elmAssessmentInstance, 'updatePufAssessment')
            elmAssessmentInstance.updatePufAssessment(pufObj, "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464");
            expect(elmAssessmentInstance.state.assessmentId).toBe(pufObj.id)
        })
        it('Test-6-updateElmAssessment', () => {
            let pufObj = {
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "ELM Assessment"
            }
            elmAssessmentInstance.setState({
                assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b"
            })
            elmAssessment.update();
            elmAssessmentInstance.forceUpdate();
            jest.spyOn(elmAssessmentInstance, 'updateElmAssessment')
            elmAssessmentInstance.updateElmAssessment(event);
            expect(elmAssessmentInstance.state.assessmentId).toBe(pufObj.id)
        })
        xit('Test-7-addAssessmentResource-Add ELM', () => {
            const spyaddAssessmentResource = jest.spyOn(elmAssessmentInstance, 'addAssessmentResource')
            elmAssessmentInstance.addAssessmentResource(event);
            expect(elmAssessmentInstance.state.elementType).toBe('puf');
            expect(elmAssessmentInstance.state.showElmComponent).toBe(true);
            expect(spyaddAssessmentResource).toHaveBeenCalled();
            spyaddAssessmentResource.mockClear();
        });
        xit('Test-8-closeElmWindow function', () => {
            const spycloseELMWindow = jest.spyOn(elmAssessmentInstance, 'closeElmWindow')
            elmAssessmentInstance.closeElmWindow();
            expect(elmAssessmentInstance.state.showElmComponent).toBe(false);
            expect(spycloseELMWindow).toHaveBeenCalled();
            spycloseELMWindow.mockClear();
        });
        it('Test-9-toggleUpdatePopup function', () => {
            const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'toggleUpdatePopup')
            elmAssessmentInstance.toggleUpdatePopup(false);
            expect(elmAssessmentInstance.state.elementType).toBe('puf');
            expect(elmAssessmentInstance.state.showElmUpdatePopup).toBe(false);
            expect(spyaddPuffAssessment).toHaveBeenCalled();
            spyaddPuffAssessment.mockClear();
        });
        it('Test-10-showCustomPopup-else function', () => {
            elmAssessmentInstance.setState({
                showUpdatePopup: false
            })
            elmAssessment.update();
            elmAssessmentInstance.forceUpdate();
            jest.spyOn(elmAssessmentInstance, 'showCustomPopup')
            elmAssessmentInstance.showCustomPopup();
            expect(elmAssessmentInstance.state.showElmUpdatePopup).toBe(false)
        })
        it('Test-6-updateElmAssessment', () => {
            let nextProps = {
                model: singleAssessmentElmDefault,
                index: "1",
                usagetype: "Practice",
                handleFocus: jest.fn(),
                onClick: jest.fn(),
                handleBlur: jest.fn(),
                showBlocker: jest.fn(),
                openCustomPopup: jest.fn(),
                permissions: userPermissions,
                checkEntityUrn: jest.fn(),
                fetchAssessmentMetadata: jest.fn(),
                updateAssessmentVersion: jest.fn(),
                fetchAssessmentLatestVersion: jest.fn()
            };
            let newStore = mockStore({...initialState,
                assessmentReducer:assessmentRed2
            });
            let learnosityAssessment = mount(<Provider store={newStore}><ElementSingleAssessment {...nextProps} /></Provider>);
            const learnosityAssessmentInstance = learnosityAssessment.find('ElementSingleAssessment').instance();
            
            let pufObj = {
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                title: "ELM Assessment"
            }
            learnosityAssessmentInstance.setState({
                assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b"
            })
            learnosityAssessment.update();
            learnosityAssessmentInstance.forceUpdate();
            jest.spyOn(learnosityAssessmentInstance, 'updateElmAssessment')
            learnosityAssessmentInstance.updateElmAssessment(event);
            expect(learnosityAssessmentInstance.state.assessmentId).toBe(pufObj.id)
        })
    });
});
describe('Testing Element Single Assessment - ELM ASSESSMENTS - Elm Functions', () => {
    let newProps2 = {
        model: singleAssessmentElmDefault,
        index: "1",
        usagetype: "Practice",
        elementId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        handleFocus: jest.fn(),
        onClick: jest.fn(),
        handleBlur: jest.fn(),
        showBlocker: jest.fn(),
        openCustomPopup: jest.fn(),
        permissions: userPermissions,
        checkEntityUrn: jest.fn(),
        fetchAssessmentMetadata: jest.fn(),
        updateAssessmentVersion: jest.fn(),
        fetchAssessmentLatestVersion: jest.fn(),
        setNewItemFromElm: jest.fn(),
        setElmPickerData: jest.fn(),
        fetchAssessmentVersions: jest.fn().mockImplementationOnce(()=>{return true})
    };
    let cb = jest.fn();
    let assessmentRed3 = {
        "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464": {
            activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            assessmentStatus: "final",
            assessmentTitle: "Quiz: 7.4 Developing Relationships",
            assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
            latestVersion: {
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                title: "latestTitle",
                status: 'wip',
                latestCleanVersion: true

            },
            secondLatestVersion: {
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec569",
                title: "latestTitle"
            },
            latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
            items: [
                {
                    oldItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                    latestItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                    latestItemTitle: "item-title"
                }
            ],
            showUpdateStatus: false
        },
        usageTypeListData: [{usagetype: "homework", label: "Homework"}]
    }
    let initialState2 = {
        citeTdxReducer: {
            currentAssessmentSelected: {
                "versionUrn": "dfer",
                "name": "mmoi"
            },
            citeApiData: { assessments: { "dfsarfw": "Sdfa" } },
            tdxApiData: { assessments: { "dfsarfw": "Sdfa" } },
            mmiApiData: { assessments: { "dfsarfw": "Sdfa" } },
            isLoading: false,
            currentSingleAssessmentSelected: {},
            citeErrorFlag: "",
            assessmenterrFlag: false,
    
        },
        appStore: {
            usageTypeListData: { usageTypeList: ["Quiz", "Concept Check", "Test"] }
        },
        assessmentReducer: assessmentRed3
    };

    it('Test-A.1-addPufAssessment function', () => {

        let pufObj = {
            elementUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            title: "ELM Assessment",
            usagetype: "homework"
        }
        let store2 = mockStore(initialState2);
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'addPufAssessment')
        elmAssessmentInstance.addPufAssessment(pufObj, cb);
        expect(elmAssessmentInstance.state.elementType).toBe('puf')
        expect(elmAssessmentInstance.state.assessmentId).toBe(pufObj.id)
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    it('Test-A.2-addPufAssessment function', () => {

        let pufObj = {
            elementUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            title: "ELM Assessment",
            usagetype: "homework",
            calledFrom: "createElm"
        }
        let store2 = mockStore(initialState2);
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'addPufAssessment')
        elmAssessmentInstance.addPufAssessment(pufObj);
        expect(elmAssessmentInstance.state.elementType).toBe('puf')
        expect(elmAssessmentInstance.state.assessmentId).toBe(pufObj.id)
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    it('Test-A.3-addPufAssessment function', () => {

        let pufObj = {
            elementUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            title: "ELM Assessment",
            usagetype: "homework",
            calledFrom: "createElm"
        }
        newProps2.model = singleAssessmentElmWithData
        initialState2.assessmentReducer.usageTypeListData = []
        let store2 = mockStore(initialState2);
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'addPufAssessment')
        elmAssessmentInstance.addPufAssessment(pufObj);
        expect(elmAssessmentInstance.state.elementType).toBe('puf')
        expect(elmAssessmentInstance.state.assessmentId).toBe(pufObj.id)
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    it('Test-A.4-updateElmLearnosityOnRefresh function', () => {

        let props = {
            assessmentReducer: {
                "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec466": {
                    activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec466",
                    assessmentStatus: "final",
                    assessmentTitle: "Quiz: 7.4 Developing Relationships",
                    assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
                    latestVersion: {
                        id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                        title: "latestTitle",
                        status: 'wip',
                        latestCleanVersion: true

                    },
                    secondLatestVersion: {
                        id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec569",
                        title: "latestTitle"
                    },
                    latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                    items: [
                        {
                            oldItemId: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf934",
                            latestItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                            latestItemTitle: "item-title",
                            shouldUpdateOnSaveEvent: true
                        }
                    ],
                    showUpdateStatus: false

                },
                itemUpdateEvent: true
            }
        }
        let store2 = mockStore(initialState2);
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'updateElmLearnosityOnRefresh')
        elmAssessmentInstance.updateElmLearnosityOnRefresh(props);
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    it('Test-A.5-updateElmLearnosityOnRefresh function', () => {

        let props = {
            assessmentReducer: {
                "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec466": {
                    activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec466",
                    assessmentStatus: "final",
                    assessmentTitle: "Quiz: 7.4 Developing Relationshipssssssssssss",
                    assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
                    latestVersion: {
                        id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                        title: "latestTitle",
                        status: 'wip',
                        latestCleanVersion: true

                    },
                    secondLatestVersion: {
                        id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec569",
                        title: "latestTitle"
                    },
                    latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                    items: [
                        {
                            oldItemId: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf934",
                            latestItemId: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf934",
                            latestItemTitle: "item-title",
                            shouldUpdateOnSaveEvent: true
                        }
                    ],
                    showUpdateStatus: false

                },
                itemUpdateEvent: true
            }
        }
        let store2 = mockStore(initialState2);
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'updateElmLearnosityOnRefresh')
        elmAssessmentInstance.updateElmLearnosityOnRefresh(props);
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
        const spyresetPage = jest.spyOn(elmAssessmentInstance, 'resetPage')
        elmAssessmentInstance.resetPage(false);
        expect(spyresetPage).toHaveBeenCalled()
        spyresetPage.mockClear()
        const spyhandleAssessmentFocus = jest.spyOn(elmAssessmentInstance, 'handleAssessmentFocus')
        elmAssessmentInstance.handleAssessmentFocus();
        expect(spyhandleAssessmentFocus).toHaveBeenCalled()
        spyhandleAssessmentFocus.mockClear()
    });
    it('Test-A.6-componentDidUpdate function', () => {
        let initialState3 = {
            ...initialState2,
            assessmentReducer: {
                dataFromElm: {
                    resourceType: "assessmentItem",
                    elementUrn: "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
                    type: 'ElmCreateInPlace',
                    elmUrl: "https://localhost:4000",
                    usageType: "homework"
                }
            }
        };
        let store2 = mockStore(initialState3);
        global.open = jest.fn()
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'componentDidUpdate')
        elmAssessmentInstance.componentDidUpdate();
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    xit('Test-A.7-componentDidUpdate function', () => {
        let pufObj = {
            elementUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            itemid: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            title: "ELM Assessment",
            usagetype: "homework"
        }
        let initialState3 = {
            ...initialState2,
            assessmentReducer: {
                dataFromElm: {
                    resourceType: "assessmentItem",
                    elementUrn: "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
                    type: 'SaveElmData',
                    usageType: "homework",
                    pufObj
                }
            }
        };
        let store2 = mockStore(initialState3);
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'componentDidUpdate')
        elmAssessmentInstance.addPuffAssessment = jest.fn()
        elmAssessmentInstance.componentDidUpdate();
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    it('Test-A.8-componentDidUpdate function', () => {
        let initialState3 = {
            ...initialState2,
            assessmentReducer: {
                dataFromElm: {
                    resourceType: "assessmentItem",
                    elementUrn: "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
                    type: 'SaveElmDatas',
                    elmUrl: "https://localhost:4000",
                    usageType: "homework"
                }
            }
        };
        let store2 = mockStore(initialState3);
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        elmAssessmentInstance.addPuffAssessment = jest.fn()
        const spycomponentDidUpdate = jest.spyOn(elmAssessmentInstance, 'componentDidUpdate')
        elmAssessmentInstance.componentDidUpdate();
        expect(spycomponentDidUpdate).toHaveBeenCalled()
        spycomponentDidUpdate.mockClear()
    });
    it('Test-A.2-updateElmAssessment function', async () => {
        const evt = {
            preventDefault: jest.fn()
        }
        let store2 = mockStore({
            ...initialState2, assessmentReducer: {
                "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec466": {
                    activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec466",
                    assessmentStatus: "final",
                    assessmentTitle: "Quiz: 7.4 Developing Relationships",
                    assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
                    latestVersion: {
                        id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                        title: "latestTitle",
                        status: 'wip',
                        latestCleanVersion: true

                    },
                    secondLatestVersion: {
                        id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec569",
                        title: "latestTitle"
                    },
                    latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                    items: [
                        {
                            oldItemId: "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf934",
                            latestItemId: "urn:pearson:work:eb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                            latestItemTitle: "item-title",
                            shouldUpdateOnSaveEvent: true
                        }
                    ],
                    showUpdateStatus: false

                },
                itemUpdateEvent: true
            }
        });
        let elmAssessment = mount(<Provider store={store2}><ElementSingleAssessment {...newProps2} /></Provider>);
        const elmAssessmentInstance = elmAssessment.find('ElementSingleAssessment').instance();
        const spyaddPuffAssessment = jest.spyOn(elmAssessmentInstance, 'updateElmAssessment')
        await elmAssessmentInstance.updateElmAssessment(evt);
        expect(spyaddPuffAssessment).toHaveBeenCalled()
        spyaddPuffAssessment.mockClear()
    });
    it('renders without crashing', () => {
        const component = mount(<Provider store={store}><ElementSingleAssessment model={singleAssessmentTDXDefault} index="" /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();
    })
});  