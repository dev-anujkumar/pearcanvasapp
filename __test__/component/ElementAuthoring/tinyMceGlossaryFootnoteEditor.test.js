import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ReactEditor from '../../../src/component/tinyMceGlossaryFootnoteEditor'
import { tinymceFormulaIcon,tinymceFormulaChemistryIcon } from '../../../src/images/TinyMce/TinyMce';
import { JSDOM } from 'jsdom'
global.document = (new JSDOM()).window.Element;
if(!global.Element.prototype.hasOwnProperty("innerText")){
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });
}
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {};
let store = mockStore(initialState);
describe('Testing tinyMce component for glossary footnote with  props', () => {
    let props = {
        placeholder: "Type Something...",
        id: "glossary-0",
        glossaryFootNoteCurrentValue: "",
        className: "place-holder"
    }
   const tinyMceEditor = mount(<Provider store={store}><ReactEditor {...props}  /></Provider> , {attachTo: window.domNode} )
    it('Test for glossary', () => {
        tinyMceEditor.setProps({
            id: "glossary-0"
        });
        console.log("the tinymce editor is ", tinyMceEditor);
        expect(tinyMceEditor.instance().props.id).toEqual("glossary-0")
    });
    it('Editor Click Event', () => {
        let event = {
            preventDefault: () => { },
            stopPropagation: () => { },
            clientX: "",
            clientY: "",
            currentTarget: {
                id: "glossary-0"
            }
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
                getContent: () => { return ''}
            },
            getBody: () => {
                return '<p class="definition-editor  mce-content-body mce-edit-focus" placeholder="Type Something" contenteditable="true" id="glossary-1" style="position: relative;" spellcheck="false">Test</p>'
            },
            id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a"
        }
        tinymce.editors = [
            { id: "glossary-0" },
            { id: "footnote" }
        ]
        let elementDiv1 = document.createElement('div');
        elementDiv1.setAttribute('id', 'footnote')
        elementDiv1.innerHTML = '<p>Test</p>'
        document.body.appendChild(elementDiv1)
        let elementDiv2 = document.createElement('div');
        elementDiv2.setAttribute('id', 'glossary-0')
        elementDiv2.innerHTML = '<p>Test</p>'
        document.body.appendChild(elementDiv2)
        tinyMceEditor.find('p').simulate('click', event);
        expect(tinyMceEditor.find('#glossary-0').exists()).toBe(true)

    });
})
describe('Test- editor functions', () => {
    let props = {
        className: "definition-editor place-holder",
        glossaaryFootnotePopup: undefined,
        glossaryFootNoteCurrentValue: "<p>hello</p>",
        id: "glossary-0",
        placeholder: "Type Something",
        permissions: ["login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects", "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar", "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "note_search_comment", "note_viewer", "lo_edit_metadata"]
    }
    const component = mount(<Provider store={store}><ReactEditor {...props} /></Provider>, { attachTo: document.body })
    let instance = component.find('ReactEditor').instance();
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
                getContent: () => {
                    return '<p class="paragraphNumeroUno">hello</p>'
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        let args = {
            content: "hello",
            type: "pastepreprocess"
        }
        const spypastePreProcess = jest.spyOn(instance, 'pastePreProcess')
        instance.pastePreProcess({}, args);
        expect(spypastePreProcess).toHaveBeenCalled()
    });
    xit('Test pastePreProcess - else case', () => {
        tinymce.activeEditor = {
            innerHTML: '',
            innerText: "hello",
            textContent: "",
            outerHTML: '<div id="cypress-0" class="cypress-editable mce-content-body mce-edit-focus" placeholder="Type Something..." contenteditable="true" style="caret-color: black;" spellcheck="false"><p class="paragraphNumeroUno">hello</p></div>',
            selection: {
                getStart: () => {
                    return tinymce.activeEditor.innerHTML;
                },
                getContent: () => {
                    return 'test'
                }
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        let args = {
            content: "",
            type: "pastepreprocess"
        }
        const spypastePreProcess = jest.spyOn(instance, 'pastePreProcess')
        instance.pastePreProcess({}, args);
        expect(spypastePreProcess).toHaveBeenCalled()
    });
    it('Test addInlineCode-default case ', () => {
        window.getSelection().anchorNode.parentNode.innerHTML = "Hello"
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
            innerHTML: '<p class="paragraphNumeroUno">hello</p>',
            execCommand: jest.fn(),
            selection: {
                bookmarkManager: {
                    moveToBookmark: jest.fn(),
                    getBookmark: jest.fn()
                },
                getStart: () => {

                },
                getContent: () => {
                    return ""
                },
                setContent: () => { return '' }
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
                            remove: jest.fn()
                        }
                    }
                }
            },
            insertContent: jest.fn(),
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
                getContent: () => { return ''}
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        const spyaddInlineCode = jest.spyOn(instance, 'addInlineCode')
        instance.addInlineCode(editor);
        expect(spyaddInlineCode).toHaveBeenCalled()
    });
    it('Test addInlineCode-with <code> ', () => {
        window.getSelection().anchorNode.parentNode.innerHTML = "Hello"
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
            innerHTML: '<code class="paragraphNumeroUno">hello</code>',
            execCommand: jest.fn(),
            selection: {
                bookmarkManager: {
                    moveToBookmark: jest.fn(),
                    getBookmark: jest.fn()
                },
                getStart: () => {

                },
                getContent: () => {
                    return ""
                },
                setContent: () => { return '' }
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
                            remove: jest.fn()
                        }
                    }
                }
            },
            insertContent: jest.fn(),
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
                getContent: () => { return 'test'}
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        const spyaddInlineCode = jest.spyOn(instance, 'addInlineCode')
        instance.addInlineCode(editor);
        expect(spyaddInlineCode).toHaveBeenCalled()
    });
    it('Test handleFocussingInlineCode ', () => {
        // window.getSelection().anchorNode.parentNode.innerHTML="Hello"
        let api = {
            isActive: jest.fn(),
            isDisabled: jest.fn(),
            setActive: jest.fn(),
            setDisabled: jest.fn(),
        }
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

                },
                getContent: () => {
                    return ""
                },
                setContent: () => { return '' }
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
                            remove: jest.fn()
                        }
                    }
                }
            },
            children: ['<p class="paragraphNumeroUno">hello</p>'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus", 'place-holder'],
            formatter: {
                match: () => { },
                formatChanged: () => { return jest.fn() },
                unbind: () => { }
            }
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
                getContent: () => { return 'abc'}
            },
            children: ['p.paragraphNumeroUno'],
            classList: ["cypress-editable", "mce-content-body", "mce-edit-focus"]
        }
        const spyhandleFocussingInlineCode = jest.spyOn(instance, 'handleFocussingInlineCode')
        instance.handleFocussingInlineCode(api, editor);
        expect(spyhandleFocussingInlineCode).toHaveBeenCalled()
    });
    it('Test-Function- onEditorBlur', () => {
        let event = {
            preventDefault: jest.fn(),
            stopImmediatePropagation: jest.fn(),
        }
        let editor = {
            on: (temp, cb) => { cb(event) }
        }
        const spyhandleBlur = jest.spyOn(instance, 'onEditorBlur')
        instance.onEditorBlur(editor);
        expect(spyhandleBlur).toHaveBeenCalledWith(editor);
        spyhandleBlur.mockClear()
    })
    it('Test-Function- setChemistryFormulaIcon', () => {
        let event = {
            preventDefault: jest.fn(),
            stopImmediatePropagation: jest.fn(),
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            ui: {
                registry: {
                    addIcon: () => {
                        return tinymceFormulaChemistryIcon
                    }
                }
            }
        }
        const spysetChemistryFormulaIcon = jest.spyOn(instance, 'setChemistryFormulaIcon')
        instance.setChemistryFormulaIcon(editor);
        expect(spysetChemistryFormulaIcon).toHaveBeenCalledWith(editor);
        spysetChemistryFormulaIcon.mockClear()
    })
    it('Test-Function- setMathmlFormulaIcon', () => {
        let event = {
            preventDefault: jest.fn(),
            stopImmediatePropagation: jest.fn(),
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            ui: {
                registry: {
                    addIcon: () => {
                        return tinymceFormulaIcon
                    }
                }
            }
        }
        const spysetMathmlFormulaIcon = jest.spyOn(instance, 'setMathmlFormulaIcon')
        instance.setMathmlFormulaIcon(editor);
        expect(spysetMathmlFormulaIcon).toHaveBeenCalledWith(editor);
        spysetMathmlFormulaIcon.mockClear()
    })
    it('Test-Function- addChemistryFormulaButton', () => {
        let event = {
            preventDefault: jest.fn(),
            stopImmediatePropagation: jest.fn(),
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            ui: {
                registry: {
                    addButton: () => {
                        return tinymceFormulaChemistryIcon
                    }
                }
            }
        }
        const spyaddChemistryFormulaButton = jest.spyOn(instance, 'addChemistryFormulaButton')
        instance.addChemistryFormulaButton(editor);
        expect(spyaddChemistryFormulaButton).toHaveBeenCalledWith(editor);
        spyaddChemistryFormulaButton.mockClear()
    })
    it('Test-Function- addMathmlFormulaButton', () => {
        let event = {
            preventDefault: jest.fn(),
            stopImmediatePropagation: jest.fn(),
        }
        let editor = {
            on: (temp, cb) => { cb(event) },
            ui: {
                registry: {
                    addButton: () => {
                        return tinymceFormulaIcon
                    }
                }
            }
        }
        const spyaddMathmlFormulaButton = jest.spyOn(instance, 'addMathmlFormulaButton')
        instance.addMathmlFormulaButton(editor);
        expect(spyaddMathmlFormulaButton).toHaveBeenCalledWith(editor);
        spyaddMathmlFormulaButton.mockClear()
    })
    // Description - SetCursorAtEnd function is removed from JS file as it's not been used anywhere. So there is no need of this test case. 
    // it('Test setCursorAtEnd ', () => {
    //     let event = {
    //         preventDefault: () => { },
    //         stopPropagation: () => { }
    //     }
    //     let editor = {
    //         on: (temp, cb) => { cb(event) },
    //         innerHTML: '<p class="paragraphNumeroUno">hello</p>',
    //         execCommand: jest.fn(),
    //         selection: {
    //             select: () => { },
    //             collapse: () => {
    //                 return true;
    //             },
    //         },
    //         insertContent: jest.fn(),
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
    //         getBody: () => {
    //             return '<p class="definition-editor  mce-content-body mce-edit-focus" placeholder="Type Something" contenteditable="true" id="glossary-1" style="position: relative;" spellcheck="false">Test</p>'
    //         }
    //     }
    //     const spysetCursorAtEnd = jest.spyOn(instance, 'setCursorAtEnd')
    //     instance.setCursorAtEnd(editor);
    //     expect(spysetCursorAtEnd).toHaveBeenCalled()
    // });
    it("editorOnKeyup method", () => {
        let event = {
            target : {
                innerHTML: '<img class="Wirisformula"></img>',
            },
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
            dom : {
                getParent : function (){
                    return {
                        innerHTML: '<img class="Wirisformula"></img>',
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

            },
            selection : {
                getStart : function () { return event.target.innerHTML }
            }
        }
        const spyeditorOnKeyup = jest.spyOn(instance, 'editorOnKeyup')
        instance.editorOnKeyup(event, editor);
        expect(spyeditorOnKeyup).toHaveBeenCalled()
    })
    it("editorOnChange method", () => {
        let event = {
            target : {
                innerHTML: '<img class="Wirisformula"></img>',
                getContent : () => { return '<img class="Wirisformula"></img>' }
            },
            preventDefault: () => { },
            stopPropagation: () => { }
        }
        let editor = {
            dom : {
                getParent : function (){
                    return {
                        innerHTML: '<img class="Wirisformula"></img>',
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

            },
            selection : {
                getStart : function () { return event.target.innerHTML }
            }
        }
        const spyeditorOnChange = jest.spyOn(instance, 'editorOnChange')
        instance.editorOnChange(event, editor);
        expect(spyeditorOnChange).toHaveBeenCalled()
    })
})
describe('Test-Function-handlePlaceholer-------->', () => {
    let nextProps = {
        className: "definition-editor place-holder",
        glossaaryFootnotePopup: undefined,
        glossaryFootNoteCurrentValue: '<p>T<img class="Wirisformula"></img></p>',
        id: "glossary-0",
        placeholder: "Type Something",
        permissions: ["login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects", "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar", "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "note_search_comment", "note_viewer", "lo_edit_metadata"]
    }

    const component = mount(<Provider store={store}><ReactEditor {...nextProps} /></Provider>)
    let instance = component.find('ReactEditor').instance();
    it('Test- handlePlaceholder-1->else, 2->if', () => {
        const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholer')
        instance.handlePlaceholer();
        expect(spyhandlePlaceholder).toHaveBeenCalled();
        spyhandlePlaceholder.mockClear()
    })
    it('Test- handlePlaceholder-1->else, 2->else', () => {
        let newProps = {
            className: "definition-editor",
            glossaaryFootnotePopup: undefined,
            glossaryFootNoteCurrentValue: '',
            id: "glossary-0",
            placeholder: "Type Something",
            permissions: ["login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects", "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar", "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "note_search_comment", "note_viewer", "lo_edit_metadata"]
        }
        component.setProps(newProps)
        let instance = component.find('ReactEditor').instance();
        const spyhandlePlaceholder = jest.spyOn(instance, 'handlePlaceholer')
        instance.handlePlaceholer();
        expect(spyhandlePlaceholder).toHaveBeenCalled();
        spyhandlePlaceholder.mockClear()
    })
})
describe('Test- lifecycle methods', () => {
    let props = {
        className: "definition-editor place-holder",
        glossaaryFootnotePopup: undefined,
        glossaryFootNoteCurrentValue: "<p>hello</p>",
        id: "glossary-0",
        placeholder: "Type Something",
        permissions: ["login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects", "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar", "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "note_search_comment", "note_viewer", "lo_edit_metadata"]
    }
    const component = mount(<Provider store={store}><ReactEditor {...props} /></Provider>)
    let instance = component.find('ReactEditor').instance();
    it('Test-Function- componentDidMount', () => {
        tinymce.editors = [
            { id: "glossary" },
            { id: "footnote" }
        ]
        const spycomponentDidMount = jest.spyOn(instance, 'componentDidMount')
        instance.componentDidMount();
        expect(spycomponentDidMount).toHaveBeenCalled();
        spycomponentDidMount.mockClear()
    })
    it('Test-Function- componentDidUpdate', () => {
        document = { 
            ...document,
            getElementsByClassName : function() { 
                return [
                    {
                        parentElement : { id : "test" },
                        remove : () => {}
                    },
                    {
                        parentElement : { id : "test1" },
                        remove : () => {}
                    },
                    {
                        parentElement : { id : "test3" },
                        remove : () => {}
                    }
                ]
            }
        }
        const spycomponentDidUpdate = jest.spyOn(instance, 'componentDidUpdate')
        instance.componentDidUpdate();
        expect(spycomponentDidUpdate).toHaveBeenCalled();
        spycomponentDidUpdate.mockClear()
    })
    
})

describe('Test- other methods', () => {
    let props = {
        className: "definition-editor place-holder",
        glossaaryFootnotePopup: undefined,
        glossaryFootNoteCurrentValue: "<p>hello</p>",
        id: "glossary-0",
        placeholder: "Type Something",
        permissions: ["login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects", "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar", "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "note_search_comment", "note_viewer", "lo_edit_metadata"]
    }
    const component = mount(<Provider store={store}><ReactEditor {...props} /></Provider>)
    let instance = component.find('ReactEditor').instance();
    it('setGlossaryFootnoteTerm method - footnote', () => {
        const glossaryNode = {
            innerHTML : "Test data"
        }
        const spysetGlossaryFootnoteTerm = jest.spyOn(instance, 'setGlossaryFootnoteTerm')
        instance.setGlossaryFootnoteTerm('footnote-0', glossaryNode, glossaryNode);
        expect(spysetGlossaryFootnoteTerm).toHaveBeenCalled();
        spysetGlossaryFootnoteTerm.mockClear()
    })
    it('setGlossaryFootnoteNode method - footnote', () => {
        const glossaryNode = {
            innerHTML : "Test data"
        }
        const spysetGlossaryFootnoteNode = jest.spyOn(instance, 'setGlossaryFootnoteNode')
        instance.setGlossaryFootnoteNode('footnote-0', glossaryNode, glossaryNode);
        expect(spysetGlossaryFootnoteNode).toHaveBeenCalled();
        spysetGlossaryFootnoteNode.mockClear()
    })
    it('setGlossaryFootnoteNode method - glossary', () => {
        const glossaryNode = {
            innerHTML : "Test data"
        }
        const spysetGlossaryFootnoteNode = jest.spyOn(instance, 'setGlossaryFootnoteNode')
        instance.setGlossaryFootnoteNode('glossary-0', glossaryNode, glossaryNode);
        expect(spysetGlossaryFootnoteNode).toHaveBeenCalled();
        spysetGlossaryFootnoteNode.mockClear()
    })
    it("revertingTempContainerHtml method", () => {
        const editor = {
            id : "cypress-3",
            getContentAreaContainer : () => {
                return { innerHTML : "" }
            }
        }
        const spyrevertingTempContainerHtml = jest.spyOn(instance, 'revertingTempContainerHtml')
        instance.revertingTempContainerHtml(editor);
        expect(spyrevertingTempContainerHtml).toHaveBeenCalled();
        spyrevertingTempContainerHtml.mockClear()
    })
    it("onMathMLAction ", () => {
        const editor = {
            id : "cypress-3"
        }
        window['WirisPlugin'] = {
            instances : {
                [editor.id] : {
                    openNewFormulaEditor : () => { },
                    core : {
                        getCustomEditors : () => { return { disable : () => { return false } } }
                    },
                    getCore : () => { return { getCustomEditors : () => { return { enable : () => { } } } } }
                }
            }
        }
        const spyonMathMLAction = jest.spyOn(instance, 'onMathMLAction')
        instance.onMathMLAction(editor);
        expect(spyonMathMLAction).toHaveBeenCalled();
        spyonMathMLAction.mockClear()
    })
    it("onChemMLAction ", () => {
        const editor = {
            id : "cypress-3"
        }
        window['WirisPlugin'] = {
            instances : {
                [editor.id] : {
                    openNewFormulaEditor : () => { },
                    core : {
                        getCustomEditors : () => { return { disable : () => { return false } } }
                    },
                    getCore : () => { return { getCustomEditors : () => { return { enable : () => { } } } } }
                }
            }
        }
        const spyonChemMLAction = jest.spyOn(instance, 'onChemMLAction')
        instance.onChemMLAction(editor);
        expect(spyonChemMLAction).toHaveBeenCalled();
        spyonChemMLAction.mockClear()
    })
})
