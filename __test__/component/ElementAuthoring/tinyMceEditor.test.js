/**************************Import Plugins**************************/
import React from 'react';
import { JSDOM } from 'jsdom'
import tinymce from 'tinymce/tinymce';
import { mount } from 'enzyme';
/**************************Import Modules**************************/
import config from '../../../src/config/config.js';
import TinyMceEditor from '../../../src/component/tinyMceEditor'
import elementData from './elementData';
import {showHide} from '../../../fixtures/ElementSHowHideData.js';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];

global.document = (new JSDOM()).window.Element;
if (!global.Element.prototype.hasOwnProperty("innerText")) {
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });

}
/**************************Mock Helper Functions**************************/
jest.mock('../../../src/js/utils', () => {
    return {
        checkforToolbarClick: () => {
            return false
        },
        spanHandlers: {
            handleFormattingTags: jest.fn(),
            handleExtraTags: jest.fn(),
            handleBackSpaceAndDeleteKyeDown: jest.fn(),
            handleBackSpaceAndDeleteKyeUp: jest.fn(),
            handleRemoveFormattingOnSpan: jest.fn().mockImplementationOnce(()=>{
                return true
            }),
            handleSelectAllRemoveFormatting: jest.fn(),
            splitOnTag: jest.fn(),
            setContentOfSpan: jest.fn(),
            setContentOfBlankChild: jest.fn(),
            addAndSplitSpan: jest.fn()
        },
        customEvent: {
            subscribe: jest.fn(),
            trigger: jest.fn(),
            unsubscribe: jest.fn(),
            removeListenr: jest.fn(),
        },
        removeBOM: () => { },
        removeImageCache: jest.fn(),
        removeMathmlImageCache: jest.fn()
    }

})
jest.mock('../../../src/appstore/store.js', () => {
    return {
        dispatch: jest.fn()
    }
})
jest.mock('../../../src/constants/utility.js', () => {
    return {
        sendDataToIframe: jest.fn(),
        hasReviewerRole: () => {
            return true
        },
        guid: jest.fn(),
        removeBlankTags: jest.fn()
    }
})
jest.mock('../../../src/js/glossaryFootnote.js', () => {
    return {
        getGlossaryFootnoteId: () => {
            return;
        }
    }
})
jest.mock('../../../src/js/TinyMceUtility.js', () => {
    return {
        handleC2MediaClick:()=>{}
    }
})
jest.mock('../../../src/component/ListElement/eventBinding', () => {
    return {
        preventRemoveAllFormatting: () => {
            return false
        },
        insertListButton: () => { },
        insertUoListButton: () => { },
        removeTinyDefaultAttribute: () => { },
        bindKeyDownEvent: () => { },
        removeListHighliting : () => {},
        highlightListIcon : () => {}
    }
})
jest.mock("../../../src/component/AssetPopover/openApoFunction.js", () => {
    return { authorAssetPopOver: jest.fn() }
})
jest.mock('../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions', () => {
    return {
        saveGlossaryAndFootnote: () => {
            return;
        },
        setFormattingToolbar: () => { return; }
    }
})
/**************************Declare Common Variables**************************/
let permissions = [
    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview",
    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
]

config.elementToolbar = []
config.toolBarList = ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag']
config.showHideToolbar = ['footnote', 'glossary', 'assetpopover']
config.revelToolbar = ['formatSelector', 'footnote','glossary','assetpopover','orderedlist','unorderedlist']
config.headingToolbar = ['italic', 'clearformatting', 'increaseindent', 'footnote', 'mathml', 'chemml', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag']
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
    glossaryTermText: undefined,
    glossaryfootnoteid: undefined,
    poetryField: undefined,
    popUpStatus: false,
    type: undefined,
    typeWithPopup: undefined,
}
let domObj = {
    getParent: () => {
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
    }
}
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
            }]
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
    const store = mockStore({ });
    const component = mount(<Provider store={store}> < TinyMceEditor {...props} /> </Provider>, { attachTo: document.body })
    let instance = component.find('TinyMceEditor').instance();
    let tinymceDiv = document.createElement('div');
    tinymceDiv.id = editor.id;
    let tinymceDiv2 = document.createElement('p');
    tinymceDiv2.id = `cypress-${props.id}`
    tinymceDiv2.innerHTML = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>'
    tinymceDiv.appendChild(tinymceDiv2)
    document.body.appendChild(tinymceDiv)
    it('Test-1-Renders without crashing --setup--', () => {
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
    })
    it('Test-2-Tinymce Setup Callback Call --init_instance_callback---', () => {
        component.setProps({
            ...props,
            permissions: ["login", "logout"]
        })
        component.update();
        const callback = jest.spyOn(component.find('TinyMceEditor').instance().editorConfig, 'init_instance_callback');
        component.find('TinyMceEditor').instance().editorConfig.init_instance_callback(editor);
        expect(callback).toHaveBeenCalled()
    });
    describe('Test-3-Method--1--innerTextWithMathMl', () => {
        it('Test-3.1-Method--1--innerTextWithMathMl--childNodes.length == 0', () => {
            component.setProps({
                ...props,
                permissions: permissions
            })
            component.update();
            let node = {
                childNodes: [
                    {
                        childNodes: []
                    }
                ]
            }
            let result = component.find('TinyMceEditor').instance().innerTextWithMathMl(node);
            expect(result).toEqual("undefined");
        });
        it('Test-3.2-Method--1--innerTextWithMathMl--childNodes.length != 0', () => {
            component.setProps({
                ...props,
                permissions: permissions
            })
            component.update();
            let node = {
                childNodes: [{
                    childNodes: [{
                        innerHTML: "<div><img className=temp_Wirisformula data-temp-mathml='1234'/></div>",
                        textContent: "124",
                        classList: { contains: () => { return true } },
                        childNodes: []
                    }],
                    classList: { contains: () => { return true } }
                }]
            }
            let mySpyFunction = jest.spyOn(instance, 'innerTextWithMathMl')
            let result = component.find('TinyMceEditor').instance().innerTextWithMathMl(node);
            expect(mySpyFunction).toHaveBeenCalled();
            mySpyFunction.mockClear()
        });
        it('Test-3.3-Method--1--innerTextWithMathMl--childNodes.length != 0', () => {
            component.setProps({
                ...props,
                permissions: permissions
            })
            component.update();
            let containsSelector = (selector) => {
                if (selector == 'temp_Wirisformula') {
                    return true
                }
                return false
            }
            let node = {
                childNodes: [{
                    childNodes: [{
                        innerHTML: "<div><img className=temp_Wirisformula data-temp-mathml='1234'/></div>",
                        textContent: "124",
                        classList: { contains: containsSelector },
                        childNodes: []
                    }],
                    classList: { contains: () => { return true } }
                }]
            }
            let mySpyFunction = jest.spyOn(instance, 'innerTextWithMathMl')
            let result = component.find('TinyMceEditor').instance().innerTextWithMathMl(node);
            expect(mySpyFunction).toHaveBeenCalled();
            mySpyFunction.mockClear()
        });
        it('Test-3.4-Method--1--innerTextWithMathMl--childNodes.length = 0', () => {
            component.setProps({
                ...props,
                permissions: permissions
            })
            component.update();
            let node = {
                childNodes: []
            }
            let mySpyFunction = jest.spyOn(instance, 'innerTextWithMathMl')
            let result = component.find('TinyMceEditor').instance().innerTextWithMathMl(node);
            expect(mySpyFunction).toHaveBeenCalled();
            mySpyFunction.mockClear()
        });
    });

    describe('Test-4 List Click',() => {
        it('Test-4-Method--2--onListButtonClick', () => {
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "element-list", elementdata : {listtype : 'ordered'} },
                currentElement: { type: "element-list", elementdata : {listtype : 'ordered'} }
            }
            let mySpyFunction = jest.spyOn(instance, 'onListButtonClick')
            instance.onListButtonClick('ordered','decimal');
            expect(mySpyFunction).toHaveBeenCalledWith('ordered','decimal');
            expect(typeof instance.props.onListSelect).toBe('function');
            mySpyFunction.mockClear()
        });
        it('Test-4-Method--2.1--onListButtonClick else', () => {
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
            }
            let mySpyFunction = jest.spyOn(instance, 'onListButtonClick')
            instance.onListButtonClick('ordered','decimal');
            expect(mySpyFunction).toHaveBeenCalledWith('ordered','decimal');
            expect(typeof instance.props.onListSelect).toBe('function');
            mySpyFunction.mockClear()
        });
        it('Test-4-Method--3--toggleConfirmationPopup ', () => {
            let mySpyFunction = jest.spyOn(instance, 'toggleConfirmationPopup')
            instance.toggleConfirmationPopup(true,'decimal');
            expect(mySpyFunction).toHaveBeenCalledWith(true,'decimal');
            mySpyFunction.mockClear();
        });

    })
    describe('Test-5-Method--3--editorExecCommand', () => {
        it('Test-5.1-Method--3--editorExecCommand --CASE_1--indent--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                dom : { getParent(){return }}
            }
            let setContent = jest.spyOn(nextEditor, 'setContent');
            instance.editorExecCommand(nextEditor);
            expect(setContent).toHaveBeenCalled()
            setContent.mockClear()
        })
        it('Test-5.2-Method--3--editorExecCommand --CASE_2--outdent--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'outdent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                dom : { getParent(){return }}
            }
            let setContent = jest.spyOn(nextEditor, 'setContent');
            instance.editorExecCommand(nextEditor);
            expect(setContent).toHaveBeenCalled()
            setContent.mockClear()
        })
        it('Test-5.3-Method--3--editorExecCommand --CASE_3--updateFormula--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'updateFormula'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                dom : { getParent(){return }}
            }
            const moveToBookmark = jest.spyOn(nextEditor.selection.bookmarkManager, 'moveToBookmark');
            instance.editorExecCommand(nextEditor);
            expect(moveToBookmark).toHaveBeenCalled()
        })
        it('Test-5.4-Method--3--editorExecCommand --For POETRY Element--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'mceToggleFormat'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                dom : { getParent(){return }}
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            }
            component.update();
            // console.log(instance.props)
            let mySpyFunction = jest.spyOn(instance, 'editorExecCommand');
            instance.editorExecCommand(nextEditor);
            expect(mySpyFunction).toHaveBeenCalled()
            expect(instance.props.element.type).toBe('stanza')
        })
        it('Test-5.5-Method--3--editorExecCommand --For BLOCK_CODE Element--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'mceToggleFormat'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                dom : { getParent(){return }}
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "CODE",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" }
            }
            component.update();
            let mySpyFunction = jest.spyOn(instance, 'editorExecCommand');
            instance.editorExecCommand(nextEditor);
            expect(mySpyFunction).toHaveBeenCalled()
            expect(instance.props.element.type).toBe('figure')
            expect(instance.props.element.figuretype).toBe('codelisting')
        })
        it('Test-5.6-Method--3--editorExecCommand --For Glossary Italicizing',() => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'mceToggleFormat',
                value: 'italic'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                dom : { getParent(){return }}
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "CODE",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" }
            }
            component.update();
            let mySpyFunction = jest.spyOn(instance, 'editorExecCommand');
            instance.editorExecCommand(nextEditor);
            expect(mySpyFunction).toHaveBeenCalled()
            expect(instance.props.element.type).toBe('figure')
            expect(instance.props.element.figuretype).toBe('codelisting')
        })
    });
    describe('Test-6-Method--4--handleIndent', () => {
        it('Test-6.1-Method--4--handleIndent --CASE_1--paragraphNumeroUno--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            let mySpyFunction = jest.spyOn(instance, 'handleIndent');
            instance.handleIndent(event, nextEditor, 'paragraphNumeroUno');
            expect(mySpyFunction).toHaveBeenCalled()
            mySpyFunction.mockClear()
        })
        it('Test-6.2-Method--4--handleIndent --CASE_2--paragraphNumeroUnoIndentLevel1--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            let mySpyFunction = jest.spyOn(instance, 'handleIndent');
            instance.handleIndent(event, nextEditor, 'paragraphNumeroUnoIndentLevel1');
            expect(mySpyFunction).toHaveBeenCalled()
            mySpyFunction.mockClear()
        })
        it('Test-6.3-Method--4--handleIndent --CASE_3--paragraphNumeroUnoIndentLevel2--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            let mySpyFunction = jest.spyOn(instance, 'handleIndent');
            instance.handleIndent(event, nextEditor, 'paragraphNumeroUnoIndentLevel2');
            expect(mySpyFunction).toHaveBeenCalled()
            mySpyFunction.mockClear()
        })
        it('Test-6.4-Method--4--handleIndent --For POETRY Element--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor5 = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            }
            component.update();
            let mySpyFunction = jest.spyOn(instance, 'handleIndent');
            instance.handleIndent(event, nextEditor5, 'paragraphNumeroUno', 'stanza', { className: "para-stanza" });
            expect(mySpyFunction).toHaveBeenCalled()
            expect(instance.props.element.type).toBe('stanza')
            mySpyFunction.mockClear()
        })
    });
    describe('Test-7-Method--5--handleOutdent', () => {
        it('Test-7.1-Method--5--handleOutdent --CASE_1--paragraphNumeroUnoIndentLevel3--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'outdent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            let mySpyFunction = jest.spyOn(instance, 'handleOutdent');
            instance.handleOutdent(event, nextEditor, 'paragraphNumeroUnoIndentLevel3');
            expect(mySpyFunction).toHaveBeenCalled()
            mySpyFunction.mockClear()
        })
        it('Test-7.2-Method--5--handleOutdent --CASE_2--paragraphNumeroUnoIndentLevel2--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            let mySpyFunction = jest.spyOn(instance, 'handleOutdent');
            instance.handleOutdent(event, nextEditor, 'paragraphNumeroUnoIndentLevel2');
            expect(mySpyFunction).toHaveBeenCalled()
            mySpyFunction.mockClear()
        })
        it('Test-7.3-Method--5--handleOutdent --CASE_3--paragraphNumeroUnoIndentLevel1--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            let mySpyFunction = jest.spyOn(instance, 'handleOutdent');
            instance.handleOutdent(event, nextEditor, 'paragraphNumeroUnoIndentLevel1');
            expect(mySpyFunction).toHaveBeenCalled()
            mySpyFunction.mockClear()
        })
        it('Test-7.4-Method--5--handleOutdent --For POETRY Element--', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent'
            }
            let nextEditor5 = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            }
            component.update();
            let mySpyFunction = jest.spyOn(instance, 'handleOutdent');
            instance.handleOutdent(event, nextEditor5, 'paragraphNumeroUnoIndentLevel1', 'stanza', { className: "para-stanza" });
            expect(mySpyFunction).toHaveBeenCalled()
            expect(instance.props.element.type).toBe('stanza')
            mySpyFunction.mockClear()
        })
    });
    describe('Test-8-Method--6--editorBeforeExecCommand', () => {
        it('Test-8.1.1-Method--6--editorBeforeExecCommand --CASE_1--indent--children.length ==0', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent',
                preventDefault: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.1.2-Method--6--editorBeforeExecCommand --CASE_1--indent--children.length !=0', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent',
                preventDefault: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: (elem) => {
                        if (elem == 'ul') {
                            return {
                                length: 1
                            };
                        } else {
                            return {
                                length: 0
                            };
                        }
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.2.1-Method--6--editorBeforeExecCommand --CASE_2--outdent--children.length ==0', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'outdent',
                preventDefault: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.2.2-Method--6--editorBeforeExecCommand --CASE_2--outdent--children.length !=0', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'outdent',
                preventDefault: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: (elem) => {
                        if (elem == 'ul') {
                            return {
                                length: 1
                            };
                        } else {
                            return {
                                length: 0
                            };
                        }
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.3.1-Method--6--editorBeforeExecCommand --CASE_3--RemoveFormat--BLOCKQUOTE Element', () => {
            let selectedText = "hello"
            window.getSelection = () => {
                return selectedText
            }
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        findChildren: () => {
                            return {
                                length: 1
                            };
                        },
                        dispatchEvent: () => { },
                        children: [
                            {
                                classList: { contains: () => { return true } },
                                contains: () => { return true },
                                children: [
                                    { innerHTML: "blockquoteMarginaliaAttr" }
                                ]
                            }
                        ]
                    }
                },
                value: "h5",
                command: 'RemoveFormat',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.3.2-Method--6--editorBeforeExecCommand --CASE_3--RemoveFormat--POETRY Element', () => {
            let selectedText = "Hello"
            window.getSelection = () => {
                return selectedText
            }
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        findChildren: () => {
                            return {
                                length: 1
                            };
                        },
                        dispatchEvent: () => { },
                        children: [
                            {
                                classList: { contains: () => { return true } },
                                contains: () => { return true },
                                children: [
                                    { innerHTML: "blockquoteMarginaliaAttr" }
                                ]
                            }
                        ]
                    }
                },
                value: "h5",
                command: 'RemoveFormat',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.3.3-Method--6--editorBeforeExecCommand --CASE_3--RemoveFormat--BCE Element', () => {
            let selectedText = "Hello"
            window.getSelection = () => {
                return selectedText
            }
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        findChildren: () => {
                            return {
                                length: 1
                            };
                        },
                        dispatchEvent: () => { },
                        children: [
                            {
                                classList: { contains: () => { return true } },
                                contains: () => { return true },
                                children: [
                                    { innerHTML: "blockquoteMarginaliaAttr" }
                                ]
                            }
                        ]
                    }
                },
                value: "h5",
                command: 'RemoveFormat',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "CODE",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" },
                tagName: 'code'
            })
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.3.4-Method--6--editorBeforeExecCommand --CASE_3--RemoveFormat--IF-->BCE Element', () => {
            let selectedText = "hello"
            window.getSelection = () => {
                return selectedText
            }
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        findChildren: () => {
                            return {
                                length: 0
                            };
                        },
                        dispatchEvent: () => { },
                        children: [],
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'RemoveFormat',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "CODE",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" }
            })
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.3.5-Method--6--editorBeforeExecCommand --CASE_3--RemoveFormat--IF-->POETRY Element', () => {
            let selectedText = "hello"
            window.getSelection = () => {
                return selectedText
            }
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        findChildren: () => {
                            return {
                                length: 0
                            };
                        },
                        dispatchEvent: () => { },
                        children: [],
                        nodeName: "SPAN"
                    }
                },
                value: "h5",
                command: 'RemoveFormat',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            })
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.3.5-Method--6--editorBeforeExecCommand --CASE_3--RemoveFormat--IF-->ELSE(For Figure Elements)', () => {
            let selectedText = "hello"
            window.getSelection = () => {
                return selectedText
            }
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        findChildren: () => {
                            return {
                                length: 0
                            };
                        },
                        dispatchEvent: () => { },
                        children: [],
                        nodeName: "SPAN"
                    }
                },
                value: "h5",
                command: 'RemoveFormat',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "CODE",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" }
            })
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.4-Method--6--editorBeforeExecCommand --CASE_4--mceShowCharmap', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'mceShowCharmap',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.5-Method--6--editorBeforeExecCommand --CASE_5--mceInsertContent', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'mceInsertContent',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.6-Method--6--editorBeforeExecCommand --CASE_6--FormatBlock-IF', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                value: "h5",
                command: 'FormatBlock',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.6-Method--6--editorBeforeExecCommand --CASE_6--FormatBlock-ELSE', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                value: "h1",
                command: 'FormatBlock',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.7-Method--6--editorBeforeExecCommand --CASE_7--redo-IF', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                value: "h5",
                command: 'redo',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { return false }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "LIST",
                elementId: "work:urn",
                element: { type: "element-list" }
            }
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.7-Method--6--editorBeforeExecCommand --CASE_7--redo-ELSE', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                value: "h5",
                command: 'redo',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: domObj,
                setContent: () => { },
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "STANZA",
                elementId: "work:urn",
                element: { type: "stanza" , subtype:"image"}
            }
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.7-Method--6--editorBeforeExecCommand --CASE_7--Undo', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                value: "h5",
                command: 'Undo',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            nodeName: "CODE"
                        }
                    }
                },
                setContent: () => { },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "LIST",
                elementId: "work:urn",
                element: { type: "element-list" }
            })
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.7-Method--6--editorBeforeExecCommand --CASE_7--Redo', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                value: "h5",
                command: 'Redo',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            nodeName: "SUP"
                        }
                    }
                },
                setContent: () => { },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "LIST",
                elementId: "work:urn",
                element: { type: "element-list" }
            })
            component.update();
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.8-Method--6--editorBeforeExecCommand --CASE_8--Bold', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Bold',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "CODE",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-8.8-Method--6--editorBeforeExecCommand --CASE_8--Strikethrough', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Strikethrough',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "CODE",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        xit('Test-8.9-Method--6--editorBeforeExecCommand --CASE_8--Underline', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Bold',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "CODE",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            document.querySelector = () => {
                return {
                    checked: true
                };
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })

        it('Test-8.10-Method--7--editorBeforeExecCommand --CASE_9--MceToggleFormat',()=>{
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "SUP"
                    }
                },
                value: "superscript",
                command: 'mceToggleFormat',
                preventDefault: () => { },
                stopPropagation: () => { }
            } 

            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: {
                    getNode : ()=>{ return {tagName: 'sup', getElementsByTagName : ()=>{return []} , parentNode : {tagName : 'SUP'} } },
                    getStart : ()=>{}
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder"><sup><a>*</a></sup>hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'A'
                                }
                            ],
                            nodeName: "SUP",
                            innerText: "hello",
                            tagName: 'sup',
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }

            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
    });
    it('Test-9-Method--7--onBeforeIndent--POETRY Element--IF_1-&-IF_3', () => {
        let event = {
            preventDefault: jest.fn()
        }
        let selectedNode = { className: "poetryLine poetryLineLevel3" }
        const spyFunction = jest.spyOn(instance, 'onBeforeIndent');
        instance.onBeforeIndent(event, "paragraphNumeroUnoIndentLevel3", 'stanza', selectedNode);
        expect(spyFunction).toHaveBeenCalled()
    });
    it('Test-10-Method--8--onBeforeOutdent--POETRY Element--IF_1-&-IF_3', () => {
        let event = {
            preventDefault: jest.fn()
        }
        let selectedNode = { className: "poetryLine" }
        const spyFunction = jest.spyOn(instance, 'onBeforeOutdent');
        instance.onBeforeOutdent(event, "paragraphNumeroUno", 'stanza', selectedNode);
        expect(spyFunction).toHaveBeenCalled()
    });
    it('Test-11-Method--9--toggleGlossaryandFootnoteIcon--Flag:True', () => {
        instance.glossaryBtnInstance = {
            setDisabled: () => { }
        }
        instance.footnoteBtnInstance = {
            setDisabled: () => { }
        }
        const setDisabled = jest.spyOn(instance.glossaryBtnInstance, 'setDisabled');
        instance.toggleGlossaryandFootnoteIcon(true);
        expect(setDisabled).toHaveBeenCalled()
    });
    describe('Test-12-Method--10--isTabPressed', () => {
        it('Test-12.1-Method--10--isTabPressed--LIST Element--IF-->keyCode :9', () => {
            let keyDownEvent = {
                which: 9,
                ctrlKey: true,
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            })
            component.update()
            const spyFunction = jest.spyOn(instance, 'isTabPressed');
            instance.isTabPressed(keyDownEvent);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-12.2-Method--10--isTabPressed--LIST Element--ELSE-->keyCode :88', () => {
            let keyDownEvent = {
                which: 88,
                ctrlKey: true,
            }
            const spyFunction = jest.spyOn(instance, 'isTabPressed');
            instance.isTabPressed(keyDownEvent);
            expect(spyFunction).toHaveBeenCalled()
        });

    });
    it('Test-13-Method--11--normalKeyDownHandler--FIGURE Element', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                id: ""
            }
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: editor.selection,
            setContent: () => { },
        }
        component.setProps({
            ...props,
            permissions: ["login", "logout"],
            tagName: "SPAN",
            elementId: "work:urn",
            element: { type: "figure", subtype: "image" }
        })
        component.update();
        const spynormalKeyDownHandler = jest.spyOn(instance, 'normalKeyDownHandler')
        instance.normalKeyDownHandler(event);
        expect(spynormalKeyDownHandler).toHaveBeenCalledWith(event);
        spynormalKeyDownHandler.mockClear()
    })
    describe('Test-14-Method--12--toggleGlossaryandFootnotePopup', () => {
        it('Test-14.1-Method--12--toggleGlossaryandFootnotePopup --savingInProgress == true', () => {
            config.savingInProgress = true;
            let status = true,
                popupType = "Footnote",
                glossaryfootnoteid = "urn:pearson:work:a9735d80-fe6c-43ce-8265-5cc27893db00";
            let callback = jest.fn();
            const spytoggleGlossaryandFootnotePopup = jest.spyOn(instance, 'toggleGlossaryandFootnotePopup')
            instance.toggleGlossaryandFootnotePopup(status, popupType, glossaryfootnoteid, callback);
            expect(spytoggleGlossaryandFootnotePopup).toHaveBeenCalled();
            spytoggleGlossaryandFootnotePopup.mockClear()
        })
        it('Test-14.2-Method--12--toggleGlossaryandFootnotePopup --savingInProgress == false', () => {
            config.savingInProgress = false;
            let status = true,
                popupType = "Footnote",
                glossaryfootnoteid = "urn:pearson:work:a9735d80-fe6c-43ce-8265-5cc27893db00";
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "poetry" },
                currentElement: { type: "stanza" }
            })
            component.update();
            let callback = jest.fn();
            const spytoggleGlossaryandFootnotePopup = jest.spyOn(instance, 'toggleGlossaryandFootnotePopup')
            instance.toggleGlossaryandFootnotePopup(status, popupType, glossaryfootnoteid, callback);
            expect(spytoggleGlossaryandFootnotePopup).toHaveBeenCalled();
            spytoggleGlossaryandFootnotePopup.mockClear()
        })
    });
    describe('Test-15-Method--13--setInstanceToolbar', () => {
        it('Test-15.1-Method--13--setInstanceToolbar  --LABEL Toolbar', () => {
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "h4",
                elementId: "work:urn",
                element: { type: "figure", subtype: "mathml" },
                placeholder: "Type something..."
            })
            component.update();
            const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
            instance.setInstanceToolbar();
            expect(spysetInstanceToolbar).toHaveBeenCalled();
            spysetInstanceToolbar.mockClear()
        })
        it('Test-15.2-Method--13--setInstanceToolbar  --CAPTION Toolbar', () => {
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "figureCredit",
                elementId: "work:urn",
                element: { type: "figure", subtype: "tableImage" },
                placeholder: "Enter Caption..."
            })
            component.update();
            const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
            instance.setInstanceToolbar();
            expect(spysetInstanceToolbar).toHaveBeenCalled();
            spysetInstanceToolbar.mockClear()
        })
        it('Test-15.3-Method--13--setInstanceToolbar  --SHOW Toolbar', () => {
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "p",
                elementId: "work:urn",
                element: { type: "showhide" },
                placeholder: "Enter Show text"
            })
            component.update();
            const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
            instance.setInstanceToolbar();
            expect(spysetInstanceToolbar).toHaveBeenCalled();
            spysetInstanceToolbar.mockClear()
        })
        it('Test-15.4-Method--13--setInstanceToolbar  --BCE Toolbar', () => {
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "code",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" },
                placeholder: "Enter block code..."
            })
            component.update();
            const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
            instance.setInstanceToolbar();
            expect(spysetInstanceToolbar).toHaveBeenCalled();
            spysetInstanceToolbar.mockClear()
        })
        it('Test-15.4-Method--13--setInstanceToolbar  --STANZA Toolbar', () => {
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "p",
                elementId: "work:urn",
                element: { type: "stanza" },
                placeholder: "Type Something..."
            })
            component.update();
            const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
            instance.setInstanceToolbar();
            expect(spysetInstanceToolbar).toHaveBeenCalled();
            spysetInstanceToolbar.mockClear()
        })
        it('Test-15.4-Method--13--setInstanceToolbar  --BCE Toolbar -Syntax Checked', () => {
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "code",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" },
                placeholder: "Enter block code..."
            })
            component.update();
            document.querySelector = () => {
                return {
                    checked: true
                };
            }
            const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
            instance.setInstanceToolbar();
            expect(spysetInstanceToolbar).toHaveBeenCalled();
            spysetInstanceToolbar.mockClear()
        })
    });
    it('Test-16-Method--14--setToolbarByElementType', () => {
        component.setProps({
            ...props,
            permissions: ["login", "logout"],
            tagName: "P",
            elementId: "work:urn",
            element: { type: "figure", subtype: "tableImage" },
            placeholder: "Enter Caption..."
        })
        component.update();
        const spysetInstanceToolbar = jest.spyOn(instance, 'setToolbarByElementType')
        instance.setToolbarByElementType();
        expect(spysetInstanceToolbar).toHaveBeenCalled();
        spysetInstanceToolbar.mockClear()
    })
    it('Test-17-Method--15--learningObjectiveDropdown', () => {
        const spylearningObjectiveDropdown = jest.spyOn(instance, 'learningObjectiveDropdown')
        instance.learningObjectiveDropdown("add");
        expect(spylearningObjectiveDropdown).toHaveBeenCalled();
        spylearningObjectiveDropdown.mockClear()
    });
    describe('Test-18-Method--16--addAssetPopover', () => {
        it('Test-18.1-Method--16--addAssetPopover-Non Poetry Elements', () => {
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return "hello TEST"
                    },
                    anchorNode: {
                        nodeName: "SPAN",
                        parentNode: {
                            nodeName: "SPAN",
                            innerHTML: "<span>Hello1</span>",
                            outerHTML: "<p><span>Hello</span></p>",
                            classList: { contains: () => { return false } },
                            getElementsByTagName: () => {
                                return [{
                                    parentNode: {
                                        nodeName: 'LI',
                                        childNodes: []
                                    },
                                    childNodes: [{
                                        nodeName: 'strong',
                                        innerHTML: 'test',
                                        outerHTML: ''
                                    }]
                                }]
                            },
                            parentNode: {
                                nodeName: "LI",
                                innerHTML: "<span>Hello1</span>",
                                outerHTML: "<p><span>Hello</span></p>",
                                classList: { contains: () => { return false } },
                                getElementsByTagName: () => {
                                    return [{
                                        parentNode: {
                                            nodeName: 'LI',
                                            childNodes: []
                                        },
                                        childNodes: [{
                                            nodeName: 'strong',
                                            innerHTML: 'test',
                                            outerHTML: ''
                                        }]
                                    }]
                                },
                                parentNode: {}
                            }
                        }
                    }
                }
            }
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                }
            }
            let selectedText = "Hello"
            const spyaddAssetPopover = jest.spyOn(instance, 'addAssetPopover')
            instance.addAssetPopover(nextEditor, selectedText);
            expect(spyaddAssetPopover).toHaveBeenCalled();
            spyaddAssetPopover.mockClear()
        });
        it('Test-18.2-Method--16--addAssetPopover-POETRY Element', () => {
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return "hello TEST"
                    },
                    anchorNode: {
                        parentNode: {
                            nodeName: "SPAN",
                            innerHTML: "<span>Hello</span>",
                            outerHTML: "<p><span>Hello</span></p>",
                            classList: { contains: () => { return true } },
                            getElementsByTagName: () => {
                                return [{
                                    parentNode: {
                                        nodeName: 'strong',
                                        childNodes: []
                                    },
                                    childNodes : [ {
                                        nodeName: 'strong',
                                        innerHTML: 'test asset',
                                        outerHTML: ''
                                    }]
                                }]
                            }
                        }
                    }
                }
            }
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor1 = {
                on: (temp, cb) => { cb(event) },
                insertContent: () => { },
                selection: {
                    getContent: () => {
                        return '<p><span className="poetryLine">Hello</span></p>';
                    },
                    setContent: () => { }
                }
            }
            let selectedText = "Hello"
            const spyaddAssetPopover = jest.spyOn(instance, 'addAssetPopover')
            instance.addAssetPopover(nextEditor1, selectedText);
            expect(spyaddAssetPopover).toHaveBeenCalled();
            spyaddAssetPopover.mockClear()
        });
    });
    describe('Test-19-Method--17--addFootnote', () => {
        it('Test-19.1-Method--17--addFootnote--POPUP Element-FormattedTitle', () => {
            let addFootnoteEvent = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(addFootnoteEvent) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "h4",
                elementId: "work:urn",
                element: { type: "popup" },
                popupField: "formatted-title",
                currentElement: undefined,
                model: { replace: () => { } }
            })
            component.update();
            const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
            instance.addFootnote(nextEditor);
            expect(spyaddFootnote).toHaveBeenCalled();
            spyaddFootnote.mockClear()
        });
        it('Test-19.2-Method--17--addFootnote--POPUP Element-CurrentElement', () => {
            let addFootnoteEvent = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(addFootnoteEvent) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "popup" },
                popupField: "formatted-title",
                currentElement: {}
            })
            component.update();
            const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
            instance.addFootnote(nextEditor);
            expect(spyaddFootnote).toHaveBeenCalled();
            spyaddFootnote.mockClear()
        });
        it('Test-19.3-Method--17--addFootnote--POETRY Element-Switch Case 1', () => {
            let addFootnoteEvent = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(addFootnoteEvent) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "poetry", contents: { "formatted-subtitle": "Formatted title in Poetry" } },
                currentElement: {},
                index: "0-1"
            })
            component.update();
            const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
            instance.addFootnote(nextEditor);
            expect(spyaddFootnote).toHaveBeenCalled();
            spyaddFootnote.mockClear()
        });
        it('Test-19.4-Method--17--addFootnote--POETRY Element-Switch Case 2', () => {
            let addFootnoteEvent = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(addFootnoteEvent) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "poetry", contents: { "notcreditsarray": ["Credit 1", "Credit 2"] } },
                popupField: "formatted-title",
                currentElement: {},
                index: "0-4"
            })
            component.update();
            const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
            instance.addFootnote(nextEditor);
            expect(spyaddFootnote).toHaveBeenCalled();
            spyaddFootnote.mockClear()
        });
        it('Test-19.4-Method--17--addFootnote--POETRY Element-Else Case', () => {
            let addFootnoteEvent = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(addFootnoteEvent) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "poetry", contents: { "formatted-title": "Formatted title in Poetry" } },
                popupField: "formatted-title",
                currentElement: {},
                index: "0-1"
            })
            component.update();
            const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
            instance.addFootnote(nextEditor);
            expect(spyaddFootnote).toHaveBeenCalled();
            spyaddFootnote.mockClear()
        });
        it('Test-19.5-Method--17--addFootnote--Other Elements', () => {
            let addFootnoteEvent = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(addFootnoteEvent) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "figure", contents: { "creditsarray": ["Credit 1", "Credit 2"] } },
                popupField: "formatted-title",
                currentElement: {},
                index: "0-1"
            })
            component.update();
            const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
            instance.addFootnote(nextEditor);
            expect(spyaddFootnote).toHaveBeenCalled();
            spyaddFootnote.mockClear()
        });

    });
    describe('Test-20-Method--18--addGlossary', () => {
        it('Test-20.1-Method--18--addGlossary-Non Poetry Elements', () => {
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return "Hello"
                    },
                    anchorNode: {
                        parentNode: {
                            nodeName: "SPAN",
                            innerHTML: "<span>Hello</span>",
                            outerHTML: "<p><span>Hello</span></p>",
                            classList: { contains: () => { return false } }
                        }
                    }
                }
            }
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                },
                dom: {
                    getParent: () => {}
                }
            }
            const spyaddGlossary = jest.spyOn(instance, 'addGlossary')
            instance.addGlossary(nextEditor);
            expect(spyaddGlossary).toHaveBeenCalled();
            spyaddGlossary.mockClear()
        });
        it('Test-20.2-Method--18--addGlossary-POETRY Element', () => {
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return "Hello"
                    },
                    anchorNode: {
                        parentNode: {
                            nodeName: "SPAN",
                            innerHTML: "<span>Hello</span>",
                            outerHTML: "<p><span>Hello</span></p>",
                            classList: { contains: () => { return true } }
                        }
                    }
                }
            }
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor1 = {
                on: (temp, cb) => { cb(event) },
                selection: {
                    getContent: () => {
                        return '<p><span className="poetryLine">Hello</span></p>';
                    },
                    setContent: () => { },
                    getStart: () => { }
                },
                dom: {
                    getParent: () => {}
                }
            }
            const spyaddGlossary = jest.spyOn(instance, 'addGlossary')
            instance.addGlossary(nextEditor1);
            expect(spyaddGlossary).toHaveBeenCalled();
            spyaddGlossary.mockClear()
        });
    });
    it('Test-21-Method--19--saveContent', () => {
        let addFootnoteEvent = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                id: ""
            }
        }
        let nextEditor = {
            on: (temp, cb) => { cb(addFootnoteEvent) },
            selection: editor.selection,
            setContent: () => { },
            insertContent: () => {
                return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
            },
        }
        instance.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "SPAN",
            elementId: "work:urn",
            element: { type: "poetry" },
            popupField: "formatted-title",
            currentElement: undefined,
            poetryField: {},
            glossaryFootnoteValue: {
                elementType: "poetry",
                glossaryfootnoteid: "footnote:id",
                type: "Footnote",
                elementSubType: "stanza",
                glossaryTermText: { replace: () => { } }
            },
            createPoetryElements: () => { }
        }
        component.update();
        const spysaveContent = jest.spyOn(instance, 'saveContent')
        instance.saveContent();
        expect(spysaveContent).toHaveBeenCalled();
        spysaveContent.mockClear()
    });
    it('Test-22-Method--20--checkElementIds', () => {
        let editor1 = { ...TinyMceEditor }, editor2 = {};
        tinymce.editors = [editor1, editor2];
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                id: ""
            }
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: editor.selection,
            setContent: () => { },
            insertContent: () => {
                return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
            },
        }
        component.setProps({
            ...props,
            permissions: ["login", "logout"],
            tagName: "SPAN",
            elementId: "work:urn",
            element: { type: "poetry" },
            popupField: "formatted-title",
            currentElement: undefined,
            poetryField: {},
            glossaryFootnoteValue: {
                elementType: "poetry",
                glossaryfootnoteid: "footnote:id",
                type: "Footnote",
                elementSubType: "stanza",
                glossaryTermText: "this is footnote in poetry"
            }
        })
        component.update();
        instance.editorRef = { current: { id: "active:editor:id" } }
        window.localStorage = {
            getItem: () => { return { "mockElement": "sample" }; }
        }
        const spycheckElementIds = jest.spyOn(instance, 'checkElementIds')
        instance.checkElementIds();
        expect(spycheckElementIds).toHaveBeenCalled();
        spycheckElementIds.mockClear()
    });
    describe('Test-23-Method--21--handlePlaceholder', () => {
        it('Test-23.1-Method--21--handlePlaceholder-MATHML EDITOR Element', () => {
            let htmlData = '<p class=\"paragraphNumeroUno\"></p>';
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    "html": { "text": htmlData },
                    "figuredata": { text: "MML" }
                },
                model: { "figuredata": { text: "MML" } },
                placeholder: "",
            })
            component.update();
            const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
            instance.handlePlaceholder();
            expect(spyhandlePlaceholder).toHaveBeenCalled();
            spyhandlePlaceholder.mockClear()
        });
        it('Test-23.2-Method--21--handlePlaceholder-isContainsMath:True', () => {
            let mathMLData = '<p class=\"paragraphNumeroUno\"></p>';
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "p",
                elementId: "work:urn",
                element: {
                    "type": "element-authoredtext",
                    "html": { "text": mathMLData },
                },
                model: { "text": mathMLData },
                placeholder: "",
            })
            component.update();
            const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
            instance.handlePlaceholder();
            expect(spyhandlePlaceholder).toHaveBeenCalled();
            spyhandlePlaceholder.mockClear()
        });
        it('Test-23.3-Method--21--handlePlaceholder-isContainsMath:False', () => {
            let mathMLData = '<p class=\"paragraphNumeroUno\"><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>';
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "element-authoredtext",
                    "html": { "text": mathMLData },
                },
                model: { "text": mathMLData },
                placeholder: "",
            })
            component.update();
            const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
            instance.handlePlaceholder();
            expect(spyhandlePlaceholder).toHaveBeenCalled();
            spyhandlePlaceholder.mockClear()
        });
        it('Test-23.4-Method--21--handlePlaceholder-BCE', () => {
            let htmlData = '<p class=\"paragraphNumeroUno\"></p>';
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    "html": { "text": htmlData },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
            instance.handlePlaceholder();
            expect(spyhandlePlaceholder).toHaveBeenCalled();
            spyhandlePlaceholder.mockClear()
        });
        xit('Test-23.5-Method--21--handlePlaceholder-Other Elements', () => {
            let mathMLData = '<p class=\"paragraphNumeroUno\"><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>';
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "poetry", html: { text: mathMLData } },
                model: mathMLData
            })
            component.update();
            const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
            instance.handlePlaceholder();
            expect(spyhandlePlaceholder).toHaveBeenCalled();
            spyhandlePlaceholder.mockClear()
        });
    });
    describe('Test-24-Method--22--pastePreProcess', () => {
        it('Test-24.1-Method--22--pastePreProcess-LIST Element', () => {
            let plugin = {},
                args = {
                    content: "<ul>hello</ul>"
                }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "element-list",
                    "html": { "text": "" },
                },
                model: { "text": 'LIST' },
                placeholder: "",
            })
            component.update();
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = domObj;
            const spypastePreProcess = jest.spyOn(instance, 'pastePreProcess')
            instance.pastePreProcess(plugin, args);
            expect(spypastePreProcess).toHaveBeenCalled()
        });
        it('Test-24.2-Method--22--pastePreProcess-BCE Element-notFormatting:true', () => {
            let plugin = {},
                args = {
                    content: "<ul>hello</ul>"
                }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            instance.notFormatting = true;
            instance.copyContent = "PasteData"
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = {
                getParent: () => {
                    return {
                        innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                        children: [
                            {
                                tagName: 'CODE'
                            }
                        ],
                        innerText: "hello",
                        querySelectorAll: jest.fn(),
                        classList: {
                            remove: jest.fn()
                        },
                        nodeName :'CODE'
                    }
                }
            };
            const spypastePreProcess = jest.spyOn(instance, 'pastePreProcess')
            instance.pastePreProcess(plugin, args);
            expect(spypastePreProcess).toHaveBeenCalled()
        });
        it('Test-24.3-Method--22--pastePreProcess-BCE Element-notFormatting:false', () => {
            let plugin = {},
                args = {
                    content: "<ul>hello</ul>"
                }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = domObj;
            instance.notFormatting = false;
            instance.copyContent = "PasteData"
            const spypastePreProcess = jest.spyOn(instance, 'pastePreProcess')
            instance.pastePreProcess(plugin, args);
            expect(spypastePreProcess).toHaveBeenCalled()
        });
    });
    it('Test-25-Method--23--pastePostProcess-BCE Element-notFormatting:true', () => {
        let plugin = {},
            args = {
                node: { innerHTML: "<code>hello</code>", innerText: "hello", textContent: "hello", appendChild: jest.fn() }
            }
        component.setProps({
            ...props,
            permissions: ["login", "logout"],
            tagName: "SPAN",
            elementId: "work:urn",
            element: {
                "type": "figure",
                'figuretype': "codelisting",
                "html": { "text": "" },
                "figuredata": { preformattedtext: "BCE" }
            },
            model: { "figuredata": { preformattedtext: "BCE" } },
            placeholder: "",
        })
        component.update();
        instance.notFormatting = true;
        instance.copyContent = "PasteData"
        tinymce.activeEditor.selection = editor.selection;
        tinymce.activeEditor.dom = {
            getParent: () => {
                return {
                    innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                    children: [
                        {
                            tagName: 'CODE'
                        }
                    ],
                    innerText: "hello",
                    querySelectorAll: jest.fn(),
                    classList: {
                        remove: jest.fn()
                    },
                    nodeName :'CODE'
                }
            }
        };
        const spypastePostProcess = jest.spyOn(instance, 'pastePostProcess')
        instance.pastePostProcess(plugin, args);
        expect(spypastePostProcess).toHaveBeenCalled()
    });
    describe('Test-26-Method--24--editorPaste', () => {
        it('Test-26.1-Method--24--editorPaste-BCE Element-SyntaxEnabled:True', () => {
            let pasteString = "<p> </p>"
            document.querySelector = () => {
                return { checked: true }
            }
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                },
                type: "paste",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder">hello<ol></code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                }
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            instance.notFormatting = true;
            instance.copyContent = "PasteData"
            const spyeditorPaste = jest.spyOn(instance, 'editorPaste')
            instance.editorPaste(nextEditor);
            expect(spyeditorPaste).toHaveBeenCalled()
        });
        it('Test-26.2-Method--24--editorPaste-BCE Element-SyntaxEnabled:False', () => {
            let pasteString = "<p> </p>"
            document.querySelector = () => {
                return { checked: false }
            }
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: ""
                },
                type: "paste",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder">hello<ol></code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                }
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            instance.notFormatting = true;
            instance.copyContent = "PasteData"
            const spyeditorPaste = jest.spyOn(instance, 'editorPaste')
            instance.editorPaste(nextEditor);
            expect(spyeditorPaste).toHaveBeenCalled()
        });
    });
    describe('Test-27-Method--25--editorClick', () => {
        it('Test-27.1-Method--25--editorClick-IF_CASE', () => {
            let selectedText = "";
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    classList : {
                        contains : ()=>{ return true; }
                    }
                },
                type: "click",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: {
                    getContent: () => { return selectedText }, ...editor.selection
                },
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
                targetElm: {
                    classList: {
                        contains: () => {
                            return false;
                        }
                    }
                },
                dom: domObj
            }
            instance.assetPopoverButtonState = {
                setDisabled: () => { }
            }
            const spyeditorPaste = jest.spyOn(instance, 'editorClick')
            const setDisabled = jest.spyOn(instance.assetPopoverButtonState, 'setDisabled');
            instance.editorClick(nextEditor);
            expect(spyeditorPaste).toHaveBeenCalled()
            expect(setDisabled).toHaveBeenCalled();
        });
        it('Test-27.2-Method--25--editorClick-ELSE_CASE', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    classList : {
                        contains : ()=>{ return true; }
                    }
                },
                type: "click",
                clipboardData: {
                    getData: () => { return; }
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: {
                    getContent: () => { return ""; }
                },
                setContent: () => { },
                insertContent: () => {
                    return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
                },
                targetElm: {
                    classList: {
                        contains: () => {
                            return true;
                        }
                    }
                },
                dom: domObj
            }
            instance.assetPopoverButtonState = {
                setDisabled: () => { }
            }
            const spyeditorPaste = jest.spyOn(instance, 'editorClick')
            const setDisabled = jest.spyOn(instance.assetPopoverButtonState, 'setDisabled');
            instance.editorClick(nextEditor);
            expect(spyeditorPaste).toHaveBeenCalled()
            expect(setDisabled).toHaveBeenCalled();
        });
        it('Test-27.2-Method--25--editorClick--Inline image in List double click', () => {
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "element-list", elementdata : {listtype : 'ordered'} },
                currentElement: { type: "element-list", elementdata : {listtype : 'ordered'} }
            }
            let imgData = `<img src=https://cite-media-stg.pearson.com/legacy_paths/28154019-35d4-4b5b-9da6-fdc6335e1595/1addNew.png data-id="imageAssetContent:28154019-35d4-4b5b-9da6-fdc6335e1595" class="imageAssetContent" width="112" height="150" imageid="urn:pearson:alfresco:28154019-35d4-4b5b-9da6-fdc6335e1595" alt="Alfresco script Scale image update for UDB release" longdescription="Alfresco scale image long desc for UDb chanages."/>`;
            let event = {
                detail :2,
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    nodeName: 'IMG',
                    classList : {
                        contains : ()=>{ return true; }
                    },
                    dataset:{
                        id:'imageAssetContent:28154019-35d4-4b5b-9da6-fdc6335e1595'
                    }
                },
                type: "click",
                clipboardData: {
                    getData: () => { return; }
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: {
                    getContent: () => { return ""; }
                },
                setContent: () => { },
                insertContent: () => {
                    return imgData
                },
                targetElm: {
                    classList: {
                        contains: () => {
                            return true;
                        }
                    }
                },
                dom: domObj
            }
            instance.assetPopoverButtonState = {
                setDisabled: () => { }
            }
            const spyeditorPaste = jest.spyOn(instance, 'editorClick')
            const setDisabled = jest.spyOn(instance.assetPopoverButtonState, 'setDisabled');
            instance.editorClick(nextEditor);
            expect(spyeditorPaste).toHaveBeenCalled()
            expect(setDisabled).toHaveBeenCalled();
        });
    });
    describe('Test-28-Method--26--editorKeyup', () => {
        it('Test-28.1-Method--26--editorKeyup-Other Elements', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: {...editor.selection, getNode : ()=>{ return {...editor.selection.getNode(), className : 'WirisFormula'}}},
                dom: domObj,
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled()
        });
        it('Test-28.2.1-Method--26--editorKeyup-BCE Element-Blank', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup'
            }
            let nextEditor1 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: {
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
                    }, ...tinymce.activeEditor.selection
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder"></code>',
                            innerText: "",
                            textContent: "",
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            querySelectorAll: () => {
                                return {
                                    length: 0
                                }
                            },
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                                add: jest.fn()
                            },
                            nodeName: "CODE"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor1);
            expect(spyeditorKeyup).toHaveBeenCalled()
        });
        it('Test-28.2.2-Method--26--editorKeyup-BCE Element-KeyCode=13', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 13
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder">SampleCode</code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled()
        });
        it('Test-28.2.3-Method--26--editorKeyup-BCE Element-KeyCode=46', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 46
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder"></code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled()
        });
        it('Test-28.2.4-Method--26--editorKeyup-BCE Element-CtrlKey', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 66,
                ctrlKey: true
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder"></code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled()
        });
        it('Test-28.3.1-Method--26--editorKeyup-POETRY Element-KeyCode=13', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 13
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<span class="bce place-holder">SampleCode</span>',
                            children: [
                                {
                                    tagName: 'DIV'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "DIV"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "stanza"
                },
                model: {},
                placeholder: "",
            })
            component.update();
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled()
        });
        it('Test-28.3.2-Method--26--editorKeyup-POETRY Element-KeyCode=46', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 46
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<span class="bce place-holder">SampleCode</span>',
                            children: [
                                {
                                    tagName: 'DIV'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "DIV"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "stanza"
                },
                model: {},
                placeholder: "",
            })
            component.update();
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled()
        });
        it('Test-28.3.3-Method--26--editorKeyup-BlankLine Element-KeyCode=37',()=>{
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 37
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: { getNode : ()=>{ return {closest : ()=>{},tagName : 'span',className:{toLowerCase:() =>{}} }}, getStart : jest.fn(), setCursorLocation: jest.fn() },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<span class="bce place-holder">SampleCode</span>',
                            children: [
                                {
                                    tagName: 'DIV'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "DIV"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "stanza"
                },
                model: {},
                placeholder: "",
            })
            component.update();
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled();
        });
        it('Test-28.3.4-Method--26--editorKeyup-BlankLine Element-KeyCode=39',()=>{
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 39
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: { getNode : ()=>{ return {closest : ()=>{},tagName : 'span',className:{toLowerCase:() =>{}} }}, getStart : jest.fn(), setCursorLocation: jest.fn() },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<span class="bce place-holder">SampleCode</span>',
                            children: [
                                {
                                    tagName: 'DIV'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "DIV"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "stanza"
                },
                model: {},
                placeholder: "",
            })
            component.update();
            const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
            instance.editorKeyup(nextEditor);
            expect(spyeditorKeyup).toHaveBeenCalled();
        });
    });
    describe('Test-29-Method--27--editorKeydown', () => {
        it('Test-29.1-Method--27--editorKeydown-Other Elements-keyCode:9', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                ctrlKey: true,
                which: 88,
                keyCode: 9,
                type: 'keydown'
            }
            let nextEditor2 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
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
                    }
                },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.isTabPressed(event);
            instance.editorKeydown(nextEditor2);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.2.1-Method--27--editorKeydown-CITATION Element-keyCode:86', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                ctrlKey: true,
                keyCode: 86,
                type: 'keydown'
            }
            let nextEditor2 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'BR'
                                }
                            ],
                            innerText: " ",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "element-citation",
                elementId: "work:urn",
                currentElement: {
                    "type": "element-citation"
                },
                element: { type: "citation", status: "wip" },
                model: {},
                placeholder: "",
            }
            component.update();
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return {
                            trim: () => { return "" }
                        }
                    }
                }
            }
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.isTabPressed(event);
            instance.editorKeydown(nextEditor2);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.2.2-Method--27--editorKeydown-CITATION Element-keyCode:13', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                ctrlKey: true,
                keyCode: 13,
                which: 86,
                type: 'keydown'
            }
            let nextEditor2 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'BR'
                                }
                            ],
                            innerText: " ",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                currentElement: {
                    "type": "element-citation"
                },
                element: { type: "citations", status: "wip" },
                model: {},
                placeholder: "",
            })
            component.update();
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return {
                            trim: () => { return "" }
                        }
                    }
                }
            }
            let newObj = { click: () => { } };
            let elementByIdData = {
                closest: () => {
                    return { nextSibling: { querySelector: () => { return newObj } } }
                },
                blur: () => { }, ...editor
            }
            document.getElementById = () => {
                return elementByIdData
            }
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor2);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.3-Method--27--editorKeydown-PARAGRAPH Element-keyCode:13', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                ctrlKey: true,
                keyCode: 13,
                type: 'keydown'
            }
            let nextEditor2 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'BR'
                                }
                            ],
                            innerText: " ",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                currentElement: {
                    "type": "element-citation"
                },
                element: { type: "element-authoredtext", status: "wip" },
                model: {},
                placeholder: "",
            })
            component.update();
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return {
                            trim: () => { return "" }
                        }
                    }
                }
            }
            let newObj = { click: () => { } };
            let elementByIdData = {
                closest: () => {
                    return { nextSibling: { querySelector: () => { return newObj } } }
                },
                blur: () => { }, ...editor
            }
            document.getElementById = () => {
                return elementByIdData
            }
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor2);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.4.1-Method--27--editorKeydown-SHOWHIDE Element-keyCode:13', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                ctrlKey: true,
                keyCode: 13,
                type: 'keydown'
            }
            let nextEditor2 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'BR'
                                }
                            ],
                            innerText: " ",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                currentElement: {
                    "type": "element-authoredtext"
                },
                element: {
                    type: "showhide", status: "wip", interactivedata: {
                        show: [
                            elementData.paragraph
                        ]
                    }
                },
                model: {},
                placeholder: "",
                showHideType: "show",
                createShowHideElement: () => { },
                deleteShowHideUnit: () => { }
            })
            component.update();
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return {
                            trim: () => { return "" }
                        }
                    }
                }
            }
            let newObj = { click: () => { } };
            let elementByIdData = {
                closest: () => {
                    return { nextSibling: { querySelector: () => { return newObj } } }
                },
                blur: () => { }, ...editor
            }
            document.getElementById = () => {
                return elementByIdData
            }
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor2);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.4.2-Method--27--editorKeydown-SHOWHIDE Element-keyCode:8', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                ctrlKey: true,
                keyCode: 8,
                type: 'keydown'
            }
            let nextEditor2 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'BR'
                                }
                            ],
                            innerText: " ",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                bodyElement: { innerText: "" },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                currentElement: {
                    "type": "element-list"
                },
                element: {
                    type: "showhide", status: "wip", interactivedata: {
                        show: [elementData.list, elementData.paragraph],
                        hide: [elementData.list]
                    }
                },
                model: {},
                placeholder: "",
                showHideType: "show",
                createShowHideElement: () => { },
                deleteShowHideUnit: () => { }
            })
            component.update();
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return {
                            trim: () => { return { length: 0 } }
                        }
                    }
                }
            }
            let newObj = { click: () => { } };
            let elementByIdData = {
                closest: () => {
                    return { nextSibling: { querySelector: () => { return newObj } } }
                },
                blur: () => { }, ...editor
            }
            document.getElementById = () => {
                return elementByIdData
            }
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor2);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.5.1-Method--27--editorKeydown-BCE Element-KeyCode=9', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keydown',
                keyCode: 9
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: {
                    getStart: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }, ...tinymce.activeEditor.selection
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder">SampleCode</code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.5.2-Method--27--editorKeydown-BCE Element-KeyCode=46', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keydown',
                which: 46
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: {
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
                    }, ...tinymce.activeEditor.selection
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder"></code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.5.2-Method--27--editorKeydown-BCE Element-CtrlKey', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keydown',
                which: 66,
                ctrlKey: true
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<code class="bce place-holder"></code>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "CODE"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.6.1-Method--27--editorKeydown-POETRY Element-KeyCode=8', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 8
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<span class="bce place-holder">SampleCode</span>',
                            children: [
                                {
                                    tagName: 'DIV'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "DIV"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "stanza"
                },
                model: {},
                placeholder: "",
            })
            component.update();
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor);
            expect(spyFunction).toHaveBeenCalled()
        });
        it('Test-29.6.2-Method--27--editorKeydown-POETRY Element-KeyCode=9', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keyup',
                which: 9
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<span class="bce place-holder">SampleCode</span>',
                            children: [
                                {
                                    tagName: 'DIV'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "DIV"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "stanza"
                },
                model: {},
                placeholder: "",
            })
            component.update();
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor);
            expect(spyFunction).toHaveBeenCalled()
        });
        xit('Test-29.6.3-Method--27--editorKeydown-POETRY Element-KeyCode=13', () => {
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { },
                type: 'keydown',
                which: 13
            }
            let nextEditor3 = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: {
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
                    getNode: () => {
                        return {
                            tagName: 'SPAN',
                            className: 'poetryLine',
                            closest: () => { },
                            textContent: () => { return { trim: () => { return "" } } },
                            getElementsByClassName: () => {
                                return [{
                                    tagName: 'SPAN',
                                    getElementsByTagName: () => {
                                        return {
                                            tagName: 'SPAN',
                                            className: 'poetryLine',
                                            textContent: () => { return { trim: () => { return "" } } }
                                        }
                                    },
                                    className: 'poetryLine',
                                    textContent: () => { return { trim: () => { return "" } } }
                                }]
                            }
                        }
                    }
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<span class="bce place-holder">SampleCode</span>',
                            children: [
                                {
                                    tagName: 'DIV'
                                }
                            ],
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn(),
                                contains: jest.fn(),
                            },
                            nodeName: "DIV"

                        }
                    }
                },
                children: ['<code class="bce place-holder">hello<ol></code>'],
                classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
            }
            let newObj = { click: () => { } };
            let elementByIdData = {
                closest: () => {
                    return { nextSibling: { querySelector: () => { return newObj } } }
                },
                blur: () => { }, ...editor
            }
            document.getElementById = () => {
                return elementByIdData
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "stanza"
                },
                model: {},
                placeholder: "",
            })
            component.update();
            const spyFunction = jest.spyOn(instance, 'editorKeydown')
            instance.editorKeydown(nextEditor3);
            expect(spyFunction).toHaveBeenCalled()
        });
    });
    describe('Test-30-Method--28--editorOnClick', () => {
        component.setProps({
            ...props,
            permissions: ["login", "logout"],
            tagName: "SPAN",
            elementId: "work:urn",
            currentElement: {
                "type": "element-citation"
            },
            element: { type: "citation", status: "wip" },
            model: {},
            placeholder: "",
            activeElement: false,
            audioGlossaryPopup:jest.fn()
        })
        component.update();
        it('Test-30.1.1-Method--28--editorOnClick--nodeName:SUP & alreadyExist:FALSE', () => {
            document.querySelector = () => { return false; }
            let event1 = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    parentElement: { nodeName: "SUP", childNodes: [{ nodeName: 'A' }] },
                    dataset: { uri: "uri" },
                    nodeName: "SUP"
                },
                type: "click",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const setDisabled = jest.spyOn(instance.glossaryBtnInstance, 'setDisabled');
            const spyeditorOnClick = jest.spyOn(instance, 'editorOnClick')
            instance.editorOnClick(event1);
            expect(spyeditorOnClick).toHaveBeenCalled()
            expect(setDisabled).toHaveBeenCalled()
        });
        it('Test-30.1.2-Method--28--editorOnClick--nodeName:SUP & alreadyExist:TRUE', () => {
            document.querySelector = () => { return false; }
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    parentElement: { nodeName: "SUP", childNodes: [{ nodeName: 'A' }] },
                    dataset: { uri: "uri" },
                    nodeName: "SUP",
                    closest: () => { return false; }
                },
                type: "click",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            document.getElementsByClassName = () => {
                return {
                    length: 1
                }
            }
            const setDisabled = jest.spyOn(instance.glossaryBtnInstance, 'setDisabled');
            const spyeditorOnClick = jest.spyOn(instance, 'editorOnClick')
            instance.editorOnClick(event);
            expect(spyeditorOnClick).toHaveBeenCalled()
            expect(setDisabled).toHaveBeenCalled()
        });
        it('Test-30.2.1-Method--28--editorOnClick--nodeName:DFN & alreadyExist:FALSE', () => {
            document.querySelector = () => { return false; }
            let event1 = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    dataset: { uri: "uri" },
                    nodeName: "DFN",
                    closest: () => { return { hasAttribute:()=>{return false}}; }
                },
                type: "click",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const setDisabled = jest.spyOn(instance.glossaryBtnInstance, 'setDisabled');
            const spyeditorOnClick = jest.spyOn(instance, 'editorOnClick')
            instance.editorOnClick(event1);
            expect(spyeditorOnClick).toHaveBeenCalled()
            expect(setDisabled).toHaveBeenCalled()
        });
        it('Test-30.2.2-Method--28--editorOnClick--nodeName:DFN & alreadyExist:TRUE', () => {
            instance.props.handleAudioPopupLocation = jest.fn();
            document.querySelector = () => { return false; }
            let event = {
                currentTarget:{
                    classList: { contains:()=> { return 'mce-edit-focus' }}
                },
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    dataset: { uri: "uri" },
                    nodeName: "DFN",
                    closest: () => {
                        return {
                            getAttribute() { return },
                            hasAttribute() { return true}
                        }
                    }
                },
                type: "click",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            document.getElementsByClassName = () => {
                return {
                    length: 1
                }
            }
            const setDisabled = jest.spyOn(instance.glossaryBtnInstance, 'setDisabled');
            const spyeditorOnClick = jest.spyOn(instance, 'editorOnClick')
            instance.editorOnClick(event);
            expect(spyeditorOnClick).toHaveBeenCalled()
            expect(setDisabled).toHaveBeenCalled()
        });
        it('Test-30.3-Method--28--editorOnClick--nodeName:ABBR - Asset Popover', () => {
            document.querySelector = () => { return { classList: { remove: () => { } } }; }
            let event1 = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    dataset: { uri: "uri" },
                    parentNode: {
                        nodeName: 'ABBR',
                        attributes: {
                            'title': { nodeValue: 'Asset Popover' },
                            'asset-id': { nodeValue: "yes" },
                            'data-uri': { nodeValue: "AP" }
                        }
                    },
                    nodeName: 'ABBR',
                    attributes: {
                        'title': { nodeValue: 'Asset Popover' },
                        'asset-id': { nodeValue: "yes" },
                        'data-uri': { nodeValue: "AP" }
                    },
                    closest: () => { return false; }

                },
                type: "click",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const spyeditorOnClick = jest.spyOn(instance, 'editorOnClick')
            instance.editorOnClick(event1);
            expect(spyeditorOnClick).toHaveBeenCalled()
        });
        it('Test-30.3-Method--28--editorOnClick--nodeName:ABBR - Slate Link', () => {
            document.querySelector = () => { return { classList: { remove: () => { } } }; }
            let event1 = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    dataset: { uri: "uri" },
                    parentNode: {
                        nodeName: 'ABBR',
                        attributes: {
                            'title': { nodeValue: 'Slate Link' },
                            'id': { nodeValue: 'page-link-0' },
                            'element-id': { nodeValue: "urn:pearson:work:22e2dd42-8fac-481c-8832-ad5d542b985b" },
                            'data-uri': { nodeValue: "AP" }
                        }
                    },
                    nodeName: 'ABBR',
                    attributes: {
                        'title': { nodeValue: 'Slate Link' },
                        'asset-id': { nodeValue: "yes" },
                        'data-uri': { nodeValue: "AP" }
                    },
                    closest: () => { return false; }

                },
                type: "click",
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const spyeditorOnClick = jest.spyOn(instance, 'editorOnClick')
            instance.editorOnClick(event1);
            expect(spyeditorOnClick).toHaveBeenCalled()
        });
        it('Test-30.4-Method--28--editorOnClick--ELSE Case', () => {
            document.querySelector = () => { return false; }
            let event1 = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                target: {
                    id: "",
                    dataset: { uri: "uri" },
                    parentNode: {
                        nodeName: 'IMG'
                    },
                    nodeName: 'IMG',
                    closest: () => { return false; }

                },
                type: "click",
            }
            component.setProps({
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                currentElement: {
                    "type": "element-citation"
                },
                element: { type: "citation", status: "wip" },
                model: {},
                placeholder: "",
                activeShowHide: () => { return true; },
                ...props
            })
            component.update();
            const spyeditorOnClick = jest.spyOn(instance, 'editorOnClick')
            instance.editorOnClick(event1);
            expect(spyeditorOnClick).toHaveBeenCalled()
        });
    });
    it('Test-31-Method--29--removeMultiTinyInstance', () => {
        let toolbar = { parentElement: { id: "toolbar" }, remove: () => { } }
        document.getElementsByClassName = () => { return [toolbar, toolbar]; }
        const spyremoveMultiTinyInstance = jest.spyOn(instance, 'removeMultiTinyInstance')
        instance.removeMultiTinyInstance();
        expect(spyremoveMultiTinyInstance).toHaveBeenCalled();
        spyremoveMultiTinyInstance.mockClear()
    });
    it('Test-32-Method--30--componentWillUnmount', () => {
        tinymce.editors = [editor]
        const spyFunction = jest.spyOn(instance, 'componentWillUnmount')
        instance.componentWillUnmount();
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear()
    });
    describe('Test-33-Method--31--handleBlur', () => {
        document = {
            createElement: () => {
                return { innerHTML: "" }
            },
            getElementById: () => {
                return {
                    innerHTML: "<div>paragraph</div>"
                }
            },
            getElementsByTagName: () => {
                return {
                    innerHTML: "<div>poetry</div>"
                }
            }
        }
        it('Test-33.1-Method--31--handleBlur-POETRY Element', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                }
            }
            instance.fromtinyInitBlur = true;
            const spyhandleBlur = jest.spyOn(instance, 'handleBlur')
            instance.handleBlur(event);
            expect(spyhandleBlur).toHaveBeenCalledWith(event);
            spyhandleBlur.mockClear()
        });
        it('Test-33.2.1-Method--31--handleBlur-BLOCKQUOTE MARGINALIA Element-isctrlPlusV:TRUE', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                type: 'blur'
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "blockquote",
                elementId: "work:urn",
                element: { type: "element-authoredtext", status: "wip", elementdata: { type: "marginalia" } },
                model: {},
                placeholder: "",
            })
            component.update();
            instance.isctrlPlusV = true;
            instance.lastContent = "blockquote";
            document = {
                createElement: () => {
                    return { innerHTML: "" }
                },
                getElementById: () => {
                    return {
                        innerHTML: "<div>blockquote</div>"
                    }
                }
            }
            instance.fromtinyInitBlur = true;
            const spyhandleBlur = jest.spyOn(instance, 'handleBlur')
            instance.handleBlur(event);
            expect(spyhandleBlur).toHaveBeenCalledWith(event);
            spyhandleBlur.mockClear()
        });
        it('Test-33.2.1-Method--31--handleBlur-citations', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                type: 'blur'
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "blockquote",
                elementId: "work:urn",
                element: { type: "citations" },
                model: {},
                placeholder: "",
            })
            component.update();
            instance.isctrlPlusV = true;
            instance.lastContent = "blockquote";
            document = {
                createElement: () => {
                    return { innerHTML: "" }
                },
                getElementById: () => {
                    return {
                        innerHTML: "<div>blockquote</div>"
                    }
                }
            }
            instance.fromtinyInitBlur = true;
            const spyhandleBlur = jest.spyOn(instance, 'handleBlur')
            instance.handleBlur(event);
            expect(spyhandleBlur).toHaveBeenCalledWith(event);
            spyhandleBlur.mockClear()
        });
        it('Test-33.2.2-Method--31--handleBlur-BLOCKQUOTE MARGINALIA Element-isctrlPlusV:FALSE', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                type: 'blur'
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "blockquote",
                elementId: "work:urn",
                element: { type: "element-authoredtext", status: "wip", elementdata: { type: "blockquote" } },
                model: {},
                placeholder: "",
            })
            component.update();
            instance.isctrlPlusV = false;
            instance.lastContent = "blockquote";
            document = {
                createElement: () => {
                    return { innerHTML: "" }
                },
                getElementById: () => {
                    return {
                        innerHTML: "<div>blockquote</div>"
                    }
                }
            }
            instance.fromtinyInitBlur = true;
            const spyhandleBlur = jest.spyOn(instance, 'handleBlur')
            instance.handleBlur(event);
            expect(spyhandleBlur).toHaveBeenCalledWith(event);
            spyhandleBlur.mockClear()
        });
        it('Test-33.3-Method--31--handleBlur-SHOWHIDE Element', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                type: 'blur'
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "blockquote",
                elementId: "work:urn",
                element: { type: "showhide", status: "wip" },
                model: {},
                placeholder: "",
                showHideType: "show"
            })
            component.update();
            instance.isctrlPlusV = false;
            instance.lastContent = "showhide";
            document = {
                createElement: () => {
                    return { innerHTML: "" }
                },
                getElementById: () => {
                    return {
                        innerHTML: "<div>blockquote</div>"
                    }
                }
            }
            instance.fromtinyInitBlur = true;
            const spyhandleBlur = jest.spyOn(instance, 'handleBlur')
            instance.handleBlur(event);
            expect(spyhandleBlur).toHaveBeenCalledWith(event);
            spyhandleBlur.mockClear()
        });
    });
    describe('Test-34-Method--32--handleClick', () => {
        document = {
            querySelector: () => {
                return true
            },
            getElementById: () => {
                return {
                    innerHTML: "<div>blockquote</div>",
                    classList: {
                        remove: () => { }
                    },
                    setAttribute: () => { },
                    remove: () => { }
                }
            }
        }
        it('Test-34.1-Method--32--handleClick-(!isSameTargetBasedOnDataId || !isSameTarget || !isSameByElementId)-FALSE', () => {

            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                clientX: jest.fn(),
                clientY: jest.fn(),
                currentTarget: {
                    id: "work:urn:1",
                    focus: jest.fn(),
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    classList: {
                        contains: () => { },
                        remove: () => { }
                    },
                    getAttribute: () => "urn:pearson:work:232hk232-213123fsdf"
                },
                type: 'click',
                target: {
                    id: "",
                    parentElement: { nodeName: "SUP", childNodes: [{ nodeName: 'A' }] },
                    dataset: { uri: "uri" },
                    nodeName: "SUP",
                    classList : {
                        contains : ()=>{ }
                    }
                },
                clipboardData: {
                    getData: () => { return pasteString }
                }
            }
            let editor2 = {
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                },
                // ...tinymce.activeEditor
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "blockquote",
                elementId: "work:urn",
                element: { type: "showhide", status: "wip" },
                currentElement: { type: "element-authoredtext", status: "wip" },
                model: {},
                placeholder: "",
                showHideType: "show",
                handleEditorFocus: () => { }
            })
            component.update();

            document.querySelector = () => {
                return {
                    getAttribute: () => { },
                    classList: { remove: () => { } }
                }
            }
            document.getElementById = () => {
                return {
                    innerHTML: "<div>blockquote</div>",
                    classList: {
                        remove: () => { }
                    },
                    setAttribute: () => { },
                    getAttribute: () => { },
                    remove: () => { }
                }
            }
            tinymce.activeEditor = {
                id: "work:urn:1",
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                },
                selection: tinyMceEditor.selection,
                dom: domObj,
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                ...editor2
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const spyhandleClick = jest.spyOn(instance, 'handleClick')
            instance.handleClick(event);
            expect(spyhandleClick).toHaveBeenCalledWith(event);
            spyhandleClick.mockClear()
        });
        it('Test-34.2-Method--32--handleClick-(!isSameTargetBasedOnDataId || !isSameTarget || !isSameByElementId)-TRUE-TermText==""', () => {

            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                clientX: jest.fn(),
                clientY: jest.fn(),
                currentTarget: {
                    id: "work:urn:1",
                    focus: jest.fn(),
                    closest: () => {
                        return {
                            getAttribute: () => { return false }
                        }
                    },
                    classList: {
                        contains: () => { },
                        remove: () => { }
                    },
                    getAttribute: () => "urn:pearson:work:232hk232-213123fsdf"
                },
                type: 'click',
                target: {
                    id: "",
                    parentElement: { nodeName: "SUP", childNodes: [{ nodeName: 'A' }] },
                    dataset: { uri: "uri" },
                    nodeName: "SUP",
                    classList : {
                        contains: () => { return true; },
                    }
                },
                clipboardData: {
                    getData: () => { return pasteString }
                },
                getAttribute: () => { return true }
            }
            let editor2 = {
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                }
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "blockquote",
                elementId: "work:urn",
                element: { type: "showhide", status: "wip" },
                currentElement: { type: "element-authoredtext", status: "wip" },
                model: {},
                placeholder: "",
                showHideType: "show",
                handleEditorFocus: () => { }
            })
            component.update();

            document.querySelector = () => {
                return {
                    getAttribute: () => { },
                    classList: { remove: () => { } }
                }
            }
            document.querySelectorAll = () => {
                return [{ innerHTML: "1in if condition" }, { innerHTML: "2in if condition" }]

            }
            document.getElementById = () => {
                return {
                    innerHTML: "<div>blockquote</div>",
                    classList: {
                        remove: () => { }
                    },
                    setAttribute: () => { },
                    getAttribute: () => { },
                    remove: () => { }
                }
            }
            tinymce.activeEditor = {
                id: "work:urn:1",
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                },
                selection: tinyMceEditor.selection,
                dom: domObj,
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                ...editor2
            }
            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const spyhandleClick = jest.spyOn(instance, 'handleClick')
            instance.handleClick(event);
            expect(spyhandleClick).toHaveBeenCalledWith(event);
            spyhandleClick.mockClear()
        });
        it('Test-34.3-Method--32--handleClick-(!isSameTargetBasedOnDataId || !isSameTarget || !isSameByElementId)-TRUE-TermText!=""', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                clientX: jest.fn(),
                clientY: jest.fn(),
                currentTarget: {
                    id: "work:urn:1",
                    focus: jest.fn(),
                    closest: () => {
                        return {
                            getAttribute: () => { return false }
                        }
                    },
                    classList: {
                        contains: () => { },
                        remove: () => { }
                    },
                    getAttribute: () => "urn:pearson:work:232hk232-213123fsdf"
                },
                type: 'click',
                target: {
                    id: "",
                    parentElement: { nodeName: "SUP", childNodes: [{ nodeName: 'A' }] },
                    dataset: { uri: "uri" },
                    nodeName: "SUP",
                    classList: {
                        contains: () => { },
                        remove: () => { }
                    }
                },
                clipboardData: {
                    getData: () => { return pasteString }
                },
                getAttribute: () => { return true }
            }
            let editor2 = {
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                }
            }
            document.querySelector = () => {
                return {
                    getAttribute: () => { },
                    classList: { remove: () => { } }
                }
            }
            document.querySelectorAll = () => {
                return [{ innerHTML: "HEllo" }]

            }
            document.getElementById = () => {
                return {
                    innerHTML: "<div>blockquote</div>",
                    classList: {
                        remove: () => { }
                    },
                    setAttribute: () => { },
                    getAttribute: () => { },
                    remove: () => { }
                }
            }
            tinymce.$ = () => {
                return {
                    html: () => {
                        return "termText"
                    },
                    find: () => {
                        return {
                            removeClass: () => { }
                        }
                    },
                    remove: () => { },
                    css: () => { }
                }
            }
            tinymce.activeEditor = {
                id: "work:urn:1",
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                },
                selection: tinyMceEditor.selection,
                dom: domObj,
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                ...editor2
            }

            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const spyhandleClick = jest.spyOn(instance, 'handleClick')
            instance.handleClick(event);
            expect(spyhandleClick).toHaveBeenCalledWith(event);
            spyhandleClick.mockClear()
        });
        it('Test-34.4-Method--32--handleClick-config.slateType:"container-introduction"', () => {
            config.slateType = "container-introduction"
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                clientX: jest.fn(),
                clientY: jest.fn(),
                currentTarget: {
                    id: "work:urn:1",
                    focus: jest.fn(),
                    closest: () => {
                        return {
                            getAttribute: () => { return false }
                        }
                    },
                    classList: {
                        contains: () => { },
                        remove: () => { }
                    },
                    getAttribute: () => "urn:pearson:work:232hk232-213123fsdf"
                },
                type: 'click',
                target: {
                    id: "",
                    parentElement: { nodeName: "SUP", childNodes: [{ nodeName: 'A' }] },
                    dataset: { uri: "uri" },
                    nodeName: "SUP",
                    classList: {
                        contains: () => { },
                        remove: () => { }
                    }
                },
                clipboardData: {
                    getData: () => { return pasteString }
                },
                getAttribute: () => { return true }
            }
            let editor2 = {
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                }
            }
            document.querySelector = () => {
                return {
                    getAttribute: () => { },
                    classList: { remove: () => { } }
                }
            }
            document.querySelectorAll = () => {
                return [{ innerHTML: "HEllo" }]

            }
            document.getElementById = () => {
                return {
                    innerHTML: "<div>blockquote</div>",
                    classList: {
                        remove: () => { }
                    },
                    setAttribute: () => { },
                    getAttribute: () => { },
                    remove: () => { }
                }
            }
            tinymce.$ = () => {
                return {
                    html: () => {
                        return "termText"
                    },
                    find: () => {
                        return {
                            removeClass: () => { }
                        }
                    },
                    remove: () => { },
                    css: () => { }
                }
            }
            tinymce.activeEditor = {
                id: "work:urn:1",
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                },
                selection: tinyMceEditor.selection,
                dom: domObj,
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                ...editor2
            }

            instance.glossaryBtnInstance = {
                setDisabled: () => { }
            }
            instance.footnoteBtnInstance = {
                setDisabled: () => { }
            }
            const spyhandleClick = jest.spyOn(instance, 'handleClick')
            instance.handleClick(event);
            expect(spyhandleClick).toHaveBeenCalledWith(event);
            spyhandleClick.mockClear()
        });
    });
    describe('Test-35-Method--33--componentDidMount', () => {
        it('Test-35-Method--33--componentDidMount-FIGURE Element', () => {

            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                relatedTarget: {
                    classList: []
                },
                clientX: jest.fn(),
                clientY: jest.fn(),
                currentTarget: {
                    id: "work:urn:1",
                    focus: jest.fn(),
                    closest: () => {
                        return {
                            getAttribute: () => { return false }
                        }
                    },
                    classList: {
                        contains: () => { },
                        remove: () => { }
                    }
                },
                type: 'click',
                target: {
                    id: "",
                    parentElement: { nodeName: "SUP", childNodes: [{ nodeName: 'A' }] },
                    dataset: { uri: "uri" },
                    nodeName: "SUP"
                },
                clipboardData: {
                    getData: () => { return pasteString }
                },
                getAttribute: () => { return true }
            }
            let editor2 = {
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                }
            }
            document.querySelector = () => {
                return {
                    getAttribute: () => { },
                    classList: { remove: () => { } }
                }
            }
            document.querySelectorAll = () => {
                return [{ innerHTML: "HEllo" }]

            }
            document.getElementById = () => {
                return {
                    innerHTML: "<div>blockquote</div>",
                    classList: {
                        remove: () => { },
                        contains: () => { return true; }
                    },
                    setAttribute: () => { },
                    getAttribute: () => { },
                    getElementsByTagName: () => { return {length: 2 } }
                }
            }
            tinymce.$ = () => {
                return {
                    html: () => {
                        return "termText"
                    },
                    find: () => {
                        return {
                            removeClass: () => { }
                        }
                    },
                    remove: () => { },
                    css: () => { },
                    attr: () => { }
                }
            }
            tinymce.activeEditor = {
                id: "work:urn:1",
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    closest: () => {
                        return {
                            getAttribute: () => { }
                        }
                    },
                    getAttribute: () => {
                        return {
                            length: 0
                        };
                    },
                    setAttribute: () => {
                        return {
                            length: 1
                        }
                    }
                },
                selection: tinyMceEditor.selection,
                dom: domObj,
                on: (temp, cb) => {
                    cb(event)
                },
                setContent: () => { },
                children: ['<p class="paragraphNumeroUno">hello</p>'],
                classList: { remove: () => { }, setAttribute: () => { } },
                getContentAreaContainer: () => {
                    return true;
                },
                ...editor2
            }
            tinymce.remove = jest.fn()
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "figure", status: "wip" },
                model: {},
                placeholder: "",
                activeElement: false
            })
            component.update();
            jest.spyOn(window.localStorage.__proto__, 'setItem');
            window.localStorage.__proto__.getItem = () => { return { "mockElement": "sample" }; };
            instance.editorRef = { current: { id: "active:editor:id", style: { caretColor: "red" }, focus: () => { } } }
            const spyFunction = jest.spyOn(instance, 'componentDidMount')
            instance.componentDidMount();
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear()
        });
    });
    describe('Test-36-Method--34--addPageLink', () => {
        it('Test-36.1-Method--34--addPageLink-Innermost If true', () => {
            const domFunction = () =>{
                return [{
                    parentNode: {
                        nodeName: 'LI',
                        childNodes: [{
                            nodeName: 'LI',
                            innerHTML: 'test',
                            outerHTML: '',
                            length :1
                        }]
                    },
                    childNodes: [{
                        nodeName: 'LI',
                        innerHTML: 'test',
                        outerHTML: '',
                        length :1
                    }]
                }]
            }
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return "hello TEST"
                    },
                    anchorNode: {
                        nodeName: "SPAN",
                        parentNode: {
                            nodeName: "SPAN",
                            innerHTML: "<span>Hello1</span>",
                            outerHTML: "<p><span>Hello</span></p>",
                            classList: { contains: () => { return false } },
                            getElementsByTagName: domFunction,
                            getElementsByClassName:domFunction,
                            parentNode: {
                                nodeName: "LI",
                                innerHTML: "<span>Hello1</span>",
                                outerHTML: "<p><span>Hello</span></p>",
                                classList: { contains: () => { return false } },
                                getElementsByTagName: domFunction,
                                getElementsByClassName:domFunction,
                                parentNode: {}
                            }
                        }
                    }
                }
            }
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                }
            }
            let selectedText = "Hello"
            const spyaddPageLink = jest.spyOn(instance, 'addPageLink')
            instance.addPageLink(nextEditor, selectedText);
            expect(spyaddPageLink).toHaveBeenCalled();
            spyaddPageLink.mockClear()
        });
        it('Test-36.2-Method--34--addPageLink-Innermost Else true', () => {
            const domFunction = () =>{
                return [{
                    parentNode: {
                        nodeName: 'LI',
                        childNodes: []
                    },
                    childNodes: [{
                        nodeName: 'LI',
                        innerHTML: 'test',
                        outerHTML: ''
                    }]
                }]
            }
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return "hello TEST"
                    },
                    anchorNode: {
                        nodeName: "SPAN",
                        parentNode: {
                            nodeName: "SPAN",
                            innerHTML: "<span>Hello1</span>",
                            outerHTML: "<p><span>Hello</span></p>",
                            classList: { contains: () => { return false } },
                            getElementsByTagName: domFunction,
                            getElementsByClassName:domFunction,
                            parentNode: {
                                nodeName: "LI",
                                innerHTML: "<span>Hello1</span>",
                                outerHTML: "<p><span>Hello</span></p>",
                                classList: { contains: () => { return false } },
                                getElementsByTagName: domFunction,
                                getElementsByClassName:domFunction,
                                parentNode: {}
                            }
                        }
                    }
                }
            }
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                }
            }
            let selectedText = "Hello"
            const spyaddPageLink = jest.spyOn(instance, 'addPageLink')
            instance.addPageLink(nextEditor, selectedText);
            expect(spyaddPageLink).toHaveBeenCalled();
            spyaddPageLink.mockClear()
        });
        xit('Test-36.3-Method--34--addPageLink-Outermost Else true', () => {
            const domFunction = () =>{
                return [{
                    parentNode: {
                        nodeName: 'LI',
                        childNodes: [],
                        removeChild:()=>{}
                    },
                    childNodes: [{
                        nodeName: 'LI',
                        innerHTML: 'test',
                        outerHTML: '',
                        removeChild:()=>{}
                    }]
                }]
            }
            window.getSelection = () => {
                return {
                    removeAllRanges: () => { },
                    toString: () => {
                        return "hello TEST"
                    },
                    anchorNode: {
                        nodeName: "SPAN",
                        parentNode: {
                            nodeName: "SPAN",
                            innerHTML: "",
                            outerHTML: "<p><span>Hello</span></p>",
                            classList: { contains: () => { return false } },
                            getElementsByTagName: domFunction,
                            getElementsByClassName:domFunction,
                            removeChild:()=>{},
                            parentNode: {
                                nodeName: "LI",
                                innerHTML: "",
                                outerHTML: "<p><span>Hello</span></p>",
                                classList: { contains: () => { return false } },
                                getElementsByTagName: domFunction,
                                getElementsByClassName:domFunction,
                                parentNode: {},
                                removeChild:()=>{},
                            }
                        },
                        removeChild:()=>{}
                    }
                }
            }
            let event = {
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                }
            }
            let selectedText = "Hello"
            const spyaddPageLink = jest.spyOn(instance, 'addPageLink')
            instance.addPageLink(nextEditor, selectedText);
            expect(spyaddPageLink).toHaveBeenCalled();
            spyaddPageLink.mockClear()
        });
    });
    describe('Test-37-Method--35--getOffSet', () => {
        it('Test-37.1-Method--35--getOffSet-IF case', () => {
            let element={
                document:{
                    parentWindow:{
                        getSelection : ()=>{
                            return {
                                rangeCount : 4,
                                getRangeAt : () =>{
                                    return {
                                        endContainer: 100,
                                        endOffset:120,
                                        cloneRange : ()=>{
                                            return {
                                                selectNodeContents : ()=>{},
                                                setEnd:()=>{},
                                                toStrin:()=>{
                                                    return {
                                                        length :1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "element-list",
                    "html": { "text": "" },
                },
                model: { "text": 'LIST' },
                placeholder: "",
            })
            component.update();
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = domObj;
            const spygetOffSet = jest.spyOn(instance, 'getOffSet')
            instance.getOffSet(element);
            expect(spygetOffSet).toHaveBeenCalled()
        });
        it('Test-37.2-Method--35--getOffSet-ELSE case', () => {
            let element = {
                ownerDocument: {
                    defaultView: {
                        getSelection: undefined,
                    },
                    selection: {
                        type: 'NotControl',
                        createRange: () => { }
                    },
                    body: {
                        createTextRange: () => {
                            return {
                                moveToElementText: () => { },
                                setEndPoint: () => { },
                                text: { length: 2 }
                            }
                        }
                    }
                }
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            instance.notFormatting = true;
            instance.copyContent = "PasteData"
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = {
                getParent: () => {
                    return {
                        innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                        children: [
                            {
                                tagName: 'CODE'
                            }
                        ],
                        innerText: "hello",
                        querySelectorAll: jest.fn(),
                        classList: {
                            remove: jest.fn()
                        },
                        nodeName :'CODE'
                    }
                }
            };
            const spygetOffSet = jest.spyOn(instance, 'getOffSet')
            instance.getOffSet(element);
            expect(spygetOffSet).toHaveBeenCalled()
        });
    });
    describe('Test-38-Method--36--setCursorOnCode', () => {
        xit('Test-38.1-Method--36--setCursorOnCode-tagName = "CODE"', () => {
            let element = {
                tagName: "CODE",
                appendChild: () => { },
                childNodes: [],
                getElementsByTagName: () => {
                    return [
                        {
                            length: 1,
                            parentNode: {
                                removeChild: () => { }
                            }
                        }
                    ]
                }
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "element-list",
                    "html": { "text": "" },
                },
                model: { "text": 'LIST' },
                placeholder: "",
            })
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                },
                dom:{ create:()=>{
                    return "<br>"
                
                }}
            }
            component.update();
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = domObj;
            const spysetCursorOnCode = jest.spyOn(instance, 'setCursorOnCode')
            instance.setCursorOnCode(element, nextEditor);
            expect(spysetCursorOnCode).toHaveBeenCalled()
        });
        it('Test-38.2-Method--36--setCursorOnCode-tagName = "SPAN"', () => {
            let element = {
                tagName: "SPAN",
                appendChild: () => { },
                childNodes: {
                    length:1,
                    "0":{}
                }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                }
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "figure",
                    'figuretype': "codelisting",
                    "html": { "text": "" },
                    "figuredata": { preformattedtext: "BCE" }
                },
                model: { "figuredata": { preformattedtext: "BCE" } },
                placeholder: "",
            })
            component.update();
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = domObj;
            const spysetCursorOnCode = jest.spyOn(instance, 'setCursorOnCode')
            instance.setCursorOnCode(element,nextEditor);
            expect(spysetCursorOnCode).toHaveBeenCalled()
        });
    });
    describe('Test-39-Method--37--handleCodeClick', () => {
        it('Test-39.1-Method--37--handleCodeClick-IF showHide Present', () => {
            let showHide = "show"
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: {
                    "type": "element-list",
                    "html": { "text": "" },
                },
                model: { "text": 'LIST' },
                placeholder: "",
            })
            component.update();
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: editor.selection,
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                }
            }
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = domObj;
            instance.setCursorOnCode = jest.fn()
            const spyhandleCodeClick = jest.spyOn(instance, 'handleCodeClick')
            instance.handleCodeClick(nextEditor, showHide);
            expect(spyhandleCodeClick).toHaveBeenCalled()
        });
        xit('Test-39.2-Method--37--handleCodeClick-showhide not present', () => {
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "BR",
                elementId: "work:urn",
                element: {
                    "type": "element-list",
                    "html": { "text": "" },
                },
                model: { "text": 'LIST' },
                placeholder: "",
            })
            component.update();
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                selection: {
                    ...editor.selection,
                    getNode: () => {
                        return {
                            tagName: 'BR',
                            className: 'poetryLine',
                            closest: () => { },
                            removeChild: () => { },
                            childNodes: {
                                length: 2,
                                "0": {
                                    tagName: 'BR',
                                    className: 'linebreak',
                                    innerHTML:"<br>",
                                    removeChild: () => { },
                                    parentNode:{
                                        removeChild: () => { },
                                        nodeName: "BR",
                                        innerHTML: "<span>Hello1</span>",
                                        outerHTML: "<p><span>Hello</span></p>",
                                        classList: { contains: () => { return false } },
                                        parentNode: {
                                            removeChild: () => { },
                                            nodeName: "BR",
                                            innerHTML: "<span>Hello1</span>",
                                            outerHTML: "<p><span>Hello</span></p>",
                                            classList: { contains: () => { return false } },
                                            parentNode: {}
                                        }
                                    }
                                },
                                "1": {
                                    tagName: 'BR',
                                    className: 'poetryLine'
                                }
                            }
                        }
                    },
                },
                setContent: () => { },
                insertContent: () => { },
                formatter: {
                    match: () => { },
                    formatChanged: () => { return jest.fn() },
                    unbind: () => { }
                }
            }
            tinymce.activeEditor.selection = editor.selection;
            tinymce.activeEditor.dom = domObj;
            instance.setCursorOnCode = jest.fn()
            const spyhandleCodeClick = jest.spyOn(instance, 'handleCodeClick')
            instance.handleCodeClick(nextEditor, undefined);
            expect(spyhandleCodeClick).toHaveBeenCalled()
        });
    });
    describe('Test-40-Method--3--editorExecCommand-branch coverage', () => {
        it('Test-40.1-Method--6--editorBeforeExecCommand --CASE--Underline', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Underline',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "CODE",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            let spyFunction = jest.spyOn(instance, 'getElementTypeForToolbar');
            spyFunction.mockImplementationOnce(()=>{
                return 'code'
            })
            document.querySelector = (selector) =>{
                if(selector== '.panel_syntax_highlighting .switch input'){
                    return {
                        checked:true
                    }
                }
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-40.2-Method--6--editorBeforeExecCommand --CASE---Italic---case1', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Italic',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "CODE",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            let spyFunction = jest.spyOn(instance, 'getElementTypeForToolbar');
            spyFunction.mockImplementationOnce(()=>{
                return 'code'
            })
            document.querySelector = (selector) =>{
                if(selector== '.panel_syntax_highlighting .switch input'){
                    return {
                        checked:true
                    }
                }
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-40.2-Method--6--editorBeforeExecCommand --CASE---Italic---case2', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Italic',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: editor.selection,
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "LIST",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            let spyFunction = jest.spyOn(instance, 'getElementTypeForToolbar');
            spyFunction.mockImplementationOnce(()=>{
                return 'Learning Objective Item'
            })
            document.querySelector = (selector) =>{
                if(selector== '.panel_syntax_highlighting .switch input'){
                    return {
                        checked:true
                    }
                }
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-40.2-Method--6--editorBeforeExecCommand --CASE---Italic---case3', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Italic',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: {...editor.selection,
                    getNode: () =>{ 
                        return {
                            className : 'blockquoteTextCredit'
                        }
                    } 
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "LIST",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            let spyFunction = jest.spyOn(instance, 'getElementTypeForToolbar');
            spyFunction.mockImplementationOnce(()=>{
                return 'Blockquote'
            })
            document.querySelector = (selector) =>{
                if(selector== '.panel_syntax_highlighting .switch input'){
                    return {
                        checked:true
                    }
                }
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-40.2-Method--6--editorBeforeExecCommand --CASE---Italic---case4', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    },
                    targetElm: {
                        nodeName: "CODE"
                    }
                },
                value: "h5",
                command: 'Italic',
                preventDefault: () => { },
                stopPropagation: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    childNodes: [{ classList: ["blockquoteMarginalia"] }],
                    dispatchEvent: () => { }
                },
                selection: {...editor.selection,
                    getNode: () =>{ 
                        return {
                            className : 'blockquoteTextCredit'
                        }
                    } 
                },
                dom: {
                    getParent: () => {
                        return {
                            innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
                            children: [
                                {
                                    tagName: 'CODE'
                                }
                            ],
                            nodeName: "LIST",
                            innerText: "hello",
                            querySelectorAll: jest.fn(),
                            classList: {
                                remove: jest.fn()
                            }
                        }
                    }
                },
                setContent: () => { },
            }
            let spyFunction = jest.spyOn(instance, 'getElementTypeForToolbar');
            spyFunction.mockImplementationOnce(()=>{
                return 'Blockquote'
            })
            document.querySelector = (selector) =>{
                if(selector== '.panel_syntax_highlighting .switch input'){
                    return {
                        checked:true
                    }
                }
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-40.3-Method--6--editorBeforeExecCommand --CASE_1--indent--Element-BCE', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'indent',
                preventDefault: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: () => {
                        return {
                            length: 0
                        };
                    },
                    dispatchEvent: () => { }
                },
                selection: {
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
                            }]
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
                },
                dom: domObj,
                setContent: () => { },
            }
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-40.3-Method--6--editorBeforeExecCommand --CASE_2--outdent--Element-BQ', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'outdent',
                preventDefault: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: (elem) => {
                        if (elem == 'ul') {
                            return {
                                length: 1
                            };
                        } else {
                            return {
                                length: 0
                            };
                        }
                    },
                    dispatchEvent: () => { }
                },
                selection: {...editor.selection,
                    getNode: () =>{ 
                        return {
                            className : 'blockquoteText'
                        }
                    } 
                },
                dom: domObj,
                setContent: () => { },
            }
            let spyFunction = jest.spyOn(instance, 'getElementTypeForToolbar');
            spyFunction.mockImplementationOnce(()=>{
                return 'Blockquote'
            })
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
        it('Test-40.3-Method--6--editorBeforeExecCommand --CASE_2--outdent--Element-BCE', () => {
            let event = {
                target: {
                    getContent: () => {
                        return "Test"
                    }
                },
                command: 'outdent',
                preventDefault: () => { }
            }
            let nextEditor = {
                on: (temp, cb) => { cb(event) },
                targetElm: {
                    findChildren: (elem) => {
                        if (elem == 'ul') {
                            return {
                                length: 1
                            };
                        } else {
                            return {
                                length: 0
                            };
                        }
                    },
                    dispatchEvent: () => { }
                },
                selection: {...editor.selection,
                    getNode: () =>{ 
                        return {
                            className : 'blockquoteText'
                        }
                    } 
                },
                dom: domObj,
                setContent: () => { },
            }
            instance.props = {
                ...props,
                permissions: ["login", "logout"],
                tagName: "LIST",
                elementId: "work:urn",
                element: elementData.paragraph
            }
            component.update();
            instance.forceUpdate();
            let spyFunction = jest.spyOn(instance, 'getElementTypeForToolbar');
            spyFunction.mockImplementationOnce(()=>{
                return 'Blockquote'
            })
            const getContent = jest.spyOn(event.target, 'getContent');
            instance.editorBeforeExecCommand(nextEditor);
            expect(getContent).toHaveBeenCalled()
        })
    
    });

});
describe('------------------------------Test2 TINY_MCE_EDITOR------------------------------', () => {
    let selectEditor={
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
                tagName: 'code',
                className: 'poetryLine',
                closest: () => { },
                childNodes:[{
                    tagName: 'code',
                    className: 'poetryLine',
                }]
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
    const store = mockStore({ });
    let newProps = {
        ...props,
        permissions: ["login", "logout"],
        tagName: "CODE",
        elementId: "work:urn",
        element: elementData.blockCode
    }
    const component2 = mount(<Provider store={store}> < TinyMceEditor {...newProps} element={elementData.blockCode}/> </Provider>)
    let instance2 = component2.find('TinyMceEditor').instance();
    let tinymceDiv = document.createElement('div');
    tinymceDiv.id = editor.id;
    let tinymceDiv2 = document.createElement('p');
    tinymceDiv2.id = `cypress-${props.id}`
    tinymceDiv2.innerHTML = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>'
    tinymceDiv.appendChild(tinymceDiv2)
    document.body.appendChild(tinymceDiv)
    it('Test-B-Method--6--editorBeforeExecCommand --CASE_2--outdent--Element-BCE', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent',
            preventDefault: () => { }
        }
        let newEditor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: (elem) => {
                        return {
                            length: 0
                        };
                },
                dispatchEvent: () => { }
            },
            selection: selectEditor,
            dom: domObj,
            setContent: () => { },
        }
        let spyFunction = jest.spyOn(instance2, 'getElementTypeForToolbar');
        spyFunction.mockImplementationOnce(()=>{
            return 'Blockquote'
        })
        instance2.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "CODE",
            elementId: "work:urn",
            element: elementData.blockCode
        }
        component2.update();
        const getContent = jest.spyOn(event.target, 'getContent');
        instance2.editorBeforeExecCommand(newEditor);
        expect(getContent).toHaveBeenCalled()
    })
    it('Test-B-Method--2--onListButtonClick-with currentElement', () => {
        instance2.props = {
            ...newProps,
            element: showHide,
            currentElement: {
                type: "element-list", elementdata: { listtype: 'ordered', subtype: 'decimal' }
            }
        }
        component2.update();
        let mySpyFunction = jest.spyOn(instance2, 'onListButtonClick')
        instance2.onListButtonClick('ordered','decimal');
        expect(mySpyFunction).toHaveBeenCalledWith('ordered','decimal');
        expect(typeof instance2.props.onListSelect).toBe('function');
        mySpyFunction.mockClear()
    });
    it('Test-5.6-Method--3--editorExecCommand --For Glossary Italicizing-else',() => {
        let newSelection = {
            ...selectEditor,
            getNode: () => {
                return {
                    tagName: 'code',
                    className: 'poetryLine',
                    getAttribute: ()=>{
                        return 'glossaryId'
                    },
                    closest: () => { },
                    childNodes:[{
                        tagName: 'code',
                        className: 'poetryLine',
                        getAttribute: ()=>{
                            return 'glossaryId'
                        }
                    }]
                }
            }
        }
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'mceToggleFormat',
            value: 'italic'
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: newSelection,
            setContent: () => { },
            dom: {
                getParent() {
                    return {
                        querySelector: (sel) => {
                            if (sel=='dfn[data-uri="glossaryId"]') {
                                return {
                                    innerHTML: 'innerData',
                                    closest: ()=>{
                                        return {
                                            textContent :"la la la" ,
                                            innerHTML:"<em>la la la</em>",
                                            outerHTML :"<dfn></dfn>",
                                            parentNode:""
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        instance2.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "CODE",
            elementId: "work:urn",
            element: { type: "figure", figuretype: "codelisting" }
        }
        tinymce.$ = (selector) =>{
            if(selector=='code[id="cypress-1"]'){
                return {
                    children:()=>{}
                }
            }
        }
        component2.update();
        let mySpyFunction = jest.spyOn(instance2, 'editorExecCommand');
        instance2.editorExecCommand(nextEditor);
        expect(mySpyFunction).toHaveBeenCalled()
        expect(instance2.props.element.type).toBe('figure')
        expect(instance2.props.element.figuretype).toBe('codelisting')
    })
    it('Test-5.6-Method--3--editorExecCommand --For Glossary Italicizing-handleGlossaryForItalic else',() => {
        let newSelection = {
            ...selectEditor,
            getNode: () => {
                return {
                    tagName: 'DFN',
                    className: 'poetryLine',
                    getAttribute: ()=>{
                        return 'glossaryId'
                    },
                    closest: () => { },
                    childNodes:[{
                        tagName: 'DFN',
                        className: 'poetryLine',
                        getAttribute: ()=>{
                            return 'glossaryId'
                        }
                    }]
                }
            }
        }
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'mceToggleFormat',
            value: 'italic'
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: newSelection,
            setContent: () => { },
            dom: {
                getParent() {
                    return {
                        querySelector: (sel) => {
                            if (sel=='dfn[data-uri="glossaryId"]') {
                                return {
                                    innerHTML: 'innerData',
                                    closest: ()=>{
                                        return {
                                            textContent :"la la la" ,
                                            innerHTML:"<em>la la la</em>",
                                            outerHTML :"<dfn></dfn>",
                                            parentNode:""
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        instance2.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "CODE",
            elementId: "work:urn",
            element: { type: "figure", figuretype: "codelisting" }
        }
        tinymce.$ = (selector) =>{
            if(selector=='code[id="cypress-1"]'){
                return {
                    children:()=>{}
                }
            }
        }
        component2.update();
        let mySpyFunction = jest.spyOn(instance2, 'editorExecCommand');
        instance2.editorExecCommand(nextEditor);
        expect(mySpyFunction).toHaveBeenCalled()
        expect(instance2.props.element.type).toBe('figure')
        expect(instance2.props.element.figuretype).toBe('codelisting')
    })
    it('Test-5.6-Method--3--editorExecCommand --For Glossary Italicizing-handleGlossaryForItalic if',() => {
        let newSelection = {
            ...selectEditor,
            getNode: () => {
                return {
                    tagName: 'DFN',
                    className: 'poetryLine',
                    getAttribute: ()=>{
                        return 'glossaryId'
                    },
                    closest: () => { },
                    childNodes:[{
                        tagName: 'DFN',
                        className: 'poetryLine',
                        getAttribute: ()=>{
                            return 'glossaryId'
                        }
                    }]
                }
            }
        }
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'mceToggleFormat',
            value: 'italic'
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: newSelection,
            setContent: () => { },
            dom: {
                getParent() {
                    return {
                        querySelector: (sel) => {
                            if (sel=='dfn[data-uri="glossaryId"]') {
                                return {
                                    innerHTML: 'innerData',
                                    textContent :"la la la",
                                    closest: ()=>{
                                        return {
                                            textContent :"la la la",
                                            innerHTML:"<em>la la la</em>",
                                            outerHTML :"<dfn></dfn>",
                                            parentNode:""
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        instance2.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "CODE",
            elementId: "work:urn",
            element: { type: "figure", figuretype: "codelisting" }
        }
        tinymce.$ = (selector) =>{
            if(selector=='code[id="cypress-1"]'){
                return {
                    children:()=>{}
                }
            }
        }
        component2.update();
        let mySpyFunction = jest.spyOn(instance2, 'editorExecCommand');
        instance2.editorExecCommand(nextEditor);
        expect(mySpyFunction).toHaveBeenCalled()
        expect(instance2.props.element.type).toBe('figure')
        expect(instance2.props.element.figuretype).toBe('codelisting')
    })
    it('Test-5.6-Method--3--editorExecCommand --For Glossary Italicizing-handleGlossaryForItalic no tag',() => {
        let newSelection = {
            ...selectEditor,
            getNode: () => {
                return {
                    tagName: 'DFN',
                    className: 'poetryLine',
                    getAttribute: ()=>{
                        return 'glossaryId'
                    },
                    closest: () => { },
                    childNodes:[{
                        tagName: 'DFN',
                        className: 'poetryLine',
                        getAttribute: ()=>{
                            return 'glossaryId'
                        }
                    }]
                }
            }
        }
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'mceToggleFormat',
            value: 'italic'
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: newSelection,
            setContent: () => { },
            dom: {
                getParent() {
                    return {
                        querySelector: (sel) => {
                            if (sel=='dfn[data-uri="glossaryId"]') {
                                return {
                                    innerHTML: 'innerData',
                                    textContent :"la la la",
                                    closest: ()=>{
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        instance2.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "CODE",
            elementId: "work:urn",
            element: { type: "figure", figuretype: "codelisting" }
        }
        tinymce.$ = (selector) =>{
            if(selector=='code[id="cypress-1"]'){
                return {
                    children:()=>{}
                }
            }
        }
        component2.update();
        let mySpyFunction = jest.spyOn(instance2, 'editorExecCommand');
        instance2.editorExecCommand(nextEditor);
        expect(mySpyFunction).toHaveBeenCalled()
        expect(instance2.props.element.type).toBe('figure')
        expect(instance2.props.element.figuretype).toBe('codelisting')
    })
    it('Test-5.6-Method--3--editorExecCommand --For Glossary Italicizing-Blcokquote-true',() => {
        let newSelection = {
            ...selectEditor,
            getNode: () => {
                return {
                    tagName: 'code',
                    className: 'blockquoteTextCredit',
                    getAttribute: ()=>{
                        return 'glossaryId'
                    },
                    closest: () => { },
                    childNodes:[{
                        tagName: 'code',
                        className: 'blockquoteTextCredit',
                        getAttribute: ()=>{
                            return 'glossaryId'
                        }
                    }]
                }
            }
        }
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'mceToggleFormat',
            value: 'italic'
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: newSelection,
            setContent: () => { },
            dom: {
                getParent() {
                    return {
                        querySelector: (sel) => {
                            if (sel=='dfn[data-uri="glossaryId"]') {
                                return {
                                    innerHTML: 'innerData',
                                    closest: ()=>{
                                        return {
                                            textContent :"la la la" ,
                                            innerHTML:"<em>la la la</em>",
                                            outerHTML :"<dfn></dfn>",
                                            parentNode:""
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        instance2.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "CODE",
            elementId: "work:urn",
            element: { type: "element-blockfeature", subtype: "pullquote" }
        }
        tinymce.$ = (selector) =>{
            if(selector=='code[id="cypress-1"]'){
                return {
                    children:()=>{}
                }
            }
        }
        component2.update();
        let mySpyFunction = jest.spyOn(instance2, 'editorExecCommand');
        instance2.editorExecCommand(nextEditor);
        expect(mySpyFunction).toHaveBeenCalled()
        expect(instance2.props.element.type).toBe('element-blockfeature')
    })
    it('Test-5.6-Method--3--editorExecCommand --For Glossary Italicizing-Blcokquote-false',() => {
        let newSelection = {
            ...selectEditor,
            getNode: () => {
                return {
                    tagName: 'code',
                    className: 'blockquoteMargAttr',
                    getAttribute: ()=>{
                        return 'glossaryId'
                    },
                    closest: () => { },
                    childNodes:[{
                        tagName: 'code',
                        className: 'blockquoteMargAttr',
                        getAttribute: ()=>{
                            return 'glossaryId'
                        }
                    }]
                }
            }
        }
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'mceToggleFormat',
            value: 'italic'
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            selection: newSelection,
            setContent: () => { },
            dom: {
                getParent() {
                    return {
                        querySelector: (sel) => {
                            if (sel=='dfn[data-uri="glossaryId"]') {
                                return {
                                    innerHTML: 'innerData',
                                    closest: ()=>{
                                        return {
                                            textContent :"la la la" ,
                                            innerHTML:"<em>la la la</em>",
                                            outerHTML :"<dfn></dfn>",
                                            parentNode:""
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        instance2.props = {
            ...props,
            permissions: ["login", "logout"],
            tagName: "CODE",
            elementId: "work:urn",
            element: { type: "element-blockfeature", subtype: "pullquote" }
        }
        tinymce.$ = (selector) =>{
            if(selector=='code[id="cypress-1"]'){
                return {
                    children:()=>{}
                }
            }
        }
        component2.update();
        let mySpyFunction = jest.spyOn(instance2, 'editorExecCommand');
        instance2.editorExecCommand(nextEditor);
        expect(mySpyFunction).toHaveBeenCalled()
        expect(instance2.props.element.type).toBe('element-blockfeature')
    })
});
describe('------------------------------Test3 TINY_MCE_EDITOR blockquote if------------------------------', () => {
    let selectEditor={
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
                tagName: 'code',
                className: 'poetryLine',
                closest: () => { },
                childNodes:[{
                    tagName: 'code',
                    className: 'poetryLine',
                }]
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
    const store = mockStore({ });
    let newProps = {
        ...props,
        permissions: ["login", "logout"],
        tagName: "blockquote",
        elementId: "work:urn",
        element: {elementdata:{type:"blockquote"}},
        model:{
            text: '<blockquote class="blockquoteMarginalia" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"></p><p class="blockquote-hidden" contenteditable="false" style="visibility: hidden; height: 20px;">hidden</p><p class="blockquoteTextCredit" contenteditable="true" data-placeholder="Attribution Text"></p></blockquote>'
        }
    }
    const component2 = mount(<Provider store={store}> < TinyMceEditor {...newProps} /> </Provider>)
    let instance2 = component2.find('TinyMceEditor').instance();
    let tinymceDiv = document.createElement('div');
    tinymceDiv.id = editor.id;
    let tinymceDiv2 = document.createElement('p');
    tinymceDiv2.id = `cypress-${props.id}`
    tinymceDiv2.innerHTML = '<p>test Data</p>'
    tinymceDiv.appendChild(tinymceDiv2)
    document.body.appendChild(tinymceDiv)
});
describe('------------------------------Test3 TINY_MCE_EDITOR blockquote else------------------------------', () => {
    let selectEditor={
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
                tagName: 'code',
                className: 'poetryLine',
                closest: () => { },
                childNodes:[{
                    tagName: 'code',
                    className: 'poetryLine',
                }]
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
    const store = mockStore({ });
    let newProps = {
        ...props,
        permissions: ["login", "logout"],
        tagName: "blockquote",
        elementId: "work:urn",
        element: {elementdata:{type:"blockquote"}}
    }
    const component2 = mount(<Provider store={store}> < TinyMceEditor {...newProps} /> </Provider>)
    let instance2 = component2.find('TinyMceEditor').instance();
    let tinymceDiv = document.createElement('div');
    tinymceDiv.id = editor.id;
    let tinymceDiv2 = document.createElement('p');
    tinymceDiv2.id = `cypress-${props.id}`
    tinymceDiv2.innerHTML = '<p>test data</p>'
    tinymceDiv.appendChild(tinymceDiv2)
    document.body.appendChild(tinymceDiv)
});
describe('------------------------------Test4 TINY_MCE_EDITOR------------------------------', () => {
    let selectEditor={
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
                tagName: 'code',
                className: 'poetryLine',
                closest: () => { },
                childNodes:[{
                    tagName: 'code',
                    className: 'poetryLine',
                }]
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
    const store = mockStore({ });
    let newProps = {
        ...props,
        permissions: ["login", "logout"],
        tagName: "code",
        elementId: "work:urn",
        element: {elementdata:{type:"code"}}
    }
    const component2 = mount(<Provider store={store}> < TinyMceEditor {...newProps} /> </Provider>)
    let instance2 = component2.find('TinyMceEditor').instance();
    let tinymceDiv = document.createElement('div');
    tinymceDiv.id = editor.id;
    let tinymceDiv2 = document.createElement('p');
    tinymceDiv2.id = `cypress-${props.id}`
    tinymceDiv2.innerHTML = '<p>test data</p>'
    tinymceDiv.appendChild(tinymceDiv2)
    document.body.appendChild(tinymceDiv)
});
describe('------------------------------Test4 TINY_MCE_EDITOR------------------------------', () => {
    let selectEditor={
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
                tagName: 'code',
                className: 'poetryLine',
                closest: () => { },
                childNodes:[{
                    tagName: 'code',
                    className: 'poetryLine',
                }]
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
    const store = mockStore({ });
    let newProps = {
        ...props,
        permissions: ["login", "logout"],
        tagName: "h4",
        elementId: "work:urn",
        poetryField:"formatted-title",
        element:{
            type:"popup"
        },
        model:"<p class='paragraphNumeroUno'>test</p>"
    }
    const component2 = mount(<Provider store={store}> < TinyMceEditor {...newProps} /> </Provider>)
    let instance2 = component2.find('TinyMceEditor').instance();
    let tinymceDiv = document.createElement('div');
    tinymceDiv.id = editor.id;
    let tinymceDiv2 = document.createElement('p');
    tinymceDiv2.id = `cypress-${props.id}`
    tinymceDiv2.innerHTML = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>'
    tinymceDiv.appendChild(tinymceDiv2)
    document.body.appendChild(tinymceDiv)
});