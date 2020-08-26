import {
    insertUoListButton,
    insertListButton,
    positionListDrop,
    removeTinyDefaultAttribute,
    preventRemoveAllFormatting,
    bindKeyDownEvent,
    updateNestedList,
    highlightListIcon
} from '../../../src/component/ListElement/eventBinding';

describe('Testing Event Binding Methods', () => {
    let onIconClick = () => { };
    it('Test insertUoListButton Call', () => {
        let editor = {
            ui: {
                registry: {
                    addButton: (temp, object) => {
                        object.onAction();
                    }
                }
            }
        }
        const addButton = jest.spyOn(editor.ui.registry, 'addButton');
        insertUoListButton(editor, onIconClick);
        expect(addButton).toHaveBeenCalled();
    });

    it('Test insertListButton Call', () => {
        let editor = {
            ui: {
                registry: {
                    addSplitButton: (temp, object) => {
                        object.onAction();
                        object.onItemAction();
                    }
                }
            }
        }
        const addSplitButton = jest.spyOn(editor.ui.registry, 'addSplitButton');
        insertListButton(editor,onIconClick);
        expect(addSplitButton).toHaveBeenCalled();
    });

    it('highlightListIcon test UL',() => {
        const elem = document.createElement('button');
        elem.setAttribute('title','Unordered List');
        document.body.append(elem);
        const context = { element : {subtype : 'disc'}}
        highlightListIcon(context); 
        expect(elem.classList.contains('tox-tbtn--enabled')).toEqual(true);
    });

    it('highlightListIcon test OL',() => {
        const elem = document.createElement('div');
        elem.setAttribute('title','Ordered List');
        document.body.append(elem);
        const context = { element : {subtype : 'decimal'}}
        highlightListIcon(context); 
        expect(elem.classList.contains('tox-tbtn--enabled')).toEqual(true);
    });

    it('Test positionListDrop Call', () => {
        let event = {
            target: {
                getBoundingClientRect: () => {
                    return {
                        left: 20,
                        width: 40
                    }
                }
            }
        }
        document.querySelector = () => {
            return {
                style: {
                    left: null
                },
                querySelector: () => {
                    return {
                        classList: {
                            contains: () => {
                                return false
                            },
                            add: () => { }
                        }
                    }
                }
            }
        }
        const getBoundingClientRect = jest.spyOn(event.target, 'getBoundingClientRect');
        positionListDrop(event);
        expect(getBoundingClientRect).toHaveBeenCalled();
    });

    it('Test removeTinyDefaultAttribute  Call for false', () => {
        let element = {
            querySelectorAll: () => {
                return false;
            }
        }
        const querySelectorAll = jest.spyOn(element, 'querySelectorAll');
        removeTinyDefaultAttribute(element);
        expect(querySelectorAll).toHaveBeenCalled();
    });

    it('Test removeTinyDefaultAttribute  Call for true', () => {
        let element = {
            querySelectorAll: () => {
                return [
                    {
                        removeAttribute: () => { }
                    }
                ];
            }
        }
        const querySelectorAll = jest.spyOn(element, 'querySelectorAll');
        removeTinyDefaultAttribute(element);
        expect(querySelectorAll).toHaveBeenCalled();
    });
    it('Test preventRemoveAllFormatting', () => {
        let result = preventRemoveAllFormatting({});
        expect(result).toEqual(true);
    });
    it('Test bindKeyDownEvent for tabname div', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'DIV',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            parentNode: {
                                tagName: 'div',
                                classList: ['class']
                            },
                            closest:() => {
                                return {
                                    length: 1
                                }
                            }
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 1
                    }
                },
                childNodes: [{}]
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {}
            },
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => { 
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        window.tinymce = {
            activeEditor: {
                id: ''
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(undefined);
    });
    it('Test bindKeyDownEvent for tabname div for enter key', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'DIV',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            parentNode: {
                                tagName: 'div',
                                classList: ['class']
                            },
                            closest:() => {
                                return {
                                    length: 1
                                }
                            }
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 1
                    }
                },
                childNodes: [{}]
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {}
            },
            metaKey: ()=> { },
            which : 13,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => { 
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        window.tinymce = {
            activeEditor: {
                id: ''
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(false);
    });
    it('Test bindKeyDownEvent for innerhtml not equal br', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'span',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            closest: () => {
                                return {
                                    length: 1
                                }
                            },
                            innerHTML: 'test'
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                }
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return true
                }
            }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(false);
    });
    it('Test bindKeyDownEvent for tagname br', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'BR',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            closest: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'U'
                            }]
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                }
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 13,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(undefined);
    });
    it('Test bindKeyDownEvent for tagname UL', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'BR',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            },
                            {
                                tagName: 'UL'
                            }
                            ],
                            nextSibling: null,
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                }
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 13,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(false);
    });
    it('Test bindKeyDownEvent for tagname li', () => {
        let callback = jest.fn();
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'BR',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            }
                            ],
                            nextSibling: null,
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        }
                                    }
                                }
                            },
                            remove: () => { }
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 2
                    };
                }
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 13,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element,callback);
        expect(result).toEqual(false);
    });
    it('Test bindKeyDownEvent for tagname li', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'BR',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            }
                            ],
                            nextSibling: {
                                tagName: 'LI'
                            },
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        }
                                    }
                                }
                            },
                            remove: () => { }
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 2
                    };
                }
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 13,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(undefined);
    });
    it('Test bindKeyDownEvent for (li).length == 0', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'span',
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            }
                            ],
                            nextSibling: {
                                tagName: 'LI'
                            },
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        }
                                    }
                                }
                            },
                            remove: () => { }
                        }
                    }
                },
                getRng: () => {
                    return {
                        startContainer: 'Test',
                        endContainer: 'Test'
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 0
                    };
                }
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 13,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(false);
    });
    it('Test bindKeyDownEvent for shift key false ', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'LI',
                            parentNode: {
                                tagName: 'div',
                                classList: ['class']
                            },
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            }
                            ],
                            nextSibling: {
                                tagName: 'LI'
                            },
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            remove: () => { },
                            data: [1, 2]
                        },
                        focusOffset: 2
                    }
                },
                getRng: () => {
                    return {
                        startContainer: {
                            tagName: 'LI'
                        },
                        endContainer: {
                            tagName: 'LI'
                        }
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 1
                    };
                }
            },
            editorCommands: {
                commands: {
                    exec: {
                        indent: () => { }
                    }
                }
            },
            execCommand:jest.fn()
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 9,
            shiftKey: false,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(false);
    });
    it('Test bindKeyDownEvent for shift key true ', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'LI',
                            parentNode: {
                                tagName: 'div',
                                classList: ['class']
                            },
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            }
                            ],
                            nextSibling: {
                                tagName: 'LI'
                            },
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            remove: () => { },
                            data: [1, 2]
                        },
                        focusOffset: 2
                    }
                },
                getRng: () => {
                    return {
                        startContainer: {
                            tagName: 'LI'
                        },
                        endContainer: {
                            tagName: 'LI'
                        }
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 1
                    };
                },
                childNodes: [{}]
            },
            editorCommands: {
                commands: {
                    exec: {
                        indent: () => { },
                        outdent: () => { }
                    }
                }
            },
            execCommand:jest.fn()
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 9,
            shiftKey: true,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(undefined);
    });
    it('Test bindKeyDownEvent for which is 8 ', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'LI',
                            parentNode: {
                                tagName: 'div',
                                classList: ['class']
                            },
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            }
                            ],
                            nextSibling: {
                                tagName: 'LI'
                            },
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            remove: () => { },
                            data: [1, 2],
                            findChildren: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        length: 0
                                    }
                                } else {
                                    return {
                                        length: 1
                                    }
                                }
                            },
                            classList: {
                                add: () => { }
                            }
                        },
                        focusOffset: 0
                    }
                },
                getRng: (temp) => {
                    if (temp) {
                        return {
                            startContainer: 1,
                            endContainer: 1
                        }
                    } else {
                        return {
                            startContainer: {
                                tagName: 'LI'
                            },
                            endContainer: {
                                tagName: 'LI'
                            }
                        }
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 1
                    };
                },
                childNodes: [{}]
            },
            editorCommands: {
                commands: {
                    exec: {
                        indent: () => { },
                        outdent: () => { }
                    }
                }
            }
        };
        let event = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            which: 8,
            shiftKey: true,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event, element);
        expect(result).toEqual(undefined);
    });
    it('Test bindKeyDownEvent for key code is 90 ', () => {
        let editor = {
            selection: {
                getSel: () => {
                    return {
                        anchorNode: {
                            tagName: 'LI',
                            parentNode: {
                                tagName: 'div',
                                classList: ['class']
                            },
                            querySelectorAll: () => {
                                return {
                                    length: 1
                                }
                            },
                            children: [{
                                tagName: 'span'
                            }
                            ],
                            nextSibling: {
                                tagName: 'LI'
                            },
                            closest: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        getAttribute: () => {
                                            return '0';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    return {
                                        getAttribute: () => {
                                            return '1';
                                        },
                                        findChildren: () => {
                                            return {
                                                indexOf: () => {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            remove: () => { },
                            data: [1, 2],
                            findChildren: (temp) => {
                                if (temp === 'ol') {
                                    return {
                                        length: 0
                                    }
                                } else {
                                    return {
                                        length: 1
                                    }
                                }
                            },
                            classList: {
                                add: () => { }
                            }
                        },
                        focusOffset: 0
                    }
                },
                getRng: (temp) => {
                    if (temp) {
                        return {
                            startContainer: 1,
                            endContainer: 1
                        }
                    } else {
                        return {
                            startContainer: {
                                tagName: 'LI'
                            },
                            endContainer: {
                                tagName: 'LI'
                            }
                        }
                    }
                }
            },
            targetElm: {
                findChildren: (temp) => {
                    if (temp !== 'ol') {
                        return {
                            length: 1
                        }
                    } else {
                        return {
                            length: 1
                        }
                    }
                },
                textContent: {
                    length: 1
                },
                innerHTML: {
                    indexOf: () => {
                        return 0
                    }
                },
                querySelectorAll: () => {
                    return {
                        length: 1
                    };
                },
                childNodes: [{
                    nodeName: 'QA'
                }]
            },
            editorCommands: {
                commands: {
                    exec: {
                        indent: () => { },
                        outdent: () => { }
                    }
                }
            }
        };
        let event1 = {
            target: {
                querySelectorAll: (temp) => {
                    if (temp === 'ol') {
                        return []
                    } else {
                        return [
                            {
                                getAttribute: (tempPara) => {
                                    if (tempPara === 'treelevel') {
                                        return 1;
                                    } else {
                                        return undefined;
                                    }
                                }
                            }
                        ]
                    }
                },
                closest: () => {
                    return false
                }
            },
            metaKey: true,
            keyCode: 90,
            ctrlKey: true,
            stopImmediatePropagation: () => { },
            stopPropagation: () => { },
            preventDefault: () => { }
        }
        document.getElementById = () => {
            return {
                closest: () => {
                    return {
                        nextSibling: {
                            querySelector: () => {
                                return {
                                    click: () => { }
                                }
                            }
                        }
                    }
                }
            }
        }
        let element = {
            type: "element-list"
        }
        let result = bindKeyDownEvent(editor, event1, element);
        expect(result).toEqual(undefined);
    });
    it('Test updateNestedList', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 4
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 4
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
it('Test updateNestedList for switch for decimal', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 2
                            } else {
                                return 'decimal'
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 2
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
    it('Test updateNestedList for switch for upper-alpha', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 2
                            } else {
                                return 'upper-alpha'
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 2
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
    it('Test updateNestedList for switch for lower-alpha', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 2
                            } else {
                                return 'lower-alpha'
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 2
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
    it('Test updateNestedList for switch for upper-roman', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 2
                            } else {
                                return 'upper-roman'
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 2
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
    it('Test updateNestedList for switch for lower-roman', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 2
                            } else {
                                return 'lower-roman'
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 2
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
    it('Test updateNestedList for switch for none', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 2
                            } else {
                                return 'none'
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 2
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
    it('Test updateNestedList for switch for disc', () => {
        let element = {
            querySelectorAll: (temp) => {
                if (temp === 'ol') {
                    return []
                } else {
                    return [{
                        getAttribute: (temp) => {
                            if (temp === 'treelevel') {
                                return 2
                            } else {
                                return 'disc'
                            }
                        },
                        classList: {
                            add: () => { }
                        },
                        parents: (temp) => {
                            if (temp === 'ol') {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 0
                                        }
                                    }
                                }
                            } else {
                                return {
                                    getAttribute: (temp) => {
                                        if (temp === 'treelevel') {
                                            return 2
                                        }
                                    }
                                }
                            }
                        },
                        setAttribute: () => {},
                        removeAttribute: () => {},
                        style: {
                            counterIncrement: null
                        },
                        children: [{
                            removeAllClass: () => {},
                            classList: {
                                add: () => {}
                            }
                        }],
                        getCss: () => {
                            return 'none'
                        },
                        removeAllClass: () => {}
                    }]
                }
            }
        }
        let result = updateNestedList(element);
        expect(result).toEqual(undefined);
    });
});