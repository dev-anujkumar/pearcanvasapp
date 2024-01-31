/**************************Import Plugins & Modules **************************/
import * as tinyMceFn from '../../src/js/TinyMceUtility.js';
import config from '../../src/config/config';
import tinymce from 'tinymce/tinymce';
import axios from 'axios';
import configureStore from 'redux-mock-store';
/**************************Declare Common Variables**************************/
let mockQuerySelector = (selector) => {
    switch (selector) {
        case 'img[data-id="imageId"]':
            return { outerHTML: "" };
        case '#imageId li':
            return { innerText: "", append: () => { } };
        case '#imageId li img.imageAssetContent':
        default:
            return { innerHTML: "test" };
    }
}
let mockEditor = {
    selection: {
        setContent: () => { }
    },
    insertContent: () => { },
    targetElm: { classList: { remove: () => { } }, querySelector:mockQuerySelector }
},
    permissions = ['alfresco_crud_access', 'add_multimedia_via_alfresco'],
    mockImageArgs = {
        id: "imageId",
        handleBlur: jest.fn()
    },
    saveSelectedAlfrescoElement= jest.fn(),
    mockImgData = {
        'assetType': "image",
        'uniqueID': "imageId",
        'EpsUrl': "url",
        'alt-text': "Alt Text",
        'longDescription': "long Description",
    }
let mockFunc = (selector) => {
    return [{
        innerHTML: "testdata"
    }]
}
let tinyMceEditor = {
    $: mockFunc,
    bodyElement: {},
    bookmark: {},
    contentAreaContainer: {},
    contentDocument: document,
    contentStyles: [],
    contentWindow: { parent: Window, opener: null, top: Window, length: 0, frames: Window, },
    dom: { doc: document, settings: {}, win: Window, files: {}, stdMode: true, create: () => { } },
    editorContainer: {},
    editorManager: { fire: jest.fn(), on: jest.fn(), off: jest.fn(), once: jest.fn(), hasEventListeners: jest.fn() },
    fire: jest.fn(),
    hasEventListeners: () => { },
    hasVisual: true,
    id: "imageId",
    initialized: true,
    inline: true,
    isNotDirty: true,
    loadedCSS: {},
    mode: { isReadOnly: jest.fn(), set: jest.fn(), get: jest.fn(), register: jest.fn() },
    notificationManager: { open: jest.fn(), close: jest.fn(), getNotifications: jest.fn() },
    on: jest.fn(),
    orgDisplay: "",
    parser: {},
    plugins: {},
    quirks: { refreshContentEditable: jest.fn(), isHidden: jest.fn() },
    readonly: undefined,
    selection: {
        setContent: () => { }
    },
    targetElm: { classList: { remove: () => { } },     insertContent: () => { }, },
    shortcuts: {
        add: () => { }
    },
    startContent: "<p class='paragraphNumeroUno'>bvfdbdb</p>",
    suffix: "",
    ui: {
        registry: {
            addToggleButton: jest.fn(),
            addButton: jest.fn(),
            addIcon: jest.fn(),
        }
    },
    undoManager: { data: [], typing: false, beforeChange: jest.fn(), add: jest.fn(), undo: jest.fn() },
    windowManager: { open: jest.fn(), openUrl: jest.fn(), alert: jest.fn(), confirm: jest.fn(), close: jest.fn() }

}
tinymce.activeEditor = { ...tinyMceEditor }
config.alfrescoMetaData = {
    alfresco: {
        'path': 'test',
        'nodeRef': {},
    }
}
config.userId= 'c5test01';

document.querySelector = mockQuerySelector
/**************************Mock Helper Functions**************************/
jest.mock('axios');
jest.mock('../../src/js/utils.js', () => ({
    removeBOM: jest.fn()
})
)
describe('Testing TinyMceUtility', () => {
    it('Test - handleC2MediaClick - List Element', () => {
        let props ={
            saveSelectedAlfrescoElement: jest.fn()
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(permissions, mockEditor, mockImageArgs,props);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear()
    });
    it('Test - handleC2MediaClick - List Element-no permissions-add_multimedia_via_alfresco', () => {
        document.querySelector = (selector) => {
            if (selector == '#imageId li') {
                return { innerText: "Testing" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access'], mockEditor);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - handleC2MediaClick - List Element-no nodeRef', () => {
        config.alfrescoMetaData = {
            alfresco: {
                'path': 'test'
            }
        }
        document.querySelector = (selector) => {
            if (selector == '#imageId li') {
                return { innerText: "Testing" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access'], mockEditor);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - handleC2MediaClick - List Element-no permission-alfresco_crud_access', () => {
        config.alfrescoMetaData = {}
        document.querySelector = (selector) => {
            if (selector == '#imageId li') {
                return { innerText: "Testing" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(['add_multimedia_via_alfresco'], mockEditor);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
})
describe('Testing TinyMceUtility', () => {

    config.alfrescoMetaData = {
        alfresco: {
            'name': 'test',
            'nodeRef': {},
            'title': "image",
            'guid': "imageId",
            'EpsUrl': "url",
            'alt-text': "Alt Text",
            'longDescription': "long Description"
        }
    }
    it('Test - handleC2MediaClick - List Element-with img data',async () => {
        let props = {
            alfrescoPopup:jest.fn(),
            saveSelectedAlfrescoElement: jest.fn()
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        axios.get = await jest.fn().mockImplementationOnce(() => Promise.reject({}));
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access', 'add_multimedia_via_alfresco'], mockEditor, mockImageArgs,props);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - handleC2MediaClick - List Element-with img data',async () => {
        let props ={
            alfrescoPopup:jest.fn(),
            saveSelectedAlfrescoElement: jest.fn()
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        axios.get = await jest.fn().mockImplementationOnce(() => Promise.resolve({ data: { list: { entries: [] } } }));
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access', 'add_multimedia_via_alfresco'], mockEditor, mockImageArgs,props);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - handleC2MediaClick - List Element-with img data',async () => {
        config.alfrescoMetaData = {
            alfresco: {
                'name': 'test',
                'title': "image",
                'guid': "imageId",
                'modeRef': "url"
            }
        }
        let props={
            saveSelectedAlfrescoElement:jest.fn()
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        axios.get = await jest.fn().mockImplementationOnce(() => Promise.reject({}));
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access', 'add_multimedia_via_alfresco'], mockEditor, mockImageArgs, props);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
})
describe('Testing TinyMceUtility', () => {
    config.alfrescoMetaData = {
        alfresco: {
            'path': 'test',
            'nodeRef': {},
            'assetType': "image",
            'uniqueID': "imageId",
            'EpsUrl': "url",
            'alt-text': "Alt Text",
            'longDescription': "long Description"
        }
    }
    it('Test - dataFromAlfresco  - no data args', () => {
        let mockEditor2 = {
            selection: {
                setContent: () => { }
            },
            insertContent: () => { },
            targetElm: { classList: { remove: () => { } }, querySelector:()=>{return undefined} }
        }
        let data = {
            id: "",
            epsUrl: "dfe",
            properties: {
                "cplg:altText": "",
                'cplg:longDescription': "",
                content: { mimeType: "image/jpeg" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'dataFromAlfresco');
        tinyMceFn.dataFromAlfresco (data, mockEditor2, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - dataFromAlfresco2 - no data args', () => {
        let mockEditor2 = {
            selection: {
                setContent: () => { }
            },
            insertContent: () => { },
            targetElm: { classList: { remove: () => { } }, querySelector:()=>{return undefined} }
        }
        let data = {
                "institution-urls":[
                    {
                       "institutionUrl":"https://epspqa.stg-openclass.com/cite-media-stg/",
                       "pdosUrl":"",
                       "contentVersion":"",
                       "instName":"https://epspqa.stg-openclass.com/cite-media-stg",
                       "status":"",
                       "publicationUrl":"https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/s/api/node/workspace/SpacesStore/fcf19f5f-1c1a-4625-b8b2-10031d84d4f1/content/thumbnails/doclib?c=queue&ph=true",
                       "contentAction":true
                    }
                ],
            id: "",
            properties: {
                "cplg:altText": "",
                'cplg:longDescription': "",
                content: { mimeType: "" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'dataFromAlfresco');
        tinyMceFn.dataFromAlfresco (data, mockEditor2, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - dataFromAlfresco1 - no data args', () => {
        let mockEditor2 = {
            selection: {
                setContent: () => { }
            },
            insertContent: () => { },
            targetElm: { classList: { remove: () => { } }, querySelector:()=>{return undefined} }
        }
        let data = {
                "institution-urls":[
                    {
                       "institutionUrl":"https://epspqa.stg-openclass.com/cite-media-stg/",
                       "pdosUrl":"",
                       "contentVersion":"",
                       "instName":"https://epspqa.stg-openclass.com/cite-media-stg",
                       "status":"",
                       "publicationUrl":"",
                       "contentAction":true
                    }
                ],
            id: "",
            properties: {
                "cplg:altText": "",
                'cplg:longDescription': "",
                content: { mimeType: "" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'dataFromAlfresco');
        tinyMceFn.dataFromAlfresco (data, mockEditor2, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - dataFromAlfresco  - no getImgNode', () => {
        let mockEditor2 = {
            selection: {
                setContent: () => { }
            },
            insertContent: () => { },
            targetElm: { classList: { remove: () => { } }, querySelector:()=>{return undefined} }
        }
        let data = {
            epsUrl:"iamge.png",            
            id: "testid",
            properties:{
                "cplg:altText":"Alt Text",
                'cplg:longDescription':"longDescription"
            },
            content:{mimeType: "image/jpeg"}
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'dataFromAlfresco');
        tinyMceFn.dataFromAlfresco (data, mockEditor2, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - dataFromAlfresco  - getImgNode', () => {
        let mockEditor2 = {
            selection: {
                setContent: () => { }
            },
            insertContent: () => { },
            targetElm: { classList: { remove: () => { } }, querySelector:()=>{return {outerHTML:""}} }
        }
        let data = {
            epsUrl:"iamge.png",            
            id: "testid",
            properties:{
                "cplg:altText":"Alt Text",
                'cplg:longDescription':"longDescription"
            },
            content:{mimeType: "image/jpeg"}
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'dataFromAlfresco');
        tinyMceFn.dataFromAlfresco (data, mockEditor2, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - dataFromAlfresco  - no imageArgs', () => {
        let mockEditor2 = {
            selection: {
                setContent: () => { }
            },
            insertContent: () => { },
            targetElm: { classList: { remove: () => { } }, querySelector:()=>{return {outerHTML:""}} }
        }
        let data = {
            epsUrl:"iamge.png",            
            id: "testid",
            properties:{
                "cplg:altText":"Alt Text",
                'cplg:longDescription':"longDescription"
            },
            content:{mimeType: "image/jpeg"}
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'dataFromAlfresco');
        tinyMceFn.dataFromAlfresco (data, mockEditor2);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - dataFromAlfresco  - when other asset type is selected Action is dispatched', () => {
        const initialState = {}
        const middlewares = []
        const mockStore = configureStore(middlewares);
        const store = mockStore(initialState);
        let mockEditor2 = {
            selection: {
                setContent: () => { }
            },
            insertContent: () => { },
            targetElm: { classList: { remove: () => { } }, querySelector:()=>{return {outerHTML:""}} }
        };
        let data = {
            epsUrl:"iamge.mp3",            
            id: "testid",
            properties:{
                "cplg:altText":"Alt Text",
                'cplg:longDescription':"longDescription"
            },
            content:{mimeType: "mp3"}
        };
        const spyFunc = jest.spyOn(tinyMceFn, 'dataFromAlfresco');
        const expectedPayload = {
            type: 'MULTIPLE_LINE_POETRY_ERROR_POPUP',
            payload: {
                show: true,
                message: 'Only Image Type Assets can be added as Inline Image!'
            }
        };
        tinyMceFn.dataFromAlfresco(data, mockEditor2);
        store.dispatch({
            type: 'MULTIPLE_LINE_POETRY_ERROR_POPUP',
            payload: {
                show: true,
                message: 'Only Image Type Assets can be added as Inline Image!'
            }
        });
        const actions = store.getActions();
        expect(spyFunc).toHaveBeenCalled();
        expect(actions).toEqual([expectedPayload]);
        spyFunc.mockClear();
    });
    it('Test - checkForDataIdAttribute', () => {
        let data = {
            match: ()=>{
                return [
                    `<img class="imageAssetContent"imageid="urn:pearson:alfresco:1234" data-id="urn:pearson:alfresco:1234"/>`,
                ]
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'checkForDataIdAttribute');
        tinyMceFn.checkForDataIdAttribute (data);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });

    it('Test - isNestingLimitReached - if block', () => {
        let asideData = {
            parent:{
                type: 'showhide'
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isNestingLimitReached');
        const indexes = "0"
        tinyMceFn.isNestingLimitReached(indexes,asideData);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isNestingLimitReached - else block', () => {
        let asideData = {
            parent: {
                type: 'showhide'
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isNestingLimitReached');
        const indexes = "1-0-1"
        tinyMceFn.isNestingLimitReached(indexes,asideData);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isNestingLimitReached - else block', () => {
        let asideData = {
            parent: {
                type: 'groupedcontent'
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isNestingLimitReached');
        const indexes = "1-0-1"
        tinyMceFn.isNestingLimitReached(indexes,asideData);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isNestingLimitReached - else block', () => {
        let asideData = {
            parent: {
            }
        }
        let parentElement = {
            type: "element-aside"
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isNestingLimitReached');
        const indexes = "1-0-1"
        tinyMceFn.isNestingLimitReached(indexes,asideData,parentElement);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isNestingLimitReached - else block', () => {
        let asideData = {
            parent: {
                type: "groupedcontent",
                subtype: "tab"
            }
        }
        let parentElement = {
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isNestingLimitReached');
        const indexes = "1-0-1"
        tinyMceFn.isNestingLimitReached(indexes,asideData,parentElement);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    
    it('Test - isNestingLimitReached - else block', () => {
        let asideData = {

        }
        let parentElement = {
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isNestingLimitReached');
        const indexes = "1-0-1"
        tinyMceFn.isNestingLimitReached(indexes,asideData,parentElement);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })
    
    it('Test - checkBlockListElement - data as {}', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        tinyMceFn.checkBlockListElement({}, '');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - checkBlockListElement - if block - TAB keypressed', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        const data = {
            asideData:{
                parent:{
                    type:"showhide"
                },
                type: 'manifestlist'
            },
            slateLevelData: {
                'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                    contents: {
                        bodymatter: [{
                            type: 'manifestlist'
                        }]
                    }
                }
            },
            index: "0-0-1"
        }
        tinyMceFn.checkBlockListElement(data, 'TAB');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - checkBlockListElement - if block - ENTER keypressed', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        const data = {
            asideData:{
                parent:{
                    type:"showhide"
                },
                type: 'manifestlist'
            },
            slateLevelData: {
                'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                    contents: {
                        bodymatter: [{
                            type: 'manifestlist'
                        }]
                    }
                }
            },
            index: "0-0-1"
        }
        tinyMceFn.checkBlockListElement(data, 'ENTER');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - checkBlockListElement - if block - SHIFT+TAB keypressed', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        const data = {
            asideData:{
                parent:{
                    type:"showhide"
                },
                type: 'manifestlist'
            },
            slateLevelData: {
                'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                    contents: {
                        bodymatter: [{
                            type: 'manifestlist'
                        }]
                    }
                }
            },
            index: "0-0-1"
        }
        tinyMceFn.checkBlockListElement(data, 'SHIFT+TAB');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - checkBlockListElement - if block - ENTER keypressed', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        const data = {
            asideData:{
                parent:{
                    type:"groupeddata"
                },
                type: 'manifestlist'
            },
            slateLevelData: {
                'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                    contents: {
                        bodymatter: [{
                            type: 'manifestlist'
                        }]
                    }
                }
            },
            index: "0-0-1"
        }
        tinyMceFn.checkBlockListElement(data, 'ENTER');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - checkBlockListElement - if block - SHIFT+TAB keypressed', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        const data = {
            slateLevelData: {
                'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                    contents: {
                        bodymatter: [{
                            type: 'manifestlist',
                            listdata: {
                                bodymatter: [{}]
                            }
                        }]
                    }
                }
            },
            index: "0-0-1"
        }
        tinyMceFn.checkBlockListElement(data, 'SHIFT+TAB');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - checkBlockListElement - if block - type - not - manifestlist', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        const data = {
            slateLevelData: {
                'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                    contents: {
                        bodymatter: [{
                            type: '',
                            listdata: {
                                bodymatter: [{}]
                            }
                        }]
                    }
                }
            },
            index: "0-0-1"
        }
        tinyMceFn.checkBlockListElement(data, 'SHIFT+TAB');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - checkBlockListElement - if block - contents - bodymatter - empty', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'checkBlockListElement');
        const data = {
            slateLevelData: {
                'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                    contents: {
                        bodymatter: []
                    }
                }
            },
            index: "0-0-1"
        }
        tinyMceFn.checkBlockListElement(data, 'SHIFT+TAB');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - getBLParentContainer - manifestlistitem', () => {
        const bodymatter = {
            type: 'manifestlistitem',
            listitemdata: {
                bodymatter: [{}]
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'getBLParentContainer');
        tinyMceFn.getBLParentContainer(bodymatter, 0, 1, ["1", "0", "1"]);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - getBLParentContainer - not - manifestlistitem', () => {
        const bodymatter = {
            type: '',
            listitemdata: {
                bodymatter: [{}]
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'getBLParentContainer');
        tinyMceFn.getBLParentContainer(bodymatter, 0, 1, ["1", "0", "1"]);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isElementInsideBlocklist - slateLevelData', () => {
        const slateLevelData = {
            'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                contents: {
                    bodymatter: [{
                        type: 'manifestlist'
                    }]
                }
            }
        }
        const activeElement={
            data:{
                asideData:{
                    parent:{
                        type:"showhide"
                    },
                    parentManifestList: {}
                }
            },
        index:'0-0-1'
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isElementInsideBlocklist');
        tinyMceFn.isElementInsideBlocklist(activeElement, slateLevelData);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isElementInsideBlocklist - slateLevelData', () => {
        const slateLevelData = {
            'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                contents: {
                    bodymatter: [{
                        type: 'manifestlist'
                    }]
                }
            }
        }
        const activeElement={
            data:{
                asideData:{
                    parent:{
                        type:"groupedcontent"
                    },
                    parentManifestList: {}
                }
            },
        index:'0-0-1'
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isElementInsideBlocklist');
        tinyMceFn.isElementInsideBlocklist(activeElement, slateLevelData);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isElementInsideBlocklist - slateLevelData - bodymatter - empty', () => {
        const data={
            asideData:{
                parent:{
                    type:"showhide"
                }
            },
        slateLevelData: {
            'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                contents: {
                    bodymatter: [{
                        type:"manifestlist"
                    }]
                }
            }
        },
        index:'0-0-1'
    }
        const spyFunc = jest.spyOn(tinyMceFn, 'isElementInsideBlocklist');
        tinyMceFn.isElementInsideBlocklist(data, 'saltelabeldata');
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isElementInsideBlocklist - slateLevelData - without type', () => {
        const slateLevelData = {
            'urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e': {
                contents: {
                    bodymatter: [{
                        type: ''
                    }]
                }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'isElementInsideBlocklist');
        tinyMceFn.isElementInsideBlocklist({index:'0-0-1'}, slateLevelData);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    it('Test - isElementInsideBlocklist - slateLevelData - empty', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'isElementInsideBlocklist');
        tinyMceFn.isElementInsideBlocklist({index:'0-0-1'}, {});
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    })

    describe('Test - restoreSelectionNode', () => {
        const editor = {
            dom: {
                createRng: () => {
                    return {
                        selectNodeContents: jest.fn()
                    }
                }
            },
            selection: {
                getRng: jest.fn(),
                setRng: jest.fn()
            }
        }

        const mockNode = document.createElement('span');
        mockNode.textContent = 'Mock Node';
        mockNode.setAttribute('id', 'mockId');
        mockNode.classList.add('mockClass');

        it('Test - restoreSelectionAtNode - selection empty', () => {
            const spyFunc = jest.spyOn(tinyMceFn, 'restoreSelectionAtNode');
            const { getRng } = editor.selection;
            getRng.mockReturnValue({
                collapsed: true
            });
            tinyMceFn.restoreSelectionAtNode(editor, mockNode);
            expect(spyFunc).toHaveBeenCalled();
            spyFunc.mockClear();
        })

        it('Test - restoreSelectionAtNode - selection not empty', () => {
            const spyFunc = jest.spyOn(tinyMceFn, 'restoreSelectionAtNode');
            const { getRng } = editor.selection;
            getRng.mockReturnValue({
                collapsed: false
            });
            tinyMceFn.restoreSelectionAtNode(editor, mockNode);
            expect(spyFunc).toHaveBeenCalled();
            spyFunc.mockClear();
        })
    })
})