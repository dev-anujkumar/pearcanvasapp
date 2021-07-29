import React from 'react';
import { mount } from 'enzyme';
import ElementAudioVideo from '../../../src/component/ElementAudioVideo/ElementAudioVideo';
import config from '../../../src/config/config';
import { audioElementTypeSLDefault, audioElementTypeSLWithData, audioElementTypeAlfrescoDefault, audioElementTypeAlfrescoWithData, videoElementTypeSLDefault, videoElementTypeSLWithData, videoElementTypeAlfrescoWithData, videoElementTypeAlfrescoDefault, audioData, audioData1, newAlfrescoData, videoSmartLinksData, newVideoData, smartLinkAudio, permissions } from '../../../fixtures/ElementAudioVideoTestingData.js'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import slateLevelData from '../Sidebar/slateData';

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})

jest.mock('../../../src/constants/utility.js', () => {
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
});

global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
        resolve({ json: jest.fn(), id: 'urn:pearson134' });
    });
});

describe('Testing Element Audio-Video component', () => {
    const mockStore = configureMockStore(middlewares);
    let activeElement = {
        elementId: 'urn:pearson:work:30660a48-cc43-42e6-8cb1-14dbc1563f27',
        elementType: 'video-audio',
        elementWipType: 'figure',
        index: 1,
        primaryOption: 'primary-video',
        secondaryOption: 'secondary-video-smartlink',
        tag: 'VID',
        toolbar: [],
        addfigureGlossarupopup: false
    }
    const elementAudioVideoData = mockStore({
        appStore: {
            activeElement,
            slateLevelData
        },
        alfrescoReducer: {
            alfrescoAssetData: {},

        }
    })
    let elementAudioVideo = mount(<Provider store={elementAudioVideoData}>
        <ElementAudioVideo />
    </Provider>);
    it('renders without crashing', () => {
        let props = {
            model: {},
            index: "",
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function () { },
            permissions: permissions,
            changedSiteData: {
                guid: '',
                title: '',
                id: '',
                visibility: ''
            },
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            alfrescoElementId: jest.fn(),
            alfrescoAssetData: jest.fn(),
            launchAlfrescoPopup: jest.fn(),
        }
        let elementAudioVideo = mount(<Provider store={elementAudioVideoData}>
            <ElementAudioVideo {...props} />
        </Provider>);
        const elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
        expect(elementAudioVideoInstance).toBeDefined();
    })
    describe('With Audio element', () => {
        let props = {
            model: audioElementTypeSLDefault,
            index: 1,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function () { },
            permissions: permissions,
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
        };
        let component = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>);
        it('renders properly with default audio SL-type element', () => {
            expect(component.find('.divAudio .figureAudio .pearson-component.audio')).toHaveLength(1)

        })
        it('renders  properly with given audio SL-type  element', () => {
            component.setProps({ model: audioElementTypeSLWithData, index: 2 });
            expect(component.find('.divAudio .figureAudio .pearson-component.audio')).toHaveLength(1)
        })
        it('renders  properly with default audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoDefault, index: 3 });
            expect(component.find('.divAudio .figureAudio .pearson-component.audio')).toHaveLength(1)
        })
        it('renders  properly with given audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoWithData, index: 4 });
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

            handleFocus: function () { },
            permissions: permissions,
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
        };
        let component = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>);
        it('renders properly with default video SL-type element', () => {
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })
        it('renders  properly with given video SL-type element', () => {
            component.setProps({ model: videoElementTypeSLWithData, index: 6 });
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })
        it('renders  properly with default video Alfresco-type element', () => {
            component.setProps({ model: videoElementTypeAlfrescoDefault, index: 7 });
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })
        it('renders  properly with given video Alfresco-type element', () => {
            component.setProps({ model: videoElementTypeAlfrescoWithData, index: 8 });
            expect(component.find('.divVideo .figureVideo .pearson-component.video')).toHaveLength(1)
        })

    });
    describe('Testing handleC2MediaClick function', () => {

        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick: () => { },
            handleFocus: function () { },
            permissions:permissions,
            model: videoElementTypeSLDefault,
            updateFigureData: jest.fn(),
            handleBlur: jest.fn(),
            handleFocus: jest.fn(),
            accessDenied: jest.fn(),
            model:{
                figuredata:{
                    "schema":"http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                    "audioid":"urn:pearson:alfresco:df4e2218-7bab-4b65-bd14-214ab558a3df",
                    "posterimage":{
                       "imageid":"urn:pearson:alfresco:df4e2218-7bab-4b65-bd14-214ab558a3df"
                    },
                    "srctype":"externallink",
                    "audio":{
                       "path":"https://cite-media-stg.pearson.com/legacy_paths/df4e2218-7bab-4b65-bd14-214ab558a3df/media60feb1130ea34.mp3",
                       "format":"audio/mpeg",
                       "charAt":0
                    }
                 }
            }
            
        };
        const event = {
            target: {
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
        const elementAudioVideo = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>);
        let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
        it('handleC2MediaClick-default case', () => {
            const event = {
                target:{
                    tagName: "p"
                },
                stopPropagation() { }
            }
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick')
            elementAudioVideoInstance.handleC2MediaClick(event);
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick-if->if->if case', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: permissions,
                model:{
                    figuredata:{
                    "schema":"http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                    "height":"399",
                    "width":"600",
                    "videoid":"",
                    "posterimage":{
                       "path":"https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                       "imageid":""
                    },
                    "videos":[
                       {
                          "path":"",
                          "charAt":0
                       }
                    ]
                 }
                }
            };

            const elementAudioVideo = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>)
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick')
            let event = {
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
        it('handleC2MediaClick-if->if->else case', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: [],
                accessDenied: jest.fn(),
                model:{
                    figuredata:{
                        "schema":"http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                        "audioid":"urn:pearson:alfresco:df4e2218-7bab-4b65-bd14-214ab558a3df",
                        "posterimage":{
                           "imageid":"urn:pearson:alfresco:df4e2218-7bab-4b65-bd14-214ab558a3df"
                        },
                        "srctype":"externallink",
                        "audio":{
                           "path":"https://cite-media-stg.pearson.com/legacy_paths/df4e2218-7bab-4b65-bd14-214ab558a3df/media60feb1130ea34.mp3",
                           "format":"audio/mpeg",
                           "charAt":0
                        }
                     }
                }
            };

            const elementAudioVideo = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>)
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick')
            let event = {
                target: { tagName: 'b' },

            }
            elementAudioVideoInstance.forceUpdate();
            elementAudioVideo.update();

            config.alfrescoMetaData = alfrescoPath
            elementAudioVideoInstance.handleC2MediaClick(event)
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith(event)
            spyhandleC2MediaClick.mockClear()
        })
        it('handleC2MediaClick-else->if case', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: permissions,
                accessDenied: jest.fn(),
                model:{
                    figuredata:{
                        "schema":"http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                        "audioid":"urn:pearson:alfresco:df4e2218-7bab-4b65-bd14-214ab558a3df",
                        "posterimage":{
                           "imageid":"urn:pearson:alfresco:df4e2218-7bab-4b65-bd14-214ab558a3df"
                        },
                        "srctype":"externallink",
                        "audio":{
                           "path":"https://cite-media-stg.pearson.com/legacy_paths/df4e2218-7bab-4b65-bd14-214ab558a3df/media60feb1130ea34.mp3",
                           "format":"audio/mpeg",
                           "charAt":0
                        }
                     }
                }
            };
            config.alfrescoMetaData = {}
            const elementAudioVideo = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>)
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick')
            let event = {
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
        it('handleC2MediaClick-else->else case', () => {
            let props = {
                slateLockInfo: {
                    isLocked: false,
                    userId: 'c5Test01'
                },
                onClick: () => { },
                handleFocus: function () { },
                permissions: [],
                accessDenied: jest.fn(),
                model:{}
            };
            const elementAudioVideo = mount(<Provider store={elementAudioVideoData}><ElementAudioVideo {...props} /></Provider>)
            let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
            const spyhandleC2MediaClick = jest.spyOn(elementAudioVideoInstance, 'handleC2MediaClick')
            let event = {
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

    })
});