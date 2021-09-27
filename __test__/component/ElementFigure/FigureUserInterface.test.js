import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import FigureUserInterface from '../../../src/component/ElementFigure/FigureUserInterface';
import { newVideoObjWithData} from '../../../fixtures/ElementFigureTestingData.js'
import config from '../../../src/config/config';

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})

jest.mock('../../../src/constants/utility.js',()=>{
    return {
        getLabelNumberTitleHTML: () => {
            return jest.fn()
        },
        hasReviewerRole: () => {
            return false
        },
        sendDataToIframe: () => {
            return jest.fn()
        }
    }
})



describe('Testing FigureUserInterface component', () => {
    let initialState = {
        alfrescoReducer: {
            alfrescoAssetData: {},
            elementId: "urn",
            alfrescoListOption: [],
            launchAlfrescoPopup: true,
            editor: true,
            Permission: false
        },
        appStore: {
            figureDropdownData: []
        },
        projectMetadata:{},
    }
    const store = mockStore(initialState);

    xtest('renders without crashing', () => {
        let props = {
            model:newVideoObjWithData,
            index:"" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: ['add_multimedia_via_alfresco'],
            figureData:{
                model:{
                    figuretype:'video'
                }
            }
        }
        const component = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })
    xdescribe('Testing alfrescoSiteUrl', () => {
        let props = {
            model:newVideoObjWithData,
            index:"" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: ['add_multimedia_via_alfresco'],
        }
        xtest('Testing updateAlfrescoSiteUrl if condition', () => {
            let elementFigure = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            const elementFigureInstance = elementFigure.find('FigureUserInterface').instance();
            elementFigureInstance.setState({ alfrescoSiteData: {
                title: 'test'
            }});
            elementFigureInstance.updateAlfrescoSiteUrl();
            expect(elementFigureInstance.state.alfrescoSite).toBe('test')
        })
        xtest('Testing updateAlfrescoSiteUrl else condition', () => {
            let elementFigure = mount(<Provider store={store}><FigureUserInterface {...props} /></Provider>)
            const elementFigureInstance = elementFigure.find('FigureUserInterface').instance();
            elementFigureInstance.setState({ alfrescoSiteData: {
                title: null
            }});
            elementFigureInstance.updateAlfrescoSiteUrl();
            let defaultSite = config.alfrescoMetaData?.alfresco?.repositoryFolder || config.alfrescoMetaData?.alfresco?.title
            expect(elementFigureInstance.state.alfrescoSite).toBe(defaultSite)
        })
    })

    xdescribe('Testing Element figure - handleC2MediaClick Functions', () => {
        let type = "audio";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            permissions: ['add_multimedia_via_alfresco'],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn()
        };
        const e = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
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
            'x-prsn-user-id': " "
        }
        const elementFigure = mount(<Provider store={store}><FigureUserInterface type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
        let elementFigureInstance = elementFigure.find('FigureUserInterface').instance();
        it('handleC2MediaClick-default case', () => {
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: alfrescoPath
            })
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            config.alfrescoMetaData = alfrescoPath
            elementFigureInstance.handleC2MediaClick(event);
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('handleC2MediaClick else case ', () => {
            let alfrescoPath1 = {
                alfresco: {
                    visibility: "MODERATED",
                    name:'test',
                    title:'test',
                    guid:'test'
                }
            }
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: alfrescoPath1
            })
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            config.alfrescoMetaData = alfrescoPath
            elementFigureInstance.handleC2MediaClick(event);
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('handleC2MediaClick-if with alfresco_crud_access permissions ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview",'alfresco_crud_access', "add_instructor_resource_url", "grid_crud_access", , "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            };
            const elementFigure = mount(<Provider store={store}><FigureUserInterface type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
            let elementFigureInstance = elementFigure.find('FigureUserInterface').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: {}
            })
            elementFigure.update();
            config.alfrescoMetaData = {}
            elementFigureInstance.handleC2MediaClick(event);
            elementFigureInstance.forceUpdate();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('handleC2MediaClick-if else case  alfresco_crud_access ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", , "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            };
            const elementFigure = mount(<Provider store={store}><FigureUserInterface type={type} model={figureImage50TextElementDefault} index="30" {...props}/></Provider>);
            let elementFigureInstance = elementFigure.find('FigureUserInterface').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementFigureInstance, 'handleC2MediaClick') 
            let event = {
                target: { tagName: 'b' },

            }
            elementFigureInstance.setState({
                projectMetadata: {}
            })
            elementFigure.update();
            config.alfrescoMetaData = {}
            elementFigureInstance.handleC2MediaClick(event);
            elementFigureInstance.forceUpdate();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('TEST- Call AddResource function for C2Mdeia',()=>{
            const spyaddFigureResource = jest.spyOn(elementFigureInstance, 'addFigureResource') 
            elementFigureInstance.addFigureResource(e);
            elementFigureInstance.forceUpdate();
            elementFigure.update();
            expect(spyaddFigureResource).toHaveBeenCalledWith(e)
            spyaddFigureResource.mockClear()
        })
    });
    xdescribe('Testing dataFromAlfresco function', () => {
        let alfrescoPath = {
            alfresco: {
                repositoryFolder: "001_C5 Media POC - AWS US ",
                repositoryName: "AWS US",
                repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
                visibility: "MODERATED",
                title:'',
                name:''
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
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            handleFocus: function () { },
            permissions: permissions,
            model: videoElementTypeSLDefault,
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            isCiteChanged:true
        };
        let sampleAltTextDiv = document.createElement('at')
        sampleAltTextDiv.setAttribute('name', 'alt_text');
        sampleAltTextDiv.innerHTML = "alt_text"
        document.body.appendChild(sampleAltTextDiv)

        let sampleLongDescriptionDiv = document.createElement('ld')
        sampleLongDescriptionDiv.setAttribute('name', 'long_description');
        sampleLongDescriptionDiv.innerHTML = "long_Description"
        document.body.appendChild(sampleLongDescriptionDiv)

        const elementAudioVideo = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>)
        let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
        const spydataFromAlfresco = jest.spyOn(elementAudioVideoInstance, 'dataFromAlfresco')
        const defaultPath = "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png";
        it('Test- if case workflow', () => {
            config.alfrescoMetaData = alfrescoPath
            elementAudioVideoInstance.dataFromAlfresco(audioData1)
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementAudioVideoInstance.state.imgSrc).toBe('https://cite-media-stg.pearson.com/legacy_paths/2ddad41f-a05e-4f99-b44c-4a9306bd2a36/Progressive%20Audio%20sample%20Midsummer_Sky.mp3')
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-  epsURL given, clipinfo given-English subtitles', () => {
            let data = newAlfrescoData
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideoInstance.dataFromAlfresco(data)
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-  no publicationUrl ', () => {
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideoInstance.dataFromAlfresco(audioData)
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-  with viedo smartLinks ', () => {
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideoInstance.dataFromAlfresco(videoSmartLinksData)
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-  with viedo avs:jsonString filed else case ', () => {
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideoInstance.dataFromAlfresco(newVideoData)
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementAudioVideoInstance.state.imgSrc).toBe(newVideoData.epsUrl)
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow-  with smartlink audio ', () => {
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideoInstance.dataFromAlfresco(smartLinkAudio)
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementAudioVideoInstance.state.imgSrc).toBe(smartLinkAudio.epsUrl)
            spydataFromAlfresco.mockClear()
        })
        it('Test- if case workflow- switch case audio ', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: permissions,
                model: audioElementTypeSLWithData,
                updateFigureData: jest.fn(),
                handleBlur: jest.fn(),
                handleFocus: jest.fn(),
                accessDenied: jest.fn(),
                isCiteChanged:true
            };
            const elementAudioVideo = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>)
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spydataFromAlfresco = jest.spyOn(elementAudioVideoInstance, 'dataFromAlfresco')
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideoInstance.dataFromAlfresco(smartLinkAudio)
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            expect(elementAudioVideoInstance.state.imgSrc).toBe(smartLinkAudio.epsUrl)
            spydataFromAlfresco.mockClear()
        })
    });
});