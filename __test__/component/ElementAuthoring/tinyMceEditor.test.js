import React from 'react';
import { mount } from 'enzyme';
import tinymce from 'tinymce/tinymce';
import TinyMceEditor from '../../../src/component/tinyMceEditor'
import elementData from './elementData';
import { JSDOM } from 'jsdom'
import config from '../../../src/config/config.js';

global.document = (new JSDOM()).window.Element;
if(!global.Element.prototype.hasOwnProperty("innerText")){
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });
}

jest.mock('../../../src/js/utils', () => {
    return {
        checkforToolbarClick: () => {
            return true
        },
        
    }
})

jest.mock('../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions', () => {
    return {
        saveGlossaryAndFootnote: () => {
            return ;
        },
        
    }
})
jest.mock('../../../src/constants/utility.js', () => {
 return   {sendDataToIframe: jest.fn(),
    hasReviewerRole: ()=>{
        return true
    },
    guid: jest.fn()}
})
jest.mock('../../../src/js/glossaryFootnote.js', () => {
    return {
        getGlossaryFootnoteId: () => {
            return ;
        },
        
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
jest.mock('../../../src/config/config.js', () => ({
    toolBarList: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    elementToolbar: [],
    headingToolbar: ['italic', 'clearformatting', 'increaseindent', 'footnote', 'mathml', 'chemml', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    codeListingToolbar: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    asideToolbar: ['bold', 'italic', 'underline', 'strikethrough', 'clearformatting', 'increaseindent', 'decreaseindent', 'footnote', 'glossary', 'orderedlist', 'unorderedlist', 'mathml', 'chemml', 'inlinecode', 'superscript', 'subscript', 'specialcharactor', 'undo', 'redo', 'assetpopover', 'slatetag'],
    labelToolbar: ['footnote', 'decreaseindent', 'glossary'],
    captionToolbar: ['decreaseindent', 'glossary'],
    userId: 'c5Test01'
}));
const callback = (res) => { }
const permissions = [
    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview",
    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
]
describe('Testing TinyMCE Editor', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test02'
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
        },
    }
    const component = mount(<TinyMceEditor {...props} />, { attachTo: document.body })
    let instance = component.instance();

    it('Test-Paragraph element', () => {
        expect(component).toHaveLength(1);
        expect(instance).toBeDefined();
        instance.editorRef = editorInstance
    }) 
    it('Test-Function- normalKeyDownHandler---> for pullquote element', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                id: elementData.pullquote.id
            }
        }
        
        tinymce.activeEditor = {
            id: ""
        }
        let newPermissions = [
            "login", "logout"]
        let props = {
            permissions: newPermissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test02'
            },
            tagName: "p",
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
        const component = mount(<TinyMceEditor {...props} />)
        let instance = component.instance();
        instance.editorRef = editorInstance
        const spynormalKeyDownHandler = jest.spyOn(instance, 'normalKeyDownHandler')
        instance.normalKeyDownHandler(event);
        expect(spynormalKeyDownHandler).toHaveBeenCalledWith(event);
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
            id: "",
            getContent: jest.fn(),
            setContent: jest.fn()
        }
        //     utilFunction.checkforToolbarClick=()=>{
        //         return true        
        // }
        const spyhandleBlur = jest.spyOn(instance, 'handleBlur')
        instance.handleBlur(event);
        expect(spyhandleBlur).toHaveBeenCalledWith(event);
        spyhandleBlur.mockClear()
    })
    it('Test-Function- handleBlur---> for show hide element', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test02'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.showHide,
            model: elementData.showHide.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.showHide.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        const component = mount(<TinyMceEditor {...props} />)
        let instance = component.instance();
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            relatedTarget: {
                classList: []
            }
        }
        instance.editorRef = editorInstance
        tinymce.activeEditor = {
            id: "",
            getContent: jest.fn(),
            setContent: jest.fn()
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
    it('Test-Function- toggleGlossaryandFootnotePopup with savin progress true', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            relatedTarget: {
                classList: []
            }
        }
        config.savingInProgress=true;
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
    
    xit('Test editorMousedown ', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        config.userId="c5test01"

        let editor = {
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
                }
            }
        }
        const spyeditorMousedown = jest.spyOn(instance, 'editorMousedown')
        instance.editorMousedown(editor);
        expect(spyeditorMousedown).toHaveBeenCalled()
    });
    it('Test-componentWillUnmount', () => {
        const spycomponentWillUnmount = jest.spyOn(instance, 'componentWillUnmount')
        instance.editorRef = editorInstance
        instance.componentWillUnmount()
        expect(spycomponentWillUnmount).toHaveBeenCalled();

    })

})
describe('Testing tinyMce  component with  props', () => {
    global.document = (new JSDOM()).window.Element;
    if(!global.Element.prototype.hasOwnProperty("innerText")){
        Object.defineProperty(global.Element.prototype, 'innerText', {
            get() {
                return this.textContent;
            },
        });
    }
    let props = {
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test03'
        },
        element : {
            type : 'stanza'
        },
        permissions: permissions,
        onListSelect: () => { }
    }
    const tinyMceEditor = shallow(<TinyMceEditor {...props} />)

    it('Test Tinymce Setup Call', () => {
        let editor = {
            ui: {
                registry: {
                    addIcon: () => { },
                    addToggleButton: () => { },
                    addButton: () => { }
                }
            },
            on: (temp, cb) => { },
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
            on: () => { },
            shortcuts: {
                add: () => { }
            },
            getContentAreaContainer: () => {
                return true;
            }
        }
        const callback = jest.spyOn(tinyMceEditor.instance().editorConfig, 'init_instance_callback');
        tinyMceEditor.instance().editorConfig.init_instance_callback(editor);
        expect(callback).toHaveBeenCalled()
    });
    it('Test Tinymce Setup Callback Call with props', () => {
        let editor = {
            on: () => { },
            shortcuts: {
                add: () => { }
            },
            getContentAreaContainer: () => {
                return true;
            }
        }
        let newPermissions = [
            "login", "logout"]
        let props = {
            permissions: newPermissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test04'
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
            activeShowHide:jest.fn()
        }
        
        const component = mount(<TinyMceEditor {...props} />)
        const callback = jest.spyOn(component.instance().editorConfig, 'init_instance_callback');
        component.instance().editorConfig.init_instance_callback(editor);
        expect(callback).toHaveBeenCalled()
    });
    it('Test the method innerTextWithMathMl ', () => {
        let node = {
            childNodes: [
                {
                    childNodes: []
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
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent'
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                },
                getNode: () => {
                    return {
                        tagName: 'span',
                        className: 'poetryLine',
                        closest : () => {}
                    }
                },
                getRng: () => {
                    return {
                        setStart: () => {

                        },
                        setEnd: () => {
                            
                        }
                    }
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().editorExecCommand(editor);
        expect(setContent).toHaveBeenCalled()
    });
    it('Test editorExecCommand  method for outdent', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent'
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                },
                getNode: () => {
                    return {
                        tagName: 'span',
                        className: 'poetryLine',
                        closest : () => {}
                    }
                },
                getRng: () => {
                    return {
                        setStart: () => {

                        },
                        setEnd: () => {
                            
                        }
                    }
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().editorExecCommand(editor);
        expect(setContent).toHaveBeenCalled()
    });
    it('Test editorExecCommand  method for updateFormula', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'updateFormula'
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            selection: {
                bookmarkManager: {
                    moveToBookmark: () => { }
                },
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                },
                getNode: () => {
                    return {
                        tagName: 'span',
                        className: 'poetryLine',
                        closest : () => {}
                    }
                },
                getRng: () => {
                    return {
                        setStart: () => {

                        },
                        setEnd: () => {
                            
                        }
                    }
                }
            }
        }
        const moveToBookmark = jest.spyOn(editor.selection.bookmarkManager, 'moveToBookmark');
        tinyMceEditor.instance().editorExecCommand(editor);
        expect(moveToBookmark).toHaveBeenCalled()
    });
    it('Test handleIndent method for paragraphNumeroUno', () => {
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleIndent(null, editor, 'paragraphNumeroUno');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test handleIndent method for paragraphNumeroUnoIndentLevel1', () => {
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleIndent(null, editor, 'paragraphNumeroUnoIndentLevel1');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test handleIndent method for paragraphNumeroUnoIndentLevel2', () => {
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleIndent(null, editor, 'paragraphNumeroUnoIndentLevel2');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test handleOutdent method for paragraphNumeroUnoIndentLevel3', () => {
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleOutdent(null, editor, 'paragraphNumeroUnoIndentLevel3');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test handleOutdent method for paragraphNumeroUnoIndentLevel2', () => {
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleOutdent(null, editor, 'paragraphNumeroUnoIndentLevel2');
        expect(setContent).toHaveBeenCalled()
    });
    it('Test handleOutdent method for paragraphNumeroUnoIndentLevel1', () => {
        let editor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
            selection : {
                getBoundingClientRect : () => {
                    return {left:0, top:0}
                },
                placeCaretAt : (a,b) => {
                    return true
                }
            }
        }
        const setContent = jest.spyOn(editor, 'setContent');
        tinyMceEditor.instance().handleOutdent(null, editor, 'paragraphNumeroUnoIndentLevel1');
        expect(setContent).toHaveBeenCalled()
    });

    it('Test editorBeforeExecCommand  method for outdent, ol', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent',
            preventDefault: () => { }
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: () => {
                    return {
                        length: 1
                    };
                },
                dispatchEvent: () => { }
            }
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for outdent, ul', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent',
            preventDefault: () => { }
        }
        let editor = {
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
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for outdent', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'outdent',
            preventDefault: () => { }
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: () => {
                    return {
                        length: 0
                    };
                },
                dispatchEvent: () => { }
            },
            selection : {
                getNode: () => {
                    return {
                        tagName: 'span',
                        className: 'poetryLine',
                        closest : () => {}
                    }
                }
            }
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for indent, ol', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent',
            preventDefault: () => { }
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: () => {
                    return {
                        length: 1
                    };
                },
                dispatchEvent: () => { }
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for indent, ul', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent',
            preventDefault: () => { }
        }
        let editor = {
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
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for indent', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'indent',
            preventDefault: () => { }
        }
        let editor = {
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
                getNode: () => {
                    return {
                        tagName: 'span',
                        className: 'poetryLine',
                        closest : () => {}
                    }
                }
            }
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for FormatBlock', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'FormatBlock',
            preventDefault: () => { },
            value: "h5",
            stopPropagation: () => { }
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: () => {
                    return {
                        length: 0
                    };
                },
                dispatchEvent: () => { }
            },
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for mceInsertContent', () => {
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
        let editor = {
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
                    moveToBookmark: jest.fn()
                }
            }
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for mceShowCharmap', () => {
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
        let editor = {
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
                getBoundingClientRect: ()=>{
                    return {
                        left: '20px',
                        top:  '20px',
                        height: "40px",
                    }
                }
            },
            
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        tinyMceEditor.instance().editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorClick  method for false', () => {
        let editor = {
            on: (temp, cb) => { cb() },
            selection: {
                getContent: () => {
                    return {
                        length: 1
                    }
                }
            },
            targetElm: {
                classList: {
                    contains: () => {
                        return false;
                    }
                }
            }
        }
        tinyMceEditor.instance().assetPopoverButtonState = {
            setDisabled: () => { }
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().assetPopoverButtonState, 'setDisabled');
        tinyMceEditor.instance().editorClick(editor);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorClick  method for true', () => {
        let editor = {
            on: (temp, cb) => { cb() },
            selection: {
                getContent: () => {
                    return {
                        length: 0
                    }
                }
            },
            targetElm: {
                classList: {
                    contains: () => {
                        return true;
                    }
                }
            }
        }
        tinyMceEditor.instance().assetPopoverButtonState = {
            setDisabled: () => { }
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().assetPopoverButtonState, 'setDisabled');
        tinyMceEditor.instance().editorClick(editor);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist true for SUP', () => {
        let event = {
            target: {
                parentElement: {
                    nodeName: 'SUP'
                },
                dataset: {
                    uri: "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => { }
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist false for SUP', () => {
        let event = {
            target: {
                parentElement: {
                    nodeName: 'SUP'
                },
                dataset: {
                    uri: "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 0
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => { }
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist false for DNF', () => {
        let event = {
            target: {
                nodeName: 'DFN',
                dataset: {
                    uri: "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 0
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => { }
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist true for DNF', () => {
        let event = {
            target: {
                nodeName: 'DFN',
                dataset: {
                    uri: "abcd"
                }
            }
        }
        document.getElementsByClassName = () => {
            return {
                length: 1
            }
        }
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => { }
        }
        const setDisabled = jest.spyOn(tinyMceEditor.instance().glossaryBtnInstance, 'setDisabled');
        tinyMceEditor.instance().editorOnClick(event);
        expect(setDisabled).toHaveBeenCalled();
    });
    it('Test editorOnClick method with alreadyExist true for ABBR', () => {
        let event = {
            target: {
                nodeName: 'ABBR',
                dataset: {
                    uri: "abcd"
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
            target: {
                nodeName: 'unknown',
                dataset: {
                    uri: "abcd"
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
    it('Test editorOnClick method with alreadyExist true for props', () => {
        let event = {
            target: {
                nodeName: 'DFN',
                dataset: {
                    uri: "abcd"
            }
        }
    }
        
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test04'
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
            activeShowHide:jest.fn()
        }
        
        const component = mount(<TinyMceEditor {...props} />)
        document.getElementsByClassName = () => {
            return {
                length: 0
            }
        }
        component.instance().glossaryBtnInstance = {
            setDisabled: () => { }
        }
       // const setDisabled = jest.spyOn(component.instance().glossaryBtnInstance, 'setDisabled');
        component.instance().editorOnClick(event);
       // expect(setDisabled).toHaveBeenCalled();
    });
    it('Test toggleGlossaryandFootnoteIcon method', () => {
        tinyMceEditor.instance().glossaryBtnInstance = {
            setDisabled: () => { }
        }
        tinyMceEditor.instance().footnoteBtnInstance = {
            setDisabled: () => { }
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
            userId: 'c5Test04'
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
                userId: 'c5Test18'
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
                userId: 'c5Test06'
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
    it('Test- Show ', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test18'
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
            placeholder: "Enter Show text",
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
    it('Test- Hide ', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test18'
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
            placeholder: "Enter Hide text",
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
            userId: 'c5Test07'
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
            userId: 'c5Test08'
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
                userId: 'c5Test09'
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
                userId: 'c5Test10'
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
                userId: 'c5Test11'
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
describe('Test-TinyMCE Editor for Other Elements', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test12'
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
                userId: 'c5Test13'
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
                userId: 'c5Test14'
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
                userId: 'c5Test15'
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
    xit('Test-BlockQuote-H4 with popup element', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test15'
            },
            tagName: "h4",
            className: "",
            index: 1,
            element: elementData.popUp,
            model: elementData.popUp.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.popUp.id,
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
    it('Test editorBeforeExecCommand  method for RemoveFormat', () => {
        let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'RemoveFormat',
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: () => {
                    return {
                        length: 1
                    };
                },
                childNodes: [{ classList: ["blockquoteMarginalia"] }],
                dispatchEvent: () => { }
            },
            selection: {
                bookmarkManager: {
                    moveToBookmark: jest.fn(),
                    getBookmark: jest.fn()
                }
            }
        }
        const getContent = jest.spyOn(event.target, 'getContent');
        instance.editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for redo-if case', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test16'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.list,
            model: elementData.list.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.list.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
         let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'redo',
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: () => {
                    return {
                        length: 1
                    };
                },
                childNodes: [{ classList: ["blockquoteMarginalia"] }],
                dispatchEvent: () => { }
            },
            selection: {
                bookmarkManager: {
                    moveToBookmark: jest.fn(),
                    getBookmark: jest.fn()
                }
            }
        }
        component.setProps(props);
        let instance = component.instance();
        const getContent = jest.spyOn(event.target, 'getContent');
        instance.editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
    it('Test editorBeforeExecCommand  method for redo-else case', () => {
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test16'
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
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
         let event = {
            target: {
                getContent: () => {
                    return "Test"
                }
            },
            command: 'redo',
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            targetElm: {
                findChildren: () => {
                    return {
                        length: 1
                    };
                },
                childNodes: [{ classList: ["blockquoteMarginalia"] }],
                dispatchEvent: () => { }
            },
            selection: {
                bookmarkManager: {
                    moveToBookmark: jest.fn(),
                    getBookmark: jest.fn()
                }
            }
        }
        component.setProps(props);
        let instance = component.instance();
        const getContent = jest.spyOn(event.target, 'getContent');
        instance.editorBeforeExecCommand(editor);
        expect(getContent).toHaveBeenCalled()
    });
})
describe('Testing -Editor Key events', () => {
    let props = {
        permissions: permissions,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test16'
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
        openAssetPopoverPopUp: jest.fn(),
        placeholder: "Enter you text here",
        handleEditorFocus: jest.fn(),
        openGlossaryFootnotePopUp: jest.fn(),
        glossaryFootnoteValue: {
            elementSubType: undefined,
            elementType: "element-authoredtext",
            elementWorkId: elementData.paragraph.id,
            glossaryTermText: "hello ",
            glossaryfootnoteid: "urn:pearson:work:fab18e86-802c-409c-a1e1-ae9c687d094c",
            popUpStatus: true,
            type: "Glossary"
        }
    }
    const component = mount(<TinyMceEditor {...props} />)
    let instance = component.instance();

    it('Test editorKeyup ', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { },
        }
        let editor = {
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
                getStart: () => {
                    
                }
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        const spyeditorKeyup = jest.spyOn(instance, 'editorKeyup')
        instance.editorKeyup(editor);
        expect(spyeditorKeyup).toHaveBeenCalled()
    });
    it('Test editorKeydown - keyCode :9', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { },
            ctrlKey : true ,
            which: 88,
            keyCode :9
        }
        let editor = {
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
                getStart: () => {
                    
                }
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        const spyisTabPressed = jest.spyOn(instance,'isTabPressed')
        const spyFunction = jest.spyOn(instance, 'editorKeydown')
        instance.isTabPressed(event);
        instance.editorKeydown(editor);
        expect(spyFunction).toHaveBeenCalled()
        expect(spyisTabPressed).toHaveBeenCalled()
    });
    it('Test editorKeydown - keyCode :86', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { },
            ctrlKey : true ,
            keyCode :86
        }
        let editor = {
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
                getStart:jest.fn()
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        const spyisTabPressed = jest.spyOn(instance,'isTabPressed')
        const spyFunction = jest.spyOn(instance, 'editorKeydown')
        instance.isTabPressed(event);
        instance.editorKeydown(editor);
        expect(spyFunction).toHaveBeenCalled()
        expect(spyisTabPressed).toHaveBeenCalled()
    });

    it('Test editorKeydown - keyCode :13', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { },
            ctrlKey : true ,
            keyCode :13
        }
        let editor = {
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
                getStart:jest.fn()
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test16'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.showHide,
            model: elementData.showHide.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.showHide.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
            currentElement:{
                type:"paragraph"
            },
            createShowHideElement:jest.fn()
        }
        const component = mount(<TinyMceEditor {...props} />)
        let instance = component.instance();
        const spyFunction = jest.spyOn(instance, 'editorKeydown')
        instance.editorKeydown(editor);
        expect(spyFunction).toHaveBeenCalled()
    });
    it('Test isTabPressed - keyCode :88', () => {
        let keyDownEvent = {
            which: 88,
            ctrlKey : true ,
        }
        const spyisTabPressed = jest.spyOn(instance, 'isTabPressed')
        instance.isTabPressed(keyDownEvent);
        expect(spyisTabPressed).toHaveBeenCalled()
    });
    
    // it('Test addInlineCode ', () => {
    //     window.getSelection().anchorNode.parentNode.innerHTML="Hello"
    //     let event = {
    //         preventDefault: () => { },
    //         stopPropagation: () => { }
    //     }
    //     let editor = {
    //         on: (temp, cb) => { cb(event) },
    //         targetElm: {
    //             findChildren: () => {
    //                 return {
    //                     length: 0
    //                 };
    //             },
    //             dispatchEvent: () => { }
    //         },
    //         selection: {
    //             bookmarkManager: {
    //                 moveToBookmark: jest.fn(),
    //                 getBookmark: jest.fn()
    //             },
    //             getStart: () => {
                    
    //             },
    //             getContent: ()=>{
    //                 return ""
    //             },
    //             setContent: ()=>{ return''}
    //         },
    //         dom: {
    //             getParent: () => {
    //                 return {
    //                     innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
    //                     children: [
    //                         {
    //                             tagName: 'BR'
    //                         }
    //                     ],
    //                     innerText: "hello",
    //                     querySelectorAll: jest.fn(),
    //                     classList: {
    //                         remove:jest.fn()
    //                     }
    //                 }
    //             }
    //         },
    //         children: ['<p class="paragraphNumeroUno">hello</p>'],
    //         classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
    //     }
    //     tinymce.activeEditor = {
    //         innerHTML: '<p class="paragraphNumeroUno">hello</p>',
    //         innerText: "hello",
    //         textContent: "hello",
    //         outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
    //         selection: {
    //             getStart: () => {
    //                 return tinymce.activeEditor.innerHTML;
    //             }
    //         },
    //         children: ['p.paragraphNumeroUno'],
    //         classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
    //     }
    //     const spyaddInlineCode = jest.spyOn(instance, 'addInlineCode')
    //     instance.addInlineCode(editor);
    //     expect(spyaddInlineCode).toHaveBeenCalled()
    // });
    // it('Test handleFocussingInlineCode ', () => {
    //     let api={
    //         isActive: jest.fn(),
    //         isDisabled: jest.fn(),
    //         setActive: jest.fn(),
    //         setDisabled: jest.fn(),
    //     }
    //     let event = {
    //         preventDefault: () => { },
    //         stopPropagation: () => { }
    //     }
    //     let editor = {
    //         on: (temp, cb) => { cb(event) },
    //         targetElm: {
    //             findChildren: () => {
    //                 return {
    //                     length: 0
    //                 };
    //             },
    //             dispatchEvent: () => { }
    //         },
    //         selection: {
    //             bookmarkManager: {
    //                 moveToBookmark: jest.fn(),
    //                 getBookmark: jest.fn()
    //             },
    //             getStart: () => {
                    
    //             },
    //             getContent: ()=>{
    //                 return ""
    //             },
    //             setContent: ()=>{ return''}
    //         },
    //         dom: {
    //             getParent: () => {
    //                 return {
    //                     innerHTML: '<p class="paragraphNumeroUno place-holder">hello<ol></ol><ul></ul></p>',
    //                     children: [
    //                         {
    //                             tagName: 'BR'
    //                         }
    //                     ],
    //                     innerText: "hello",
    //                     querySelectorAll: jest.fn(),
    //                     classList: {
    //                         remove:jest.fn()
    //                     }
    //                 }
    //             }
    //         },
    //         children: ['<p class="paragraphNumeroUno">hello</p>'],
    //         classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder'],
    //         formatter:{
    //             match:()=>{},
    //             formatChanged: ()=>{ return jest.fn()},
    //             unbind: ()=>{}
    //         }
    //     }
    //     tinymce.activeEditor = {
    //         innerHTML: '<p class="paragraphNumeroUno">hello</p>',
    //         innerText: "hello",
    //         textContent: "hello",
    //         outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
    //         selection: {
    //             getStart: () => {
    //                 return tinymce.activeEditor.innerHTML;
    //             }
    //         },
    //         children: ['p.paragraphNumeroUno'],
    //         classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
    //     }
    //     const spyhandleFocussingInlineCode = jest.spyOn(instance, 'handleFocussingInlineCode')
    //     instance.handleFocussingInlineCode(api,editor);
    //     expect(spyhandleFocussingInlineCode).toHaveBeenCalled()
    // });
    xit('Test addAssetPopover ', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let selectedText="Hello"
        let editor = {
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
                getStart: () => {
                    
                },
                getContent: ()=>{
                    return ""
                },
                setContent: ()=>{ return''}
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder'],
            formatter:{
                match:()=>{},
                formatChanged: ()=>{ return jest.fn()},
                unbind: ()=>{}
            },
            insertContent: jest.fn()
        }
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        const spyaddAssetPopover = jest.spyOn(instance, 'addAssetPopover')
        instance.addAssetPopover(editor, selectedText);
        expect(spyaddAssetPopover).toHaveBeenCalled()
    })
    it('Test onBeforeIndent method', () => {
        let event={
            preventDefault: jest.fn()
        }
        const spyFunction = jest.spyOn(instance, 'onBeforeIndent');
        instance.onBeforeIndent(event, 'paragraphNumeroUnoIndentLevel3');
        expect(spyFunction).toHaveBeenCalled()
    });
    it('Test onBeforeOutdent method', () => {
        let event={
            preventDefault: jest.fn()
        }
        const spyFunction = jest.spyOn(instance, 'onBeforeOutdent');
        instance.onBeforeOutdent(event, 'paragraphNumeroUno');
        expect(spyFunction).toHaveBeenCalled()
    });
    it('Test pastePreProcess - else case', () => {
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                },
                getContent:() => {
                    return '<p class="paragraphNumeroUno">hello</p>'
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        let plugin={},
        args={
            content: "<ul>hello</ul>"
        }
        const spypastePreProcess = jest.spyOn(instance, 'pastePreProcess')
        instance.pastePreProcess(plugin,args);
        expect(spypastePreProcess).toHaveBeenCalled()
    });
    it('Test pastePreProcess - if case', () => {
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                },
                getContent:() => {
                    return ''
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        let plugin={},
        args={
            content: "<ul>hello</ul>"
        }
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test16'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.list,
            model: elementData.list.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.list.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
        }
        component.setProps(props);
        let instance = component.instance();
        const spypastePreProcess = jest.spyOn(instance, 'pastePreProcess')
        instance.pastePreProcess(plugin,args);
        expect(spypastePreProcess).toHaveBeenCalled()
    });
    it('Test addFootnote', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
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
                getStart: () => {
                    
                }
            },
            insertContent:()=>{
                return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                },
                getContent:() => {
                    return '<p class="paragraphNumeroUno">hello</p>'
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        config.savingInProgress= true
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test02'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.popUp,
            model: elementData.popUp.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.popUp.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
            showHideType:jest.fn()
        }
        const component = mount(<TinyMceEditor {...props} />)
        let instance=component.instance()
        const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
        instance.addFootnote(editor);
        expect(spyaddFootnote).toHaveBeenCalled()
    });

    it('Test addFootnote witth saving call false', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
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
                getStart: () => {
                    
                }
            },
            insertContent:()=>{
                return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                },
                getContent:() => {
                    return '<p class="paragraphNumeroUno">hello</p>'
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        config.savingInProgress= false
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test02'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.popUp,
            model: elementData.popUp.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.popUp.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
            showHideType:jest.fn(),
            currentElement:{
                id:""
            }
        }
        const component = mount(<TinyMceEditor {...props} />)
        let instance=component.instance()
        const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
        instance.addFootnote(editor);
        expect(spyaddFootnote).toHaveBeenCalled()
    });
    it('Test addFootnote witth saving call false except for popup', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
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
                getStart: () => {
                    
                }
            },
            insertContent:()=>{
                return '<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>'
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                },
                getContent:() => {
                    return '<p class="paragraphNumeroUno">hello</p>'
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        config.savingInProgress= false
        let props = {
            permissions: permissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test02'
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
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
            showHideType:jest.fn(),
            currentElement:{
                id:""
            }
        }
        const component = mount(<TinyMceEditor {...props} />)
        let instance=component.instance()
        const spyaddFootnote = jest.spyOn(instance, 'addFootnote')
        instance.addFootnote(editor);
        expect(spyaddFootnote).toHaveBeenCalled()
    });
    xit('Test addGlossary ', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
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
                getStart: () => { },
                getContent: () => { }
            },
            insertContent:()=>{
                return '<dfn data-uri= ${res.data.id} class="Pearson-Component GlossaryTerm">${selectedText}</dfn>'
            },
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
                            remove:jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder']
        }
        tinymce.activeEditor = {
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            innerText: "hello",
            textContent: "hello",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                },
                getContent:() => {
                    return '<p class="paragraphNumeroUno">hello</p>'
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        const spyaddGlossary = jest.spyOn(instance, 'addGlossary')
        instance.addGlossary(editor);
        expect(spyaddGlossary).toHaveBeenCalled()
    });
    xit('Test saveContent   method for ', () => {
      
        const spyhandleBlur = jest.spyOn(instance, 'saveContent')
        instance.saveContent();
        expect(spyhandleBlur).toHaveBeenCalled(event);
        spyhandleBlur.mockClear()
    });
    it('Test learningObjectiveDropdown   method for ', () => {
      
        const spyhandleBlur = jest.spyOn(instance, 'learningObjectiveDropdown')
        instance.learningObjectiveDropdown("add");
        expect(spyhandleBlur).toHaveBeenCalled();
        spyhandleBlur.mockClear()
    });
    it('Test handleClick method for ', () => {
        let newPermissions = [
            "login", "logout"]
        let props = {
            permissions: newPermissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test02'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.showHide,
            model: elementData.showHide.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.showHide.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
            showHideType:jest.fn()
        }
        const component = mount(<TinyMceEditor {...props} />)
        let instance = component.instance();
      
        let event={
            clientX:jest.fn(),
            clientY:jest.fn(),
            currentTarget:{id:"123", focus: jest.fn()},
            target: {
                parentElement: {
                    nodeName: 'SUP'
                },
                dataset: {
                    uri: "abcd"
                }
            }
        }
        
        tinymce.activeEditor = {
            id: "",
            targetElm:{
                closest: jest.fn(),
                getAttribute:() => {
                    return {
                        length: 0
                    };
                },
                setAttribute:()=>{
                    return{
                        length:1
                    }
                },
                dispatchEvent: () => { }
            }
        }
        instance.glossaryBtnInstance = {
            setDisabled: () => { }
        }
        const spyhandleBlur = jest.spyOn(instance, 'handleClick')
        instance.handleClick(event);
        expect(spyhandleBlur).toHaveBeenCalled();
        spyhandleBlur.mockClear()
        
        
    });
    it('Test handleClick different target method for ', () => {
        let newPermissions = [
            "login", "logout"]
        let props = {
            permissions: newPermissions,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test02'
            },
            tagName: "p",
            className: "",
            index: 1,
            element: elementData.showHide,
            model: elementData.showHide.html,
            handleBlur: jest.fn(),
            onListSelect: jest.fn(),
            learningObjectiveOperations: jest.fn(),
            elementId: elementData.showHide.id,
            openAssetPopoverPopUp: jest.fn(),
            placeholder: "Enter you text here",
            handleEditorFocus: jest.fn(),
            openGlossaryFootnotePopUp: jest.fn(),
            showHideType:jest.fn()
        }
        const component = mount(<TinyMceEditor {...props} />)
        let instance = component.instance();
      
        let event={
            clientX:jest.fn(),
            clientY:jest.fn(),
            currentTarget:{id:"89966",focus:jest.fn()},
            target: {
                parentElement: {
                    nodeName: 'SUP'
                },
                dataset: {
                    uri: "abcd"
                }
            }
        }
        
        tinymce.activeEditor = {
            id: "",
            targetElm:{
                closest: jest.fn(),
                getAttribute:() => {
                    return {
                        length: 0
                    };
                },
                setAttribute:()=>{
                    return{
                        length:1
                    }
                },
                dispatchEvent: () => { }
            }
        }
        instance.glossaryBtnInstance = {
            setDisabled: () => { }
        }
        const spyhandleBlur = jest.spyOn(instance, 'handleClick')
        instance.handleClick(event);
        expect(spyhandleBlur).toHaveBeenCalled();
        spyhandleBlur.mockClear()
        
        
    });
   
})


