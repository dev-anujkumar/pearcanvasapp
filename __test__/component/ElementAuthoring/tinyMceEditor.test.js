import React from 'react';
import { mount } from 'enzyme';
import tinymce from 'tinymce/tinymce';
import TinyMceEditor from '../../../src/component/tinyMceEditor'
import { getGlossaryFootnoteId } from "../../../src/js/glossaryFootnote"
import elementData from './elementData';
import * as utilFunction from '../../../src/js/utils';
import moxios from 'moxios';
import { JSDOM } from 'jsdom'
global.document = (new JSDOM()).window.Element;
Object.defineProperty(global.Element.prototype, 'innerText', {
    get() {
        return this.textContent;
    },
});
jest.mock('../../../src/js/utils', () => {
    return {
        checkforToolbarClick: () => {
            return true
        }
    }
})
jest.mock('../../../src/config/config.js', () => ({
    toolBarList: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    elementToolbar: [],
    headingToolbar: ['italic', 'clearformatting', 'increaseindent', 'footnote', 'mathml', 'chemml', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    codeListingToolbar: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    asideToolbar: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    labelToolbar: ['footnote', 'decreaseindent', 'glossary'],
    captionToolbar: ['decreaseindent', 'glossary'],
}));
// const callback = (res) => { }
const permissions = [
    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
]
describe('Testing TinyMCE Editor', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        tagName: "p",
        className: "",
        index: 1,
        element: elementData.paragraph,
        model: elementData.paragraph.html,
        handleBlur: jest.fn(),
        onListSelect: jest.fn(),
        learningObjectiveOperations: jest.fn(),
        elementId: elementData.paragraph.id,
        // glossaryFootnoteValue: {
        //     elementWorkId:,
        //     elementType:,
        //     glossaryfootnoteid:,
        //     type:,
        //     elementSubType:},
        openAssetPopoverPopUp: jest.fn(),
        placeholder: "Enter you text here",
        handleEditorFocus: jest.fn(),
        openGlossaryFootnotePopUp: jest.fn(),
    }
    let editorInstance = {
        current: {
            outerHTML: '<div id="cypress-1" class="cypress-editable place-holder mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p></div>',
            tabIndex: 0,
            tagName: "DIV",
            textContent: "hghfg bgjhgh hgjgjhello all",
            title: "",
            translate: true,
            hidden: false,
            id: "cypress-1",
            innerHTML: '<p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p>',
            innerText: "↵",
            inputMode: "",
            isConnected: true,
            isContentEditable: true,
            className: "cypress-editable",
            clientHeight: 64,
            clientLeft: 0,
            clientTop: 0,
            clientWidth: 670,
            contentEditable: "true",
        }
    }
    const component = mount(<TinyMceEditor {...props} />, { attachTo: document.body })
    let instance = component.instance();

    it('Test-Paragraph element', () => {
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
        instance.editorRef = editorInstance
    })
    it('Test-Function- normalKeyDownHandler---> for paragraph element', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                id: elementData.id
            }
        }
        instance.editorRef = editorInstance
        tinymce.activeEditor = {
            id: ""
        }
        const spynormalKeyDownHandler = jest.spyOn(instance, 'normalKeyDownHandler')
        instance.normalKeyDownHandler(event);
        expect(spynormalKeyDownHandler).toHaveBeenCalledWith(event);
        expect(spynormalKeyDownHandler).toHaveReturnedWith(false);
        spynormalKeyDownHandler.mockClear()
    })
    it('Test-Function- handleBlur---> for paragraph element', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            relatedTarget: {
                classList: []
            }
        }
        instance.editorRef = editorInstance
        tinymce.activeEditor = {
            id: ""
        }
        //     utilFunction.checkforToolbarClick=()=>{
        //         return true        
        // }
        const spyhandleBlur = jest.spyOn(instance, 'handleBlur')
        instance.handleBlur(event);
        expect(spyhandleBlur).toHaveBeenCalledWith(event);
        spyhandleBlur.mockClear()
    })
    it('Test-Function- toggleGlossaryandFootnotePopup', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            relatedTarget: {
                classList: []
            }
        }
        instance.editorRef = editorInstance
        tinymce.activeEditor = {
            id: ""
        }
        let status = true,
            popupType = "Footnote",
            glossaryfootnoteid = "urn:pearson:work:a9735d80-fe6c-43ce-8265-5cc27893db00";
        const spytoggleGlossaryandFootnotePopup = jest.spyOn(instance, 'toggleGlossaryandFootnotePopup')
        instance.toggleGlossaryandFootnotePopup(status, popupType, glossaryfootnoteid, callback);
        expect(spytoggleGlossaryandFootnotePopup).toHaveBeenCalled();
        spytoggleGlossaryandFootnotePopup.mockClear()
    })
    it('Test-Function- toggleGlossaryandFootnotePopup', () => {
        instance.editorRef = editorInstance
        tinymce.activeEditor = {
            id: ""
        }
        let status = true,
            popupType = "Footnote",
            glossaryfootnoteid = "urn:pearson:work:a9735d80-fe6c-43ce-8265-5cc27893db00";
        const spytoggleGlossaryandFootnotePopup = jest.spyOn(instance, 'toggleGlossaryandFootnotePopup')
        instance.toggleGlossaryandFootnotePopup(status, popupType, glossaryfootnoteid, callback);
        expect(spytoggleGlossaryandFootnotePopup).toHaveBeenCalled();
        spytoggleGlossaryandFootnotePopup.mockClear()
    })


})
beforeEach(() => moxios.install() )
    
afterEach(() => moxios.uninstall());

const callback = (res) => {}
describe('Testing tinyMce  component with  props', () => {
    let props={
        slateLockInfo:{
            isLocked:false
        },
        permissions : 'authoring_mathml',
        onListSelect: () => {}
    }
    const tinyMceEditor = shallow( <TinyMceEditor {...props}  /> )
    
    it('Test Tinymce Setup Call', () => {
        let editor = {
            ui: {
                registry: {
                    addIcon: () => {},
                    addToggleButton: () => {},
                    addButton: () => {}
                }
            },
            on: (temp, cb) => {},
            selection: {
                getContent: () => {
                    return 'abcde';
                }
            },
            targetElm: {
                classList: ""
            }
        }
        const setup = jest.spyOn(tinyMceEditor.instance().editorConfig, 'setup');
        tinyMceEditor.instance().editorConfig.setup(editor);
        expect(setup).toHaveBeenCalled();
    });
    it('Test Tinymce Setup Callback Call', () => {
        let editor = {
            on: () => {},
            shortcuts: {
                add: () => {}
            },
            getContentAreaContainer : () => {
                return true;
            }
        }
        const callback = jest.spyOn(tinyMceEditor.instance().editorConfig, 'init_instance_callback');
        tinyMceEditor.instance().editorConfig.init_instance_callback(editor);
        expect(callback).toHaveBeenCalled()
    });
    it('Test the method innerTextWithMathMl ', () => {
        let node = {
            childNodes : [
                {
                    childNodes:[]
                }
            ]
        }
        let result = tinyMceEditor.instance().innerTextWithMathMl(node);
        expect(result).toEqual("undefined");
    });
    it('Test the method onUnorderedListButtonClick  ', () => {
        tinyMceEditor.instance().onUnorderedListButtonClick("ABCDE");
        expect(typeof tinyMceEditor.instance().props.onListSelect).toBe('function');
    });
    it('Test editorExecCommand  method for indent', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent'
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            setContent: () => {}
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().editorExecCommand(editor);
        expect(setContent).toHaveBeenCalled()
    });
    it('Test editorExecCommand  method for outdent', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent'
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            setContent: () => {}
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().editorExecCommand(editor);
        expect(setContent).toHaveBeenCalled()
    });
    it('Test editorExecCommand  method for updateFormula', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'updateFormula'
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            selection : {
                bookmarkManager: {
                    moveToBookmark : () => {}
                }
            }
        }
        const moveToBookmark = jest.spyOn(editor.selection.bookmarkManager, 'moveToBookmark');
        tinyMceEditor.instance().editorExecCommand(editor);
        expect(moveToBookmark).toHaveBeenCalled()
    });
    it('Test handleIndent method for paragraphNumeroUno', () => {
        let editor = {
            on: (temp, cb) => {cb(event)},
            setContent: () => {}
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleIndent (null, editor, 'paragraphNumeroUno');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test handleIndent method for paragraphNumeroUnoIndentLevel1', () => {
        let editor = {
            on: (temp, cb) => {cb(event)},
            setContent: () => {}
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleIndent (null, editor, 'paragraphNumeroUno');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test handleIndent method for paragraphNumeroUnoIndentLevel2', () => {
        let editor = {
            on: (temp, cb) => {cb(event)},
            setContent: () => {}
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleIndent (null, editor, 'paragraphNumeroUno');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for outdent, ol', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent',
            preventDefault: () => {}
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            targetElm: {
                findChildren : () => {
                    return {
                        length: 1
                    };
                },
                dispatchEvent: ()=> {}
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for outdent, ul', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent',
            preventDefault: () => {}
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            targetElm: {
                findChildren : (elem) => {
                    if(elem == 'ul') {
                        return {
                            length: 1
                        };
                    } else {
                        return {
                            length: 0
                        };
                    }
                },
                dispatchEvent: ()=> {}
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for outdent', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent',
            preventDefault: () => {}
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            targetElm: {
                findChildren : () => {
                    return {
                        length: 0
                    };
                },
                dispatchEvent: ()=> {}
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for indent, ol', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent',
            preventDefault: () => {}
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            targetElm: {
                findChildren : () => {
                    return {
                        length: 1
                    };
                },
                dispatchEvent: ()=> {}
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for indent, ul', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent',
            preventDefault: () => {}
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            targetElm: {
                findChildren : (elem) => {
                    if(elem == 'ul') {
                        return {
                            length: 1
                        };
                    } else {
                        return {
                            length: 0
                        };
                    }
                },
                dispatchEvent: ()=> {}
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for indent', () => {
        let event = {
            target : {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent',
            preventDefault: () => {}
        }
        let editor = {
            on: (temp, cb) => {cb(event)},
            targetElm: {
                findChildren : () => {
                    return {
                        length: 0
                    };
                },
                dispatchEvent: ()=> {}
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorClick  method for false', () => {
        let editor = {
            on: (temp, cb) => {cb()},
            selection: {
                getContent: () => {
                    return {
                        length : 1
                    }
                }
            },
            targetElm: {
                classList: {
                    contains: () =>{
                        return false;
                    }
                }
            }
        }
        tinyMceEditor.instance().assetPopoverButtonState= {
            setDisabled: () =>{}
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().assetPopoverButtonState, 'setDisabled');
        tinyMceEditor.instance().editorClick(editor);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorClick  method for true', () => {
        let editor = {
            on: (temp, cb) => {cb()},
            selection: {
                getContent: () => {
                    return {
                        length : 0
                    }
                }
            },
            targetElm: {
                classList: {
                    contains: () =>{
                        return true;
                    }
                }
            }
        }
        tinyMceEditor.instance().assetPopoverButtonState= {
            setDisabled: () =>{}
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().assetPopoverButtonState, 'setDisabled');
        tinyMceEditor.instance().editorClick(editor);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist true for SUP', () => {
        let event = {
            target : {
                parentElement: {
                    nodeName: 'SUP'
                }, 
                dataset: {
                    uri : "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => {}
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist false for SUP', () => {
        let event = {
            target : {
                parentElement: {
                    nodeName: 'SUP'
                }, 
                dataset: {
                    uri : "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 0
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => {}
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist false for DNF', () => {
        let event = {
            target : {
                nodeName: 'DFN', 
                dataset: {
                    uri : "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 0
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => {}
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist true for DNF', () => {
        let event = {
            target : {
                nodeName: 'DFN', 
                dataset: {
                    uri : "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => {}
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist true for ABBR', () => {
        let event = {
            target : {
                nodeName: 'ABBR', 
                dataset: {
                    uri : "abcd"
                },
                attributes: {
                    'asset-id': {
                        nodeValue: "1-2-3-4"
                    },
                    'data-uri': {
                        nodeValue: "testuri"
                    }
                },
                closest: () => {
                    return false
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        tinyMceEditor.instance().editorOnClick(event);
    });
    it('Test editorOnClick method with alreadyExist true for unknown', () => {
        let event = {
            target : {
                nodeName: 'unknown', 
                dataset: {
                    uri : "abcd"
                },
                attributes: {
                    'asset-id': {
                        nodeValue: "1-2-3-4"
                    },
                    'data-uri': {
                        nodeValue: "testuri"
                    }
                },
                closest: () => {
                    return false
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        tinyMceEditor.instance().editorOnClick(event);
    });
    it('Test toggleGlossaryandFootnoteIcon method', () => {
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled :() => {}
        }
        tinyMceEditor.instance().footnoteBtnInstance  = {
            setDisabled :() => {}
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().toggleGlossaryandFootnoteIcon(true);
        expect(setDisabled).toHaveBeenCalled()
    });
})
describe('Test-Function-setInstanceToolbar -------->', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        tagName: "",
        className: "",
        index: 1,
        element: elementData.figure,
        model: elementData.figure.html,
        handleBlur: jest.fn(),
        onListSelect: jest.fn(),
        learningObjectiveOperations: jest.fn(),
        elementId: elementData.figure.id,
        openAssetPopoverPopUp: jest.fn(),
        placeholder: "Enter Label...",
        handleEditorFocus: jest.fn(),
        openGlossaryFootnotePopUp: jest.fn(),
    }
    let editorInstance = {
        current: {
            outerHTML: '<div id="cypress-1" class="cypress-editable place-holder mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p></div>',
            tabIndex: 0,
            tagName: "DIV",
            textContent: "hghfg bgjhgh hgjgjhello all",
            title: "",
            translate: true,
            hidden: false,
            id: "cypress-1",
            innerHTML: '<p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p>',
            innerText: "↵",
            inputMode: "",
            isConnected: true,
            isContentEditable: true,
            className: "cypress-editable",
            clientHeight: 64,
            clientLeft: 0,
            clientTop: 0,
            clientWidth: 670,
            contentEditable: "true",
        }
    }
    const component = mount(<TinyMceEditor {...props} />)
    let instance = component.find('TinyMceEditor').instance();
    it('Test- Label', () => {
        instance.editorRef = editorInstance
        const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
        instance.setInstanceToolbar();
        expect(spysetInstanceToolbar).toHaveBeenCalled();
        spysetInstanceToolbar.mockClear()
    })
    it('Test- Caption', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "figureCredit",
            className: "",
            index: 1,
            element: elementData.figure,
            model: elementData.figure.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.figure.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter Caption...",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props);
        let instance = component.find('TinyMceEditor').instance();
        instance.editorRef = editorInstance
        const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
        instance.setInstanceToolbar();
        expect(spysetInstanceToolbar).toHaveBeenCalled();
        spysetInstanceToolbar.mockClear()
    })
    it('Test- BCE', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "code",
            className: "",
            index: 1,
            element: elementData.codeEditor,
            model: elementData.codeEditor.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.codeEditor.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter block code...",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props);
        let instance = component.find('TinyMceEditor').instance();
        instance.editorRef = editorInstance
        const spysetInstanceToolbar = jest.spyOn(instance, 'setInstanceToolbar')
        instance.setInstanceToolbar();
        expect(spysetInstanceToolbar).toHaveBeenCalled();
        spysetInstanceToolbar.mockClear()
    })
})
describe('Test-Function-setToolbarByElementType -------->', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        tagName: "",
        className: "",
        index: 1,
        element: elementData.figure,
        model: elementData.figure.html,
        handleBlur: jest.fn(),
        onListSelect: jest.fn(),
        learningObjectiveOperations: jest.fn(),
        elementId: elementData.figure.id,
        openAssetPopoverPopUp: jest.fn(),
        placeholder: "Enter Label...",
        handleEditorFocus: jest.fn(),
        openGlossaryFootnotePopUp: jest.fn(),
    }
    let editorInstance = {
        current: {
            outerHTML: '<div id="cypress-1" class="cypress-editable place-holder mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p></div>',
            tabIndex: 0,
            tagName: "DIV",
            textContent: "hghfg bgjhgh hgjgjhello all",
            title: "",
            translate: true,
            hidden: false,
            id: "cypress-1",
            innerHTML: '<p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p>',
            innerText: "↵",
            inputMode: "",
            isConnected: true,
            isContentEditable: true,
            className: "cypress-editable",
            clientHeight: 64,
            clientLeft: 0,
            clientTop: 0,
            clientWidth: 670,
            contentEditable: "true",
        }
    }
    const component = mount(<TinyMceEditor {...props} />)
    let instance = component.find('TinyMceEditor').instance();
    it('Test- setToolbarByElementType', () => {
        instance.editorRef = editorInstance
        const spysetToolbarByElementType = jest.spyOn(instance, 'setToolbarByElementType')
        instance.setToolbarByElementType();
        expect(spysetToolbarByElementType).toHaveBeenCalled();
        spysetToolbarByElementType.mockClear()
    })
})
describe('Test-Function-handlePlaceholder-------->', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        tagName: "",
        className: "",
        index: 1,
        element: { type: "element-list" },
        handleBlur: jest.fn(),
        onListSelect: jest.fn(),
        learningObjectiveOperations: jest.fn(),
        openAssetPopoverPopUp: jest.fn(),
        placeholder: "Enter Label...",
        handleEditorFocus: jest.fn(),
        openGlossaryFootnotePopUp: jest.fn(),
    }
    let editorInstance = {
        current: {
            outerHTML: '<div id="cypress-1" class="cypress-editable place-holder mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p></div>',
            tabIndex: 0,
            tagName: "DIV",
            textContent: "hghfg bgjhgh hgjgjhello all",
            title: "",
            translate: true,
            hidden: false,
            id: "cypress-1",
            innerHTML: '<p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p>',
            innerText: "↵",
            inputMode: "",
            isConnected: true,
            isContentEditable: true,
            className: "cypress-editable",
            clientHeight: 64,
            clientLeft: 0,
            clientTop: 0,
            clientWidth: 670,
            contentEditable: "true",
        }
    }
    const component = mount(<TinyMceEditor {...props} />)
    let instance = component.find('TinyMceEditor').instance();
    it('Test- handlePlaceholder-LIST', () => {
        instance.editorRef = editorInstance
        const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
        instance.handlePlaceholder();
        expect(spyhandlePlaceholder).toHaveBeenCalled();
        spyhandlePlaceholder.mockClear()
    })
    it('Test- handlePlaceholder-Wirisformula', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "",
            className: "",
            index: 1,
            element: elementData.paragraphBlank,
            model: elementData.paragraphBlank.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.paragraphBlank.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props)
        let instance = component.find('TinyMceEditor').instance();;
        instance.editorRef = editorInstance
        const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
        instance.handlePlaceholder();
        expect(spyhandlePlaceholder).toHaveBeenCalled();
        spyhandlePlaceholder.mockClear()
    })
    it('Test- handlePlaceholder-figuredata.text', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "",
            className: "",
            index: 1,
            element: elementData.mathML_equation,
            model: elementData.mathML_equation,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.mathML_equation.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props)
        let instance = component.find('TinyMceEditor').instance();;
        instance.editorRef = editorInstance
        const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
        instance.handlePlaceholder();
        expect(spyhandlePlaceholder).toHaveBeenCalled();
        spyhandlePlaceholder.mockClear()
    })
    it('Test- handlePlaceholder-BCE', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "",
            className: "",
            index: 1,
            element: elementData.codeEditor,
            model: elementData.codeEditor,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.codeEditor.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props)
        let instance = component.find('TinyMceEditor').instance();;
        instance.editorRef = editorInstance
        const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholder')
        instance.handlePlaceholder();
        expect(spyhandlePlaceholder).toHaveBeenCalled();
        spyhandlePlaceholder.mockClear()
    })
})
describe('Test-TinyMCE Editor for other Elements', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        tagName: "blockquote",
        className: "",
        index: 1,
        element: elementData.marginalia,
        model: elementData.marginalia.html,
        handleBlur: jest.fn(),
        onListSelect: jest.fn(),
        learningObjectiveOperations: jest.fn(),
        elementId: elementData.marginalia.id,
        openAssetPopoverPopUp: jest.fn(),
        placeholder: "Enter you text here",
        handleEditorFocus: jest.fn(),
        openGlossaryFootnotePopUp: jest.fn(),
    }
    let editorInstance = {
        current: {
            outerHTML: '<div id="cypress-1" class="cypress-editable place-holder mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p></div>',
            tabIndex: 0,
            tagName: "DIV",
            textContent: "hghfg bgjhgh hgjgjhello all",
            title: "",
            translate: true,
            hidden: false,
            id: "cypress-1",
            innerHTML: '<p class="paragraphNumeroUno">&nbsp;hghfg bgjhgh hgjgjhello allg&nbsp;</p>',
            innerText: "↵",
            inputMode: "",
            isConnected: true,
            isContentEditable: true,
            className: "cypress-editable",
            clientHeight: 64,
            clientLeft: 0,
            clientTop: 0,
            clientWidth: 670,
            contentEditable: "true",
        }
    }
    const component = mount(<TinyMceEditor {...props} />)
    let instance = component.instance();
    it('Test-BlockQuote-marginalia element', () => {
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
        instance.editorRef = editorInstance
    })
    it('Test-BlockQuote-pullquote element', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "blockquote",
            className: "",
            index: 1,
            element: elementData.pullquote,
            model: elementData.pullquote.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.pullquote.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props)
        let instance = component.instance();
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
        instance.editorRef = editorInstance
    })
    it('Test-BlockQuote-marginalia with attribution element', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "blockquote",
            className: "",
            index: 1,
            element: elementData.marginalia_attribution,
            model: elementData.marginalia_attribution.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.marginalia_attribution.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props)
        let instance = component.instance();
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
        instance.editorRef = editorInstance
    })
    it('Test-BlockQuote-H4 element', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "h4",
            className: "",
            index: 1,
            element: elementData.heading4,
            model: elementData.heading4.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.heading4.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props)
        let instance = component.instance();
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
        instance.editorRef = editorInstance
    })
    xit('Test-BlockQuote-Code element', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            tagName: "blockquote",
            className: "",
            index: 1,
            element: elementData.marginalia_attribution,
            model: elementData.marginalia_attribution.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.marginalia_attribution.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props)
        let instance = component.instance();
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
        instance.editorRef = editorInstance
    })
})