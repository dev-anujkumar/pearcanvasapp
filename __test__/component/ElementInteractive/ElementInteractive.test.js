import React from 'react';
import { mount } from 'enzyme';
import Interactive from '../../../src/component/ElementInteractive';
import config from '../../../src/config/config';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Interactivefpo , InteractiveFlashcards, Interactive3party, Interactivepdf, InteractiveWeblink,
    InteractivePopupWeblink, InteractiveTable,InteractiveShowHide,InteractivePopWindow,Interactivegraph
    ,Interactivesimulation,Interactivesurvey,Interactivetimeline,Interactivehotspot,Interactiveaccountingtable,
    Interactivefillinblank,Interactivegalleryimage,Interactivegalleryvideo,Interactivevideomcq,Interactivemcq , InteractiveGuidedExample} from '../../../fixtures/ElementInteractiveTesting.js'
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/js/toggleLoader', () => ({
    hideTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    showTocBlocker: jest.fn()
}))
describe('Testing Interactive element component', () => {
    xit('renders without crashing', () => {
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
        test('renders  properly with default InteractiveShowHide ', () => {
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
        test('renders  properly with default Interactivetimeline', () => {
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
        describe('Test-Alfresco Data Handling', () => {
            const elementInteractive = mount(<Provider store={store}><Interactive type={type} model={Interactivefpo} index="1" {...props} /></Provider>);
            let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
            const spyhandleC2InteractiveClick = jest.spyOn(elementInteractiveInstance, 'handleC2InteractiveClick')
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
                elementInteractiveInstance.handleC2InteractiveClick("")
                elementInteractiveInstance.forceUpdate();
                elementInteractive.update();
                expect(spyhandleC2InteractiveClick).toHaveBeenCalled()
                spyhandleC2InteractiveClick.mockClear()
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
    describe('Testing Element interactive - handleC2InteractiveClick Functions', () => {
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

        it('handleC2InteractiveClick-default case', () => {
            const spyhandleC2InteractiveClick = jest.spyOn(elementInteractiveInstance, 'handleC2InteractiveClick')
            elementInteractiveInstance.handleC2InteractiveClick();
            expect(spyhandleC2InteractiveClick).toHaveBeenCalled()
            spyhandleC2InteractiveClick.mockClear()
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
        const spyassessmentNavigateBack = jest.spyOn(elementInteractiveInstance, 'assessmentNavigateBack')
        elementInteractiveInstance.assessmentNavigateBack()
        expect(spyassessmentNavigateBack).toHaveBeenCalled()
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
        expect(elementInteractiveInstance.state.itemID).toBe("123")
    })
     
})