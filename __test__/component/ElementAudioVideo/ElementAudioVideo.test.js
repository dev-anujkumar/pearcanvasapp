import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import ElementAudioVideo from '../../../src/component/ElementAudioVideo/ElementAudioVideo';
import config from '../../../src/config/config';
import { audioElementTypeSLDefault, audioElementTypeSLWithData, audioElementTypeAlfrescoDefault, audioElementTypeAlfrescoWithData, videoElementTypeSLDefault, videoElementTypeSLWithData, videoElementTypeAlfrescoWithData, videoElementTypeAlfrescoDefault } from '../../../fixtures/ElementAudioVideoTestingData.js'
jest.mock('../../../src/component/tinyMceEditor.js',()=>{
    return function () {
        return (<div>null</div>)
    }
})
global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({json:jest.fn(),id:'urn:pearson134'});
   });
 });
describe('Testing Element Audio-Video component', () => {

    it('renders without crashing', () => {
        let props = {
            model:{},
            index:"" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function(){},
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
        }
        const component = mount(<ElementAudioVideo {...props} />)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })
    describe('With Audio element', () => {
        let props = {
            model: audioElementTypeSLDefault,
            index: 1,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function(){},
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
        };
        let component = mount(<ElementAudioVideo {...props} />);
        it('renders properly with default audio SL-type element', () => {        
            expect(component.find('.divAudio .figureAudio .pearson-component.audio')).toHaveLength(1)
           
        })
        it('renders  properly with given audio SL-type  element', () => {
            component.setProps({ model: audioElementTypeSLWithData,index: 2 });
            expect(component.find('.divAudio .figureAudio .pearson-component.audio')).toHaveLength(1)
        })
        it('renders  properly with default audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoDefault,index: 3 });
            expect(component.find('.divAudio .figureAudio .pearson-component.audio')).toHaveLength(1)
        })
        it('renders  properly with given audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoWithData ,index:4 });
            expect(component.find('.divAudio .figureAudio .pearson-component.audio')).toHaveLength(1)
        })
    });
    describe('With Video element', () => {
        let props = {
            model: videoElementTypeSLDefault,
            index: 5,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },

            handleFocus: function(){},
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
        };
        let component = mount(<ElementAudioVideo {...props} />);
        it('renders properly with default video SL-type element', () => {
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })
        it('renders  properly with given video SL-type element', () => {
            component.setProps({ model: videoElementTypeSLWithData,index: 6 });
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })
        it('renders  properly with default video Alfresco-type element', () => {
            component.setProps({ model: videoElementTypeAlfrescoDefault ,index: 7});
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })
        it('renders  properly with given video Alfresco-type element', () => {
            component.setProps({ model: videoElementTypeAlfrescoWithData,index: 8 });
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })

    });
    describe('Testing handleC2MediaClick function', () => {

        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            model: videoElementTypeSLDefault,
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
        };
        const event = {
            target:{
                tagName: "p"
            },
            stopPropagation() { }
        }
        let alfrescoPath={
            alfresco:{
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
            tcm: {timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true},
            url: null,
            userApprover: null,
            userApproverFullName: null,
            userCount: 0,
            'x-prsn-user-id': " ",
        }
        const elementAudioVideo = mount(<ElementAudioVideo {...props}/>);
        let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
        it('handleC2MediaClick-default case', () => {
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick') 
            elementAudioVideoInstance.handleC2MediaClick(event);
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        }) 
        it('handleC2MediaClick-if->if->if case', () =>{
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            };

            const elementAudioVideo = mount( <ElementAudioVideo {...props} /> )
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick') 
            let event={
                target: { tagName: 'b' },
    
            }
            elementAudioVideoInstance.setState({
                projectMetadata: alfrescoPath
            })
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();

            config.alfrescoMetaData = alfrescoPath
            elementAudioVideoInstance.handleC2MediaClick(event) 
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick-if->if->else case', () =>{
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [],
                accessDenied: jest.fn(),
            };

            const elementAudioVideo = mount( <ElementAudioVideo {...props} /> )
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick') 
            let event={
                target: { tagName: 'b' },
    
            }
            elementAudioVideoInstance.setState({
                projectMetadata: alfrescoPath
            })
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();

            config.alfrescoMetaData = alfrescoPath
            elementAudioVideoInstance.handleC2MediaClick(event) 
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick-else->if case', () =>{
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ],
                accessDenied: jest.fn(),
            };
            config.alfrescoMetaData = {}
            const elementAudioVideo = mount( <ElementAudioVideo {...props} /> )
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick') 
            let event={
                target: { tagName: 'b' },
    
            }
            elementAudioVideoInstance.setState({
                projectMetadata: {}
            })
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            elementAudioVideoInstance.handleC2MediaClick(event) 
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick-else->else case', () =>{
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick : ()=>{},
                handleFocus: function(){},
                permissions: [],
                accessDenied: jest.fn(),
            };
            config.alfrescoMetaData = {}
            const elementAudioVideo = mount( <ElementAudioVideo {...props} /> )
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick') 
            let event={
                target: { tagName: 'b' },
    
            }
            elementAudioVideoInstance.setState({
                projectMetadata: {}
            })
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            elementAudioVideoInstance.handleC2MediaClick(event) 
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        })
    })
    describe('Testing dataFromAlfresco function', () => {
        let alfrescoPath={
            alfresco:{
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
            tcm: {timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true},
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
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            model: videoElementTypeSLDefault,
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
        };
            let sampleAltTextDiv = document.createElement('at')
            sampleAltTextDiv.setAttribute('name', 'alt_text' );
            sampleAltTextDiv.innerHTML = "alt_text"
            document.body.appendChild(sampleAltTextDiv)
           
            let sampleLongDescriptionDiv = document.createElement('ld')
            sampleLongDescriptionDiv.setAttribute('name', 'long_description' );
            sampleLongDescriptionDiv.innerHTML = "long_Description"
            document.body.appendChild(sampleLongDescriptionDiv)

            const elementAudioVideo = mount(<ElementAudioVideo {...props} />)
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spydataFromAlfresco = jest.spyOn(elementAudioVideoInstance, 'dataFromAlfresco')    
            const defaultPath="https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png";
            it('Test- if case workflow', () =>{
                let data={
                    'assetType': "video",
                    'epsUrl': "",
                    'alt-text': "ält-text",
                    'longDescription':"longDescription",
                 }
                config.alfrescoMetaData = alfrescoPath
                elementAudioVideoInstance.dataFromAlfresco(data)
                elementAudioVideoInstance.forceUpdate();
                elementAudioVideo.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementAudioVideoInstance.state.imgSrc).toBe(defaultPath)
                spydataFromAlfresco.mockClear()
            })
            it('Test- if case workflow-  epsURL given, clipinfo given-English subtitles', () =>{
                let data={
                    'assetType': "video",
                     epsUrl: "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                    'alt-text': "ält-text",
                    'longDescription':"longDescription",
                    smartLinkURl: "https://cite-media-stg.pearson.com/legacy_paths/42333091-7625-4317-b095-1f450207961f/dipe.mp4",
                    clipinfo: {description: "Desc1",
                    duration: "00:00:10",
                    end: "00:00:10",
                    id: "ClipID1",
                    start: "00:00:00"},
                    subtitle: "https://mediaplayer.pearsoncmg.com/assets/_pmd.true/buildingDino2?mimeType=vtt&lang=en",
                 }
                
                 elementAudioVideoInstance.forceUpdate();
                 elementAudioVideoInstance.dataFromAlfresco(data)
                 elementAudioVideoInstance.forceUpdate();
                elementAudioVideo.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementAudioVideoInstance.state.imgSrc).toBe(data.epsUrl)
                spydataFromAlfresco.mockClear()
            }) 
            it('Test- if case workflow-  epsURL given, clipinfo given-French subtitles', () =>{
                let data={
                    'assetType': "video",
                     epsUrl: "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                    'alt-text': "ält-text",
                    'longDescription':"longDescription",
                    smartLinkURl: "https://cite-media-stg.pearson.com/legacy_paths/42333091-7625-4317-b095-1f450207961f/dipe.mp4",
                    clipinfo: {description: "",
                    duration: "",
                    end: "",
                    id: "",
                    start: ""},
                    frenchsubtitle: "https://mediaplayer.pearsoncmg.com/assets/_pmd.true/buildingDino2?mimeType=vtt&lang=fr",
                    req:{
                        url: "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON d.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '7bffceb3-33fc-40cc-a70c-50b6f32665c9'"
                    }
                 }
                
                 elementAudioVideoInstance.forceUpdate();
                 elementAudioVideoInstance.dataFromAlfresco(data)
                 elementAudioVideoInstance.forceUpdate();
                elementAudioVideo.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementAudioVideoInstance.state.imgSrc).toBe(data.epsUrl)
                spydataFromAlfresco.mockClear()
            }) 
            it('Test- if case workflow-  epsURL given and without clipinfo', () =>{
                let data={
                    'assetType': "audio",
                     epsUrl: "",
                    'alt-text': "ält-text",
                    'longDescription':"longDescription",
                    smartLinkURl: "https://cite-media-stg.pearson.com/legacy_paths/42333091-7625-4317-b095-1f450207961f/dipe.mp4",
                    clipinfo: false
                 }
                
                 elementAudioVideoInstance.forceUpdate();
                 elementAudioVideoInstance.dataFromAlfresco(data)
                 elementAudioVideoInstance.forceUpdate();
                elementAudioVideo.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                expect(elementAudioVideoInstance.state.imgSrc).toBe(data.epsUrl)
                spydataFromAlfresco.mockClear()
            }) 
            it('Test- else case workflow', () =>{
                let data={
                    'assetType': "figure",
                    'epsUrl': "",
                    'alt-text': "ält-text",
                    'longDescription':"longDescription",
                 }
                 elementAudioVideoInstance.forceUpdate();
                 elementAudioVideoInstance.dataFromAlfresco(data)
                 elementAudioVideoInstance.forceUpdate();
                 elementAudioVideo.update();
                expect(spydataFromAlfresco).toHaveBeenCalled()
                spydataFromAlfresco.mockClear()
            }) 

    })
});