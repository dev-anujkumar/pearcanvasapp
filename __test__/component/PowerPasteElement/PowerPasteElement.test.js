import React from 'react';
import { mount } from 'enzyme';
import tinyMCE from 'tinymce/tinymce';
import PowerPasteElement from '../../../src/component/PowerPasteElement/PowerPasteElement.jsx';
import { pastePreProcess, pastePostProcess, setupKeydownEvent, editorFocus, editorBlur, editorClick,prepareFinalPasteContent } from '../../../src/component/PowerPasteElement/PowerPasteElement.jsx';
import { nodePara1, nodePara2, nodeUL, nodeOLWithStyle, nodeOL, nodeIMG, nodeHEADING, elementsData, pasteElementNodeData } from '../../../fixtures/PowerPasteData.js';

describe('Testing FigureUserInterface component', () => {
    const PowerPasteComponent = mount(<PowerPasteElement />)
    let PowerPasteComponentInstance = PowerPasteComponent.instance();
    it('renders without crashing', () => {
        expect(PowerPasteComponent).toHaveLength(1);
        expect(PowerPasteComponentInstance).toBeDefined();
    });
    
    it('Test-1 pastePreProcess if case', () => {
        let data = {
            source: 'web',
            content: 'testing text'
        }
        let result = pastePreProcess(data);
        expect(result).toBe(undefined);
    })

    it('Test-2 pastePreProcess else case', () => {
        let data = {
            source: 'msoffice',
            content: 'testing text'
        }
        let result = pastePreProcess(data);
        expect(result).toBe(undefined);
    })

    it('Test-3 pastePostProcess for IMG tag in P tag', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodePara1,
                childNodes:[{outerHTML:"<p></p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-4 pastePostProcess for other tag in P tag', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),  
            isPowerPasteInvalidContent: true,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodePara2,
                childNodes:[{outerHTML:"<p>TEST</p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-5 pastePostProcess for UL tag', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodeUL,
                childNodes:[{outerHTML:"<p>TEST</p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-6 pastePostProcess for OL tag with style', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodeOLWithStyle,
                childNodes:[{outerHTML:"<p></p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-7 pastePostProcess for OL tag without style', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodeOL,
                childNodes:[{outerHTML:"<p></p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-8 pastePostProcess for IMG tag', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodeIMG,
                childNodes:[{outerHTML:"<p></p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-9 pastePostProcess for H1 tag', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodeHEADING,
                childNodes:[{outerHTML:"<p></p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-9 pastePostProcess for H2 tag', () => {
        let nodeHEADING2 = [{
            ...nodeHEADING[0],
            tagName: 'H2'
        }]
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let data = {
            node: {
                children: nodeHEADING2,
                childNodes:[{outerHTML:"<p></p>"}]
            }
        }
        tinyMCE.activeEditor = {
            setContent: jest.fn(),
            getBody: () => ({
                setAttribute: jest.fn()
            })
        }
        let result = pastePostProcess(data, props);
        expect(result).toBe(undefined);
    })

    it('Test-10 setupKeydownEvent', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            stopImmediatePropagation: jest.fn(),
            ctrlKey: true
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            setContent: () => { },
        }
        let result = setupKeydownEvent(nextEditor);
        expect(result).toBe(undefined);
    })

    it('Test-11 setupKeydownEvent conditional coverage', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            stopImmediatePropagation: jest.fn(),
            ctrlKey: true,
            keyCode: 86
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            undoManager: {
                clear: jest.fn()
            }
        }
        let result = setupKeydownEvent(nextEditor);
        expect(result).toBe(undefined);
    })

    it('Test-12 setupKeydownEvent conditional coverage', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            stopImmediatePropagation: jest.fn(),
            keyCode: 27
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            undoManager: {
                clear: jest.fn()
            }
        }
        jest.spyOn(document, 'querySelector').mockReturnValue({
            click: jest.fn()
        })
        let result = setupKeydownEvent(nextEditor);
        expect(result).toBe(undefined);
    })

    it('Test-13 editorFocus conditional coverage', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            stopImmediatePropagation: jest.fn()
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            undoManager: {
                clear: jest.fn()
            }
        }
        let result = editorFocus(nextEditor);
        expect(result).toBe(undefined);
    })

    it('Test-14 editorBlur conditional coverage', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            stopImmediatePropagation: jest.fn()
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            undoManager: {
                clear: jest.fn()
            }
        }
        let result = editorBlur(nextEditor);
        expect(result).toBe(undefined);
    })

    it('Test-15 editorClick conditional coverage', () => {
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            stopImmediatePropagation: jest.fn()
        }
        let nextEditor = {
            on: (temp, cb) => { cb(event) },
            undoManager: {
                clear: jest.fn()
            },
            getContent: jest.fn()
        }
        let result = editorClick(nextEditor);
        expect(result).toBe(undefined);
    })
    it('Test-15 prepareFinalPasteContent function', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: false,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let result = prepareFinalPasteContent(elementsData,pasteElementNodeData,props);
        // expect(result).toBe(undefined);
    })
    it('Test-16 prepareFinalPasteContent function', () => {
        let props = {
            index: 1,
            onPowerPaste: jest.fn(),
            toggleWordPasteProceed: jest.fn(),
            isPowerPasteInvalidContent: true,
            checkInvalidPowerPasteContent: jest.fn()
        }
        let result = prepareFinalPasteContent(elementsData,pasteElementNodeData,props);
        // expect(result).toBe(undefined);
    })
});