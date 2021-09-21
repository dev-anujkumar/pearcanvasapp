/**************************Import Plugins & Modules **************************/
import * as tinyMceFn from '../../src/js/TinyMceUtility.js';
import config from '../../src/config/config';
import tinymce from 'tinymce/tinymce';
import axios from 'axios';
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
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(permissions, mockEditor, mockImageArgs);
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
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        axios.get = await jest.fn().mockImplementationOnce(() => Promise.reject({}));
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access', 'add_multimedia_via_alfresco'], mockEditor, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
    it('Test - handleC2MediaClick - List Element-with img data',async () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        axios.get = await jest.fn().mockImplementationOnce(() => Promise.resolve({ data: { list: { entries: [] } } }));
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access', 'add_multimedia_via_alfresco'], mockEditor, mockImageArgs);
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
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        axios.get = await jest.fn().mockImplementationOnce(() => Promise.reject({}));
        tinyMceFn.handleC2MediaClick(['alfresco_crud_access', 'add_multimedia_via_alfresco'], mockEditor, mockImageArgs);
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
            epsUrl: "",
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
})