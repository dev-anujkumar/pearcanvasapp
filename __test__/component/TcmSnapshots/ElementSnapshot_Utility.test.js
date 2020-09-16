/**************************Import Modules**************************/
import * as elementSnapshotUtilityFn from '../../../src/component/TcmSnapshots/ElementSnapshot_Utility.js';
import tcmTestData from '../../../fixtures/tcmSnapshotTestData.js';

/**********************Mock Helper Functions**********************/
jest.mock("../../../src/component/AssetPopover/AssetPopover_Actions.js", () => {
    return { getCurrentlyLinkedImage: jest.fn() }
})
jest.mock("../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js", () => {
    return {
        getLatestVersion: () => {
            return "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a"
        }
    }
})

describe('-----------------------Test ElementSnapshot_Utility Functions-----------------------', () => {
    describe('Test-1-Function--1--setSemanticsSnapshots', () => {
        const { stanza, paragraph, blockquote } = tcmTestData.setSemanticsSnapshotsData
        let actionStatus = {
            action:"create",
            status:"accepted",
            fromWhere:"create"
        }
        it('Test-1.1-Function--1--setSemanticsSnapshots - Default', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots({ type: "element-learningobjectives" },"accepted" );
            expect(spyFunction).toHaveBeenCalledWith( { type: "element-learningobjectives" },"accepted",);
        })
        it('Test-1.2-Function--1--setSemanticsSnapshots - Paragraph', () => {
            
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(paragraph,actionStatus);
            expect(spyFunction).toHaveBeenCalledWith(paragraph, actionStatus);
        })
        it('Test-1.3-Function--1--setSemanticsSnapshots - Stanza', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(stanza,actionStatus);
            expect(spyFunction).toHaveBeenCalledWith(stanza,actionStatus);

        })
        it('Test-1.4-Function--1--setSemanticsSnapshots - Blockquote', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(blockquote,actionStatus );
            expect(spyFunction).toHaveBeenCalledWith(blockquote,actionStatus);

        })
    });
    describe('Test-2-Function--2--fetchElementsTag', () => {
        const { paragraph, heading, list, blockquote, aside, workedexample, stanza } = tcmTestData.fetchElementTagData
        it('Test-2.1-Function--2--fetchElementsTag - Paragraph', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(paragraph)
            expect(spyFunction).toHaveReturnedWith('P')
        })
        it('Test-2.2-Function--2--fetchElementsTag - Heading', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(heading)
            expect(spyFunction).toHaveReturnedWith('H3')
        })
        it('Test-2.3-Function--2--fetchElementsTag - List', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(list)
            expect(spyFunction).toHaveReturnedWith('OL+lower-alpha')
        })
        it('Test-2.4-Function--2--fetchElementsTag - Blockquote', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(blockquote)
            expect(spyFunction).toHaveReturnedWith('BQ+blockquote')
        })
        it('Test-2.5-Function--2--fetchElementsTag - Aside', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(aside)
            expect(spyFunction).toHaveReturnedWith('AS')
        })
        it('Test-2.6-Function--2--fetchElementsTag - WorkedExample', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(workedexample)
            expect(spyFunction).toHaveReturnedWith('WE')
        })
        it('Test-2.7-Function--2--fetchElementsTag - Others-Stanza', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(stanza)
            expect(spyFunction).toHaveReturnedWith('ST')
        })
    });
    
});
