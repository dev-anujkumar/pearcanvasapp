/**************************Import Plugins**************************/
import React from 'react';
import { JSDOM } from 'jsdom'
import tinymce from 'tinymce/tinymce';
import { mount } from 'enzyme';
/**************************Import Modules**************************/
import config from '../../../src/config/config.js';
import TinyMceEditor from '../../../src/component/tinyMceEditor'
import elementData from './elementData';

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
            return true
        },
        spanHandlers: {
            handleFormattingTags: jest.fn(),
            handleExtraTags: jest.fn(),
            handleBackSpaceAndDeleteKyeDown: jest.fn(),
            handleBackSpaceAndDeleteKyeUp: jest.fn(),
            handleRemoveFormattingOnSpan: jest.fn(),
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
        }
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
    }
})
jest.mock('../../../src/js/glossaryFootnote.js', () => {
    return {
        getGlossaryFootnoteId: () => {
            return;
        }
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
        bindKeyDownEvent: () => { }
    }
})
jest.mock("../../../src/component/AssetPopover/openApoFunction.js", () => {
    return { authorAssetPopOver: jest.fn() }
})
jest.mock('../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions', () => {
    return {
        saveGlossaryAndFootnote: () => {
            return;
        }
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
config.hideToolbar = ['footnote', 'glossary', 'assetpopover', 'orderedlist', 'unorderedlist']
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
    glossaryFootnoteValue: glossaryFootnoteObject
}
let tinyMceEditor = {
    $: jest.fn(),
    bodyElement: {},
    bookmark: {},
    contentAreaContainer: {},
    contentDocument: document,
    contentStyles: [],
    contentWindow: { parent: Window, opener: null, top: Window, length: 0, frames: Window, },
    dom: { doc: document, settings: {}, win: Window, files: {}, stdMode: true },
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
                closest: () => { }
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
describe('------------------------------Test TINY_MCE_EDITOR------------------------------', () => {

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
    const component = mount(< TinyMceEditor {...props} />, { attachTo: document.body })
    let instance = component.instance();
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
        const callback = jest.spyOn(component.instance().editorConfig, 'init_instance_callback');
        component.instance().editorConfig.init_instance_callback(editor);
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
            let result = component.instance().innerTextWithMathMl(node);
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
            let result = component.instance().innerTextWithMathMl(node);
            expect(mySpyFunction).toHaveBeenCalled();
            mySpyFunction.mockClear()
        });
    });
    it('Test-4-Method--2--onUnorderedListButtonClick', () => {
        let mySpyFunction = jest.spyOn(instance, 'onUnorderedListButtonClick')
        instance.onUnorderedListButtonClick('decimal');
        expect(mySpyFunction).toHaveBeenCalledWith('decimal');
        expect(typeof instance.props.onListSelect).toBe('function');
        mySpyFunction.mockClear()
    });
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
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            })
            component.update();
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
            }
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "CODE",
                elementId: "work:urn",
                element: { type: "figure", figuretype: "codelisting" }
            })
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
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            })
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
            component.setProps({
                ...props,
                permissions: ["login", "logout"],
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "stanza" }
            })
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
                element: { type: "figure", figuretype: "codelisting" }
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
        it('Test-8.6-Method--6--editorBeforeExecCommand --CASE_6--FormatBlock', () => {
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
        it('Test-8.7-Method--6--editorBeforeExecCommand --CASE_7--redo', () => {
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
                tagName: "P",
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
                tagName: "P",
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
                tagName: "P",
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
                tagName: "P",
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
                tagName: "P",
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
    xit('Removed Test-17-Method--15--addInlineCode', () => {
        window.getSelection = () => {
            return {
                removeAllRanges: () => { },
                toString: () => {
                    return "hello TEST"
                },
                anchorNode: {
                    parentNode: {
                        nodeName: "CODE",
                        innerHTML: "<code>Hello</code>",
                        outerHTML: "<pre><code>Hello</code></pre>"
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
        }
        const spyaddInlineCode = jest.spyOn(instance, 'addInlineCode')
        instance.addInlineCode(nextEditor);
        expect(spyaddInlineCode).toHaveBeenCalled()
        spyaddInlineCode.mockClear()
    })
    xit('Removed Test-18-Method--16--handleFocussingInlineCode', () => {
        let apiData = {
            isActive: jest.fn(),
            isDisabled: jest.fn(),
            setActive: jest.fn(),
            setDisabled: jest.fn(),
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
            }
        }
        const spyhandleFocussingInlineCode = jest.spyOn(instance, 'handleFocussingInlineCode')
        instance.handleFocussingInlineCode(apiData, nextEditor);
        expect(spyhandleFocussingInlineCode).toHaveBeenCalled()
        spyhandleFocussingInlineCode.mockClear()
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
                tagName: "SPAN",
                elementId: "work:urn",
                element: { type: "popup" },
                popupField: "formatted-title",
                currentElement: undefined
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
                    setContent: () => { }
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
        instance.handleBlur = jest.fn()
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
        instance.handleBlur = jest.fn()
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
                    id: ""
                },
                type: "paste",
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
                    id: ""
                },
                type: "paste",
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
                selection: editor.selection,
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

    });
    xit('Test-NA-Method--NA--makeReplace', () => {
        let formattingdata = {
            innerHTML: "<bold>THIS IS BCE</bold>",
        },
            parentNodeData = {
                nodeName: 'SPAN', className: 'notBCE',
                parentElement: {
                    nodeName: 'SPAN', className: 'notBCE',
                    parentNode: { nodeName: 'SPAN', className: 'notBCE' }
                },
                getElementsByTagName: () => {
                    return formattingdata
                },
                removeChild: () => { },
                innerHTML: "<span>THIS IS BCE</span>",

            };

        let innerSpanData = [
            {
                parentNode: {
                    nodeName: 'IMG', className: 'class1',
                    parentNode: parentNodeData,
                    parentElement: {
                        nodeName: 'SPAN', className: 'class2',
                        parentNode: parentNodeData,
                        getElementsByTagName: () => { return formattingdata },
                        // removeChild:()=>{}
                    },
                    removeChild: () => { }
                },
                parentElement: {
                    nodeName: 'IMG', className: 'class3', parentNode: parentNodeData, getElementsByTagName: () => { return formattingdata },
                    removeChild: () => { }
                },
                childNodes: [{ nodeType: "SPAN", textContent: "SampleText" }],
                getElementsByClassName: () => { return {} },
                // removeChild:()=>{}
            }
        ]

        document.getElementsByClassName = () => {
            return innerSpanData
        }

        const spymakeReplace = jest.spyOn(instance, 'makeReplace')
        instance.makeReplace();
        expect(spymakeReplace).toHaveBeenCalled()
    });
});
