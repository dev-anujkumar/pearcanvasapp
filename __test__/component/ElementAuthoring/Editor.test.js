/**************************Import Plugins**************************/
import React from 'react';
import { JSDOM } from 'jsdom'
import tinymce from 'tinymce/tinymce';
import { mount } from 'enzyme';
/**************************Import Modules**************************/
import config from '../../../src/config/config.js';
import TinyMceEditor from '../../../src/component/tinyMceEditor'
import elementData from './elementData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockAutoNumberReducerEmpty } from '../FigureHeader/AutoNumberApiTestData';
const middlewares = [thunk];

// global.document = (new JSDOM()).window.Element;
// if (!global.Element.prototype.hasOwnProperty("innerText")) {
//     Object.defineProperty(global.Element.prototype, 'innerText', {
//         get() {
//             return this.textContent;
//         },
//     });

// }
/**************************Declare Common Variables**************************/
let permissions = [
    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "split_slate", "full_project_slate_preview",
    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
]
config.figureFieldsPlaceholders = ['Number', 'Label Name', 'Title', 'Caption', 'Credit']
config.elementToolbar = []
config.toolBarList = ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag']
config.revelToolbar = ['formatSelector', 'footnote','glossary','assetpopover','orderedlist','unorderedlist']
config.codeListingToolbarEnabled = ['strikethrough', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag']
config.codeListingToolbarDisabled = ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag']
config.asideToolbar = ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag']
config.labelToolbar = ['footnote', 'decreaseindent', 'glossary', 'assetpopover']
config.captionToolbar = ['decreaseindent', 'glossary', 'assetpopover']
config.poetryLabelToolbar = ['footnote', 'decreaseindent', 'glossary', 'assetpopover', 'orderedlist', 'unorderedlist', 'mathml', 'chemml']
config.poetryCaptionToolbar = ['decreaseindent', 'glossary', 'assetpopover', 'orderedlist', 'unorderedlist']
config.poetryStanzaToolbar = ['increaseindent', 'decreaseindent', 'orderedlist', 'unorderedlist']
config.conversionInProcess = false
config.savingInProgress = false
config.userId = 'c5Test01'

let glossaryFootnoteObject = {
    elementSubType: undefined,
    elementType: undefined,
    elementWorkId: undefined,
    glossaryTermText: 'dummy',
    glossaryfootnoteid: undefined,
    poetryField: undefined,
    popUpStatus: false,
    type: undefined,
    typeWithPopup: undefined,
}
// let domObj = {
//     getParent: () => {
//         return {
//             innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
//             children: [
//                 {
//                     tagName: 'BR'
//                 }
//             ],
//             innerText: "hello",
//             querySelectorAll: jest.fn(),
//             classList: {
//                 remove: jest.fn()
//             }
//         }
//     }
// }
let props = {
    permissions: permissions,
    slateLockInfo: {
        isLocked: false,
        userId: 'c5Test02'
    },
    tagName: "P",
    conversionElement: jest.fn(),
    className: "p",
    index: 1,
    element: elementData.paragraph,
    model: elementData.paragraph.html,
    handleBlur: jest.fn(),
    onListSelect: jest.fn(),
    learningObjectiveOperations: jest.fn(),
    elementId: elementData.paragraph.id,
    openAssetPopoverPopUp: jest.fn(),
    placeholder: "Type Something...",
    handleEditorFocus: jest.fn(),
    openGlossaryFootnotePopUp: jest.fn(),
    error: null,
    glossaryFootnotePopup: jest.fn(),
    glossaryFootnoteValue: glossaryFootnoteObject,
    togglePopup: jest.fn(),
    handleAudioPopupLocation :jest.fn()
}
let selectionEditor = {
    bookmarkManager: {
        moveToBookmark: jest.fn(),
        getBookmark: jest.fn()
    },
    setContent: jest.fn(),
    setCursorLocation: jest.fn(),
    getBoundingClientRect: () => {
        return { left: 0, top: 0 }
    },
    placeCaretAt: (a, b) => {
        return true
    },
    getNode: () => {
        return {
            tagName: 'span',
            className: 'poetryLine',
            closest: () => { },
            childNodes:[{
                tagName: 'span',
                className: 'poetryLine',
            }],
            parentNode:{innerHTML:'testdata'}
        }
    },
    getContent: () => {
        return 'abcde';
    },
    getStart: () => {
        return {
            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
            children: [
                {
                    tagName: 'BR'
                }
            ],
            innerText: "hello",
            querySelectorAll: jest.fn(),
            classList: {
                remove: jest.fn()
            }
        }
    },
    getRng: () => {
        return {
            setStart: () => { },
            setEnd: () => { }
        }
    }
}
let tinyMceEditor = {
    $: jest.fn(),
    bodyElement: {},
    bookmark: {},
    contentAreaContainer: {},
    contentDocument: document,
    contentStyles: [],
    contentWindow: { parent: Window, opener: null, top: Window, length: 0, frames: Window, },
    dom: { doc: document, settings: {}, win: Window, files: {}, stdMode: true, create:()=>{} },
    editorContainer: {},
    editorManager: { fire: jest.fn(), on: jest.fn(), off: jest.fn(), once: jest.fn(), hasEventListeners: jest.fn() },
    fire: jest.fn(),
    hasEventListeners: () => { },
    hasVisual: true,
    id: "cypress-0",
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
    selection: selectionEditor,
    shortcuts: {
        add: () => { }
    },
    startContent: "<p class='paragraphNumeroUno'>bvfdbdb</p>",
    suffix: "",
    targetElm: {},
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

describe('------------------------------Test1 TINY_MCE_EDITOR------------------------------', () => {

    let editor = {
        on: (temp, cb) => {
            cb(event)
        },
        setContent: () => { },
        children: ['<p class="paragraphNumeroUno">hello</p>'],
        classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder'],
        getContentAreaContainer: () => {
            return true;
        },
        ...tinymce.activeEditor
    }
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    },appStore:{
        slateLevelData:{}
    } ,
    toolbarReducer : {
        spellCheckToggle : false
    },
    autoNumberReducer: mockAutoNumberReducerEmpty});
    const component = mount(<Provider store={store}> < TinyMceEditor {...props} /> </Provider>, { attachTo: document.body })
    let instance = component.find('TinyMceEditor').instance();
    let tinymceDiv = document.createElement('div');
    tinymceDiv.id = editor.id;
    let tinymceDiv2 = document.createElement('p');
    tinymceDiv2.id = `cypress-${props.id}`
    tinymceDiv2.innerHTML = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>'
    tinymceDiv.appendChild(tinymceDiv2)
    document.body.appendChild(tinymceDiv)
    xit('Test-2-Tinymce Setup Callback Call --init_instance_callback---', () => {
        // let selectedText = "hello"
        //     window.getSelection = () => {
        //         return selectedText
        //     }
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    nodeName: "IMG",
                    classList:{
                        length: 1,
                        contains : ()=>{ return true; }
                    }

                },
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder'],
                getContentAreaContainer: () => {
                    return true;
                },
                ...tinymce.activeEditor
            }
        component.update();
        const callback = jest.spyOn(component.find('TinyMceEditor').instance().editorConfig, 'init_instance_callback');
        component.find('TinyMceEditor').instance().editorConfig.init_instance_callback(nextEditor);
        expect(callback).toHaveBeenCalled()
    });
})