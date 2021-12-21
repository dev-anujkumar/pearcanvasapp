import React from 'react';
import { mount } from 'enzyme';
import tinyMCE from 'tinymce/tinymce';
import PowerPasteElement from '../../../src/component/PowerPasteElement/PowerPasteElement.jsx';
import { pastePreProcess, pastePostProcess, setupKeydownEvent } from '../../../src/component/PowerPasteElement/PowerPasteElement.jsx';
import { nodePara1, nodePara2, nodeUL, nodeOLWithStyle, nodeOL, nodeIMG, nodeHEADING } from '../../../fixtures/PowerPasteData.js';

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
        }
        let data = {
            node: {
                children: nodePara1
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
        }
        let data = {
            node: {
                children: nodePara2
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
        }
        let data = {
            node: {
                children: nodeUL
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
        }
        let data = {
            node: {
                children: nodeOLWithStyle
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
        }
        let data = {
            node: {
                children: nodeOL
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
        }
        let data = {
            node: {
                children: nodeIMG
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
        }
        let data = {
            node: {
                children: nodeHEADING
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
        }
        let data = {
            node: {
                children: nodeHEADING2
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
});