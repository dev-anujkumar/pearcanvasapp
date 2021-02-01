/**************************Import Plugins & Modules **************************/
import * as tinyMceFn from '../../src/js/TinyMceUtility.js';
import config from '../../src/config/config';
import tinymce from 'tinymce/tinymce';
import axios from 'axios';
/**************************Declare Common Variables**************************/
let mockEditor = {
    selection: {
        setContent: () => { }
    },
    targetElm: { classList: { remove: () => { } } }
},
    permissions = ['alfresco_crud_access', 'add_multimedia_via_alfresco'],
    mockImageArgs = {
        id: "imageId"
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
    targetElm: { classList: { remove: () => { } } },
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
document.querySelector = (selector) => {
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
/**************************Mock Helper Functions**************************/
jest.mock('axios');
jest.mock('../../src/js/utils.js', () => ({
    removeBOM: jest.fn()
})
)
jest.mock('../../src/js/c2_media_module.js', () => {
    return {
        c2MediaModule: {
            productLinkOnsaveCallBack: (data, cb) => {
                cb(data, mockEditor, mockImageArgs);
            },
            AddanAssetCallBack: (data, cb) => {
                cb(data, mockEditor, mockImageArgs);
            },
            onLaunchAddAnAsset: (cb) => {
                cb()
            }
        }
    }
});
describe('Testing TinyMceUtility', () => {
    it('Test - handleC2MediaClick - List Element', () => {
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(permissions, mockEditor, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear()
    });
    it('Test - handleC2MediaClick - List Element-listLiText exists', () => {
        document.querySelector = (selector) => {
            if (selector == '#imageId li') {
                return { innerText: "Testing" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(permissions, mockEditor);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear()
    });
    it('Test - handleC2MediaClick - List Element-alfresco mdetata in detail', () => {
        config.alfrescoMetaData = {
            alfresco: {
                'path': 'test',
                'nodeRef': {},
                'repoName': 'c5 media',
                'name': 'alfrecso name',
                'repoInstance': 'instance1',
                'siteVisibility': 'yes'
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(permissions, mockEditor);
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
    it('Test - handleC2MediaClick - List Element-no alfresco metadata', () => {
        config.alfrescoMetaData = {}
        document.querySelector = (selector) => {
            if (selector == '#imageId li') {
                return { innerText: "Testing" }
            }
        }
        axios.patch = jest.fn(() => Promise.resolve({ data: { name: "test" } }));
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

    jest.mock('../../src/js/c2_media_module.js', () => {
        return {
            c2MediaModule: {
                productLinkOnsaveCallBack: (data, cb) => {
                    cb(data, mockEditor, mockImageArgs);
                },
                AddanAssetCallBack: (data, cb) => {
                    cb(mockImgData, mockEditor, mockImageArgs);
                },
                onLaunchAddAnAsset: (cb) => {
                    cb()
                }
            }
        }
    });
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
    it('Test - handleC2MediaClick - List Element-with img data', () => {
        document.querySelector = (selector) => {
            if (selector == 'img[data-id="${imageArgs.id}"]') {
                return { outerHTML: "Test" }
            } else {
                return { outerHTML: "Data", innerText: "testing" }
            }
        }
        const spyFunc = jest.spyOn(tinyMceFn, 'handleC2MediaClick');
        tinyMceFn.handleC2MediaClick(permissions, mockEditor, mockImageArgs);
        expect(spyFunc).toHaveBeenCalled();
        spyFunc.mockClear();
    });
})