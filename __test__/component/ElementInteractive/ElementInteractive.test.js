import React from 'react';
import { mount, shallow } from 'enzyme';
import Interactive from '../../../src/component/ElementInteractive';
import config from '../../../src/config/config';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import  { getMCQGuidedData}  from '../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { Interactivefpo , InteractiveFlashcards, Interactive3party, Interactivepdf, InteractiveWeblink,
    InteractivePopupWeblink, InteractiveTable,InteractiveShowHide,InteractivePopWindow,Interactivegraph
    ,Interactivesimulation,Interactivesurvey,Interactivetimeline,Interactivehotspot,Interactiveaccountingtable,
    Interactivefillinblank,Interactivegalleryimage,Interactivegalleryvideo,Interactivevideomcq,Interactivemcq , InteractiveGuidedExample, interactiveElm} from '../../../fixtures/ElementInteractiveTesting.js'
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const interactReducer = {
    "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec": {
        activeWorkUrn: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec",
        assessmentEntityUrn: "urn:pearson:entity:7b882a51-ee22-481e-9f70-73f53ca7fbdf",
        assessmentStatus: "wip",
        assessmentTitle: "Interative 2 -UCA",
        createdDate: "2021-02-17T07:08:10.422Z",
        showUpdateStatus: false,
        targetId: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec",
        latestVersion: {
            id: "urn:pearson:work:1c237eef-66cc-4375-8387-3f0d69da5fb7",
            title: "item1"
        },
        secondLatestVersion: {
            id: "urn:pearson:work:1c237eef-66cc-4375-8387-3f0d69da5fb7",
                title: "item2"
        }
    },
    "urn:pearson:work:1c237eef-66cc-4375-8387-3f0d69da5fb7": {
        activeWorkUrn: "urn:pearson:work:1c237eef-66cc-4375-8387-3f0d69da5fb7",
        assessmentEntityUrn: "urn:pearson:entity:7b882a51-ee22-481e-9f70-73f53ca7fbdf",
        assessmentStatus: "wip",
        assessmentTitle: "Interative 3 - UCA",
        createdDate: "2021-03-17T07:08:10.422Z",
        showUpdateStatus: false,
        targetId: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec",
        latestVersion: {
            id: "urn:pearson:work:cb08bf6b-0de0-4229-a854-d2e70cd82c15",
            title: "item3"
        },
        secondLatestVersion: {
            id: "urn:pearson:work:79d5517a-b34c-46a1-a0ba-f02a0d6955f4",
                title: "item4"
        }
    },
    item : {
        interactiveType: "simulation",
        id: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec",
        title: "Interactive",
    }
}
const store = mockStore({
    citeTdxReducer : { currentAssessmentSelected : {} },
    elmReducer: {},
    appStore:{currentSlateAncestorData:{}},
    assessmentReducer: interactReducer
});
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/js/toggleLoader', () => ({
    hideTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    showTocBlocker: jest.fn(),
    showBlocker: jest.fn(),
    hideToc: jest.fn(),
}))
jest.mock("../../../src/js/c2_media_module", () => {
    return {
        c2MediaModule: {
            productLinkOnsaveCallBack: (data, cb) => {
                cb(data);
            },
            AddanAssetCallBack: (data, cb) => {
                cb(data);
            },
            onLaunchAddAnAsset: (cb) => {
                cb()
            }
        }
    }
});
let event = {
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
}
const interactiveInstance = (props) => {
    let component = mount(<Provider store={store}>
        <Interactive { ...props } /></Provider>
    );
    return component.find('Interactive').instance();
}

let alfrescoPath = {
    alfresco: {
        nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
        repositoryFolder: "001_C5 Media POC - AWS US ",
        repositoryName: "AWS US",
        repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
        visibility: "MODERATED",
    },
    associatedArt: "https://cite-media-stg.pearson.com/legacy_paths/634a3489-083f-4539-8d47-0a8827246857/cover_thumbnail.jpg",
    authorName: "Krajewski",
    citeUrn: "urn:pearson:manifestation:191e7b6c-53a3-420f-badd-a90786613ae5",
    containerUrn: "urn:pearson:manifest:fd254701-5063-43aa-bd24-a2c2175be2b2",
    currentOrigin: "local",
    dateApproved: null,
    dateCreated: "2019-02-28T19:14:32.948Z",
    eTag: "Vy8xNTc0Mjc4NDkxMDYz",
    entityUrn: "urn:pearson:entity:f2f656da-c167-4a5f-ab8c-e3dbbd349095",
    gridId: [],
    hasVersions: false,
    id: "urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f",
    name: "ELMTEST_StgEnv_Krajewski Test",
    roleId: "admin",
    ssoToken: "qcOerhRD_CT-ocYsh-y2fujsZ0o.*AAJTSQACMDIAAlNLABxnalBuS2VJQi9RUTFMdHVBZDZBMUxyakpUTGM9AAJTMQACMDE.*",
    status: "wip",
    tcm: { timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true },
    url: null,
    userApprover: null,
    userApproverFullName: null,
    userCount: 0,
    'x-prsn-user-id': " ",
}

describe('Testing Interactive element component', () => {
    it('renders without crashing', () => {
        const props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            model: Interactivefpo,
            handleFocus: function () { },
            permissions:['add_multimedia_via_alfresco'],
        }
        const component = mount(<Provider store={store}><Interactive {...props} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })
    describe('Test -Different InteractiveType element', () => {
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            index: 1,
            handleFocus: function () { },
            permissions:['add_multimedia_via_alfresco'],
            model: Interactivefpo
        };
        let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
        test('renders  properly with default fpo', () => {
            component.setProps({ index: 53 });
            expect(component.find('.divImageTextWidth .figureImageTextWidth .imageTextWidth')).toHaveLength(1)
        })
        test('renders  properly with default InteractiveFlashcards', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: InteractiveFlashcards
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 5 });
            expect(component.find('.divWidgetFlashcards .figureWidgetFlashcards .imageWidgetFlashcards')).toHaveLength(1)
        })
        test('renders  properly with default Interactive3party ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactive3party
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 7});
            expect(component.find('.divWidget3PI .figureWidget3PI .imageWidget3PI')).toHaveLength(1)
        })
        test('renders  properly with default Interactivepdf ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivepdf
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ model: Interactivepdf ,index: 7});
            expect(component.find('.divWidgetPDF .figureWidgetPDF')).toHaveLength(1)
        })
        test('renders  properly with default InteractiveWeblink ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: InteractiveWeblink
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 7});
            expect(component.find('.divWidgetPUSL .figureWidgetPUSL')).toHaveLength(1)
        })
        test('renders  properly with default InteractivePopupWeblink ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: InteractivePopupWeblink
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 7});
            expect(component.find('.divWidgetPUSL .figureWidgetPUSL')).toHaveLength(1)
        })
        test('renders  properly with default InteractiveTable ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: InteractiveTable
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 7});
            expect(component.find('.divWidgetTableSL .figureWidgetTableSL .imageWidgetTableSL')).toHaveLength(1)
        })
        xtest('renders  properly with default InteractiveShowHide ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: InteractiveShowHide
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 7 });
            expect(component.find('.divWidgetShowHide .figureWidgetShowHide .pearson-component.showHide')).toHaveLength(1)
        })
        test('renders  properly with default InteractivePopWindow', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: InteractivePopWindow
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetPU .figureWidgetPU')).toHaveLength(1)
        })
        test('renders  properly with default Interactivegraph', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivegraph
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetGraph .figureWidgetVidSlideshow .imageWidgetGraph')).toHaveLength(1)
        })
        test('renders  properly with default Interactivesimulation', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivesimulation
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetUCA .figureWidgetUCA .imageWidgetUCA')).toHaveLength(1)
        })
        test('renders  properly with default Interactivesurvey', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivesurvey
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetSurvey .figureWidgetSurvey .imageWidgetSurvey')).toHaveLength(1)
        })
        xtest('renders  properly with default Interactivetimeline', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivetimeline
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetTimeline .figureWidgetTimeline .imageWidgetTimeline')).toHaveLength(1)
        })
        test('renders  properly with default Interactivehotspot', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivehotspot
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetHotspot .figureWidgetHotspot .imageWidgetHotspot')).toHaveLength(1)
        })
        test('renders  properly with default Interactiveaccountingtable', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactiveaccountingtable
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetAccountingtable .figureWidgetAccountingtable .imageWidgetAccountingtable')).toHaveLength(1)
        })
        test('renders  properly with default Interactivefillinblank', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivefillinblank
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetFIB .figureWidgetFIB .imageWidgetFIB')).toHaveLength(1)
        })
        test('renders  properly with default Interactivegalleryimage', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivegalleryimage
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetImgSlideshow .figureWidgetImgSlideshow .imageWidgetImgSlideshow')).toHaveLength(1)
        })
        test('renders  properly with default Interactive-guided-example', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: InteractiveGuidedExample
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetGuidedExample .figureWidgetGuidedExample .imageWidgetGuidedExample')).toHaveLength(1)
        })
        test('renders  properly with default Interactivegalleryvideo', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivegalleryvideo
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetVidSlideshow .figureWidgetVidSlideshow .imageWidgetVidSlideshow')).toHaveLength(1)
        })
        test('renders  properly with default Interactivevideomcq', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivevideomcq
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetVideoMcq .figureWidgetVideoMcq .imageWidgetVideoMcq')).toHaveLength(1)
        })
        test('renders  properly with default Interactivemcq', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                index: 1,
                handleFocus: function () { },
                permissions:['add_multimedia_via_alfresco'],
                model: Interactivemcq
            };
            let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
            component.setProps({ index: 8 });
            expect(component.find('.divWidgetVideoMcq .figureWidgetVideoMcq .imageWidgetVideoMcq')).toHaveLength(1)
        })
    });
    describe('Testing Element interactive component Functions', () => {
        let type = "interactive";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            model: Interactivefpo,
            handleFocus: jest.fn(),
            showBlocker: jest.fn(),

        };
        const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
        const spytogglePopup = jest.spyOn(elementInteractiveInstance, 'togglePopup')
        it('Test Function-togglePopup -else case', () => {
            const e = {
                target:{
                    classList: ["imageTextWidth","lazyload"]
                },
                stopPropagation() { }
            }
            let type = "interactive";
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                model: InteractivePopWindow,
                handleFocus: jest.fn(),
                showBlocker: jest.fn(),

            };
            const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={InteractivePopWindow} index="1" {...props} /></Provider>);
            let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
            const spytogglePopup = jest.spyOn(elementInteractiveInstance, 'togglePopup')
            elementInteractiveInstance.togglePopup(e,true);
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spytogglePopup).toHaveBeenCalled()
            spytogglePopup.mockClear()
        })   
        it('Test Function-togglePopup -if - if - case', () => {
            let type = "interactive";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            model: InteractiveGuidedExample,
            handleFocus: jest.fn(),
            showBlocker: jest.fn(),

        };
        const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
        const spytogglePopup = jest.spyOn(elementInteractiveInstance, 'togglePopup')
            const e = {
                target:{
                    classList: {contains: ()=>{return true}    } ,
                tagName: "p"           },
                stopPropagation() { }
            }
            elementInteractiveInstance.togglePopup(e,true);
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spytogglePopup).toHaveBeenCalledWith(e,true)
            spytogglePopup.mockClear()
        })
        it('Test Function-togglePopup -if - if - case', () => {
            let type = "interactive";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            model: InteractiveGuidedExample,
            handleFocus: jest.fn(),
            showBlocker: jest.fn(),

        };
        const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
        const spytogglePopup = jest.spyOn(elementInteractiveInstance, 'togglePopup')
            const e = {
                target:{
                    classList: {contains: ()=>{return false}    } ,
                tagName: "p"           },
                stopPropagation() { }
            }
            elementInteractiveInstance.togglePopup(e,true);
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spytogglePopup).toHaveBeenCalledWith(e,true)
            spytogglePopup.mockClear()
        })    
    })
    describe('Testing Element interactive - C2 Interactive Media Handling Functions', () => {
        let type = "figure";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            showBlocker: jest.fn()
        };

        const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
        it('onClick-default case', () => {
            const e = {
                target: {
                    tagName: "p"
                },
                stopPropagation() { }
            }
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            elementInteractiveInstance.handleC2MediaClick(e);
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
            spyhandleC2MediaClick.mockClear()
        })
        it('onClick-if case', () => {
            const e = {
                target: {
                    tagName: "IMG"
                },
                stopPropagation() { }
            }
            config.alfrescoMetaData = alfrescoPath
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            elementInteractiveInstance.handleC2MediaClick(e);
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
            spyhandleC2MediaClick.mockClear()
        })
        it('Simulating alfresco click with alfresco location', () => {
            config.alfrescoMetaData = { nodeRef: {} }
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            elementInteractiveInstance.handleC2MediaClick({ target: { tagName: 'b' } })
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'b' } })
            spyhandleC2MediaClick.mockClear()
        })
        it('Simulating alfresco click with alfresco location - without permission', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                permissions: [],
                updateFigureData: jest.fn(),
                handleBlur: jest.fn(),
                handleFocus: jest.fn(),
                accessDenied: jest.fn(),
            };
            const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
            let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            elementInteractiveInstance.handleC2MediaClick({ target: { tagName: 'b' } })
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'b' } })
            spyhandleC2MediaClick.mockClear()
        })
       
        describe('Test-Alfresco Data Handling', () => {
            const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
            let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
            const spydataFromAlfresco = jest.spyOn(elementInteractiveInstance, 'dataFromAlfresco')
            it('Test- if case workflow -smartLinkType-3rd Party Interactive', () => {
                let data = {
                    'assetType': "image",
                    'EpsUrl': "",
                    'width': "",
                    'height': "",
                    'req': {
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    },
                    desc: '{"smartLinkType":"3rd Party Interactive"}'
                }
                elementInteractiveInstance.dataFromAlfresco(data)
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
                expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow -smartLinkType-3rd Party Interactive(method checking)', () => {
                let data = {
                    'assetType': "image",
                    'EpsUrl': 'https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png',
                    'width': "500",
                    'height': "500",
                    'smartLinkPath':'',
                    'altText':'test image',
                    'longDescription':'this is a test image',
                    'req': {
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    },
                    desc: '{"smartLinkType":"3rd Party Interactive"}'
                }
                elementInteractiveInstance.dataFromAlfresco(data)
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
                expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow-smartLinkType-website', () => {
                let data = {
                    'assetType': "image",
                    'EpsUrl': "",
                    'width': "",
                    'height': "",
                    'req': {
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    },
                    desc: '{"smartLinkType":"website"}'
                }
                elementInteractiveInstance.dataFromAlfresco(data)
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
                expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow-smartLinkType-pdf', () => {
                let data = {
                    'assetType': "image",
                    'EpsUrl': "",
                    'width': "",
                    'height': "",
                    'req': {
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    },
                    desc: '{"smartLinkType":"pdf"}'
                }
                elementInteractiveInstance.dataFromAlfresco(data)
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
                expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow-smartLinkType-table', () => {
                let data = {
                    'assetType': "image",
                    'EpsUrl': "",
                    'width': "",
                    'height': "",
                    'req': {
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    },
                    desc: '{"smartLinkType":"table"}'
                }
                elementInteractiveInstance.dataFromAlfresco(data)
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
                expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow-smartLinkType-"pop-up-web-link"', () => {
                let data = {
                    'assetType': "image",
                    'EpsUrl': "",
                    'width': "",
                    'height': "",
                    'req': {
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    },
                    desc: '{"smartLinkType":"mdpopup"}'
                }
                elementInteractiveInstance.dataFromAlfresco(data)
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
                expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow-smartLinkType-metrodigi interactive', () => {
                let data = {
                    'assetType': "image",
                    'EpsUrl': "",
                    'width': "",
                    'height': "",
                    'req': {
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    },
                    desc: '{"smartLinkType":"metrodigi interactive"}'
                }
                elementInteractiveInstance.dataFromAlfresco(data)
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
                expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
                spydataFromAlfresco.mockClear()
            })
        })
       
    });
    describe('Testing Element interactive - handleC2MediaClick Function', () => {
        let type = "figure";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            showBlocker: jest.fn()
        };
        const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();

        it('handleC2MediaClick-default case', () => {
            const e = {
                target: {
                    tagName: "p"
                },
                stopPropagation() { }
            }
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            elementInteractiveInstance.handleC2MediaClick(e);
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick-else case', () => {
            const e = {
                target: {
                    tagName: "IMG"
                },
                stopPropagation() { }
            }
            config.alfrescoMetaData = { nodeRef: {} }
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            elementInteractiveInstance.handleC2MediaClick(e);
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick- alfrescoPath && this.state.projectMetadata is true', () => {
            const e = {
                target: {
                    tagName: "IMG"
                },
                stopPropagation() { }
            }
            config.alfrescoMetaData = alfrescoPath
            elementInteractiveInstance.setState({
                projectMetadata: alfrescoPath
            })
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            elementInteractiveInstance.handleC2MediaClick(e);
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick- without permission- add_multimedia_via_alfresco', () => {
            let type = "figure";
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ],
                updateFigureData: jest.fn(),
                handleBlur: jest.fn(),
                handleFocus: jest.fn(),
                accessDenied: jest.fn(),
                showBlocker: jest.fn()
            };
            const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
            let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementInteractiveInstance, 'handleC2MediaClick')
            const e = {
                target: {
                    tagName: "IMG"
                },
                stopPropagation() { }
            }
            config.alfrescoMetaData = alfrescoPath
            elementInteractiveInstance.setState({
                projectMetadata: alfrescoPath
            })
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            elementInteractiveInstance.handleC2MediaClick(e);
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
            spyhandleC2MediaClick.mockClear()
        })
    });
    describe('Test-Alfresco Data Handling', () => {
        let type = "figure";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            showBlocker: jest.fn()
        };
        const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
        const spydataFromAlfresco = jest.spyOn(elementInteractiveInstance, 'dataFromAlfresco')
        it('Test- if case workflow -smartLinkType-3rd Party Interactive', () => {
            let data = {
                'smartLinkURl': "http://www.pearson.com",
                'EpsUrl': "",
                'width': "",
                'height': "",
                'req': {
                    'url': "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '9bcb36b0-f4e0-4238-9239-bc8da6d41a5d'"
                },
                'desc': '{"smartLinkType":"3rd Party Interactive"}'
            }
            elementInteractiveInstance.dataFromAlfresco(data)
            elementInteractiveInstance.forceUpdate();
            elementInteractive.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-smartLinkType-website', () => {
            let data = {
                'assetType': "image",
                'EpsUrl': "",
                'width': "",
                'height': "",
                'req': {
                    url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                },
                desc: '{"smartLinkType":"website"}'
            }
            elementInteractiveInstance.dataFromAlfresco(data)
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
            expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-smartLinkType-pdf', () => {
            let data = {
                'assetType': "image",
                'EpsUrl': "",
                'width': "",
                'height': "",
                'req': {
                    url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                },
                desc: '{"smartLinkType":"pdf"}'
            }
            elementInteractiveInstance.dataFromAlfresco(data)
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
            expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-smartLinkType-table', () => {
            let data = {
                'assetType': "image",
                'EpsUrl': "",
                'width': "",
                'height': "",
                'req': {
                    url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                },
                desc: '{"smartLinkType":"table"}'
            }
            elementInteractiveInstance.dataFromAlfresco(data)
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
            expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-smartLinkType-"pop-up-web-link"', () => {
            let data = {
                'assetType': "image",
                'EpsUrl': "",
                'width': "",
                'height': "",
                'req': {
                    url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                },
                desc: '{"smartLinkType":"mdpopup"}'
            }
            elementInteractiveInstance.dataFromAlfresco(data)
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
            expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-smartLinkType-metrodigi interactive', () => {
            let data = {
                'assetType': "image",
                'EpsUrl': "",
                'width': "",
                'height': "",
                'req': {
                    url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                },
                desc: '{"smartLinkType":"metrodigi interactive"}'
            }
            elementInteractiveInstance.dataFromAlfresco(data)
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementInteractiveInstance.state.itemID).toBe("urn:pearson:alfresco:7bffceb3-33fc-40cc-a70c-50b6f32665c9")
            expect(elementInteractiveInstance.state.posterImage).toBe("https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png")
            spydataFromAlfresco.mockClear()
        })
    })
        
});
describe("Testing methods", () => {
    let props = {
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        index: 1,
        handleFocus: function () { },
        permissions:['add_multimedia_via_alfresco'],
        model: Interactivevideomcq,
        showBlocker: function () { },
        updateFigureData : function() {}
    };
    let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
    let elementInteractiveInstance = component.find('Interactive').instance();

    it("resetPage method if-block", () => {
        const spyresetPage = jest.spyOn(elementInteractiveInstance, 'resetPage')
        let isReset = true, isSearch = true
        elementInteractiveInstance.resetPage(isReset, isSearch)
        expect(spyresetPage).toHaveBeenCalled()
        expect(elementInteractiveInstance.state.parentPageNo).toBe(1)
    })
    it("resetPage method else-block", () => {
        const spyresetPage = jest.spyOn(elementInteractiveInstance, 'resetPage')
        let isReset = true, isSearch = false
        elementInteractiveInstance.resetPage(isReset, isSearch)
        expect(spyresetPage).toHaveBeenCalled()
        expect(elementInteractiveInstance.state.searchTitle).toBe('')
    })
    it("AssessmentSearchTitle ", () => {
        let searchTitle = "Test", filterUUID = "filter 1"
        const spyAssessmentSearchTitle = jest.spyOn(elementInteractiveInstance, 'AssessmentSearchTitle')
        elementInteractiveInstance.AssessmentSearchTitle(searchTitle, filterUUID)
        expect(spyAssessmentSearchTitle).toHaveBeenCalled()
        expect(elementInteractiveInstance.state.searchTitle).toBe("Test")
        expect(elementInteractiveInstance.state.filterUUID).toBe("filter 1")
    })
    it("closeWindowAssessment ", () => {
        const spycloseWindowAssessment = jest.spyOn(elementInteractiveInstance, 'closeWindowAssessment')
        elementInteractiveInstance.closeWindowAssessment()
        expect(spycloseWindowAssessment).toHaveBeenCalled()
        expect(elementInteractiveInstance.state.showAssessmentPopup).toBe(false)
        expect(elementInteractiveInstance.state.showSinglePopup).toBe(false)
    })
    it("assessmentNavigateBack ", () => {
        let tempProps = {
            model:Interactivevideomcq,
            showBlocker: function () { },
            updateFigureData : function() {},
            setCurrentCiteTdx:jest.fn()
        };
        let tempComponent = mount(<Provider store={store}><Interactive {...tempProps} /></Provider>);
       
        let elementInteractiveInstance = component.find('Interactive').instance();
        elementInteractiveInstance.setState({
            openedFrom:'singleAssessment'
        })
        tempComponent.update();
        elementInteractiveInstance.forceUpdate();
        elementInteractiveInstance.assessmentNavigateBack()
        expect(elementInteractiveInstance.state.showAssessmentPopup).toBe(true)
        expect(elementInteractiveInstance.state.showSinglePopup).toBe(false)
    })
    it("addCiteTdxAssessment if - block ", () => {
        let citeTdxObj = {
            slateType : "singleSlateAssessment",
            singleAssessmentID : ""
        }
        const spyaddCiteTdxAssessment = jest.spyOn(elementInteractiveInstance, 'addCiteTdxAssessment')
        elementInteractiveInstance.addCiteTdxAssessment(citeTdxObj, 1)
        expect(spyaddCiteTdxAssessment).toHaveBeenCalled()
        expect(elementInteractiveInstance.state.showSinglePopup).toBe(true)
    })
    it("addCiteTdxAssessment else - block ", () => {
        let citeTdxObj = {
            slateType : "",
            singleAssessmentID : {
                versionUrn: "123"
            }
        }
        const spyaddCiteTdxAssessment = jest.spyOn(elementInteractiveInstance, 'addCiteTdxAssessment')
        elementInteractiveInstance.addCiteTdxAssessment(citeTdxObj, 1)
         expect(spyaddCiteTdxAssessment).toHaveBeenCalled()
    })

    it("testing handleClickElement",()=>{
        let e = {
            stopPropagation :jest.fn()
        }
        elementInteractiveInstance.handleClickElement(e);
    })
    it('testing togglePopup',()=>{
        let tempProps = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            index: 1,
            handleFocus: function () { },
            permissions:['add_multimedia_via_alfresco'],
            model: {
                figuredata:{
                    interactiveformat :"mmi",
                    interactiveparentid:'urn:pearson:work:98e2b84c-132e-44f0-a9ae-1871c16ab6e8',
                    interactiveid:'urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec'
                }
            },
            showBlocker: function () { },
            updateFigureData : function() {}
        };
        let tempComponent = mount(<Provider store={store}><Interactive {...tempProps} /></Provider>);
        let elementInteractiveInstance = tempComponent.find('Interactive').instance();
        let e ={
            stopPropagation :jest.fn()
        }
        let value ={}
        elementInteractiveInstance.togglePopup(e,value)
    })
    it('testing togglePopup else case',()=>{
        let tempProps = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            index: 1,
            handleFocus: function () { },
            permissions:['add_multimedia_via_alfresco'],
            model: {
                figuredata:{
                    interactiveformat :"mmi",
                    interactiveparentid:'',
                    interactiveid:''
                }
            },
            showBlocker: function () { },
            updateFigureData : function() {}
        };
        let tempComponent = mount(<Provider store={store}><Interactive {...tempProps} /></Provider>);
        let elementInteractiveInstance = tempComponent.find('Interactive').instance();
        let e ={
            stopPropagation :jest.fn()
        }
        let value ={}
        elementInteractiveInstance.togglePopup(e,value)
    })
     
})
describe("Interactive Element: Testing Elm Picker Integration Methods", () => {
    let props = {
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        index: 1,
        handleFocus: function () { },
        permissions:['add_multimedia_via_alfresco'],
        model: interactiveElm,
        showBlocker: function () { },
        updateFigureData: jest.fn(),
    };
    let component = mount(<Provider store={store}><Interactive {...props} /></Provider>);
    let elementInteractiveInstance = component.find('Interactive').instance();
    const cb = jest.fn();

    xit("Test - closeElmWindow", () => {
        elementInteractiveInstance.setState({
            showElmComponent: true,
        })
        component.update()
        const spycloseElmWindow = jest.spyOn(elementInteractiveInstance, 'closeElmWindow')
        elementInteractiveInstance.closeElmWindow()
        expect(spycloseElmWindow).toHaveBeenCalled()
        expect(elementInteractiveInstance.state.showElmComponent).toBe(false)
    })
    it("Test - addElmInteractive", () => {
        let pufObj = {
            id: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec",
            interactiveType: "simulation",
            title: "Interative 2 -UCA",
            callFrom: "fromEventHandling"
        }
        const spyaddElmInteractive = jest.spyOn(elementInteractiveInstance, 'addElmInteractive')
        elementInteractiveInstance.addElmInteractive(pufObj, cb)
        expect(spyaddElmInteractive).toHaveBeenCalled()
        expect(elementInteractiveInstance.state.itemID).toBe(pufObj.id)
        expect(elementInteractiveInstance.state.interactiveTitle).toBe(pufObj.title)
        expect(elementInteractiveInstance.state.elementType).toBe(pufObj.interactiveType)
    })
    it("Test - togglePopup -elminteractive", () => {
        const spytogglePopup = jest.spyOn(elementInteractiveInstance, 'togglePopup')
        const e = {
            target: {
                classList: { contains: () => { return false } },
                tagName: "p"
            },
            stopPropagation() { }
        }
        elementInteractiveInstance.togglePopup(e, true);
        elementInteractiveInstance.forceUpdate();
        component.update();
        expect(spytogglePopup).toHaveBeenCalledWith(e, true)
        expect(elementInteractiveInstance.props.model.figuredata.interactiveformat).toBe('mmi-elm')
        spytogglePopup.mockClear()
    })
    it('Test - 4 - toggleUpdatePopup function', () => {
        const intInstance = interactiveInstance(props);
        const func = jest.spyOn(intInstance, 'toggleUpdatePopup')
        intInstance.toggleUpdatePopup(false);
        expect(intInstance.state.showUpdatePopup).toBe(false);
        expect(func).toHaveBeenCalled();
        func.mockClear();
    });
    it('Test - 5 - updateElmAssessment', () => {
        props = {
            fetchAssessmentVersions: jest.fn(),
            fetchAssessmentMetadata: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn(),
            ...props
        }
        const intInstance = interactiveInstance(props);
        const { interactiveid, interactivetype, interactivetitle } = props?.model?.figuredata;
        intInstance.setState({
            itemID: interactiveid,
            interactiveTitle: interactivetitle,
            elementType: interactivetype
        })
        
        mount(<Provider store={store}>
            <Interactive { ...props } /></Provider>
        ).update();
        intInstance.forceUpdate();
        jest.spyOn(intInstance, 'updateElmAssessment')
        intInstance.updateElmAssessment(event);
        //expect(spyupdateElmInteractive).toHaveBeenCalled(); 
        expect(intInstance.state.itemID).toBe(interactiveid);
        expect(intInstance.state.interactiveTitle).toBe(interactivetitle);
        expect(intInstance.state.elementType).toBe(interactivetype);
    })
    it('Test - componentDidUpdate', () => {
        const intInstance = interactiveInstance(props);
         intInstance.setState({
            itemID: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec",
            interactiveTitle : "title"
        })
        const compDidUpdate = jest.spyOn(intInstance, 'componentDidUpdate');
        intInstance.componentDidUpdate();
        expect(compDidUpdate).toHaveBeenCalled();
    })
    it('Test - 6 - updateElm', () => {
        props = {
            permissions: ['elements_add_remove'],
            setNewItemFromElm: jest.fn(),
            ...props
        }
        const intInstance = interactiveInstance(props);
        const func = jest.spyOn(intInstance, 'updateElm');
        intInstance.updateElm();
        expect(func).toHaveBeenCalled();
    })
    it('Test - 7 - showElmVersionStatus', () => {
        const intInstance = interactiveInstance(props);
        intInstance.setState({
            itemID: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec"
        })
        const func = jest.spyOn(intInstance, 'showElmVersionStatus');
        intInstance.showElmVersionStatus();
        expect(func).toHaveBeenCalled();
    })
    describe("Test - 8 - Function showCanvasBlocker", () => {
        const intInstance = interactiveInstance(props);
        const func = jest.spyOn(intInstance, 'showCanvasBlocker');
        it('Test - 8.1 - showCanvasBlocker if condition', () => {
            intInstance.showCanvasBlocker(false);
            expect(func).toHaveBeenCalled();
        })
        it('Test - 8.2 - showCanvasBlocker else condition', () => {
            intInstance.showCanvasBlocker(true);
            expect(func).toHaveBeenCalled();
        })     
    })
    xit('Test - 8 - updateElmOnSaveEvent', () => {
        const intInstance = interactiveInstance({...props, model:{...interactiveElm, id:"123"}});
        intInstance.setState({
            itemID: "urn:pearson:work:baf20494-42b2-4bb8-9d3d-07b5fb7f24ec",
            elementType: "elm-int"
        })
        const func = jest.spyOn(intInstance, 'updateElmOnSaveEvent');
        intInstance.updateElmOnSaveEvent({assessmentReducer : interactReducer});
        expect(func).toHaveBeenCalled();
    })
    it('Test - 9 - showCustomPopup', () => {
        const intInstance = interactiveInstance(props); 
        const func = jest.spyOn(intInstance, 'showCustomPopup');
        intInstance.showCustomPopup();
        expect(func).toHaveBeenCalled();
    })
    it('Test - 10 - prohibitPropagation', () => {
        const intInstance = interactiveInstance(props); 
        const func = jest.spyOn(intInstance, 'prohibitPropagation');
        intInstance.prohibitPropagation(event);
        expect(func).toHaveBeenCalled();
    })     
})
 