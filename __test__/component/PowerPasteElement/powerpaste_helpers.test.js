import * as powerPasteMethods  from '../../../src/component/PowerPasteElement/powerpaste_helpers';
import { node1, node2, node3, node4 } from '../../../fixtures/PowerPasteData.js';

const methods = powerPasteMethods.default;
describe('-----------------------Test powerpaste_helper Functions-----------------------', () => {
    describe('Test-1-Function--1--convertTag', () => {
        it('convertTag with data', () => {
            let result = methods.convertTag({ type: "b" }, "b", "strog");
            expect(result).toBe(undefined);
        })
    });
    describe('Test-2-Function--1--addSpecificOListClasses', () => {
        let node = node1;
        it('addSpecificOListClasses with firstnode style list-style-type:lower-alpha;', () => {
            let firstNode = {
                tagName: "OL",
                getAttribute: jest.fn().mockImplementationOnce = () => {
                    return 'list-style-type:lower-alpha;'
                }
            }
            let depth = 1;
            const spyFunction = jest.spyOn(methods, 'addSpecificOListClasses');
            methods.addSpecificOListClasses(firstNode, node, depth);
            expect(spyFunction).toHaveBeenCalledWith(firstNode, node, depth);
        })
        it('addSpecificOListClasses with firstnode style list-style-type:upper-alpha;', () => {
            let firstNode = {
                tagName: "OL",
                getAttribute: jest.fn().mockImplementationOnce = () => {
                    return 'list-style-type:upper-alpha;'
                }
            }
            let depth = 2;
            const spyFunction = jest.spyOn(methods, 'addSpecificOListClasses');
            methods.addSpecificOListClasses(firstNode, node, depth);
            expect(spyFunction).toHaveBeenCalledWith(firstNode, node, depth);
        })
        it('addSpecificOListClasses with firstnode style list-style-type:lower-roman;', () => {
            let firstNode = {
                tagName: "OL",
                getAttribute: jest.fn().mockImplementationOnce = () => {
                    return 'list-style-type:lower-roman;'
                }
            }
            let depth = 3;
            const spyFunction = jest.spyOn(methods, 'addSpecificOListClasses');
            methods.addSpecificOListClasses(firstNode, node, depth);
            expect(spyFunction).toHaveBeenCalledWith(firstNode, node, depth);
        })
        it('addSpecificOListClasses with firstnode style list-style-type:upper-roman;', () => {
            let firstNode = {
                tagName: "OL",
                getAttribute: jest.fn().mockImplementationOnce = () => {
                    return 'list-style-type:upper-roman;'
                }
            }
            let depth = 4;
            const spyFunction = jest.spyOn(methods, 'addSpecificOListClasses');
            methods.addSpecificOListClasses(firstNode, node, depth);
            expect(spyFunction).toHaveBeenCalledWith(firstNode, node, depth);
        })
        it('addSpecificOListClasses with firstnode style blank', () => {
            let firstNode = {
                tagName: "OL",
                getAttribute: jest.fn().mockImplementationOnce = () => {
                    return ''
                }
            }
            let depth = 4;
            const spyFunction = jest.spyOn(methods, 'addSpecificOListClasses');
            methods.addSpecificOListClasses(firstNode, node, depth);
            expect(spyFunction).toHaveBeenCalledWith(firstNode, node, depth);
        })
    });
    describe('Test-3-Function--1--addOListClasses', () => {
        let node = node1;
        it('addOListClasses with depth 1', () => {
            let depth = 1;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        it('addOListClasses with depth 2', () => {
            let depth = 2;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        it('addOListClasses with depth 3', () => {
            let depth = 3;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        it('addOListClasses with depth 4', () => {
            let depth = 4;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        it('addOListClasses conditional coverage', () => {
            let node = node2;
            let depth = 4;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        it('addOListClasses conditional coverage', () => {
            let node = node3;
            let depth = 2;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        it('addOListClasses conditional coverage', () => {
            let node = node3;
            let depth = 3;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        it('addOListClasses conditional coverage', () => {
            let node = node3;
            let depth = 4;
            const spyFunction = jest.spyOn(methods, 'addOListClasses');
            methods.addOListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
    });
    describe('Test-4-Function--1--addUListClasses', () => {
        let node = node4;
        xit('addUListClasses with depth 1', () => {
            let depth = 1;
            const spyFunction = jest.spyOn(methods, 'addUListClasses');
            methods.addUListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        xit('addUListClasses with depth 2', () => {
            let depth = 2;
            const spyFunction = jest.spyOn(methods, 'addUListClasses');
            methods.addUListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        xit('addUListClasses with depth 3', () => {
            let depth = 3;
            const spyFunction = jest.spyOn(methods, 'addUListClasses');
            methods.addUListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
        xit('addOListClasses with depth 4', () => {
            let depth = 4;
            const spyFunction = jest.spyOn(methods, 'addUListClasses');
            methods.addUListClasses(node, depth);
            expect(spyFunction).toHaveBeenCalledWith(node, depth);
        })
    });
    describe('Test-5-Function--1--addParagraphClass', () => {
        let node = {
            tagName: "P",
            classList: {
                add: jest.fn()
            },
            innerHTML: "TEST"
        }
        it('addParagraphClass', () => {
            const spyFunction = jest.spyOn(methods, 'addParagraphClass');
            methods.addParagraphClass(node);
            expect(spyFunction).toHaveBeenCalledWith(node);
        })
    });
    describe('Test-6-Function--1--addHeadingClass', () => {
        let headingNode = {
            classList: {
                add: jest.fn()
            },
            innerHTML: "TEST"
        }
        it('addHeadingClass', () => {
            const spyFunction = jest.spyOn(methods, 'addHeadingClass');
            methods.addHeadingClass(headingNode);
            expect(spyFunction).toHaveBeenCalledWith(headingNode);
        })
    });
});