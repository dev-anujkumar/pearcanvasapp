import React from 'react';
import { mount } from 'enzyme';
import tinymce from 'tinymce/tinymce';
import TinyMceEditor from '../../../src/component/tinyMceEditor'
import { getGlossaryFootnoteId } from "../../../src/js/glossaryFootnote"
import moxios from 'moxios';


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